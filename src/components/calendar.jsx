
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
      start: '2023-12-20T18:00:00',
      end: '2023-12-20T23:00:00',
      display: 'background', // block that schedule

      overlap: false,
      resourceId: 2
      
      
    },
    {
        title: 'Event 2',
        color: "#388e3c",
        start: '2023-12-20T20:00:00',
        end: '2023-12-20T21:00:00',
        overlap: false,
        resourceId: 1
      

    }
  ];

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
      droppable={true}
      initialView={'resourceTimeGridDay'}
      resources={[
        { id: 1, title: 'professional A' },
        { id: 2, title: 'professional B' },
        { id: 3, title: 'professional C' },
      ]}
  
      
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      height={'90vh'}
      events={events}
      editable={true}
      selectable={true}
      selectMirror={true}
      eventDidMount={(info) => {
        return new bootstrap.Popover(info.el, {
          title: info.event.title,
          placement: 'auto',
          
          customClass: 'popoverStyle',
          content: `Start: ${info.event.start}`,
        });
      }}
    />
  );
};

export default Calendar;
