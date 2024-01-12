// src/components/EditEvent.js
import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';
import { useParams } from 'react-router-dom';
const EditEvent = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        console.log('Fetching data for event ID:', eventId);
        fetch(`https://s-hub-backend.onrender.com/api/eventDetail/${eventId}`)
            .then(response => response.json())
            .then(data => setEvent(data))
            .catch(error => console.error('Error:', error));
    }, [eventId]);

    const saveEvent = (formData) => {
        console.log('Updating Event with ID:', eventId, 'Data:', formData);
        fetch(`https://s-hub-backend.onrender.com/api/eventDetail/${eventId}`, {
            method: 'PUT',
            body: formData,
        }).then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h2>Edit Event</h2>
            {event && <EventForm event={event} onSave={saveEvent} />}
        </div>
    );
};

export default EditEvent;
