import React from 'react';
import './Home.css'; 

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to the Home Page</h1>
            <div className="advertisements">
                <div className="ad">Ad 1</div>
                <div className="ad">Ad 2</div>
                <div className="ad">Ad 3</div>
            </div>
        </div>
    );
};

export default Home;

