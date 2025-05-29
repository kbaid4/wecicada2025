import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SupplierHomepage = () => {
  // Determine display name for the supplier
  const supplierName = localStorage.getItem('supplierName');
  const supplierEmail = localStorage.getItem('supplierEmail');
  const displayName = supplierName || supplierEmail || 'Supplier';
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Home');
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');

  // Navigation data
  const mainNavItems = [
    { name: 'Home', path: '/SupplierHomepage' },
    { name: 'My Events', path: '/SupplierEvents' },
    { name: 'Messages', path: '/SupplierMessagesPage' }
  ];
  const rightNavItems = [
    { name: 'My Work', path: '/SupplierWork' },
    { name: 'My Team', path: '/SupplierTeam' }
  ];
  
  const categories = [
    { name: 'Venues & Facilities', path: '/SuppliersPage' },
    { name: 'Service Providers', path: '/ServiceProvider' },
    { name: 'Marketing', path: '/Marketing' },
    { name: 'Legal', path: '/Legal' }
  ];
  
  // Venue data with corrected image paths
  const venueTypes = [
    { name: 'Corporate Events', image: '1.png', path: '/SupplierSide' },
    { name: 'Social Events', image: '2.png' , path: '/SupplierSide'},
    { name: 'Professional Networking Events', image: '3.png' , path: '/SupplierSide'},
    { name: 'Educational Events', image: '4.png' , path: '/SupplierSide'},
    { name: 'Trade Shows and Expos', image: '5.png' , path: '/SupplierSide'},
    { name: 'Charity and Fundraising Events', image: '6.png' , path: '/SupplierSide'},
    { name: 'Cultural and Community Events', image: '7.png' , path: '/SupplierSide'},
    { name: 'Sport Events', image: '20.png' , path: '/SupplierSide'},
    { name: 'Art and Entertainment Events', image: '21.png' , path: '/SupplierSide'},
    { name: 'Health and Wellness Events', image: '10.png' , path: '/SupplierSide'},
    { name: 'Technology and Innovation Events', image: '17.png' , path: '/SupplierSide'},
    { name: 'Government Events', image: '12.png' , path: '/SupplierSide'}
  ];

  const handleCreateEventClick = () => {
    navigate('/CreateEventPage'); // Navigate to the Create Event page
  };

  // Fetch events from localStorage
  const events = JSON.parse(localStorage.getItem('events')) || [];
  const visibleEvents = events.filter(event => {
    if (event.visibility === 'public' || !event.visibility) return true;
    if (event.visibility === 'private' && event.invitedSuppliers && supplierEmail) {
      return event.invitedSuppliers.includes(supplierEmail);
    }
    return false;
  });

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <nav className="top-nav">
        <div className="nav-section left">
          <img 
            src={`${process.env.PUBLIC_URL}/images/landingpage/logo.png`} 
            alt="CITADA Logo" 
            className="nav-logo"
          />
          {mainNavItems.map(item => (
            <button
              key={item.name}
              className={`nav-btn ${activeNav === item.name ? 'active' : ''}`}
              onClick={() => {
                setActiveNav(item.name);
                navigate(item.path);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="nav-section right">
          {rightNavItems.map(item => (
            <button
              key={item.name}
              className={`nav-btn ${activeNav === item.name ? 'active' : ''}`}
              onClick={() => {
                setActiveNav(item.name);
                navigate(item.path);
              }}
            >
              {item.name}
            </button>
          ))}
          <div className="user-profile">{(supplierName ? supplierName.charAt(0) : (supplierEmail ? supplierEmail.charAt(0) : 'S')).toUpperCase()}</div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="content-area">
        <header className="content-header">
          <div className="header-left">
            <div className="welcome-section">
              <h1 className="welcome-text">Welcome,</h1>
              <div className="username">{supplierName || supplierEmail || 'Supplier'}</div>
            </div>
            <div className="action-btns">
              <button className="primary-btn" onClick={() => navigate('/EditProfile')}>Edit Profile</button>
            </div>
          </div>
        </header>
        {/* Events Section */}
        <div className="event-cards-section">
          <h2 style={{ color: '#441752', fontWeight: 700, fontSize: '26px', marginBottom: '16px' }}>Public Events</h2>
          {visibleEvents.length === 0 ? (
            <p style={{ color: '#A888B5', fontSize: '18px' }}>No events available for you at this time.</p>
          ) : (
            <ul className="event-cards-list">
              {visibleEvents.map(event => (
                <li key={event.id} className="event-card-custom">
                  <strong style={{ color: '#A888B5', fontSize: '20px' }}>{event.name}</strong>
                  <div style={{ color: '#A888B5', fontSize: '15px', marginTop: '4px' }}>
                    {event.type} {event.subType ? `- ${event.subType}` : ''} | {event.location} | {event.visibility === 'private' ? 'Private' : 'Public'}
                  </div>
                  <div style={{ color: '#A888B5', fontSize: '14px', marginTop: '4px' }}>
                    {event.startDate} to {event.endDate}
                  </div>
                  <button
                    className="apply-btn"
                    style={{ background: '#A888B5', color: '#441752', border: 'none', borderRadius: '8px', padding: '10px 28px', fontWeight: 600, fontSize: '16px', cursor: 'pointer' }}
                    onClick={() => alert('Applied!')}
                  >
                    Apply
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <style jsx>{`
        :root {
          --primary-blue: #441752;
          --hover-blue: #441752;
          --light-bg: #A888B5;
          --text-dark: #1A1F36;
          --text-light: #441752;
          --border-color: #441752;
          --event-card-width: 420px;
        }

        .event-cards-section {
          margin-top: 48px;
          text-align: left;
          width: 100%;
          max-width: 1200px;
          margin-left: 5px;
          margin-right: auto;
          box-sizing: border-box;
        }
        .event-cards-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        @media (max-width: 1100px) {
          .event-cards-list {
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          }
        }
        @media (max-width: 800px) {
          .event-cards-list {
            grid-template-columns: 1fr;
          }
        }
        .event-card-custom {
          background: #441752;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(68,23,82,0.06);
          padding: 50px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
          height: 100%;
        }
        .event-card-custom .apply-btn {
          width: 100%;
          margin-top: 24px;
        }

        .app-container {
          min-height: 100vh;
          background-color: var(--light-bg);
          font-family: 'Inter', sans-serif;
        }

        /* Top Navigation Styles */
        .top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 32px;
          height: 64px;
          background: #441752;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-section {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-logo {
          height: 28px;
          margin-right: 16px;
        }

        .nav-btn {
          padding: 8px 16px;
          border: none;
          background: none;
          color: #A888B5;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .nav-btn:hover {
          background: #A888B5;
          color: #441752;
        }

        .nav-btn.active {
          color: #A888B5;
          background: #441752;
        }

        .user-profile {
          width: 32px;
          height: 32px;
          background: #A888B5;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
        }

        /* Main Content Styles */
 /* Main Content Styles */
        .content-area {
          padding: 32px 40px;
          margin-top: 64px;
        }

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .header-left {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .welcome-section {
          margin-bottom: 16px;
        }

        .welcome-text {
          font-size: 32px;
          color: #441752;
          margin: 0;
        }

        .username {
          font-size: 24px;
          color: #441752;
          font-weight: 500;
          margin-top: 4px;
        }

        .action-btns {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .primary-btn {
          padding: 10px 24px;
          background: var(--primary-blue);
          color: #A888B5;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .primary-btn:hover {
          background: var(--hover-blue);
          transform: translateY(-1px);
        }

        /* Category Tabs */
        .category-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          border-bottom: 2px solid var(--border-color);
        }

        .tab-btn {
          padding: 12px 24px;
          border: none;
          background: none;
          color: var(--text-light);
          font-size: 14px;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .tab-btn.active {
          color: var(--primary-blue);
          font-weight: 600;
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--primary-blue);
        }

        /* Venue Grid with Images */
        .venue-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .venue-card {
          background: #A888B5;
          border-radius: 8px;
          border: 2px solid var(--border-color);
          box-shadow: 0 2px 4px rgba(0,0,0,0.04);
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
        }

        .card-image {
          height: 180px;
          overflow: hidden;
          position: relative;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .card-label {
          padding: 16px;
          font-weight: 500;
          text-align: center;
          color: #441752;
          background: #A888B5;
        }

        .venue-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.08);
          border-color: var(--primary-blue);
        }

        .venue-card:hover .card-image img {
          transform: scale(1.05);
        }

        .venue-card.selected {
          border: 2px solid var(--primary-blue);
          box-shadow: 0 4px 12px rgba(44, 125, 250, 0.15);
        }

        .venue-card.selected .card-label {
          background: rgba(44, 125, 250, 0.04);
        }


        .section-title {
            font-size: 24px;
            color: #441752;
            margin-left: 0px;
          }
      `}</style>
    </div>
  );
};

export default SupplierHomepage;
