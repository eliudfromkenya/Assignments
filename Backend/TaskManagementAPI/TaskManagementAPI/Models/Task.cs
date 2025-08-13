using TaskManagement.Common.ContractModels;
using TaskManagementAPI.Entities;

namespace TaskManagementAPI.Models;

public class Task : ITask
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Status { get; set; } = "TODO";
    public string Priority { get; set; } = "MEDIUM";
    public int? AssigneeId { get; set; }
    public int CreatorId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public IUser? Assignee { get; set; }
    public IUser? Creator { get; set; }

    public static implicit operator Task(TaskEntity entity)
    {
        return new Task
        {
            Id = entity.Id,
            Title = entity.Title,
            Description = entity.Description,
            Status = entity.Status,
            Priority = entity.Priority,
            AssigneeId = entity.AssigneeId,
            CreatorId = entity.CreatorId,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt,
            Assignee = entity.Assignee is null ? null : (User)entity.Assignee,
            Creator = entity.Creator is null ? null : (User)entity.Creator
        };
    }

    public static implicit operator TaskEntity(Task task)
    {
        return new TaskEntity
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Status = task.Status,
            Priority = task.Priority,
            AssigneeId = task.AssigneeId,
            CreatorId = task.CreatorId,
            CreatedAt = task.CreatedAt,
            UpdatedAt = task.UpdatedAt,
            Assignee = task.Assignee is null ? null : (UserEntity)task.Assignee,
            Creator = task.Creator is null ? null : (UserEntity)task.Creator
        };
    }
}