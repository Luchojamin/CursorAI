using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options) { }

        public DbSet<Task> Tasks { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<TaskGroup> TaskGroups { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskGroup>()
                .HasKey(tg => new { tg.TaskId, tg.GroupId });

            modelBuilder.Entity<TaskGroup>()
                .HasOne(tg => tg.Task)
                .WithMany(t => t.TaskGroups)
                .HasForeignKey(tg => tg.TaskId);

            modelBuilder.Entity<TaskGroup>()
                .HasOne(tg => tg.Group)
                .WithMany(g => g.TaskGroups)
                .HasForeignKey(tg => tg.GroupId);
        }
    }
} 