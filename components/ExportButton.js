import React from 'react';
import html2canvas from 'html2canvas';

const ExportButton = ({ elementId }) => {
    const handleExport = () => {
        const element = document.getElementById(elementId);
        if (element) {
            html2canvas(element).then(canvas => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/jpeg');
                link.download = 'exported-image.jpg';
                link.click();
            });
        } else {
            console.error('Element not found');
        }
    };

    return <button onClick={handleExport}>Export as JPG</button>;
};

export default ExportButton;