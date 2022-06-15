export const isoDateToDate = (isoDate?: string) => {
  try {
    const date = new Date(isoDate as string);
    return date.toLocaleDateString();
  } catch (error) {
    return "---";
  }
};
