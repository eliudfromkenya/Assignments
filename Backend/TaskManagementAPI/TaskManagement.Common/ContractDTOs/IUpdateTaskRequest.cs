namespace TaskManagement.Common.ContractDTOs;

public interface IUpdateTaskRequest
{
    int? AssigneeId { get; init; }
    string? Description { get; init; }
    string? Priority { get; init; }
    string? Status { get; init; }
    string? Title { get; init; }

    void Deconstruct(out string? Title, out string? Description, out string? Status, out string? Priority, out int? AssigneeId);
    bool Equals(object? obj);
    bool Equals(IUpdateTaskRequest? other);
    int GetHashCode();
    string ToString();
}