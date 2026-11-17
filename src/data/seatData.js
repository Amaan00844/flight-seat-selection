/**
 * Seat categories and their associated pricing
 */
export const SEAT_CATEGORIES = {
  STANDARD: { label: 'Standard', price: 0, color: '#e8f5e9' },
  EXTRA_LEGROOM: { label: 'Extra Legroom', price: 350, color: '#fff3e0' },
  PREMIUM: { label: 'Premium', price: 250, color: '#e3f2fd' },
};

/**
 * Generate seats for a given row in a layout configuration.
 * @param {number} row - Row number (1-based)
 * @param {string[]} seatLabels - Array of seat column labels (e.g., ['A','B','C'])
 * @param {Object} categoryOverrides - Optional map of seatLabel -> category
 * @param {Set} occupiedSet - Set of seat IDs that are already occupied
 * @returns {Object[]} Array of seat objects
 */
function generateRowSeats(row, seatLabels, categoryOverrides = {}, occupiedSet = new Set()) {
  return seatLabels.map((label) => {
    const id = `${row}${label}`;
    const category = categoryOverrides[label] || 'STANDARD';
    return {
      id,
      row,
      label,
      category,
      price: SEAT_CATEGORIES[category].price,
      isOccupied: occupiedSet.has(id),
    };
  });
}

/**
 * Layout 1: 3-2 Configuration
 * Seats: A B C | aisle | D E
 */
export function generateLayout1(totalRows = 20) {
  const seatLabels = ['A', 'B', 'C', 'D', 'E'];
  const aisleAfter = ['C']; // aisle after column C
  const groups = [['A', 'B', 'C'], ['D', 'E']];

  // Define category overrides per row for variety
  const categoryMap = (row) => {
    if (row <= 2) {
      // First 2 rows — premium / extra legroom mix
      return { A: 'PREMIUM', B: 'PREMIUM', C: 'EXTRA_LEGROOM', D: 'PREMIUM', E: 'EXTRA_LEGROOM' };
    }
    if (row <= 5) {
      // Rows 3-5 — extra legroom aisle & window
      return { A: 'EXTRA_LEGROOM', C: 'EXTRA_LEGROOM', D: 'EXTRA_LEGROOM' };
    }
    if (row === 13) {
      // Emergency exit row — extra legroom
      return { A: 'EXTRA_LEGROOM', B: 'EXTRA_LEGROOM', C: 'EXTRA_LEGROOM', D: 'EXTRA_LEGROOM', E: 'EXTRA_LEGROOM' };
    }
    return {};
  };

  // Some seats pre-occupied
  const occupiedSet = new Set([
    '1A', '1D', '2B', '3C', '4A', '4E', '5B', '5D',
    '6A', '7C', '7D', '8B', '9E', '10A', '10C',
    '11D', '12B', '14A', '15E', '16C', '17D', '18A',
    '19B', '20E',
  ]);

  const rows = [];
  for (let r = 1; r <= totalRows; r++) {
    rows.push(generateRowSeats(r, seatLabels, categoryMap(r), occupiedSet));
  }

  return { rows, groups, aisleAfter, seatLabels, totalRows, name: '3–2 Configuration' };
}

/**
 * Layout 2: 2-3-2 Configuration
 * Seats: A B | aisle | C D E | aisle | F G
 */
export function generateLayout2(totalRows = 20) {
  const seatLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const aisleAfter = ['B', 'E']; // aisles after columns B and E
  const groups = [['A', 'B'], ['C', 'D', 'E'], ['F', 'G']];

  const categoryMap = (row) => {
    if (row <= 2) {
      return {
        A: 'PREMIUM', B: 'PREMIUM',
        C: 'EXTRA_LEGROOM', D: 'PREMIUM', E: 'EXTRA_LEGROOM',
        F: 'PREMIUM', G: 'PREMIUM',
      };
    }
    if (row <= 4) {
      return { A: 'EXTRA_LEGROOM', D: 'EXTRA_LEGROOM', G: 'EXTRA_LEGROOM' };
    }
    if (row === 12) {
      return {
        A: 'EXTRA_LEGROOM', B: 'EXTRA_LEGROOM',
        C: 'EXTRA_LEGROOM', D: 'EXTRA_LEGROOM', E: 'EXTRA_LEGROOM',
        F: 'EXTRA_LEGROOM', G: 'EXTRA_LEGROOM',
      };
    }
    return {};
  };

  const occupiedSet = new Set([
    '1A', '1C', '1G', '2B', '2D', '2F',
    '3A', '3E', '4C', '4G', '5B', '5F',
    '6D', '7A', '7G', '8C', '8E', '9B',
    '10F', '11A', '11D', '12G', '13C',
    '14B', '14E', '15A', '15G', '16D',
    '17F', '18C', '19A', '19E', '20B', '20G',
  ]);

  const rows = [];
  for (let r = 1; r <= totalRows; r++) {
    rows.push(generateRowSeats(r, seatLabels, categoryMap(r), occupiedSet));
  }

  return { rows, groups, aisleAfter, seatLabels, totalRows, name: '2–3–2 Configuration' };
}

/**
 * Meal options with pricing
 */
export const MEAL_OPTIONS = [
  { id: 'none', name: 'No Meal', price: 0, emoji: '🚫', description: 'Skip meal selection' },
  { id: 'veg', name: 'Vegetarian Thali', price: 0, emoji: '🥗', description: 'Rice, dal, paneer, roti, salad' },
  { id: 'nonveg', name: 'Chicken Biryani', price: 200, emoji: '🍗', description: 'Hyderabadi chicken biryani with raita' },
  { id: 'sandwich', name: 'Club Sandwich', price: 150, emoji: '🥪', description: 'Grilled chicken sandwich with fries' },
  { id: 'pasta', name: 'Penne Pasta', price: 180, emoji: '🍝', description: 'Penne in creamy alfredo sauce' },
  { id: 'snack', name: 'Snack Box', price: 100, emoji: '🍿', description: 'Chips, cookies, juice, and nuts' },
];
