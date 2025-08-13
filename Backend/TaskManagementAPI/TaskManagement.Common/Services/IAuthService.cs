using System.Web.Providers.Entities;
using TaskManagement.Common.ContractDTOs;
using TaskManagement.Common.ContractModels;
using TaskManagement.Common.Utilities;

namespace TaskManagement.Common.Services;

public interface IAuthService
{
    Task<IUser> Register(Common.Utilities.RegisterRequest request);
    Task<string> Login(Common.Utilities.LoginRequest request);
}