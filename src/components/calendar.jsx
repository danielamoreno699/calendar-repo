
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
const Calendar = () => {




  const events = [
    {
      
        title: 'Event 1',
      start: '2023-12-18T18:00:00',
      end: '2023-12-18T23:00:00',
      display: 'background', // block that schedule

      overlap: false,
      
    },
    {
        title: 'Event 2',
        start: '2023-12-19T20:00:00',
        end: '2023-12-19T21:00:00',
        overlap: false,
      

    }
  ];

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
      initialView={'resourceTimeGridDay'}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      height={'90vh'}
      events={events}
      eventDidMount={(info) => {
        return new bootstrap.Popover(info.el, {
          title: info.event.title,
          placement: 'auto',
          trigger: 'hover',
          customClass: 'popoverStyle',
          content: `Start: ${info.event.start}`,
        });
      }}
    />
  );
};

export default Calendar;
