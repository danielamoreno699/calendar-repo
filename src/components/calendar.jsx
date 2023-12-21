import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [clickedDate, setClickedDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedService, setSelectedService] = useState(null);
  const [clientName, setClientName] = useState('')
  const [eventCreate, setEventCreate] = useState([])

  const [hours, minutes] = clickedDate;

  const handleDateClick = (info) => {

   

    const clickedTime = new Date(info.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setClickedDate(clickedTime)
    //setClickedDate(info.dateStr);
    setShowModal(true);
  };

  const handleReservation = () => {
    console.log('Reservation done');
    setShowModal(false);
    setShowReservationModal(true);

  }

  const handleCloseReservationModal = () => {



    setShowReservationModal(false);
   


  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const events = [
    {
      title: 'not available',
      start: '2023-12-20T18:00:00',
      end: '2023-12-20T23:00:00',
      display: 'background', // block that schedule
      overlap: false,
      resourceId: 2,
    },
    {
      title: 'Event 2',
      color: '#388e3c',
      start: '2023-12-20T20:00:00',
      end: '2023-12-20T21:00:00',
      overlap: false,
      resourceId: 1,
    },
  ];

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setClientName(value);
    } else if (name === 'service') {
      setSelectedService(value);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCloseReservationModal();
    console.log('submit');
    if (selectedService && clientName) {

      const clickedDateTime = new Date(selectedDate);
      clickedDateTime.setHours(parseInt(hours, 10));
      clickedDateTime.setMinutes(parseInt(minutes, 10));
      //const clickedDateTime = {clickedDate};
      const endDateTime = new Date(clickedDateTime);
      endDateTime.setHours(clickedDateTime.getHours() + 1);

      const newEvent = {
        title: `Reservation for ${clientName}`,
        service: selectedService,
        start: clickedDateTime,
        end: endDateTime, 
        overlap: false,
        color: 'red',
        resourceId: 1,
      };

      setEventCreate([...eventCreate, newEvent]);
      console.log('Created Event:', newEvent);
    }
    else{
      console.log('error');
    }
  };

  return (
    <>
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
          right: 'dayGridMonth,resourceTimeGridWeek,resourceTimeGridDay',
        }}
        height={'90vh'}
        events={eventCreate}
        // events={events}
        dateClick={handleDateClick}
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
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Clicked date: {clickedDate}</p>

            
            <Button variant="primary" onClick={handleReservation}>Reserve</Button>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            
          </Modal.Body>

        
        </Modal>
      )}
   {showReservationModal && (
        <Modal 
        show={showReservationModal} 
        onHide={handleCloseReservationModal}
        size="lg"
        fullscreen="lg-down"
        >
          <Modal.Header closeButton>
            <Modal.Title>Reservation Modal</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <Form onSubmit={handleSubmit}>
          
         

        <Form.Label htmlFor="name">service</Form.Label>
        <Form.Select aria-label="Default select example"
         name="service"
          value={selectedService}
         onChange={onHandleChange}
         >
            <option>select service</option>
            <option value="1">service A</option>
            <option value="2">service B</option>
           <option value="3">service C</option>
        </Form.Select>

        <Form.Label htmlFor="name">name</Form.Label>
        <Form.Control
        type="text"
       
        id="name"
        name="name"
        value={clientName}
        onChange={onHandleChange}
        

        
      />

      <Form.Label htmlFor="clicked-date">clicked date</Form.Label>
        <Form.Control
        type="text"
        value={clickedDate.toString()} 
        
        readOnly
        />

        <Form.Label htmlFor="selected-date">selected date</Form.Label>
          <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date.getDate())}
              dateFormat="MMMM d, yyyy"

            />

            <Button type="submit" variant="primary" >
              reserve
            </Button>
      

          </Form>
          </Modal.Body>
          

       
        </Modal>
      )}

    </>
  );
};

export default Calendar;
