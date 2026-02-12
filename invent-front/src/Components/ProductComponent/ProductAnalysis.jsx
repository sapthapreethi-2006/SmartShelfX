import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductAnalysis } from '../../Services/ProductService';

const ProductAnalysis = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductAnalysis = async () => {
      try {
        setLoading(true);
        const response = await getProductAnalysis();
        setProductList(response.data || []);
      } catch (err) {
        console.error('Error fetching product analysis:', err);
        setError('Failed to load product analysis');
      } finally {
        setLoading(false);
      }
    };

    fetchProductAnalysis();
  }, []);

  const getStockStatusStyle = (status) => {
    if (status === 'Reorder Level Reached') {
      return { color: 'red', fontWeight: 'bold' };
    }
    return { color: 'blue', fontWeight: 'bold' };
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Admin Product List</h1>

        {loading && <p style={{ textAlign: 'center', color: '#666' }}>Loading product analysis...</p>}
        {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

        {!loading && !error && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1b8f1b', color: 'white' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Product Id</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>SKU</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Product Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Vendor Id</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Purchase Price</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Sales Price</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Stock</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Reorder Level</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Stock Status</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => (
                  <tr key={product.productId} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white', borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '12px', textAlign: 'left' }}>{product.productCode}</td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>{product.skuId}</td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>{product.productName}</td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>{product.vendorId}</td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>₹ {product.purchasePrice.toFixed(2)}</td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>₹ {product.salesPrice.toFixed(2)}</td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>{product.stock}</td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>{product.reorderLevel}</td>
                    <td style={{ padding: '12px', textAlign: 'left', ...getStockStatusStyle(product.stockStatus) }}>
                      {product.stockStatus}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'left', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#ffc107',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        Issue
                      </button>
                      <button
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        Purchase
                      </button>
                      <button
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#6c757d',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        Price Update
                      </button>
                      <button
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {productList.length === 0 && (
              <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>No products found.</p>
            )}
          </div>
        )}

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            onClick={() => navigate('/admin')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Back to Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalysis;
