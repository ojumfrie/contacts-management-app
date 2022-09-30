using ContactsManagement.API.Data;
using ContactsManagement.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

namespace ContactsManagement.API.Controllers
{
    [EnableCors("_myAllowSpecificOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ContactDbContext _context;

        public ContactController(ContactDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Contact>> Get()
        {
            return await _context.Contacts.ToListAsync();
        }

        [HttpGet("retrieve/{id}")]
        [ProducesResponseType(typeof(Contact), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            return contact == null ? NotFound() : Ok(contact);
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [HttpPost]
        public async Task<Dictionary<string,string>> Create(Contact contact)
        {
            await _context.Contacts.AddAsync(contact);
            await _context.SaveChangesAsync();
            return new Dictionary<string, string>(){
                {"status", "200"},
                {"message", "New contact successfully registered!"},
            };
        }

        [HttpPut("{id}")] // this way, because we expect the id is passed in the URL.
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<Dictionary<string,string>> Update(int id, Contact contact)
        {
            if (id != contact.Id)
            {
                return new Dictionary<string, string>(){
                    {"status", "400"},
                    {"message", "Bad request."},
                };
            }
            
            _context.Entry(contact).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return new Dictionary<string, string>(){
                {"status", "200"},
                {"message", "Contact successfully updated!"},
            };
        }

        [HttpDelete("{id}")] // this way, because we expect the id is passed in the URL.
        [ProducesResponseType(StatusCodes.Status204NoContent)] // here, we specify that the endpoint can return 204
        [ProducesResponseType(StatusCodes.Status404NotFound)] // here, we specify that the endpoint can return 404
        public async Task<Dictionary<string,string>> Delete(int id)
        {
            var contactToDelete = await _context.Contacts.FindAsync(id);
            if (contactToDelete == null) {
                return new Dictionary<string, string>(){
                    {"status", "404"},
                    {"message", "Unable to find the requested ID."},
                };
            }

            _context.Contacts.Remove(contactToDelete);
            await _context.SaveChangesAsync();

            return new Dictionary<string, string>(){
                {"status", "200"},
                {"message", "Contact successfully deleted!"},
            };
        }
    }
}
