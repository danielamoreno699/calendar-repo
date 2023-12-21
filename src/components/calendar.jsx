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
      title: 'Event 1',
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
        events={events}
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
          <Form.Label htmlFor="name">professional</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>select professional</option>
            <option value="1">professional A</option>
            <option value="2">professional B</option>
           <option value="3">professional C</option>
        </Form.Select>

        <Form.Label htmlFor="name">service</Form.Label>
        <Form.Select aria-label="Default select example">
            <option>select service</option>
            <option value="1">service A</option>
            <option value="2">service B</option>
           <option value="3">service C</option>
        </Form.Select>

        <Form.Label htmlFor="name">name</Form.Label>
        <Form.Control
        type="text"
        placeholder='name'
        id="client-name"
        name="client-name"
        
      />

      <Form.Label htmlFor="clicked-date">clicked date</Form.Label>
        <Form.Control
        type="text"
        value={clickedDate}
        readOnly
        />


          <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
            />

      

            
          </Modal.Body>
          <Modal.Footer>
          
            <Button variant="primary" onClick={handleCloseReservationModal}>
              Save Changes
            </Button>
          </Modal.Footer>

       
        </Modal>
      )}

    </>
  );
};

export default Calendar;
