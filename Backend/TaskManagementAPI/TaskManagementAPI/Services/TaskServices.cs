using backend.Data;
using backend.Models;
using backend.Models.DTOs.Task;
using Microsoft.EntityFrameworkCore;
using System;

namespace backend.Services;

public class TaskService : ITaskService
{
    private readonly AppDbContext _context;

    public TaskService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Task>> GetTasks(string? status, int? assigneeId)
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

        return await query.ToListAsync();
    }

    public async Task<Task> GetTaskById(int id)
    {
        return await _context.Tasks
            .Include(t => t.Assignee)
            .Include(t => t.Creator)
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<Task> CreateTask(CreateTaskRequest request)
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

    public async Task<Task> UpdateTask(int id, UpdateTaskRequest request)
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

    public async Task<IEnumerable<User>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }
}