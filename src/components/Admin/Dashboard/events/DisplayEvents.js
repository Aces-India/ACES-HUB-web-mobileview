import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../../../index.css";
import Sidebar from '../Sidebar';

const DisplayEvents = () => {
    const [events, setEvents] = useState([]);
    const [sortOrder, setSortOrder] = useState('ascending'); // State to track sort order

    useEffect(() => {
        fetch('https://s-hub-backend.onrender.com/api/eventDetails')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const deleteEvent = (eventId) => {
        console.log('Deleting Event with ID:', eventId);
        fetch(`https://s-hub-backend.onrender.com/api/eventDetail/${eventId}`, {
            method: 'DELETE',
        }).then(response => response.json())
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
