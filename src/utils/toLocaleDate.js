export const toLocaleDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};