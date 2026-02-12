import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSKUs, deleteSKUById } from '../../Services/SKUService';

const SKUReport = () => {
  const [skuList, setSkuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadSkus();
  }, []);

  const loadSkus = async () => {
    try {
      setLoading(true);
      const skus = await getAllSKUs();
      setSkuList(skus);
      setError('');
    } catch (err) {
      setError('Failed to load SKUs: ' + err.message);
      console.error('Error loading SKUs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skuId) => {
    navigate(`/sku-edit/${skuId}`);
  };

  const handleDelete = async (skuId) => {
    if (window.confirm(`Are you sure you want to delete SKU: ${skuId}?`)) {
      try {
        await deleteSKUById(skuId);
        alert('SKU deleted successfully!');
        loadSkus();
      } catch (err) {
        alert('Error deleting SKU: ' + err.message);
        console.error('Error deleting SKU:', err);
      }
    }
  };

  const handleRefresh = () => {
    loadSkus();
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: 0, color: '#333' }}>SKU List</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleRefresh}
              style={{ padding: '10px 20px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Refresh
            </button>
            <button
              onClick={handleBack}
              style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Back
            </button>
          </div>
        </div>

        {loading && <p style={{ textAlign: 'center', color: '#666' }}>Loading SKUs...</p>}
        
        {error && (
          <div style={{ padding: '15px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '5px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {!loading && !error && skuList.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
            No SKUs found. Please add some SKUs first.
          </p>
        )}

        {!loading && !error && skuList.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>#</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>SKU ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>SKU Description</th>
                  <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {skuList.map((sku, index) => (
                  <tr 
                    key={sku.skuId} 
                    style={{ 
                      backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f8f9fa' : 'white'}
                  >
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>{index + 1}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold' }}>{sku.skuId}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>{sku.skuDescription}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'center' }}>
                      <button
                        onClick={() => handleEdit(sku.skuId)}
                        style={{ padding: '6px 12px', marginRight: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(sku.skuId)}
                        style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: '20px', color: '#666', textAlign: 'right' }}>
              Total SKUs: <strong>{skuList.length}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SKUReport;
