import React from 'react';

const ShareButton = ({ url }) => {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Assessment Results',
                url: url,
            }).then(() => {
                console.log('Share successful');
            }).catch((error) => {
                console.error('Error sharing:', error);
            });
        } else {
            // Fallback for browsers that do not support the Web Share API
            alert('Sharing is not supported on this browser.');
        }
    };

    return (
        <button onClick={handleShare} style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        }}>
            Share on Social Media
        </button>
    );
};

export default ShareButton;