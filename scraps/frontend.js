import React, { useState, useEffect } from 'react';

function FlashDashboard() {
  const [flash, setFlash] = useState([]);

  useEffect(() => {
    fetch('/api/flash')
      .then(response => response.json())
      .then(data => setFlash(data));
  }, []);

  const handleAddFlash = () => {
    fetch('/api/flash', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: 'New Design Description',
        creation_date: '2024-08-25',
        availability: false,
        sold_date: null,
        sold_price: null
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Update UI or state with new flash
        setFlash([...flash, data]);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Tattoo Designs</h1>
      <button onClick={handleAddFlash}>Add New Design</button>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Creation Date</th>
            <th>Availability</th>
            <th>Sold Date</th>
            <th>Sold Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flash.map(item => (
            <tr key={item.design_id}>
              <td>{item.design_description}</td>
              <td>{item.creation_date}</td>
              <td>{item.availability ? 'Sold' : 'Available'}</td>
              <td>{item.sold_date}</td>
              <td>{item.sold_price}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FlashDashboard;
