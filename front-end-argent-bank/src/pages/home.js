import React from "react";
import imageHome from "../assets/bank-tree.jpeg";
import iconChat from "../assets/icon-chat.png";
import iconMoney from "../assets/icon-money.png";
import iconSecurity from "../assets/icon-security.png";
import "../styles/home.css";

/**
 * Page Home
 * @Component - Header
 * @returns {JSX.Element}
 */

export default function Home() {
  return (
    <main>
      <div className="home">
        <img className="home_image" src={imageHome} alt=""></img>
        <section className="home-content">
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="home_features">
        <div className="home_feature-item">
          <img src={iconChat} alt="Chat Icon" className="home_feature-icon" />
          <h3 className="home_feature-item-title">You are our #1 priority</h3>
          <p>
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </p>
        </div>
        <div className="home_feature-item">
          <img src={iconMoney} alt="Chat Icon" className="home_feature-icon" />
          <h3 className="home_feature-item-title">
            More savings means higher rates
          </h3>
          <p>
            The more you save with us, the higher your interest rate will be!
          </p>
        </div>
        <div className="home_feature-item">
          <img
            src={iconSecurity}
            alt="Chat Icon"
            className="home_feature-icon"
          />
          <h3 className="home_feature-item-title">Security you can trust</h3>
          <p>
            We use top of the line encryption to make sure your data and money
            is always safe.
          </p>
        </div>
      </section>
    </main>
  );
}
