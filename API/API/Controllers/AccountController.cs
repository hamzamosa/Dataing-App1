using API.Data;
using API.DTOs;
using API.Entites;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    [Route("api/Account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ITokenServices _tokenServices;

        public AccountController(DataContext context,ITokenServices tokenServices)
        {
            _context = context;
            _tokenServices = tokenServices;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDto) 
        {
         
            if (await UserExist(registerDto.UserName)) 
            {
                return Conflict(new
                {
                    ErrorCode="206",
                    ErrorMessage ="This user name is taken"
                
                });
            
            }

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName= registerDto.UserName.ToLower(),
                PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt=hmac.Key
            };
            _context.TbUsers.Add(user);
            await _context.SaveChangesAsync();

            UserDTO userRes = new UserDTO()
            {
                UserName = user.UserName,
                Token=_tokenServices.CreateToken(user)

            };



            return Ok(userRes);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var User = await _context.TbUsers.Where(u=>u.UserName==loginDTO.UserName).SingleOrDefaultAsync();

          

            if (User == null) 
            {

                return Unauthorized(new
                {
                    ErroreCode=210,
                    ErroreMessage="the user name doesnt exist",
                });
            }
            using var hmac = new HMACSHA512(User.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != User.PasswordHash[i])
                {
                    return Unauthorized(new
                    {
                        ErrorCode = 210,
                        ErrorMessage = "Invalid password",
                    });
                }
            }

            UserDTO userRes = new UserDTO()
            {
                UserName = User.UserName,
                Token = _tokenServices.CreateToken(User)

            };

            return Ok(userRes);
        }

        private async Task<bool> UserExist(string userName) 
        {
        return await _context.TbUsers.AnyAsync(x => x.UserName == userName.ToLower());
        
        }
    }
}
