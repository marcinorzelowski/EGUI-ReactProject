using EGUI_Lab3.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EGUI_Lab3.Service
{
    public class EventService
    {
        public List<Event> getData()
        {
            using(StreamReader r = new StreamReader("data.json"))
            {
                var json = r.ReadToEnd();
                return JsonConvert.DeserializeObject<List<Event>>(json);
            }
        }

        public Event getData(int id)
        {
            using (StreamReader r = new StreamReader("data.json"))
            {
                var json = r.ReadToEnd();
                return JsonConvert.DeserializeObject<List<Event>>(json).Find(x => x.id == id);
            }
        }

        public List<Event> getData(DateTime date)
        {
            using (StreamReader r = new StreamReader("data.json"))
            {
                var json = r.ReadToEnd();
                return JsonConvert.DeserializeObject<List<Event>>(json).FindAll(x => x.date.Equals(date));
            }
        }

        public void addEvent(Event newEvent)
        {
            List<Event> events = this.getData();
       
                
            if (events == null || events.Count == 0)
            {
                newEvent.id = 1;
                events = new List<Event>();
            }
            else
            {
               newEvent.id = events.Max(i => i.id) + 1;
            }
                
            
            events.Add(newEvent);
            string json = JsonConvert.SerializeObject(events.ToArray());
            System.IO.File.WriteAllText("data.json", json);
        }

        public void deleteEvent(int id)
        {
            List<Event> events = this.getData();
            events.RemoveAt(events.FindIndex(x => x.id == id));
            string json = JsonConvert.SerializeObject(events.ToArray());
            System.IO.File.WriteAllText("data.json", json);
        }

        public void updateEvent(int id, Event modEvent){
            List<Event> events = getData();
            int index = events.FindIndex(x => x.id == id);

            events[index] = modEvent;


            string json = JsonConvert.SerializeObject(events.ToArray());
            System.IO.File.WriteAllText("data.json", json);


        }


    }
}
