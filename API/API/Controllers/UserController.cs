using API.Data;
using API.Entites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        public UserController(DataContext context)
        {
            _context = context;
            
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetAllUsers()
        {
            var users = await _context.TbUsers.ToListAsync();

            return Ok(users);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task <ActionResult> GetUserDeatails(int id)
        {
            var user = await _context.TbUsers.Where(u => u.Id == id).SingleOrDefaultAsync();

            if(user == null) 
            {
            return NotFound(new
            {
                ErrorCode="203",
                ErrorMessage ="invalid user id"

            });
            
            }

            return Ok(user);
        }
    }
}
