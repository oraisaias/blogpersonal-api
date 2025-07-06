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
    public class PostsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/posts
        [HttpGet]
        public async Task<ActionResult<object>> GetPublishedPosts(
            [FromQuery] int page = 1, 
            [FromQuery] int limit = 10, 
            [FromQuery] string? category = null)
        {
            try
            {
                var query = _context.Posts
                    .Include(p => p.Category)
                    .Include(p => p.Author)
                    .Where(p => p.Status == "published");

                if (!string.IsNullOrEmpty(category))
                {
                    query = query.Where(p => p.Category!.Slug == category);
                }

                var total = await query.CountAsync();
                var posts = await query
                    .OrderByDescending(p => p.PublishedAt)
                    .Skip((page - 1) * limit)
                    .Take(limit)
                    .Select(p => new
                    {
                        p.Id,
                        p.Title,
                        p.Slug,
                        p.Excerpt,
                        p.FeaturedImage,
                        p.ViewCount,
                        p.CreatedAt,
                        p.PublishedAt,
                        CategoryName = p.Category!.Name,
                        CategorySlug = p.Category.Slug,
                        CategoryColor = p.Category.Color,
                        AuthorName = p.Author!.FullName
                    })
                    .ToListAsync();

                return Ok(new
                {
                    success = true,
                    data = posts,
                    pagination = new
                    {
                        page,
                        limit,
                        total,
                        pages = (int)Math.Ceiling((double)total / limit)
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

        // GET: api/posts/{slug}
        [HttpGet("{slug}")]
        public async Task<ActionResult<object>> GetPostBySlug(string slug)
        {
            try
            {
                var post = await _context.Posts
                    .Include(p => p.Category)
                    .Include(p => p.Author)
                    .Include(p => p.Comments.Where(c => c.IsApproved))
                    .FirstOrDefaultAsync(p => p.Slug == slug && p.Status == "published");

                if (post == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Post no encontrado"
                    });
                }

                // Incrementar contador de vistas
                post.ViewCount++;
                await _context.SaveChangesAsync();

                var result = new
                {
                    post.Id,
                    post.Title,
                    post.Slug,
                    post.Content,
                    post.Excerpt,
                    post.FeaturedImage,
                    post.ViewCount,
                    post.CreatedAt,
                    post.PublishedAt,
                    CategoryName = post.Category!.Name,
                    CategorySlug = post.Category.Slug,
                    CategoryColor = post.Category.Color,
                    AuthorName = post.Author!.FullName,
                    AuthorBio = post.Author.Bio,
                    Comments = post.Comments.Select(c => new
                    {
                        c.Id,
                        c.Content,
                        c.AuthorName,
                        c.CreatedAt
                    })
                };

                return Ok(new
                {
                    success = true,
                    data = result
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

        // GET: api/posts/search
        [HttpGet("search")]
        public async Task<ActionResult<object>> SearchPosts(
            [FromQuery] string q, 
            [FromQuery] int page = 1, 
            [FromQuery] int limit = 10)
        {
            try
            {
                if (string.IsNullOrEmpty(q) || q.Trim().Length < 2)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "El término de búsqueda debe tener al menos 2 caracteres"
                    });
                }

                var searchTerm = $"%{q.Trim()}%";

                var query = _context.Posts
                    .Include(p => p.Category)
                    .Where(p => p.Status == "published" &&
                               (EF.Functions.ILike(p.Title, searchTerm) ||
                                EF.Functions.ILike(p.Content, searchTerm) ||
                                EF.Functions.ILike(p.Excerpt!, searchTerm)));

                var total = await query.CountAsync();
                var posts = await query
                    .OrderByDescending(p => p.PublishedAt)
                    .Skip((page - 1) * limit)
                    .Take(limit)
                    .Select(p => new
                    {
                        p.Id,
                        p.Title,
                        p.Slug,
                        p.Excerpt,
                        p.CreatedAt,
                        CategoryName = p.Category!.Name,
                        CategorySlug = p.Category.Slug
                    })
                    .ToListAsync();

                return Ok(new
                {
                    success = true,
                    data = posts,
                    pagination = new
                    {
                        page,
                        limit,
                        total,
                        pages = (int)Math.Ceiling((double)total / limit)
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

        // GET: api/posts/{slug}/related
        [HttpGet("{slug}/related")]
        public async Task<ActionResult<object>> GetRelatedPosts(
            string slug, 
            [FromQuery] int limit = 3)
        {
            try
            {
                var originalPost = await _context.Posts
                    .Where(p => p.Slug == slug)
                    .Select(p => new { p.CategoryId })
                    .FirstOrDefaultAsync();

                if (originalPost == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Post no encontrado"
                    });
                }

                var relatedPosts = await _context.Posts
                    .Include(p => p.Category)
                    .Where(p => p.Status == "published" &&
                               p.Slug != slug &&
                               p.CategoryId == originalPost.CategoryId)
                    .OrderByDescending(p => p.PublishedAt)
                    .Take(limit)
                    .Select(p => new
                    {
                        p.Id,
                        p.Title,
                        p.Slug,
                        p.Excerpt,
                        p.CreatedAt,
                        CategoryName = p.Category!.Name,
                        CategorySlug = p.Category.Slug
                    })
                    .ToListAsync();

                return Ok(new
                {
                    success = true,
                    data = relatedPosts
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
} 