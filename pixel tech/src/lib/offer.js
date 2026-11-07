export const SETUP_FEE = 497;

// The founding-offer line on the price card. null once every seat is taken: the offer is closed,
// so the card must stop calling the setup fee waived (design review D8).
export function foundingOffer(seatsLeft, totalSeats) {
  const n = Math.min(totalSeats, Math.max(0, Math.floor(Number(seatsLeft) || 0)));
  if (n === 0) return null;
  return n < totalSeats
    ? `Founding partner pricing, ${n} of ${totalSeats} seats left`
    : `Founding partner pricing for the first ${totalSeats} clinics`;
}
