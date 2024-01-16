import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";
import EventForm from './EventForm';
import '../../../index.css';
import Sidebar from './Sidebar';
import Api from '../../../api';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    let navigate = useNavigate();
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await Api.get('events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleDelete = async (eventId) => {
        try {
            await Api.delete(`events/${eventId}`);
            fetchEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const onEventSaved = () => {
        fetchEvents();
        setEditingEvent(null);
    };
    

    return (
        <div className="dashboard">
        
        <Sidebar />
        <div className="event-list-content">
            <h2>Event List</h2>
            {!editingEvent && <EventForm onEventSaved={onEventSaved} />}

            {events.map(event => (
                <div key={event._id} className="event-item">
                    {event.name} ({event.eventPeriod})
                    <div className="event-item-actions">
                        <button onClick={() => handleDelete(event._id)} className="delete-btn">Delete</button>
                        <button onClick={() => setEditingEvent(event)} className="edit-btn">Edit</button>
                    </div>
                </div>
            ))}

            {editingEvent && (
                <EventForm 
                    event={editingEvent} 
                    onEventSaved={onEventSaved} 
                />
            )}
            </div>
        </div>
        
    );
};

export default EventList;
