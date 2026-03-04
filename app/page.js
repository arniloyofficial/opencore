import React from 'react';

const HomePage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Welcome to the Assessment</h1>
            <button style={{ padding: '10px 20px', fontSize: '16px' }}>Start Assessment</button>
        </div>
    );
};

export default HomePage;
