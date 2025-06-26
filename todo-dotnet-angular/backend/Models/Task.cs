using System;
using System.Collections.Generic;

namespace backend.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public bool Completed { get; set; }
        public ICollection<TaskGroup>? TaskGroups { get; set; } = new List<TaskGroup>();
    }
} 