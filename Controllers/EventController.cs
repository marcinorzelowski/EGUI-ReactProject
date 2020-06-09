using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EGUI_Lab3.Model;
using EGUI_Lab3.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EGUI_Lab3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private EventService eventService = new EventService();
        // GET: api/Event
        [HttpGet]
        public List<Event> Get()
        {
            return eventService.getData();
        }

        // GET: api/Event/5
        [HttpGet("{id}", Name = "Get")]
        public Event Get(int id)
        {
            return eventService.getData(id);
        }



        // POST: api/Event
        [HttpPost]
        public void Post([FromBody] Event value)
        {
            eventService.addEvent(value);

        }

        // PUT: api/Event/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Event value)
        {
            eventService.updateEvent(id, value);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            eventService.deleteEvent(id);
        }
    }
}
