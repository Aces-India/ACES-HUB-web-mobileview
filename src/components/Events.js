import React from 'react';
import '../index.css';
import Header from './Header';
function Events() {
  return (
    <div className="main">
    <Header/>
    <h1 className="title">Hack Revolution </h1>
      <img
        src={require('../assets/HackRevolution.jpg')}
        alt="Hack Revolution Event"
        className="icon1" style={{ width: '300px' }}

      />
 
    </div>
  );
}



export default Events;
