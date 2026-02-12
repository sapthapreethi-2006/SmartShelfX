import React from 'react';
import { Link } from 'react-router-dom';

const VendorMenu = () => {

  return (
    <div>
      <div style={{ background: '#1b8f1b', color: '#fff', padding: '12px 16px', fontSize: 28, fontWeight: '700', textAlign: 'center' }}>
        Inventory Vendor Menu
      </div>

      <div style={{ background: '#f2a500', padding: '8px 16px', display: 'flex', gap: 24, alignItems: 'center', position: 'relative' }}>
        <Link to="/user-details" style={{ fontSize: 18, fontWeight: 600, textDecoration: 'none', color: '#333' }}>Show User Details</Link>
        <Link to="/login" style={{ marginLeft: 'auto', fontSize: 18, fontWeight: 600, textDecoration: 'none', color: '#333' }}>Logout</Link>
      </div>

      {/* Content area */}
      <div style={{ padding: 16 }}></div>
    </div>
  );
};

export default VendorMenu;
