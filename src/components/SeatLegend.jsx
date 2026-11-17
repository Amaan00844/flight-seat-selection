import React from 'react';
import { SEAT_CATEGORIES } from '../data/seatData';
import './SeatLegend.css';

/**
 * Legend showing seat state and category colors.
 */
export default function SeatLegend() {
  return (
    <div className="seat-legend">
      <div className="seat-legend__section">
        <span className="seat-legend__section-title">Status</span>
        <div className="seat-legend__items">
          <div className="seat-legend__item">
            <div className="seat-legend__swatch" style={{ background: '#e8f5e9', border: '1px solid #c8dcc8' }} />
            <span>Available</span>
          </div>
          <div className="seat-legend__item">
            <div className="seat-legend__swatch" style={{ background: '#3b82f6' }} />
            <span>Your Seat</span>
          </div>
          <div className="seat-legend__item">
            <div className="seat-legend__swatch" style={{ background: '#10b981' }} />
            <span>Other Passenger</span>
          </div>
          <div className="seat-legend__item">
            <div className="seat-legend__swatch" style={{ background: '#e2e8f0', opacity: 0.5 }} />
            <span>Occupied</span>
          </div>
        </div>
      </div>
      <div className="seat-legend__section">
        <span className="seat-legend__section-title">Category</span>
        <div className="seat-legend__items">
          {Object.entries(SEAT_CATEGORIES).map(([key, cat]) => (
            <div key={key} className="seat-legend__item">
              <div
                className="seat-legend__swatch"
                style={{ background: cat.color, border: '1px solid rgba(0,0,0,0.1)' }}
              />
              <span>{cat.label} {cat.price > 0 ? `(₹${cat.price})` : '(Free)'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
