using Microsoft.EntityFrameworkCore;
using PRM.API.Data;
using FluentValidation;
using PRM.API.Repositories;
using PRM.API.Services;
using PRM.API.Profiles;
using PRM.API.Validators;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

var safeConnectionString = connectionString ?? "Host=localhost;Port=5432;Database=PRN232_PE;Username=postgres_pe;Password=123";

builder.Services.AddDbContext<AppDbContext>(opt => 
{
    opt.UseNpgsql(safeConnectionString);
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS for Next.js frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
        policy.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins(
            "http://localhost:3000"
        )
    );
});

// Automapper
builder.Services.AddAutoMapper(typeof(MovieProfile).Assembly);

// FluentValidation
builder.Services.AddValidatorsFromAssemblyContaining<CreateMovieDtoValidator>();

// DI for Movies
builder.Services.AddScoped<IMovieRepository, MovieRepository>();
builder.Services.AddScoped<IMovieService, MovieService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("frontend");
app.UseAuthorization();
app.MapControllers();

app.Run();