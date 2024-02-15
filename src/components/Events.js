import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Header from './Header';
import Api from '../api';

function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const screenWidth = window.innerWidth;
  const Navigate = useNavigate();

  

  const fetchEventDetails = async () => {
    try {
      const response = await Api.get('eventDetails');
      setUpcomingEvents(response.data.filter(event => event.eventFlag === 'upcoming'));
      setCompletedEvents(response.data.filter(event => event.eventFlag === 'completed'));
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const renderEventCard = (event) => (
    <div
      key={event._id}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        marginBottom: '15px',
        width: '200px', // Adjust the width as needed
        margin: 'auto',
      }}
      onClick={() => {
        setSelectedEvent(event);
        setModalVisible(true);
      }}
    >
      <img
        src={event.imageUrl}
        alt={event.title}
        style={{
          width: '100%',
          height: '250px', // Adjust the height as needed
          borderRadius: '10px',
          marginBottom: '10px',
        }}
      />
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>{event.title}</p>
        <p>{event.date}</p>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#F3F3F3', flex: 1, paddingTop: '20px' }}>
    <Header />
      <p style={{ fontSize: '22px', fontWeight: 'bold', marginLeft: '10px', color: '#2E4053', marginBottom: '10px' }}>
        Upcoming Events
      </p>
      <div style={{ display: 'flex', overflowX: 'auto', marginBottom: '10px' }}>
        {upcomingEvents.map(event => renderEventCard(event))}
      </div>
      <p style={{ fontSize: '22px', fontWeight: 'bold', marginLeft: '10px', color: '#2E4053', marginBottom: '10px' }}>
        Completed Events
      </p>
      <div style={{ display: 'flex', overflowX: 'auto' }}>
        {completedEvents.map(event => renderEventCard(event))}
      </div>
      {modalVisible && selectedEvent && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%', // Adjust the width as needed
            maxHeight: '80vh', // Set the maximum height
      overflowY: 'auto', // Add scroll for overflow
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            textAlign: 'center',
          }}
        >
          <img src={selectedEvent.imageUrl} alt={selectedEvent.title} style={{ width: '200px', height: '300px', borderRadius: '10px', marginBottom: '15px' }} />
          <p style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>{selectedEvent.title}</p>
          <p style={{ fontSize: '16px', color: '#777', marginBottom: '10px' }}>Date {selectedEvent.date}</p>
          <div dangerouslySetInnerHTML={{ __html: selectedEvent.description }} />
          <button
            style={{
              backgroundColor: '#213966',
              borderRadius: '20px',
              padding: '15px',
              color: '#fff',
              width: '60%',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '5px',
            }}
            onClick={() => {
              setModalVisible(false);
              Navigate("/registration")
            }}
          >
            Registration
          </button>
          <button
            style={{
              backgroundColor: '#b31532',
              borderRadius: '20px',
              padding: '15px',
              width: '60%',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '5px',
            }}
            onClick={() => setModalVisible(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Events;
