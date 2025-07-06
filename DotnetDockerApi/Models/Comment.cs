using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DotnetDockerApi.Models
{
    public class Comment
    {
        public int Id { get; set; }
        
        [Required]
        public string Content { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(100)]
        public string AuthorName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(100)]
        public string AuthorEmail { get; set; } = string.Empty;
        
        public int PostId { get; set; }
        public Post Post { get; set; } = null!;
        
        public int? ParentId { get; set; }
        public Comment? Parent { get; set; }
        public ICollection<Comment> Replies { get; set; } = new List<Comment>();
        
        public bool IsApproved { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
} 