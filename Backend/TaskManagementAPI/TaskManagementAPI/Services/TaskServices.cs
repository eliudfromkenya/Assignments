using System;
using System.Data.Entity;
using TaskManagement.Common.ContractDTOs;
using TaskManagement.Common.ContractModels;
using TaskManagement.Common.Services;
using TaskManagementAPI.Models;
using TaskManagementAPI.Services;
using Task = TaskManagementAPI.Models.Task;

namespace backend.Services;

public class TaskService : ITaskService
{
    private readonly AppDbContext _context;

    public TaskService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ITask>> GetTasks(string? status, int? assigneeId)
    {
        var query = _context.Tasks
            .Include(t => t.Assignee)
            .Include(t => t.Creator)
            .AsQueryable();

        if (!string.IsNullOrEmpty(status))
        {
            query = query.Where(t => t.Status == status);
        }

        if (assigneeId.HasValue)
        {
            query = query.Where(t => t.AssigneeId == assigneeId);
        }
        var ans = query.ToList(); 
        return ans.Select(c => (TaskManagementAPI.Models.Task)c);
    }

    public async Task<ITask> GetTaskById(int id)
    {
        return (Task) await _context.Tasks
            .Include(t => t.Assignee)
            .Include(t => t.Creator)
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<ITask> CreateTask(ICreateTaskRequest request)
    {
        var task = new Task
        {
            Title = request.Title,
            Description = request.Description,
            Status = "TODO",
            Priority = request.Priority,
            AssigneeId = request.AssigneeId,
            CreatorId = request.CreatorId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return await GetTaskById(task.Id);
    }

    public async Task<ITask> UpdateTask(int id, IUpdateTaskRequest request)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) throw new Exception("Task not found");

        task.Title = request.Title ?? task.Title;
        task.Description = request.Description ?? task.Description;
        task.Status = request.Status ?? task.Status;
        task.Priority = request.Priority ?? task.Priority;
        task.AssigneeId = request.AssigneeId ?? task.AssigneeId;
        task.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return await GetTaskById(task.Id);
    }

    public async Task<bool> DeleteTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return false;

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<IUser>> GetUsers()
    {
        var ans =  _context.Users.ToList();
        return ans.Select(u => (User)u);
    }
}