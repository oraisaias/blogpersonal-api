using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DotnetDockerApi.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Username { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(255)]
        public string PasswordHash { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string? FullName { get; set; }
        
        public string? Bio { get; set; }
        
        [MaxLength(255)]
        public string? AvatarUrl { get; set; }
        
        public bool IsAdmin { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Relaciones
        public ICollection<Post> Posts { get; set; } = new List<Post>();
    }
} 