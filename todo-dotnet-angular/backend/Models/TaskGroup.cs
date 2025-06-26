namespace backend.Models
{
    public class TaskGroup
    {
        public int TaskId { get; set; }
        public Task Task { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
    }
} 