using TaskManagement.Common.ContractDTOs;
namespace TaskManagementAPI.DTOs;

public readonly record struct CreateTaskRequest(
    string Title,
    string? Description,
    string Priority,
    int? AssigneeId,
    int CreatorId
) : ICreateTaskRequest
{
    public bool Equals(ICreateTaskRequest? other)
    {
        throw new NotImplementedException();
    }
}
