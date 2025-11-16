import React from "react";
import libraryPic from "../assets/building.jpg";
import './Banner.css'

export default function Banner() {
    return (
        <div className="building-container">
            <img className="building" src={libraryPic} alt="Library Building" />
            <div className="overlay-text">
                <h1>Welcome to Our Library!</h1>
                <ul>
                    <li>📚 Explore our vast book collection</li>
                    <li>🔍 Search and reserve your favorites instantly</li>
                    <li>🗂 Keep track of your personal virtual bookshelf</li>
                    <li>🆕 Stay updated on the latest arrivals</li>
                    <li>🏛 Pick up reserved books at our library</li>
                </ul>
                <p><strong>Abulkhair-Khan Ave 46, Aktobe</strong></p>
            </div>
        </div>
    );
}