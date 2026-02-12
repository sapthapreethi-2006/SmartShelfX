import axios from 'axios';

const BASE_URL = 'http://localhost:9191/invent';

// Fetch all SKUs from backend
export const getAllSKUs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/sku`);
    console.log('Fetched all SKUs:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching SKUs:', error);
    return [];
  }
};

// Alias for backward compatibility
export const fetchSkus = getAllSKUs;

// Save SKU to backend
export const saveSku = async (sku) => {
  try {
    const response = await axios.post(`${BASE_URL}/sku/add`, sku);
    console.log('SKU saved:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving SKU:', error);
    throw error;
  }
};

// Fetch single SKU by ID
export const getSKUById = async (skuId) => {
  try {
    const response = await axios.get(`${BASE_URL}/sku/${skuId}`);
    console.log('Fetched SKU:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching SKU by ID:', error);
    throw error;
  }
};

// Update SKU
export const updateSKU = async (sku) => {
  try {
    const response = await axios.put(`${BASE_URL}/sku`, sku);
    console.log('SKU updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating SKU:', error);
    throw error;
  }
};

// Delete SKU by ID
export const deleteSKUById = async (skuId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/sku/${skuId}`);
    console.log('SKU deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting SKU:', error);
    throw error;
  }
};
