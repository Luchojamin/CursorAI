using System.Collections.Generic;

namespace backend.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<TaskGroup>? TaskGroups { get; set; } = new List<TaskGroup>();
    }
} 