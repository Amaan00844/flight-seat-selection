import React from 'react';
// seat data used for category lookups if needed
import './PricingSummary.css';

/**
 * Displays the pricing breakdown for all passengers.
 */
export default function PricingSummary({ pricing, passengers }) {
  const allSeatsAssigned = passengers.every((p) => p.seatId);
  const anySeatsAssigned = passengers.some((p) => p.seatId);

  return (
    <div className="pricing-summary">
      <h3 className="pricing-summary__title">💰 Price Summary</h3>

      {!anySeatsAssigned ? (
        <div className="pricing-summary__empty">
          <span className="pricing-summary__empty-icon">💺</span>
          <p>Select seats to see pricing</p>
        </div>
      ) : (
        <>
          <div className="pricing-summary__table">
            <div className="pricing-summary__header">
              <span>Passenger</span>
              <span>Seat</span>
              <span>Meal</span>
              <span>Amount</span>
            </div>
            {pricing.breakdown.map((item, i) => (
              <div key={i} className="pricing-summary__row">
                <span className="pricing-summary__passenger">{item.passenger}</span>
                <span className="pricing-summary__seat">
                  {item.seatId ? (
                    <>
                      <span className="pricing-summary__seat-id">{item.seatId}</span>
                      {item.seatPrice > 0 ? ` ₹${item.seatPrice}` : ' Free'}
                    </>
                  ) : (
                    <span className="pricing-summary__not-selected">—</span>
                  )}
                </span>
                <span className="pricing-summary__meal">
                  {item.mealPrice > 0 ? `₹${item.mealPrice}` : item.mealName === 'No Meal' ? '—' : 'Free'}
                </span>
                <span className="pricing-summary__amount">₹{item.total}</span>
              </div>
            ))}
          </div>

          <div className="pricing-summary__totals">
            {pricing.seatTotal > 0 && (
              <div className="pricing-summary__line">
                <span>Seats</span>
                <span>₹{pricing.seatTotal}</span>
              </div>
            )}
            {pricing.mealTotal > 0 && (
              <div className="pricing-summary__line">
                <span>Meals</span>
                <span>₹{pricing.mealTotal}</span>
              </div>
            )}
            <div className="pricing-summary__grand-total">
              <span>Total</span>
              <span>₹{pricing.grandTotal}</span>
            </div>
          </div>

          {!allSeatsAssigned && (
            <div className="pricing-summary__warning">
              ⚠️ Not all passengers have seats assigned
            </div>
          )}

          {allSeatsAssigned && (
            <button className="pricing-summary__confirm-btn" onClick={() => alert('Booking confirmed! 🎉\n\nTotal: ₹' + pricing.grandTotal)}>
              Confirm Booking — ₹{pricing.grandTotal}
            </button>
          )}
        </>
      )}
    </div>
  );
}
