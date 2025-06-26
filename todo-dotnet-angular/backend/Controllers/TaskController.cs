using backend.Models;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskEntity = backend.Models.Task;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly TodoDbContext _context;
        public TaskController(TodoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
        {
            var tasks = await _context.Tasks
                .Include(t => t.TaskGroups)
                .ThenInclude(tg => tg.Group)
                .ToListAsync();

            var taskDtos = tasks.Select(MapToTaskDto).ToList();
            return taskDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDto>> GetTask(int id)
        {
            var task = await _context.Tasks
                .Include(t => t.TaskGroups)
                .ThenInclude(tg => tg.Group)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (task == null) return NotFound();
            return MapToTaskDto(task);
        }

        [HttpPost]
        public async Task<ActionResult<TaskDto>> CreateTask(CreateTaskDto createTaskDto)
        {
            var task = new TaskEntity
            {
                Title = createTaskDto.Title,
                Description = createTaskDto.Description,
                DueDate = createTaskDto.DueDate,
                Completed = createTaskDto.Completed
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, MapToTaskDto(task));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, UpdateTaskDto updateTaskDto)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            task.Title = updateTaskDto.Title;
            task.Description = updateTaskDto.Description;
            task.DueDate = updateTaskDto.DueDate;
            task.Completed = updateTaskDto.Completed;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Tasks.Any(e => e.Id == id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("{taskId}/groups/{groupId}")]
        public async Task<IActionResult> AssignGroup(int taskId, int groupId)
        {
            var taskGroup = new TaskGroup { TaskId = taskId, GroupId = groupId };
            _context.TaskGroups.Add(taskGroup);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{taskId}/groups/{groupId}")]
        public async Task<IActionResult> UnassignGroup(int taskId, int groupId)
        {
            var taskGroup = await _context.TaskGroups.FindAsync(taskId, groupId);
            if (taskGroup == null) return NotFound();
            _context.TaskGroups.Remove(taskGroup);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private static TaskDto MapToTaskDto(TaskEntity task)
        {
            return new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                DueDate = task.DueDate,
                Completed = task.Completed,
                Groups = task.TaskGroups?.Select(tg => new GroupDto
                {
                    Id = tg.Group.Id,
                    Name = tg.Group.Name
                }).ToList() ?? new List<GroupDto>()
            };
        }
    }
} 