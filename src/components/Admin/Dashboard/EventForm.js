// EventForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../index.css';
import Api from '../../../api';

const EventForm = ({ event = { _id: null, name: '', eventPeriod: '' }, onEventSaved }) => {
  const [name, setName] = useState('');
  const [eventPeriod, setEventPeriod] = useState('');

  useEffect(() => {
      if (event && event._id) {
          setName(event.name);
          setEventPeriod(event.eventPeriod);
      }
  }, [event]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      const endpoint = event._id ? `events/${event._id}` : 'events';
      const method = event._id ? 'put' : 'post';

      try {
          await Api[method](endpoint, { name, eventPeriod });
          onEventSaved();
          if (!event._id) {
              setName('');
              setEventPeriod('');
          }
      } catch (error) {
          console.error('Error managing event:', error);
      }
  };
  
    return (
      <form onSubmit={handleSubmit} className="event-form">
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Event Name" 
          className="event-input"
          required 
        />
        <select 
          value={eventPeriod} 
          onChange={(e) => setEventPeriod(e.target.value)}
          className="event-select"
        >
          <option value="">Select Event Period</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" className="event-submit-btn">
          {event._id ? 'Update' : 'Add'} Event
        </button>
      </form>
    );
};
  
export default EventForm;
