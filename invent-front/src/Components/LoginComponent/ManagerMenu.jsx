import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ManagerMenu = () => {
  const [skuOpen, setSkuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);

  return (
    <div>
      <div style={{ background: '#1b8f1b', color: '#fff', padding: '12px 16px', fontSize: 28, fontWeight: '700', textAlign: 'center' }}>
        Inventory Manager Menu
      </div>

      <div style={{ background: '#f2a500', padding: '8px 16px', display: 'flex', gap: 24, alignItems: 'center', position: 'relative' }}>
        {/* Show User Details */}
        <Link to="/user-details" style={{ fontSize: 18, fontWeight: 600, textDecoration: 'none', color: '#333' }}>Show User Details</Link>
        {/* SKU dropdown */}
        <div
          style={{ position: 'relative', cursor: 'pointer' }}
          onMouseEnter={() => setSkuOpen(true)}
          onMouseLeave={() => setSkuOpen(false)}
        >
          <span style={{ fontSize: 18, fontWeight: 600 }}>SKU ▾</span>
          {skuOpen && (
            <div style={{ position: 'absolute', top: '28px', left: 0, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', borderRadius: 4, minWidth: 160 }}>
              <div style={{ padding: '8px 12px', fontWeight: 700, color: '#666' }}>SKU</div>
              <Link to="/sku-list" style={{ display: 'block', padding: '8px 12px', textDecoration: 'none', color: '#333' }}>SKU List</Link>
            </div>
          )}
        </div>

        {/* Product dropdown */}
        <div
          style={{ position: 'relative', cursor: 'pointer' }}
          onMouseEnter={() => setProductOpen(true)}
          onMouseLeave={() => setProductOpen(false)}
        >
          <span style={{ fontSize: 18, fontWeight: 600 }}>Product ▾</span>
          {productOpen && (
            <div style={{ position: 'absolute', top: '28px', left: 0, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', borderRadius: 4, minWidth: 160 }}>
              <div style={{ padding: '8px 12px', fontWeight: 700, color: '#666' }}>Product</div>
              <Link to="/product-list" style={{ display: 'block', padding: '8px 12px', textDecoration: 'none', color: '#333' }}>Product List</Link>
            </div>
          )}
        </div>

        {/* Transaction dropdown */}
        <div
          style={{ position: 'relative', cursor: 'pointer' }}
          onMouseEnter={() => setTransactionOpen(true)}
          onMouseLeave={() => setTransactionOpen(false)}
        >
          <span style={{ fontSize: 18, fontWeight: 600 }}>Transaction ▾</span>
          {transactionOpen && (
            <div style={{ position: 'absolute', top: '28px', left: 0, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', borderRadius: 4, minWidth: 160 }}>
              <div style={{ padding: '8px 12px', fontWeight: 700, color: '#666' }}>Transaction</div>
              <Link to="/transaction-in" style={{ display: 'block', padding: '8px 12px', textDecoration: 'none', color: '#333' }}>Stock Purchase</Link>
              <Link to="/transaction-out" style={{ display: 'block', padding: '8px 12px', textDecoration: 'none', color: '#333' }}>Stock Issue</Link>
            </div>
          )}
        </div>

        {/* Logout */}
        <Link to="/login" style={{ marginLeft: 'auto', fontSize: 18, fontWeight: 600, textDecoration: 'none', color: '#333' }}>Logout</Link>
      </div>

      {/* Content area */}
      <div style={{ padding: 16 }}></div>
    </div>
  );
};

export default ManagerMenu;
