import React from 'react';
import { MEAL_OPTIONS } from '../data/seatData';
import './MealSelector.css';

/**
 * Meal selection component for each passenger.
 */
export default function MealSelector({ passengers, activeIndex, onSelectMeal }) {
  const activePassenger = passengers[activeIndex];

  return (
    <div className="meal-selector">
      <h3 className="meal-selector__title">
        🍽️ Meal Selection
        <span className="meal-selector__subtitle">for {activePassenger.name}</span>
      </h3>
      <div className="meal-selector__grid">
        {MEAL_OPTIONS.map((meal) => {
          const isSelected = activePassenger.mealId === meal.id;
          return (
            <button
              key={meal.id}
              className={`meal-card ${isSelected ? 'meal-card--selected' : ''}`}
              onClick={() => onSelectMeal(activeIndex, meal.id)}
            >
              <span className="meal-card__emoji">{meal.emoji}</span>
              <span className="meal-card__name">{meal.name}</span>
              <span className="meal-card__desc">{meal.description}</span>
              <span className="meal-card__price">
                {meal.price === 0 ? 'Free' : `₹${meal.price}`}
              </span>
              {isSelected && <span className="meal-card__check">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
