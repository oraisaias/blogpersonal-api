using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DotnetDockerApi.Models
{
    public class Post
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(200)]
        public string Slug { get; set; } = string.Empty;
        
        [Required]
        public string Content { get; set; } = string.Empty;
        
        public string? Excerpt { get; set; }
        
        [MaxLength(255)]
        public string? FeaturedImage { get; set; }
        
        [MaxLength(20)]
        public string Status { get; set; } = "draft";
        
        public int? AuthorId { get; set; }
        public User? Author { get; set; }
        
        public int? CategoryId { get; set; }
        public Category? Category { get; set; }
        
        public int ViewCount { get; set; } = 0;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? PublishedAt { get; set; }
        
        // Relaciones
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
} 