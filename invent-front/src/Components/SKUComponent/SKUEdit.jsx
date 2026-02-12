import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSKUById, updateSKU } from '../../Services/SKUService';

const SKUEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [skuId, setSkuId] = useState('');
  const [skuDescription, setSkuDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSKU();
  }, [id]);

  const loadSKU = async () => {
    try {
      setLoading(true);
      const sku = await getSKUById(id);
      setSkuId(sku.skuId);
      setSkuDescription(sku.skuDescription);
      setError('');
    } catch (err) {
      setError('Failed to load SKU: ' + err.message);
      console.error('Error loading SKU:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!skuDescription.trim()) {
      setError('SKU Description is required');
      return;
    }

    try {
      setSaving(true);
      await updateSKU({
        skuId: skuId,
        skuDescription: skuDescription
      });
      alert('SKU updated successfully!');
      navigate('/sku-list');
    } catch (err) {
      setError('Error updating SKU: ' + err.message);
      console.error('Error updating SKU:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/sku-list');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <p>Loading SKU...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '28px', color: '#333' }}>Edit SKU</h1>
        
        {error && (
          <div style={{ padding: '15px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '5px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>SKU ID (Read-only):</label>
            <input
              type="text"
              value={skuId}
              disabled
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px', backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>SKU Description:</label>
            <input
              type="text"
              value={skuDescription}
              onChange={(e) => setSkuDescription(e.target.value)}
              placeholder="Enter SKU description"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              type="submit"
              disabled={saving}
              style={{ padding: '10px 30px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              style={{ padding: '10px 30px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SKUEdit;
