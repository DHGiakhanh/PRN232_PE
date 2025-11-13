using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PRM.API.Data;
using PRM.API.Entities;

namespace PRM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public PostsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _db.Posts.AsNoTracking().ToListAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var item = await _db.Posts.FindAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Post post)
        {
            post.Id = Guid.NewGuid();
            _db.Posts.Add(post);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = post.Id }, post);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Post post)
        {
            var existing = await _db.Posts.FindAsync(id);
            if (existing == null) return NotFound();
            existing.Name = post.Name;
            existing.Description = post.Description;
            existing.ImageUrl = post.ImageUrl;
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var existing = await _db.Posts.FindAsync(id);
            if (existing == null) return NotFound();
            _db.Posts.Remove(existing);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
