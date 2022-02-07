import React from "react";
import "./Zx9SpeakerCard.css";
import { Link } from "react-router-dom";
import Z7xSpeakerCard from "../components/Z7xSpeakerCard";

export default function Zx9SpeakerCard() {
  return (
    <article className="speaker-card">
      <div className="container">
        <img src="./image-speaker-zx9.png" alt="speaker" />
        <h3>ZX9 speaker</h3>
        <p>
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>
        <Link className="black-btn" to="#">
          {" "}
          See product
        </Link>
      </div>
      <Z7xSpeakerCard />
    </article>
  );
}
