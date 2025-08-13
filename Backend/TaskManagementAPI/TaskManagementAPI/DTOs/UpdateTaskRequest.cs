using TaskManagement.Common.ContractDTOs;
namespace TaskManagementAPI.DTOs;

public readonly record struct UpdateTaskRequest(
    string? Title,
    string? Description,
    string? Status,
    string? Priority,
    int? AssigneeId
) : IUpdateTaskRequest
{
    public bool Equals(IUpdateTaskRequest? other)
    {
        throw new NotImplementedException();
    }
}
