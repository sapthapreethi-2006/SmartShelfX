import React, { useState, useEffect } from 'react';
import { fetchSkus, saveSku } from '../../Services/SKUService';

const SKUEntry = () => {
  const [skuId, setSkuId] = useState('');
  const [skuDescription, setSkuDescription] = useState('');
  const [skuList, setSkuList] = useState([]);
  const [selectedSku, setSelectedSku] = useState('');

  // Fetch all SKUs on component mount
  useEffect(() => {
    loadSkus();
  }, []);

  const loadSkus = async () => {
    const skus = await fetchSkus();
    setSkuList(skus);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!skuId || !skuDescription) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const newSku = {
        skuId: skuId,
        skuDescription: skuDescription
      };
      await saveSku(newSku);
      alert('SKU saved successfully!');
      
      // Clear form and reload SKU list
      setSkuId('');
      setSkuDescription('');
      setSelectedSku('');
      loadSkus();
    } catch (error) {
      alert('Error saving SKU: ' + error.message);
    }
  };

  const handleReturn = () => {
    window.history.back();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '28px', color: '#333' }}>New SKU Entry</h1>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>SKU ID:</label>
            <input
              type="text"
              value={skuId}
              onChange={(e) => setSkuId(e.target.value)}
              placeholder="ITC-ASB-"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>SKU Description:</label>
            <input
              type="text"
              value={skuDescription}
              onChange={(e) => setSkuDescription(e.target.value)}
              placeholder="skuDescription"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Select Existing SKU:</label>
            <select
              value={selectedSku}
              onChange={(e) => {
                const selected = skuList.find(sku => sku.skuId === e.target.value);
                if (selected) {
                  setSelectedSku(e.target.value);
                  setSkuId(selected.skuId);
                  setSkuDescription(selected.skuDescription);
                }
              }}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
            >
              <option value="">-- Select SKU --</option>
              {skuList.map((sku) => (
                <option key={sku.skuId} value={sku.skuId}>
                  {sku.skuId} - {sku.skuDescription}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              type="submit"
              style={{ padding: '10px 30px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReturn}
              style={{ padding: '10px 30px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}
            >
              Return
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SKUEntry;
