using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DotnetDockerApi.Models;

namespace DotnetDockerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/comments/{postId}
        [HttpGet("{postId}")]
        public async Task<ActionResult<object>> GetCommentsByPost(int postId)
        {
            try
            {
                var comments = await _context.Comments
                    .Where(c => c.PostId == postId && c.IsApproved && c.ParentId == null)
                    .OrderByDescending(c => c.CreatedAt)
                    .Select(c => new
                    {
                        c.Id,
                        c.Content,
                        c.AuthorName,
                        c.CreatedAt,
                        Replies = c.Replies
                            .Where(r => r.IsApproved)
                            .OrderBy(r => r.CreatedAt)
                            .Select(r => new
                            {
                                r.Id,
                                r.Content,
                                r.AuthorName,
                                r.CreatedAt
                            })
                    })
                    .ToListAsync();

                return Ok(new
                {
                    success = true,
                    data = comments
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Error interno del servidor"
                });
            }
        }

        // POST: api/comments
        [HttpPost]
        public async Task<ActionResult<object>> CreateComment([FromBody] CreateCommentRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Datos inválidos",
                        errors = ModelState.Values
                            .SelectMany(v => v.Errors)
                            .Select(e => e.ErrorMessage)
                    });
                }

                // Verificar que el post existe
                var post = await _context.Posts
                    .FirstOrDefaultAsync(p => p.Id == request.PostId && p.Status == "published");

                if (post == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Post no encontrado"
                    });
                }

                // Verificar que el comentario padre existe si se especifica
                if (request.ParentId.HasValue)
                {
                    var parentComment = await _context.Comments
                        .FirstOrDefaultAsync(c => c.Id == request.ParentId && c.PostId == request.PostId);

                    if (parentComment == null)
                    {
                        return BadRequest(new
                        {
                            success = false,
                            message = "Comentario padre no encontrado"
                        });
                    }
                }

                var comment = new Comment
                {
                    Content = request.Content.Trim(),
                    AuthorName = request.AuthorName.Trim(),
                    AuthorEmail = request.AuthorEmail.Trim(),
                    PostId = request.PostId,
                    ParentId = request.ParentId,
                    IsApproved = false, // Los comentarios requieren aprobación
                    CreatedAt = DateTime.UtcNow
                };

                _context.Comments.Add(comment);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    message = "Comentario enviado. Está pendiente de aprobación.",
                    data = new
                    {
                        comment.Id,
                        comment.Content,
                        comment.AuthorName,
                        comment.CreatedAt
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Error interno del servidor"
                });
            }
        }
    }

    public class CreateCommentRequest
    {
        public string Content { get; set; } = string.Empty;
        public string AuthorName { get; set; } = string.Empty;
        public string AuthorEmail { get; set; } = string.Empty;
        public int PostId { get; set; }
        public int? ParentId { get; set; }
    }
} 