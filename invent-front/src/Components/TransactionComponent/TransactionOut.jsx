import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { findTransactionsByType } from '../../Services/TransactionService';
import { getProductById } from '../../Services/ProductService';

const TransactionOut = () => {
  const navigate = useNavigate();
  const [transactionList, setTransactionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [productMap, setProductMap] = useState({});

  useEffect(() => {
    loadTransactionOut();
  }, []);

  const loadTransactionOut = async () => {
    try {
      setLoading(true);
      const response = await findTransactionsByType('OUT');
      const transactions = response.data || [];
      setTransactionList(transactions);
      setFilteredList(transactions);

      const map = await buildProductMap(transactions);
      setProductMap(map);
      setError(null);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to load transaction out records');
    } finally {
      setLoading(false);
    }
  };

  const buildProductMap = async (transactions) => {
    const uniqueIds = [...new Set(transactions.map((t) => t.productId).filter(Boolean))];
    const entries = await Promise.all(
      uniqueIds.map(async (id) => {
        try {
          const product = await getProductById(id);
          return [id, product];
        } catch (err) {
          console.error('Error fetching product by id', id, err);
          return [id, null];
        }
      })
    );
    return Object.fromEntries(entries);
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    if (searchValue.trim() === '') {
      setFilteredList(transactionList);
    } else {
      const filtered = transactionList.filter((transaction) => {
        const product = productMap[transaction.productId];
        const productName = product?.productName || '';
        const vendorId = product?.vendorId?.toString() || '';
        return (
          transaction.transactionId?.toString().includes(searchValue) ||
          transaction.productId?.toString().includes(searchValue) ||
          productName.toLowerCase().includes(searchValue.toLowerCase()) ||
          vendorId.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setFilteredList(filtered);
    }
  };

  const handleRefresh = () => {
    loadTransactionOut();
    setSearchTerm('');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: 0, color: '#333' }}>Stock Issue Report</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleRefresh}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Refresh
            </button>
            <button
              onClick={handleBack}
              style={{
                padding: '10px 20px',
                backgroundColor: '#008CBA',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Back
            </button>
          </div>
        </div>

        {loading && <p style={{ textAlign: 'center', color: '#666' }}>Loading transaction records...</p>}
        {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

        {!loading && !error && (
          <>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Search by Transaction ID, Product ID, or User ID..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ overflowX: 'auto' }}>
              {filteredList.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#c41e3a', color: 'white' }}>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Transaction Id</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Product</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Rate</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Quantity</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Transaction Value</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Vendor Id</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Transaction Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredList.map((transaction, index) => (
                      <tr
                        key={index}
                        style={{
                          backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                          borderBottom: '1px solid #ddd',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e8e8e8')}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : 'white')
                        }
                      >
                        <td style={{ padding: '12px', textAlign: 'left' }}>{transaction.transactionId}</td>
                        <td style={{ padding: '12px', textAlign: 'left' }}>
                          {productMap[transaction.productId]?.productName || transaction.productId}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'left' }}>{transaction.rate}</td>
                        <td style={{ padding: '12px', textAlign: 'left' }}>{transaction.quantity}</td>
                        <td style={{ padding: '12px', textAlign: 'left' }}>{transaction.transactionValue}</td>
                        <td style={{ padding: '12px', textAlign: 'left' }}>
                          {productMap[transaction.productId]?.vendorId ?? transaction.userId}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'left' }}>{transaction.transactionDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>No transaction out records found</p>
              )}
            </div>

            {filteredList.length > 0 && (
              <p style={{ marginTop: '20px', textAlign: 'right', color: '#666' }}>
                Showing {filteredList.length} of {transactionList.length} records
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionOut;
