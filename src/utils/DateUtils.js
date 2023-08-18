export const formatDate = isoString => {
  const dateObj = new Date(isoString);
  const formattedDate = dateObj.toLocaleDateString();
  const formattedTime = dateObj.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${formattedDate}-${formattedTime}`;
};
