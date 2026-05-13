import React from 'react';

export default function DocsPage() {
  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', lineHeight: '1.6' }}>
      <header style={{ borderBottom: '1px solid #eaeaea', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#111' }}>Developer Documentation</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Welcome to the API reference and guides.
        </p>
      </header>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#0070f3' }}>Getting Started</h2>
        <p>
          Humare API ko integrate karne ke liye niche diye gaye steps follow karein. 
          Yeh documentation aapko authentication aur endpoints ki jaankari dega.
        </p>
        
        <div style={{ 
          backgroundColor: '#f4f4f4', 
          padding: '15px', 
          borderRadius: '5px', 
          fontFamily: 'monospace',
          marginTop: '10px' 
        }}>
          npm install @developer-api/core
        </div>
      </section>

      <section>
        <h2 style={{ color: '#0070f3' }}>API Endpoints</h2>
        <ul>
          <li><strong>GET /v1/user:</strong> User details fetch karne ke liye.</li>
          <li><strong>POST /v1/auth:</strong> Authentication token generate karne ke liye.</li>
        </ul>
      </section>
    </div>
  );
}