function getTimes() {
  const today = new Date();
  const isoString = today.toISOString();
  const hourMinutes = isoString.split("T")[1].split(":");
  return hourMinutes[0] + hourMinutes[1];
}

export { getTimes };
