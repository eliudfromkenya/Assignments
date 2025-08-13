namespace TaskManagement.Common.ContractModels;

public interface ITask
{
    IUser? Assignee { get; set; }
    int? AssigneeId { get; set; }
    DateTime CreatedAt { get; set; }
    IUser? Creator { get; set; }
    int CreatorId { get; set; }
    string Description { get; set; }
    int Id { get; set; }
    string Priority { get; set; }
    string Status { get; set; }
    string Title { get; set; }
    DateTime UpdatedAt { get; set; }
}