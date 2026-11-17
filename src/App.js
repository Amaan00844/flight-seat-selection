import React from 'react';
import { useBooking } from './hooks/useBooking';
import PassengerSelector from './components/PassengerSelector';
import PassengerList from './components/PassengerList';
import LayoutSwitcher from './components/LayoutSwitcher';
import SeatMap from './components/SeatMap';
import SeatLegend from './components/SeatLegend';
import MealSelector from './components/MealSelector';
import PricingSummary from './components/PricingSummary';
import './App.css';

function App() {
  const {
    passengerCount,
    activePassengerIndex,
    layoutType,
    layout,
    passengers,
    seatToPassenger,
    pricing,

    updatePassengerCount,
    setActivePassengerIndex,
    assignSeat,
    removeSeat,
    switchLayout,
    selectMeal,
  } = useBooking();

  return (
    <div className="app">
      {/* Header */}
      <header className="app__header">
        <div className="app__header-content">
          <div className="app__logo">✈</div>
          <div>
            <h1 className="app__title">SkyBook</h1>
            <p className="app__subtitle">Flight Seat Selection</p>
          </div>
        </div>
        <div className="app__flight-info">
          <span className="app__flight-badge">AI-204</span>
          <span className="app__flight-route">DEL → BOM</span>
        </div>
      </header>

      <main className="app__main">
        {/* Left Sidebar: Passengers & Controls */}
        <aside className="app__sidebar">
          <PassengerSelector
            count={passengerCount}
            onChange={updatePassengerCount}
          />

          <PassengerList
            passengers={passengers}
            activeIndex={activePassengerIndex}
            onSelect={setActivePassengerIndex}
            onRemoveSeat={removeSeat}
          />

          <LayoutSwitcher
            layoutType={layoutType}
            onSwitch={switchLayout}
          />

          <MealSelector
            passengers={passengers}
            activeIndex={activePassengerIndex}
            onSelectMeal={selectMeal}
          />

          <PricingSummary
            pricing={pricing}
            passengers={passengers}
          />
        </aside>

        {/* Center: Seat Map */}
        <section className="app__seat-section">
          <div className="app__seat-instructions">
            <span className="app__seat-instructions-icon">👆</span>
            <span>
              Select <strong>{passengers[activePassengerIndex]?.name}</strong>'s seat
            </span>
          </div>

          <SeatMap
            layout={layout}
            seatToPassenger={seatToPassenger}
            activePassengerIndex={activePassengerIndex}
            onSeatClick={assignSeat}
          />

          <SeatLegend />
        </section>
      </main>

      {/* Footer */}
      <footer className="app__footer">
        <p>Flight Seat Selection App • Built with React.js</p>
      </footer>
    </div>
  );
}

export default App;
