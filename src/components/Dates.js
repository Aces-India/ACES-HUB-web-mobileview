import React from 'react';
import  '../index.css';
import Header from './Header';
function ImportantDates() {
  return (
    <div className='background'>
    <Header />
    <div className= "main">
      <h1 className="text">Important Dates For Hack Revolution</h1>
      <p className= "listItem">• Registration and Abstract Submission: 11th Nov-23 - 25th Nov 23</p>
      <p className= "listItem">• Announcement of shortlisted teams: 30th December 2023</p>
      <p className= "listItem">• Registrations of shortlisted teams: 10th Dec 23</p>
      <p className= "listItem">• Hackathon: 24th - 17 Nov 2023</p>
      <img
        src={require('../assets/tl6.png')}
        alt="Hack Revolution Image"
        className="icon1"
      />
 
    </div>
    </div>
  );
}



export default ImportantDates;
