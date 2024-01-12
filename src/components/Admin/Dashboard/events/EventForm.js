// src/components/EventForm.js
import React, { useState } from 'react';
import "../../../../index.css";
import ReactQuill from 'react-quill'; // import react-quill
import 'react-quill/dist/quill.snow.css'; // import styles

const EventForm = ({ event = {}, onSave }) => {
    const [title, setTitle] = useState(event.title || '');
    const [date, setDate] = useState(event.date || '');
    const [description, setDescription] = useState(event.description || '');
    const [eventFlag, setEventFlag] = useState(event.eventFlag || 'upcoming');
    const [image, setImage] = useState(null);

    const handleDescriptionChange = (content, delta, source, editor) => {
        setDescription(editor.getHTML()); // Get HTML content
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('date', date);
        formData.append('description', description);
        formData.append('eventFlag', eventFlag);
        if (image) {
            formData.append('image', image);
        }
        onSave(formData);
    };

    return (
        <div className="eventFormContainer">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                    className="eventFormInput"
                />
                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                    className="eventFormInput"
                />
                <ReactQuill
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Description"
                    required
                />
                <select
                    value={eventFlag}
                    onChange={e => setEventFlag(e.target.value)}
                    className="eventFormSelect"
                >
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                </select>
                <input
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                    className="eventFormFileInput"
                />
                <button type="submit" className="eventFormSubmitButton">Submit</button>
            </form>
        </div>
    );
};

export default EventForm;