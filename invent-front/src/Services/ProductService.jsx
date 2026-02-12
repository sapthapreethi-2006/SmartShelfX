import axios from 'axios';

const BASE_URL = 'http://localhost:9191/invent';

export const getNextProductCode = async () => {
  // Backend is mounted under /invent per controller @RequestMapping
  const response = await axios.get(`${BASE_URL}/product/next-code`);
  return response.data; // expected to be a plain string like "P1007"
};

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product`);
    console.log('Fetched products:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Save new product
export const saveNewProduct = (product) => {
  return axios.post(`${BASE_URL}/product/add`, product);
};

export const getSkuDropdown = async () => {
  const response = await axios.get(`${BASE_URL}/sku/dropdown`);
  return response.data;
};

export const getVendorDropdown = async () => {
  const response = await axios.get(`${BASE_URL}/vendors/dropdown`);
  return response.data;
};

export const getProductAnalysis = async () => {
  const response = await axios.get(`${BASE_URL}/product/analysis`);
  return response;
};

// Delete by product code. Try a few common REST patterns to accommodate backend.
export const deleteProduct = async (productId) => {
  const candidates = [
    `${BASE_URL}/product/${productId}`,
    `${BASE_URL}/product/delete/${productId}`,
    `${BASE_URL}/product/id/${productId}`,
  ];

  let lastError;
  for (const url of candidates) {
    try {
      console.log('Attempting delete via:', url);
      const res = await axios.delete(url);
      return res;
    } catch (err) {
      lastError = err;
      console.warn('Delete failed at', url, err?.response?.status);
    }
  }
  throw lastError || new Error('Delete endpoint not reachable');
};

export const updatePurchasePrice = (productCode, price) => {
  return axios.put(`${BASE_URL}/product/update-price/${productCode}?price=${price}`);
};

export const getProductByCode = async (productCode) => {
  const response = await axios.get(`${BASE_URL}/product/code/${productCode}`);
  return response.data;
};

// Get product by ID
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/${productId}`);
    console.log('Fetched product:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

// Update product
export const updateProduct = async (product) => {
  try {
    const response = await axios.put(`${BASE_URL}/product`, product);
    console.log('Product updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete product
export const deleteProductById = async (productId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/product/${productId}`);
    console.log('Product deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Fetch vendors
export const fetchVendors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/vendors`);
    console.log('Fetched vendors:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return [];
  }
};


export const editProductStock=(product,qty,flag)=> {
    return axios.put(`${BASE_URL}/product/edit-stock/${qty}/${flag}`,product, {
        withCredentials: true
    });
    }
 
