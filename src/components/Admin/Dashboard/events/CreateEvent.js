// src/components/CreateEvent.js
import React from 'react';
import EventForm from './EventForm';
import "../../../../index.css";
import Sidebar from '../Sidebar';
const CreateEvent = () => {
    const saveEvent = (formData) => {
        fetch('https://s-hub-backend.onrender.com/api/eventDetail', {
            method: 'POST',
            body: formData,
        }).then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="create-event-content">
                <h2>Create New Event</h2>
                <EventForm onSave={saveEvent} />
            </div>
        </div>
    );
};

export default CreateEvent;
