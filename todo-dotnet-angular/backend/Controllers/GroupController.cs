using backend.Models;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupController : ControllerBase
    {
        private readonly TodoDbContext _context;
        public GroupController(TodoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GroupDto>>> GetGroups()
        {
            var groups = await _context.Groups.ToListAsync();
            var groupDtos = groups.Select(MapToGroupDto).ToList();
            return groupDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GroupDto>> GetGroup(int id)
        {
            var group = await _context.Groups.FindAsync(id);
            if (group == null) return NotFound();
            return MapToGroupDto(group);
        }

        [HttpPost]
        public async Task<ActionResult<GroupDto>> CreateGroup(CreateGroupDto createGroupDto)
        {
            var group = new Group
            {
                Name = createGroupDto.Name
            };

            _context.Groups.Add(group);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGroup), new { id = group.Id }, MapToGroupDto(group));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGroup(int id, UpdateGroupDto updateGroupDto)
        {
            var group = await _context.Groups.FindAsync(id);
            if (group == null) return NotFound();

            group.Name = updateGroupDto.Name;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Groups.Any(e => e.Id == id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroup(int id)
        {
            var group = await _context.Groups.FindAsync(id);
            if (group == null) return NotFound();
            _context.Groups.Remove(group);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private static GroupDto MapToGroupDto(Group group)
        {
            return new GroupDto
            {
                Id = group.Id,
                Name = group.Name
            };
        }
    }
} 