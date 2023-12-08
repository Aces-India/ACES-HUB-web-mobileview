import React from 'react';
import '../index.css';
import Header from './Header';
function Tracks() {
  return (
    <div className="main">
    <Header />
      <div>
        <h1 className="text">Tracks for Hack Revolution</h1>
      </div>
      {/* First Box */}
      <div  >
        <div className="iconContainer">
          <img
            src={require('../assets/fintech.png')}
            alt="Fintech Icon"
            className="track-icon"
          />
        </div>
        <p className="text1">Fintech</p>
        <p className="text2">Shape the future of finance in the Fintech pathway by exploring blockchain and other cutting-edge financial innovations. <br />Whether you are developing disruptive payment solutions or innovative financial apps,<br /> this pathway invites you to redefine the landscape where tech and finance converge.</p>
      </div>

      <div  >
        <div className="iconContainer">
          <img
            src={require('../assets/hard.png')}
            alt="Generic Hardware Icon"
            className="track-icon"
          />
        </div>
        <p className="text1">Generic Hardware</p>
        <p className="text2">Get into cool tech stuff with the Generic Hardware pathway. If you like circuitry or building hardware, this track lets you turn your ideas into real gadgets.</p>
      </div>
      <div  >
        <div className="iconContainer">
          <img
            src={require('../assets/healthcare.png')}
            alt="Health Care Icon"
            className="track-icon"
          />
        </div>
        <p className="text1">Health Care</p>
        <p className="text2">Mix tech and healthcare in this pathway, where your ideas could make a big difference in how we care for people. <br />It is open to tech lovers and healthcare folks alike.</p>
      </div>
      <div  >
        <div className="iconContainer">
          <img
            src={require('../assets/software.png')}
            alt="Generic Software Icon"
            className="track-icon"
          />
        </div>
        <p className="text1">Generic Software</p>
        <p className="text2">Discover the world of computer magic in the Generic Software pathway.<br /> It is all about creating cool things like websites and mobile apps.<br /> Whether you are a coding whiz or just getting started, dive into crafting awesome digital solutions!</p>
      </div>
    </div>
  );
}



export default Tracks;
