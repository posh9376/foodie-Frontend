import React from "react";
import heroImage from "../Imgs/hero.png"; // Import the hero image

const CutoutCard = () => {
  return (
    <section className="hero-card">
      {/* <div className="curved-card-upper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="1 1 3940 319">
          <path
            fill="#ffedde"
            fill-opacity="1"
            d="M0,256L48,256C96,256,192,256,288,234.7C384,213,480,171,576,165.3C672,160,768,192,864,213.3C960,235,1056,245,1152,229.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div> */}
      <div className="curved-card">
        <div className="curved-card-items">
          <div className="curved-card-inner">
            {" "}
            <h1 className="hero-title">
              Healthy <span className="red">Eating</span> is<br></br> an{" "}
              <span className="orange">Important</span> Part<br></br> of
              Lifestyle
            </h1>
            <p className="hero-description">
              We prepare delicious food<br></br> For you, we are always here!
            </p>
            <a href="#">Discover More</a>
          </div>
          
          <div className="curved-card-right">
            {" "}
            <img src={heroImage} alt="Delicious Food" className="hero-image" />
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
          <path
            fill="#fff"
            fill-opacity="1"
            d="M0,256L48,256C96,256,192,256,288,234.7C384,213,480,171,576,165.3C672,160,768,192,864,213.3C960,235,1056,245,1152,229.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default CutoutCard;
