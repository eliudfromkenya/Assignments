using TaskManagementAPI.Models;

namespace TaskManagementAPI.Entities;

public class TaskEntity
{
    public int? Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Status { get; set; } = "TODO";
    public string Priority { get; set; } = "MEDIUM";
    public int? AssigneeId { get; set; }
    public int? CreatorId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public UserEntity? Assignee { get; set; }
    public UserEntity? Creator { get; set; }
}