import React from 'react';
import { Link } from 'react-router-dom';

const ReceptionDashboard = () => {
    // Inline styles
    const containerStyle = {
        backgroundColor: "#f0f4f7",  // Light background color
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "900px",
        margin: "20px auto",
        fontFamily: "'Poppins', sans-serif",  // Unique font style
        textAlign: "center",
        animation: "fadeIn 1s ease-in-out",
    };

    const headingStyle = {
        fontSize: "3rem",  // Larger font size for the heading
        color: "#2c3e50",  // Dark color for the heading
        textTransform: "uppercase",  // Uppercase text for heading
        letterSpacing: "2px",  // Add spacing between letters
        marginBottom: "20px",
    };

    const paragraphStyle = {
        fontSize: "1.2rem",  // Slightly larger text for paragraph
        color: "#34495e",  // Darker text for the paragraph
        marginBottom: "30px",
        fontWeight: "300",  // Light font weight for the paragraph
    };

    const linkStyle = {
        fontSize: "1.5rem",
        color: "Black",  // Blue color for the link
        textDecoration: "none",
        fontWeight: "500",  // Medium font weight for the link
        textTransform: "uppercase",  // Uppercase for the link
        letterSpacing: "1.5px",  // Spacing between letters
        transition: "color 0.3s ease",  // Smooth transition for hover effect
    };

    const linkHoverStyle = {
        color: "white",  // Change color on hover to teal
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Reception Dashboard</h1>
            <p style={paragraphStyle}>Welcome to the reception dashboard!</p>
            <nav>
                <Link
                    to="/bill-management"
                    style={linkStyle}
                    onMouseEnter={(e) => Object.assign(e.target.style, linkHoverStyle)}
                    onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
                >
                    Bill Management
                </Link>
            </nav>
        </div>
    );
};

export default ReceptionDashboard;
