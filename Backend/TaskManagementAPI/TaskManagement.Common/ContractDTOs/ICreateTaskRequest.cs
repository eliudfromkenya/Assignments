namespace TaskManagement.Common.ContractDTOs;

public interface ICreateTaskRequest
{
    int? AssigneeId { get; init; }
    int? CreatorId { get; init; }
    string? Description { get; init; }
    string? Priority { get; init; }
    string? Title { get; init; }

    void Deconstruct(out string? Title, out string? Description, out string? Priority, out int? AssigneeId, out int? CreatorId);
    bool Equals(ICreateTaskRequest? other);
    bool Equals(object? obj);
    int GetHashCode();
    string ToString();
}