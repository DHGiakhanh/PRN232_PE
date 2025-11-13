using FluentValidation;
using PRM.API.DTOs;

namespace PRM.API.Validators
{
    public class CreateMovieDtoValidator : AbstractValidator<CreateMovieDto>
    {
        public CreateMovieDtoValidator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Rating).InclusiveBetween(1, 5).When(x => x.Rating.HasValue);
        }
    }

    public class UpdateMovieDtoValidator : AbstractValidator<UpdateMovieDto>
    {
        public UpdateMovieDtoValidator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Rating).InclusiveBetween(1, 5).When(x => x.Rating.HasValue);
        }
    }
}
