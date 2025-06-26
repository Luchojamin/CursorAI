namespace backend.DTOs
{
    public class GroupDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class CreateGroupDto
    {
        public string Name { get; set; }
    }

    public class UpdateGroupDto
    {
        public string Name { get; set; }
    }
} 