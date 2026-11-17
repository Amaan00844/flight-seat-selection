import React from 'react';
import { SEAT_CATEGORIES } from '../data/seatData';
import './SeatMap.css';

/**
 * Individual seat button component.
 */
function Seat({ seat, status, passengerNumber, onClick }) {
  const category = SEAT_CATEGORIES[seat.category];

  const getStatusClass = () => {
    if (seat.isOccupied) return 'seat--occupied';
    if (status === 'assigned') return 'seat--assigned';
    if (status === 'other-passenger') return 'seat--other';
    return 'seat--available';
  };

  const isClickable = !seat.isOccupied;

  return (
    <button
      className={`seat ${getStatusClass()}`}
      onClick={() => isClickable && onClick(seat.id)}
      disabled={seat.isOccupied}
      title={
        seat.isOccupied
          ? `Seat ${seat.id} — Occupied`
          : `Seat ${seat.id} — ${category.label} — ${seat.price === 0 ? 'Free' : '₹' + seat.price}`
      }
      aria-label={`Seat ${seat.id}, ${category.label}, ${seat.price === 0 ? 'Free' : '₹' + seat.price}${seat.isOccupied ? ', Occupied' : ''}`}
      style={{
        '--seat-category-color': !seat.isOccupied ? category.color : undefined,
      }}
    >
      <span className="seat__label">{seat.label}</span>
      {passengerNumber && (
        <span className="seat__passenger-badge">P{passengerNumber}</span>
      )}
      {!seat.isOccupied && status !== 'assigned' && status !== 'other-passenger' && (
        <span className="seat__price">
          {seat.price === 0 ? '—' : '₹' + seat.price}
        </span>
      )}
    </button>
  );
}

/**
 * Aircraft seat map component.
 * Renders the full aircraft layout with seats grouped by aisles.
 */
export default function SeatMap({ layout, seatToPassenger, activePassengerIndex, onSeatClick }) {
  const { rows, groups } = layout;

  const getSeatStatus = (seatId) => {
    const assignedPassenger = seatToPassenger[seatId];
    if (assignedPassenger === undefined) return 'available';
    if (assignedPassenger === activePassengerIndex) return 'assigned';
    return 'other-passenger';
  };

  const getPassengerNumber = (seatId) => {
    const assignedPassenger = seatToPassenger[seatId];
    if (assignedPassenger !== undefined) return assignedPassenger + 1;
    return null;
  };

  return (
    <div className="seat-map">
      {/* Aircraft fuselage frame */}
      <div className="seat-map__aircraft">
        {/* Cockpit nose */}
        <div className="seat-map__nose">
          <div className="seat-map__nose-inner">✈</div>
        </div>

        {/* Column headers */}
        <div className="seat-map__header">
          <div className="seat-map__row-number" />
          {groups.map((group, gi) => (
            <React.Fragment key={gi}>
              {gi > 0 && <div className="seat-map__aisle-header" />}
              <div className="seat-map__group-header">
                {group.map((label) => (
                  <div key={label} className="seat-map__col-label">
                    {label}
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Seat rows */}
        <div className="seat-map__body">
          {rows.map((rowSeats, rowIdx) => {
            const rowNum = rowIdx + 1;
            // Group seats by their group
            const seatsByLabel = {};
            rowSeats.forEach((s) => { seatsByLabel[s.label] = s; });

            return (
              <div key={rowNum} className="seat-map__row">
                <div className="seat-map__row-number">{rowNum}</div>
                {groups.map((group, gi) => (
                  <React.Fragment key={gi}>
                    {gi > 0 && <div className="seat-map__aisle" />}
                    <div className="seat-map__group">
                      {group.map((label) => {
                        const seat = seatsByLabel[label];
                        if (!seat) return <div key={label} className="seat seat--empty" />;
                        return (
                          <Seat
                            key={seat.id}
                            seat={seat}
                            status={getSeatStatus(seat.id)}
                            passengerNumber={getPassengerNumber(seat.id)}
                            onClick={onSeatClick}
                          />
                        );
                      })}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            );
          })}
        </div>

        {/* Tail */}
        <div className="seat-map__tail" />
      </div>
    </div>
  );
}
