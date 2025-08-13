using backend.Models.DTOs.Task;
using backend.Services;
using Microsoft.AspNetCore.Authorization;

namespace backend.Endpoints;

public static class TaskEndpoints
{
    public static void MapTaskEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/tasks")
            .WithTags("Tasks")
            .RequireAuthorization();

        group.MapGet("/", async (
            [FromQuery] string? status,
            [FromQuery] int? assigneeId,
            [FromServices] ITaskService taskService) =>
        {
            var tasks = await taskService.GetTasks(status, assigneeId);
            return Results.Ok(tasks);
        });

        group.MapGet("/{id}", async (
            int id,
            [FromServices] ITaskService taskService) =>
        {
            var task = await taskService.GetTaskById(id);
            return task != null ? Results.Ok(task) : Results.NotFound();
        });

        group.MapPost("/", async (
            [FromBody] CreateTaskRequest request,
            [FromServices] ITaskService taskService,
            HttpContext httpContext) =>
        {
            var userId = int.Parse(httpContext.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? "0");
            var task = await taskService.CreateTask(request with { CreatorId = int.Parse(userId) });
            return Results.Created($"/api/tasks/{task.Id}", task);
        });

        group.MapPut("/{id}", async (
            int id,
            [FromBody] UpdateTaskRequest request,
            [FromServices] ITaskService taskService) =>
        {
            try
            {
                var updatedTask = await taskService.UpdateTask(id, request);
                return Results.Ok(updatedTask);
            }
            catch (Exception ex)
            {
                return Results.BadRequest(new { message = ex.Message });
            }
        });

        group.MapDelete("/{id}", async (
            int id,
            [FromServices] ITaskService taskService) =>
        {
            var success = await taskService.DeleteTask(id);
            return success ? Results.NoContent() : Results.NotFound();
        });

        // Additional endpoints for users (for task assignment)
        app.MapGet("/api/users", async (
            [FromServices] ITaskService taskService) =>
        {
            var users = await taskService.GetUsers();
            return Results.Ok(users);
        }).RequireAuthorization();
    }
}