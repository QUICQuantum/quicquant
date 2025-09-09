// utils/apiUtils.js
export const fetchLastUpdated = async () => {
    try {
      const response = await fetch("/api/lastUpdated");
      const data = await response.json();
      return data; // Return the raw data
    } catch (error) {
      console.error("Error fetching last updated timestamp:", error);
      throw error; // Re-throw the error for the component to handle if needed
    }
  };
  