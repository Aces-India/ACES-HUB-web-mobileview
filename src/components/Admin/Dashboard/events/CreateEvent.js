// src/components/CreateEvent.js
import React from 'react';
import EventForm from './EventForm';
import "../../../../index.css";
import Sidebar from '../Sidebar';
import Api from '../../../../api'; // Update the path based on your project structure

const CreateEvent = () => {
    const saveEvent = (formData) => {
        Api.post('eventDetail', formData)
            .then(response => response.data)
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
