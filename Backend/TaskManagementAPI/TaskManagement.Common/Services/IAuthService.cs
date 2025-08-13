using System.Web.Providers.Entities;
using TaskManagement.Common.ContractDTOs;

namespace TaskManagement.Common.Services;

public interface IAuthService
{
    Task<User> Register(IRegisterRequest request);
    Task<string> Login(ILoginRequest request);
}