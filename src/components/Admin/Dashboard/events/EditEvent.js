// src/components/EditEvent.js
import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';
import { useParams } from 'react-router-dom';
import Api from '../../../../api';
const EditEvent = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        console.log('Fetching data for event ID:', eventId);
        Api.get(`eventDetail/${eventId}`)
            .then(response => response.data)
            .then(data => setEvent(data))
            .catch(error => console.error('Error:', error));
    }, [eventId]);

    const saveEvent = (formData) => {
        console.log('Updating Event with ID:', eventId, 'Data:', formData);
        Api.put(`eventDetail/${eventId}`, formData)
            .then(response => response.data)
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
