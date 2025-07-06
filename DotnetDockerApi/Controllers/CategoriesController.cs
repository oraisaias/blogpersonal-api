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
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoriesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/categories
        [HttpGet]
        public async Task<ActionResult<object>> GetCategories()
        {
            try
            {
                var categories = await _context.Categories
                    .Select(c => new
                    {
                        c.Id,
                        c.Name,
                        c.Slug,
                        c.Description,
                        c.Color,
                        c.CreatedAt,
                        PostCount = c.Posts.Count(p => p.Status == "published")
                    })
                    .OrderBy(c => c.Name)
                    .ToListAsync();

                return Ok(new
                {
                    success = true,
                    data = categories
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

        // GET: api/categories/{slug}
        [HttpGet("{slug}")]
        public async Task<ActionResult<object>> GetCategoryBySlug(
            string slug, 
            [FromQuery] int page = 1, 
            [FromQuery] int limit = 10)
        {
            try
            {
                var category = await _context.Categories
                    .FirstOrDefaultAsync(c => c.Slug == slug);

                if (category == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Categoría no encontrada"
                    });
                }

                var query = _context.Posts
                    .Include(p => p.Author)
                    .Where(p => p.CategoryId == category.Id && p.Status == "published");

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
                        AuthorName = p.Author!.FullName
                    })
                    .ToListAsync();

                return Ok(new
                {
                    success = true,
                    data = new
                    {
                        category = new
                        {
                            category.Id,
                            category.Name,
                            category.Slug,
                            category.Description,
                            category.Color,
                            category.CreatedAt
                        },
                        posts,
                        pagination = new
                        {
                            page,
                            limit,
                            total,
                            pages = (int)Math.Ceiling((double)total / limit)
                        }
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
} 