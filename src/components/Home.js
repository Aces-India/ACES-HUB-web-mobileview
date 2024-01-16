import React, { useContext, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import { GlobalContext } from "../GlobalProvider";

const Box = ({ label, icon, screen, id }) => {
  let navigate = useNavigate();
  const backgroundColors = [
    "#17a2b8",
    "#FF5733",
    "#7f19e6",
    "#FF3357",
    "#33FF57",
    "#ffc107",
  ];
  // #FF5733 33FF57
  const backgroundColor = backgroundColors[id % backgroundColors.length];

  const handleBoxPress = (e) => {
    e.preventDefault();
    // window.location.href = `/${screen}`; //problem creator state getting update automatically try avoiding this
    navigate(`/${screen}`);
  };

  return (
    <div
      style={{
        width: "260px",
        margin: "10px",
        padding: "8px",
        border: "1px solid #ccc",
        textAlign: "center",
        borderRadius: "10px",
        backgroundColor,
        color: "#fff",
        fontSize: "18px",
        fontWeight: "bold",
      }}
      onClick={handleBoxPress}
    >
      <img src={icon} alt={label} style={{ width: "50px", height: "50px" }} />
      <p>{label}</p>
    </div>
  );
};

const Home = () => {
  const Navigate = useNavigate();
  const [, setActiveIndex] = useState(0);
  const { userName, email, userId } = useContext(GlobalContext);

  const data = [
    { image: require("../assets/Img1.png"), screen: "Home" },
    { image: require("../assets/Img2.png"), screen: "Home" },
    { image: require("../assets/Img1.png"), screen: "Rules" },
    // Add more items as needed
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setActiveIndex(index),
  };

  const boxesData = [
    {
      id: 1,
      label: "Registrations",
      icon: require("../assets/Registration.png"),
      screen: "Mainregistrations",
    },
    
    {
      id: 6,
      label: "Events",
      icon: require("../assets/Event.png"),
      screen: "Events",
    },
    {
      id: 4,
      label: "Notifications",
      icon: require("../assets/notification.png"),
      screen: "Notifications",
    },

  ];

  return (
    <div className="container">
      <Header />
      <Slider {...settings}>
        {data.map((item, index) => (
          <div key={index} className="slide">
            <div className="image-wrapper">
              <img src={item.image} className="image" alt={item.title} />
            </div>
            <p className="title">{item.title}</p>
          </div>
        ))}
      </Slider>
      <div className="paginationContainer slick-dots"></div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginTop: "20px",
          backgroundImage: 'url("/asserts/10.jpg")',
        }}
      >
        {[...Array(Math.ceil(boxesData.length / 3))].map((_, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {boxesData.slice(rowIndex * 3, rowIndex * 3 + 3).map((box) => (
              <Box key={box.id} {...box} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
