import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Api from '../api';
const Register = () => {
    const navigate = useNavigate();
    const totalSteps = 3;
    const [currentStep, setCurrentStep] = useState(1);
    const [teamName, setTeamName] = useState('');
    // Remove the line below, as teamMembers is already declared as an array
    // const [teamMembers, setTeamMembers] = useState('2');
    const [teamLeaderName, setTeamLeaderName] = useState('');
    const [college, setCollege] = useState('');
    const [branch, setBranch] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [mobileNumber, setMobileNumber] = useState('');
    const [loading, setLoading] = useState(false);
      const [showSpinner, setShowSpinner] = useState(false);
   // const [showLoader, setShowLoader] = useState(false);
const [showLoader] = useState(false);

const [events, setEvents] = useState([]);
const [selectedEvent, setSelectedEvent] = useState('null');

useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await Api.get('events');
      const upcomingEvents = response.data.filter((event) => event.eventPeriod === 'Upcoming');
      setEvents(upcomingEvents);
      console.log("Upcoming events:", upcomingEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  fetchEvents();
}, []); // The empty dependency array ensures that this effect runs only once when the component mounts

const renderEventPicker = () => (
  <div>
    <label>Event:</label>
    <select
      value={selectedEvent || 'null'} // Ensure that the value is either the selected name or 'null'
      onChange={(e) => {
        const selectedEventName = e.target.value === 'null' ? null : e.target.value;
        setSelectedEvent(selectedEventName);
      }}
    >
      <option value="null">Select an event</option>
      {events.map((event) => (
        <option key={event._id} value={event.name}>
          {event.name}
        </option>
      ))}
    </select>
  </div>
);
  
    // State for team members array
    const initializeTeamMembers = () => {
        return Array.from({ length: 5 }, (_, index) => {
          return {
            name: '',
            setName: (value) => setTeamMembers((prev) => updateMember(prev, index, 'name', value)),
            rollNo: '',
            setRollNo: (value) => setTeamMembers((prev) => updateMember(prev, index, 'rollNo', value)),
            gender: 'M',
            setGender: (value) => setTeamMembers((prev) => updateMember(prev, index, 'gender', value)),
          };
        });
      };
    
      const [teamMembers, setTeamMembers] = useState(initializeTeamMembers);
    
      // Function to update a specific member in the teamMembers array
      const updateMember = (prevMembers, index, key, value) => {
        return prevMembers.map((member, i) => (i === index ? { ...member, [key]: value } : member));
      };
  
    const [track, setTrack] = useState('Generic Software');
    const [selectedFile, setSelectedFile] = useState({});
  
    const nextStep = () => {
      if (currentStep === 1) {
        if (!teamName || !teamLeaderName || !college || !branch || !rollNumber || !email || !mobileNumber) {
          alert('Please fill in all required fields ');
          return;
        }
      }
  
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    };
  
    const prevStep = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };


    const handleEmailChange = (e) => {
      const inputEmail = e.target.value;
      setEmail(inputEmail);
  
      // Regular expression for a simple email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      // Check if the input email matches the pattern
      setIsValidEmail(emailPattern.test(inputEmail));
    };
    
    const handleSubmit = async () => {
        try {
          setLoading(true);
          setShowSpinner(true);
          // Check for empty fields
          if (!teamName || !teamLeaderName || !college || !branch || !rollNumber || !email || !mobileNumber || !track || !selectedFile) {
            console.log('Form values:', { teamName, teamLeaderName, college, branch, rollNumber, email, mobileNumber, track, selectedFile });
            alert('Please fill in all fields. Check if there are empty or invalid fields.');
            return;
          }
    
          // Check if mobile number contains only numbers
          if (!/^\d+$/.test(mobileNumber)) {
            alert('Mobile number must contain only numbers');
            return;
          }
    
          const formData = new FormData();
    
          // Append text-based form data
          formData.append('teamName', teamName);
          formData.append('teamLeaderName', teamLeaderName);
          formData.append('college', college);
          formData.append('branch', branch);
          formData.append('rollNumber', rollNumber);
          formData.append('email', email);
          formData.append('mobileNumber', mobileNumber);
          formData.append('track', track);
          formData.append('event', selectedEvent);
    
          // Append team members data
          teamMembers.forEach((member, index) => {
            formData.append(`team_member_${index + 1}`, member.name);
            formData.append(`team_member_${index + 1}_roll_no`, member.rollNo);
            formData.append(`team_member_${index + 1}_gender`, member.gender);
          });
    
          // Append file data
          if (selectedFile) {
            formData.append('file', selectedFile);
          }
    
          const response = await Api.post("register", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          console.log(response.data); // Handle the response as needed
    
          // Display success alert
          alert("Registration Successful. Thank you for registering for Aces Hackathon. Happy Coding!");
    
           // Navigate to the home screen
           navigate('/Home');
        } catch (error) {
          console.error('Error submitting form:', error);
          alert("Registration Failed. An error occurred during registration.");
        } finally {
          // Set loading and modal visibility back to false when the submission is complete (whether successful or not)
          setLoading(false);
          setShowSpinner(false);
        }
    
        // Log additional information if needed
        console.log('Team Name:', teamName);
        console.log('Team Leader Name:', teamLeaderName);
        console.log('college', college);
        console.log('branch', branch);
        console.log('rollNumber', rollNumber);
        console.log('email', email);
        console.log('mobileNumber', mobileNumber);
        console.log('track', track);
        console.log('Selected File:', selectedFile);
      };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
            <div className="form1">
            <div className="input-container">{renderEventPicker()}</div> 
            <div className="input-container">
            <label className="label input-label">Team Name <span style={{ color: 'red' }}>*</span>:</label>
            <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} className="input" />
          </div>
        
          <div className="input-container">
            <label className="label input-label">Team Leader Name <span style={{ color: 'red' }}>*</span>:</label>
            <input type="text" value={teamLeaderName} onChange={(e) => setTeamLeaderName(e.target.value)} className="input" />
          </div>
        
          <div className="input-container">
            <label className="label input-label">College <span style={{ color: 'red' }}>*</span>:</label>
            <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} className="input" />
          </div>
        
          <div className="input-container">
            <label className="label input-label">Branch <span style={{ color: 'red' }}>*</span>:</label>
            <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} className="input" />
          </div>
        
          <div className="input-container">
            <label className="label input-label">Roll Number <span style={{ color: 'red' }}>*</span>:</label>
            <input type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} className="input" />
          </div>
        
          <div className="input-container">
          <label className="label input-label">
            Email <span style={{ color: "red" }}>*</span>:
          </label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            className={`input ${isValidEmail ? "" : "invalid"}`}
          />
        </div>
        {!isValidEmail && (
          <div
            style={{
              color: "red",
              marginTop: "-25px",
              marginBottom: "10px",
            }}
          >
            Please enter a valid email address.
          </div>
        )}
        
          <div className="input-container">
            <label className="label input-label">Mobile Number <span style={{ color: 'red' }}>*</span>:</label>
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              inputMode="numeric"
              className="input"
            />
          </div>
          </div>
        );
      case 2:
        return (
            <React.Fragment>
            {teamMembers.map((member, index) => (
              <div key={index} className="member-container">
                <div className="member-input-container">
                  <label className="member-label">{`Team Member ${index + 1} Name:`}</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => member.setName(e.target.value)}
                    className="member-input"
                  />
                </div>
          
                <div className="member-input-container">
                  <label className="member-label">{`Team Member ${index + 1} Roll Number:`}</label>
                  <input
                    type="text"
                    value={member.rollNo}
                    onChange={(e) => member.setRollNo(e.target.value)}
                    className="member-input"
                  />
                </div>
          
                <div className="member-input-container">
                  <label className="member-label">{`Team Member ${index + 1} Gender:`}</label>
                  <select
                    value={member.gender}
                    onChange={(e) => member.setGender(e.target.value)}
                    className="member-select"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
              </div>
            ))}
          </React.Fragment>
          
        );
      case 3:
        return (
            <div className="track-container">
            <div className="input-container">
              <label className="label">Tracks <span style={{ color: 'red' }}>*</span>:</label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="formpicker"
              >
                <option value="Generic Software">Generic Software</option>
                <option value="Generic Hardware">Generic Hardware</option>
                <option value="Health Care">Health Care</option>
                <option value="Fin-tech">Fin-tech</option>
              </select>
            </div>
      
            <div className="file-container">
              <label className="file-label" htmlFor="fileInput">
                Select File <span style={{ color: 'red' }}>*</span>:
              </label>
              <input
                type="file"
                id="fileInput"
                name="fileInput"
                onChange={handleFileChange}
                className="file-input"
              />
              <div className="uploadButtonContainer">
                <button onClick={() => document.getElementById('fileInput').click()} className="uploadButton">
                  Upload File
                </button>
              </div>
      
              {selectedFile && (
                <div className="selected-file-container">
                  <p className="selected-file-info">Selected File:</p>
                  <p className="selected-file-info">Name: {selectedFile.name}</p>
                  <p className="selected-file-info">Type: {selectedFile.type}</p>
                  <p className="selected-file-info">Size: {selectedFile.size} bytes</p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };
 
  const handleFileChange = (event) => {
    const file = event.target.files[0];
console.log(event.target.files[0])
    if (file) {
     
      setSelectedFile(file);
    }
  };

// Remove this block if you don't plan to use Modal
const Modal = ({ show, onClose }) => {
  return (
    <div className={`modal ${show ? 'show' : 'hide'}`}>
      <div className="modal-content">
        <div className="spinner-container">
          <div className="loader"></div>
        </div>
        <p style={{color:'#0000'}}>Submitting...</p>
      </div>
    </div>
  );
};




  return (
    <div>
     
      <div className="register-container">
        <h1 className="title"> Team Registration</h1>
       

        {renderStep()}

        <div className="navigationButtonsClass" style={{ textAlign: 'center' }}>
          {currentStep > 1 && (
            <button className="button backButton" onClick={prevStep}>
              Back
            </button>
          )}
          {currentStep < totalSteps && (
            <button className="button" onClick={nextStep}>
              Next
            </button>
          )}
          {currentStep === totalSteps && (
            <button className="button" onClick={handleSubmit} disabled={loading}>
              {loading ? <Modal show={showLoader} /> : 'Submit'}
            </button>
          )}
          
        </div>

        {/* Conditionally render the spinner outside the button */}
        {showSpinner && (
          <div className="spinner-overlay">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
