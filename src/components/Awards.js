import React from 'react';
import Header from './Header';

function Awards() {
  return (
    <div className="prize">
    <Header />
      <div className="text">Prizes for Hack Revolution</div>
      <div style={{ color: 'red', fontSize: '20px', marginBottom: '10px', textDecorationLine: 'underline',textAlign:'center' }}>
        Cash Prizes Worth ₹ 3,00,000/-
      </div>
      {/* 1st Prize */}
      <div className="prizeItem">
        <div className="awardiconContainer">
          <img
            src={require('../assets/1.png')}
            alt="First Prize"
            className="awardicon"
          />
        </div>
        <div className="textContainer">
          <div style={{ marginRight: '20px' }}>₹ 40,000</div>
          <div style={{ marginRight: '20px' }}>1st Prize</div>
        </div>
      </div>
      <div className='sec-container'>
        {/* 2nd Prize */}
        <div className="prizeItem">
          <div className="awardiconContainer">
            <img
              src={require('../assets/2.png')}
              alt="Second Prize"
              className="awardicon"
            />
          </div>
          <div className="textContainer">
            <div style={{ marginRight: '20px' }}>₹ 25,000</div>
            <div style={{ marginRight: '20px' }}>2nd Prize</div>
          </div>
        </div>

        {/* 3nd Prize */}
        <div className="prizeItem">
          <div className="awardiconContainer">
            <img
              src={require('../assets/3.png')}
              alt="Third Prize"
              className="awardicon"
            />
          </div>
          <div className="textContainer">
            <div style={{ marginRight: '20px' }}>₹ 10,000</div>
            <div style={{ marginRight: '20px' }}>3rd Prize</div>
          </div>
        </div>
      </div>
      <div className="text3">Prizes worth ₹ 75,000 in each track</div>
    </div>
  );
}



export default Awards;
