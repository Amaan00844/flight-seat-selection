import { useState, useCallback, useMemo } from 'react';
import { generateLayout1, generateLayout2, MEAL_OPTIONS } from '../data/seatData';

/**
 * Custom hook to manage all booking state:
 * - Passenger count & list
 * - Active passenger selection
 * - Seat assignments (passenger → seat)
 * - Layout switching
 * - Meal selections
 */
export function useBooking() {
  const [passengerCount, setPassengerCount] = useState(1);
  const [activePassengerIndex, setActivePassengerIndex] = useState(0);
  const [layoutType, setLayoutType] = useState('layout1'); // 'layout1' or 'layout2'
  const [seatAssignments, setSeatAssignments] = useState({}); // { passengerIndex: seatId }
  const [mealSelections, setMealSelections] = useState({}); // { passengerIndex: mealId }

  // Generate layout data
  const layout = useMemo(() => {
    return layoutType === 'layout1' ? generateLayout1() : generateLayout2();
  }, [layoutType]);

  // Build a flat map of seatId → seat object for quick lookup
  const seatMap = useMemo(() => {
    const map = {};
    layout.rows.forEach((row) => {
      row.forEach((seat) => {
        map[seat.id] = seat;
      });
    });
    return map;
  }, [layout]);

  // Reverse map: seatId → passengerIndex (for checking which passenger has a seat)
  const seatToPassenger = useMemo(() => {
    const map = {};
    Object.entries(seatAssignments).forEach(([pIdx, seatId]) => {
      map[seatId] = parseInt(pIdx, 10);
    });
    return map;
  }, [seatAssignments]);

  // Passengers array
  const passengers = useMemo(() => {
    return Array.from({ length: passengerCount }, (_, i) => ({
      index: i,
      name: `Passenger ${i + 1}`,
      seatId: seatAssignments[i] || null,
      seatInfo: seatAssignments[i] ? seatMap[seatAssignments[i]] : null,
      mealId: mealSelections[i] || 'none',
    }));
  }, [passengerCount, seatAssignments, seatMap, mealSelections]);

  // Update passenger count — trim assignments if reducing
  const updatePassengerCount = useCallback((count) => {
    setPassengerCount(count);
    setActivePassengerIndex((prev) => Math.min(prev, count - 1));
    setSeatAssignments((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (parseInt(key, 10) >= count) {
          delete updated[key];
        }
      });
      return updated;
    });
    setMealSelections((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (parseInt(key, 10) >= count) {
          delete updated[key];
        }
      });
      return updated;
    });
  }, []);

  // Assign a seat to the active passenger
  const assignSeat = useCallback(
    (seatId) => {
      const seat = seatMap[seatId];
      if (!seat || seat.isOccupied) return;

      // Check if this seat is already assigned to another passenger
      if (seatToPassenger[seatId] !== undefined && seatToPassenger[seatId] !== activePassengerIndex) {
        return; // Seat taken by another passenger in our group
      }

      setSeatAssignments((prev) => {
        const updated = { ...prev };

        // If clicking the same seat that's already assigned, deselect it
        if (updated[activePassengerIndex] === seatId) {
          delete updated[activePassengerIndex];
          return updated;
        }

        // Assign the new seat
        updated[activePassengerIndex] = seatId;
        return updated;
      });
    },
    [seatMap, seatToPassenger, activePassengerIndex]
  );

  // Remove seat assignment for a specific passenger
  const removeSeat = useCallback((passengerIndex) => {
    setSeatAssignments((prev) => {
      const updated = { ...prev };
      delete updated[passengerIndex];
      return updated;
    });
  }, []);

  // Select meal for a passenger
  const selectMeal = useCallback((passengerIndex, mealId) => {
    setMealSelections((prev) => ({
      ...prev,
      [passengerIndex]: mealId,
    }));
  }, []);

  // Switch layout — clears all seat assignments since seats are different
  const switchLayout = useCallback(
    (newLayout) => {
      if (newLayout !== layoutType) {
        setLayoutType(newLayout);
        setSeatAssignments({});
      }
    },
    [layoutType]
  );

  // Pricing calculations
  const pricing = useMemo(() => {
    let seatTotal = 0;
    let mealTotal = 0;
    const breakdown = [];

    passengers.forEach((p) => {
      const seatPrice = p.seatInfo ? p.seatInfo.price : 0;
      const meal = MEAL_OPTIONS.find((m) => m.id === p.mealId);
      const mealPrice = meal ? meal.price : 0;

      seatTotal += seatPrice;
      mealTotal += mealPrice;

      breakdown.push({
        passenger: p.name,
        seatId: p.seatId,
        seatCategory: p.seatInfo ? p.seatInfo.category : null,
        seatPrice,
        mealName: meal ? meal.name : 'No Meal',
        mealPrice,
        total: seatPrice + mealPrice,
      });
    });

    return {
      seatTotal,
      mealTotal,
      grandTotal: seatTotal + mealTotal,
      breakdown,
    };
  }, [passengers]);

  return {
    // State
    passengerCount,
    activePassengerIndex,
    layoutType,
    layout,
    passengers,
    seatAssignments,
    seatToPassenger,
    seatMap,
    mealSelections,
    pricing,

    // Actions
    updatePassengerCount,
    setActivePassengerIndex,
    assignSeat,
    removeSeat,
    switchLayout,
    selectMeal,
  };
}
