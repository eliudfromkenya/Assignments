
using TaskManagement.Common.ContractDTOs;
using TaskManagement.Common.ContractModels;

namespace TaskManagement.Common.Services;

public interface ITaskService
{
    Task<ITask> CreateTask(ICreateTaskRequest request);
    Task<bool> DeleteTask(int id);
    Task<ITask> GetTaskById(int id);
    Task<IEnumerable<ITask>> GetTasks(string? status, int? assigneeId);
    Task<IEnumerable<IUser>> GetUsers();
    Task<ITask> UpdateTask(int id, IUpdateTaskRequest request);
}