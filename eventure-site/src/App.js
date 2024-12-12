import React, { useState, useEffect } from "react";
import "./App.css";
import LoginSignUp from './LoginSignUp'; // Import LoginSignup component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Toggle authentication status
  const toggleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // Fetch event data from Eventbrite API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          'https://www.eventbriteapi.com/v3/events/search/?token=TUKRBHJICP6UPPSJMS&location.address=New%20York'
        );
        const data = await response.json();
        console.log(data); // Log to verify the structure of the response
        
        // Check if 'events' exists in the response and it's an array
        if (data.events && Array.isArray(data.events)) {
          setEvents(data.events); // Set events if available
        } else {
          setError("No events found.");
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setError("Error fetching events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="App">
      {/* If the user is logged in, show the event app, otherwise show the login/signup */}
      {isLoggedIn ? (
        <div>
          {/* Header */}
          <header className="header">
            <div className="logo-circle"></div>
            <div className="logo">eventure</div>
            <nav className="header-nav">
              <a href="#home">Home</a>
              <a href="#events">Events</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
            <div className="profile-menu">
              <img
                src="https://d28htnjz2elwuj.cloudfront.net/wp-content/uploads/2013/11/University_of_Washington_Logo.jpg"
                alt="User"
                className="profile-avatar"
              />
              <span>Username</span>
            </div>
          </header>

          {/* Hero Section */}
          <section className="hero">
            <img
              src="https://wallpaperaccess.com/full/3897907.jpg"
              alt="Background"
              className="hero-image"
            />
            <div className="search-bar-container-centered">
              <input
                type="text"
                placeholder="Search Events, Categories, Location..."
                className="search-bar-centered"
              />
              <select className="location-dropdown-centered">
                <option value="seattle">Seattle</option>
                <option value="bellevue">Bellevue</option>
              </select>
            </div>
          </section>

          {/* Category Section */}
          <section className="category-section">
            <h2 className="category-title">Category</h2>
            <div className="category-circles">
              <div className="category-item">
                <div className="circle" style={{ backgroundColor: "#FF5733" }}></div>
                <p>Entertainment</p>
              </div>
              <div className="category-item">
                <div className="circle" style={{ backgroundColor: "#FFC300" }}></div>
                <p>Food Pop-Ups</p>
              </div>
              <div className="category-item">
                <div className="circle" style={{ backgroundColor: "#28B463" }}></div>
                <p>Cultural Arts</p>
              </div>
              <div className="category-item">
                <div className="circle" style={{ backgroundColor: "#2874A6" }}></div>
                <p>Sports and Fitness</p>
              </div>
              <div className="category-item">
                <div className="circle" style={{ backgroundColor: "#8E44AD" }}></div>
                <p>Technology and Innovation</p>
              </div>
            </div>
          </section>

          {/* Events Section */}
          <section className="events-section">
            <h2 className="category-title">Upcoming Events</h2>
            {loading ? (
              <p>Loading events...</p>
            ) : error ? (
              <p>{error}</p>
            ) : events.length === 0 ? (
              <p>No events found.</p>
            ) : (
              <div className="events-list">
                {events.map((event) => (
                  <div key={event.id} className="event-card">
                    <img
                      src={event.logo?.url || 'default-logo.png'}
                      alt={event.name?.text || 'No title'}
                      className="event-image"
                    />
                    <h3>{event.name?.text || 'No event name'}</h3>
                    <p>{new Date(event.start?.local).toLocaleString() || 'Date unavailable'}</p>
                    <p>{event.location?.address?.localized_address_display || 'Location unavailable'}</p>
                    <a href={event.url} target="_blank" rel="noopener noreferrer">
                      View Event
                    </a>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      ) : (
        <LoginSignUp setIsLoggedIn={setIsLoggedIn} /> // Render LoginSignup when not logged in
      )}
    </div>
  );
}

export default App;
