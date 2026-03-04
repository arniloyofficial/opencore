import React from 'react';
import PropTypes from 'prop-types';
import './ResultsScreen.css';

const ResultsScreen = ({ results }) => {
    const getSeverityClass = (score) => {
        if (score >= 80) return 'severity-high';
        if (score >= 50) return 'severity-medium';
        return 'severity-low';
    };

    return (
        <div className="results-screen">
            <h1>Assessment Results</h1>
            {results.map((result, index) => (
                <div key={index} className={getSeverityClass(result.score)}>
                    <p>{result.name}: {result.score}</p>
                </div>
            ))}
        </div>
    );
};

ResultsScreen.propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
    })).isRequired,
};

export default ResultsScreen;
