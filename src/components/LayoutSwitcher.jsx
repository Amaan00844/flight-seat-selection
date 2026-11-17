import React from 'react';
import './LayoutSwitcher.css';

/**
 * Toggle between the two aircraft seating configurations.
 */
export default function LayoutSwitcher({ layoutType, onSwitch }) {
  return (
    <div className="layout-switcher">
      <span className="layout-switcher__label">Aircraft Layout</span>
      <div className="layout-switcher__buttons">
        <button
          className={`layout-switcher__btn ${layoutType === 'layout1' ? 'layout-switcher__btn--active' : ''}`}
          onClick={() => onSwitch('layout1')}
        >
          <span className="layout-switcher__icon">3–2</span>
          <span className="layout-switcher__desc">Narrow Body</span>
        </button>
        <button
          className={`layout-switcher__btn ${layoutType === 'layout2' ? 'layout-switcher__btn--active' : ''}`}
          onClick={() => onSwitch('layout2')}
        >
          <span className="layout-switcher__icon">2–3–2</span>
          <span className="layout-switcher__desc">Wide Body</span>
        </button>
      </div>
    </div>
  );
}
