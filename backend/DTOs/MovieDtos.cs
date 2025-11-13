namespace PRM.API.DTOs
{
    public class MovieDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Genre { get; set; }
        public int? Rating { get; set; }
        public string? PosterImageUrl { get; set; }
    }

    public class CreateMovieDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Genre { get; set; }
        public int? Rating { get; set; }
        public string? PosterImageUrl { get; set; }
    }

    public class UpdateMovieDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Genre { get; set; }
        public int? Rating { get; set; }
        public string? PosterImageUrl { get; set; }
    }
}
