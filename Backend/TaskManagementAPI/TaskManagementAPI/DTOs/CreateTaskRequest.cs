namespace backend.Models.DTOs.Task;

public record CreateTaskRequest(
    string Title,
    string? Description,
    string Priority,
    int? AssigneeId,
    int CreatorId
) : ICreateTaskRequest;

// UpdateTaskRequest.cs
public record UpdateTaskRequest(
    string? Title,
    string? Description,
    string? Status,
    string? Priority,
    int? AssigneeId
) : IUpdateTaskRequest;