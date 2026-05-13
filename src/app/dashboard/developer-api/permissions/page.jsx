import React from 'react';

export default function PermissionsPage() {
  const permissionsList = [
    { id: 1, role: 'Admin', scope: 'Full Access', status: 'Active' },
    { id: 2, role: 'Developer', scope: 'Read/Write', status: 'Active' },
    { id: 3, role: 'Viewer', scope: 'Read Only', status: 'Pending' },
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '900px' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a202c' }}>Role Permissions</h1>
        <p style={{ color: '#718096' }}>Manage and view API access levels for your team.</p>
      </header>

      <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f7fafc' }}>
            <tr>
              <th style={tableHeaderStyle}>Role</th>
              <th style={tableHeaderStyle}>Scope</th>
              <th style={tableHeaderStyle}>Status</th>
              <th style={tableHeaderStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {permissionsList.map((item) => (
              <tr key={item.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                <td style={tableCellStyle}><strong>{item.role}</strong></td>
                <td style={tableCellStyle}>{item.scope}</td>
                <td style={tableCellStyle}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: item.status === 'Active' ? '#c6f6d5' : '#feebc8',
                    color: item.status === 'Active' ? '#22543d' : '#744210'
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={tableCellStyle}>
                  <button style={{ color: '#3182ce', border: 'none', background: 'none', cursor: 'pointer' }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const tableHeaderStyle = {
  padding: '12px 15px',
  fontSize: '14px',
  color: '#4a5568',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const tableCellStyle = {
  padding: '15px',
  fontSize: '15px',
  color: '#2d3748'
};