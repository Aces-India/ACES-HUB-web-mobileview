import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../../../index.css";
import Sidebar from '../Sidebar';
import Api from '../../../../api';

const DisplayEvents = () => {
    const [events, setEvents] = useState([]);
    const [sortOrder, setSortOrder] = useState('ascending'); // State to track sort order
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        Api.get('eventDetails')
         
            .then(response => {
                setEvents(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
                setError('Error fetching events. Please try again.');
                setLoading(false);
            });
    }, []);

    const deleteEvent = (eventId) => {
        console.log('Deleting Event with ID:', eventId);
        Api.delete(`eventDetail/${eventId}`)
            .then(() => {
                setEvents(events.filter(event => event._id !== eventId));
            })
            .catch(error => console.error('Error:', error));
    };

    const sortEvents = () => {
        const sortedEvents = [...events].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === 'ascending' ? dateA - dateB : dateB - dateA;
        });
        setEvents(sortedEvents);
    };

    useEffect(() => {
        sortEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortOrder]);
    return (
        <div className="dashboard">
        <Sidebar />
        <div className="display-events-content">
        <div className="displayEventsContainer">
            <h2>Events</h2>
            <button 
                    onClick={() => setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')}
                    className="sortButton">
                    Sort by Date ({sortOrder})
                </button>
            {events.map(event => (
                <div key={event._id} className="eventItem">
                    <h3 className="eventTitle">{event.title}</h3>
                    <p className="eventDate">{event.date}</p>
                    <p className="eventDescription">{event.description}</p>
                    {event.imageUrl && <img src={event.imageUrl} alt={event.title} className="eventImage" />}
                    <Link to={`/edit-event/${event._id}`} className="editLink">Edit</Link>
                    <button onClick={() => deleteEvent(event._id)} className="deleteButton">Delete</button>
                </div>
            ))}
        </div>
        </div>
        </div>
    );
};

export default DisplayEvents;
