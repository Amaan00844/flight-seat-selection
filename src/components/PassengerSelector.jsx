import React from 'react';
import './PassengerSelector.css';

/**
 * Allows users to select the number of passengers (1–9).
 */
export default function PassengerSelector({ count, onChange }) {
  return (
    <div className="passenger-selector">
      <label className="passenger-selector__label" htmlFor="passenger-count">
        Number of Passengers
      </label>
      <div className="passenger-selector__controls">
        <button
          className="passenger-selector__btn"
          onClick={() => onChange(Math.max(1, count - 1))}
          disabled={count <= 1}
          aria-label="Decrease passengers"
        >
          −
        </button>
        <span className="passenger-selector__count" id="passenger-count">
          {count}
        </span>
        <button
          className="passenger-selector__btn"
          onClick={() => onChange(Math.min(9, count + 1))}
          disabled={count >= 9}
          aria-label="Increase passengers"
        >
          +
        </button>
      </div>
    </div>
  );
}
