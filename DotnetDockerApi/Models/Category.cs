using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DotnetDockerApi.Models
{
    public class Category
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(50)]
        public string Slug { get; set; } = string.Empty;
        
        public string? Description { get; set; }
        
        [MaxLength(7)]
        public string Color { get; set; } = "#3B82F6";
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Relaciones
        public ICollection<Post> Posts { get; set; } = new List<Post>();
    }
} 