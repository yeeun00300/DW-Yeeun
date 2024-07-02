function random(n) {
  return Math.ceil(Math.random() * n);
}
export function generateRandomHand() {
  const num = random(3);
  if (num === 1) {
    return "rock";
  } else if (num === 2) {
    return "scissor";
  } else {
    return "paper";
  }
}
