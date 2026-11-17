import React from 'react';
import { SEAT_CATEGORIES } from '../data/seatData';
import './PassengerList.css';

/**
 * Displays the list of passengers with their seat assignments.
 * Allows switching the active passenger.
 */
export default function PassengerList({
  passengers,
  activeIndex,
  onSelect,
  onRemoveSeat,
}) {
  return (
    <div className="passenger-list">
      <h3 className="passenger-list__title">Passengers</h3>
      <div className="passenger-list__items">
        {passengers.map((p) => {
          const isActive = p.index === activeIndex;
          const hasSeat = !!p.seatId;
          return (
            <button
              key={p.index}
              className={`passenger-card ${isActive ? 'passenger-card--active' : ''} ${hasSeat ? 'passenger-card--assigned' : ''}`}
              onClick={() => onSelect(p.index)}
              aria-pressed={isActive}
            >
              <div className="passenger-card__avatar">
                {p.index + 1}
              </div>
              <div className="passenger-card__info">
                <span className="passenger-card__name">{p.name}</span>
                {hasSeat ? (
                  <span className="passenger-card__seat">
                    <span className="passenger-card__seat-badge" style={{
                      background: SEAT_CATEGORIES[p.seatInfo?.category]?.color || '#e8f5e9'
                    }}>
                      Seat {p.seatId}
                    </span>
                    {p.seatInfo && p.seatInfo.price > 0 && (
                      <span className="passenger-card__seat-price">₹{p.seatInfo.price}</span>
                    )}
                    {p.seatInfo && p.seatInfo.price === 0 && (
                      <span className="passenger-card__seat-free">Free</span>
                    )}
                  </span>
                ) : (
                  <span className="passenger-card__no-seat">No seat selected</span>
                )}
              </div>
              {hasSeat && (
                <button
                  className="passenger-card__remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveSeat(p.index);
                  }}
                  aria-label={`Remove seat for ${p.name}`}
                  title="Remove seat"
                >
                  ✕
                </button>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
