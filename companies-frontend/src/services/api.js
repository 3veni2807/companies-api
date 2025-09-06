import axios from "axios";

const API_URL = "http://localhost:5000/api/companies";

export const getCompanies = async (filters = {}) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const response = await axios.get(`${API_URL}?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    return { total: 0, companies: [] };
  }
};
