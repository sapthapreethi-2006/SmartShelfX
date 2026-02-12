import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updatePurchasePrice, getProductByCode } from '../../Services/ProductService';

const UpdatePrice = () => {
  const { productCode } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasLoadedPrice = useRef(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setFetchLoading(true);
        const data = await getProductByCode(productCode);
        setProduct(data);
        
        if (!hasLoadedPrice.current) {
          setNewPrice(String(data.purchasePrice));
          hasLoadedPrice.current = true;
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setFetchLoading(false);
      }
    };

    if (productCode) {
      fetchProduct();
    }
  }, [productCode]);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setNewPrice(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Submitting with newPrice:', newPrice);
    console.log('Parsed value:', parseFloat(newPrice));
    
    if (!newPrice || parseFloat(newPrice) <= 0) {
      setError('Please enter a valid price greater than 0');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const priceToSend = parseFloat(newPrice);
      console.log('Sending price to backend:', priceToSend);
      const response = await updatePurchasePrice(productCode, priceToSend);
      console.log('Update response:', response);
      alert('Price updated successfully!');
      navigate('/product-list');
    } catch (err) {
      console.error('Error updating price:', err);
      console.error('Error response:', err.response);
      setError('Failed to update price. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '600px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '28px', color: '#333' }}>Update Purchase Price</h1>
        
        {fetchLoading && (
          <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Loading product details...</p>
        )}

        {error && !product && (
          <div style={{ padding: '15px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>
            <p>{error}</p>
            <button
              onClick={() => navigate('/product-list')}
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Back to Product List
            </button>
          </div>
        )}
        
        {!fetchLoading && product && (
          <>
            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
              <h3 style={{ marginTop: '0', marginBottom: '15px', color: '#1b8f1b' }}>Product Details</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}><strong>Product Code:</strong></p>
                  <p style={{ margin: '5px 0', color: '#333' }}>{product.productCode}</p>
                </div>
                
                <div>
                  <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}><strong>SKU:</strong></p>
                  <p style={{ margin: '5px 0', color: '#333' }}>{product.skuId}</p>
                </div>
                
                <div>
                  <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}><strong>Product Name:</strong></p>
                  <p style={{ margin: '5px 0', color: '#333' }}>{product.productName}</p>
                </div>
                
                <div>
                  <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}><strong>Vendor ID:</strong></p>
                  <p style={{ margin: '5px 0', color: '#333' }}>{product.vendorId}</p>
                </div>
                
                <div>
                  <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}><strong>Current Purchase Price:</strong></p>
                  <p style={{ margin: '5px 0', color: '#333', fontWeight: 'bold' }}>₹ {product.purchasePrice.toFixed(2)}</p>
                </div>
                
                <div>
                  <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}><strong>Current Sales Price:</strong></p>
                  <p style={{ margin: '5px 0', color: '#333', fontWeight: 'bold' }}>₹ {product.salesPrice.toFixed(2)}</p>
                </div>
                
                <div>
                  <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}><strong>Stock:</strong></p>
                  <p style={{ margin: '5px 0', color: '#333' }}>{product.stock}</p>
                </div>
                
                <div>
                  <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}><strong>Reorder Level:</strong></p>
                  <p style={{ margin: '5px 0', color: '#333' }}>{product.reorderLevel}</p>
                </div>
                
                <div style={{ gridColumn: '1 / -1' }}>
                  <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}><strong>Stock Status:</strong></p>
                  <p style={{ 
                    margin: '5px 0', 
                    fontWeight: 'bold',
                    color: product.stockStatus === 'Reorder Level Reached' ? 'red' : 'blue'
                  }}>
                    {product.stockStatus}
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div style={{ padding: '15px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '5px', marginBottom: '20px' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>New Purchase Price:</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={handlePriceChange}
                  placeholder="Enter new purchase price"
                  step="0.01"
                  min="0"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px', boxSizing: 'border-box' }}
                  required
                  disabled={loading}
                />
                <p style={{ margin: '5px 0', color: '#666', fontSize: '12px', fontStyle: 'italic' }}>
                  New Sales Price will be: ₹ {newPrice ? (parseFloat(newPrice) * 1.2).toFixed(2) : '0.00'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '10px 30px',
                    backgroundColor: loading ? '#ccc' : '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {loading ? 'Updating...' : 'Update Price'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/product-list')}
                  style={{
                    padding: '10px 30px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdatePrice;
