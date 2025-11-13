using System.ComponentModel.DataAnnotations;

namespace PRM.API.Entities
{
    public class Movie
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        public string? Genre { get; set; }

        public int? Rating { get; set; } // 1 - 5

        public string? PosterImageUrl { get; set; }
    }
}
