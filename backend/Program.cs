using Microsoft.EntityFrameworkCore;
using PRM.API.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

var safeConnectionString = connectionString ?? "Host=localhost;Port=5432;Database=postsdb;Username=postgres;Password=example";

builder.Services.AddDbContext<AppDbContext>(opt => 
{
    opt.UseNpgsql(safeConnectionString);
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();