using Microsoft.AspNetCore.Identity.Data;

using backend.Models.DTOs.Auth;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/auth").WithTags("Authentication");

        group.MapPost("/register", async (
            [FromBody] RegisterRequest request,
            [FromServices] IAuthService authService) =>
        {
            try
            {
                var user = await authService.Register(request);
                return Results.Ok(new { user.Id, user.Email, user.Username, user.Role });
            }
            catch (Exception ex)
            {
                return Results.BadRequest(new { message = ex.Message });
            }
        });

        group.MapPost("/login", async (
            [FromBody] LoginRequest request,
            [FromServices] IAuthService authService) =>
        {
            try
            {
                var token = await authService.Login(request);
                return Results.Ok(new { token });
            }
            catch (Exception ex)
            {
                return Results.Unauthorized();
            }
        });
    }
}