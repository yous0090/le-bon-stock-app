import React, { useState } from 'react';
import './AddStockForm.css';

function AddStockForm({ onAddStock }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    category: 'Fresh',
    supplier: 'Brakes',
    brakesUrl: '',
    urbanUrl: '',
    lowThreshold: 5,  // Default low stock threshold
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'lowThreshold' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Please enter a stock name.');
      return;
    }
    // Create new stock item with unique ID
    const newStockItem = {
      id: Date.now().toString(),
      ...formData,
    };
    onAddStock(newStockItem);
    setFormData({
      name: '',
      quantity: 0,
      category: 'Fresh',
      supplier: 'Brakes',
      brakesUrl: '',
      urbanUrl: '',
      lowThreshold: 5,
    });
  };

  return (
    <form className="add-stock-form" onSubmit={handleSubmit}>
      <h2>Add Stock Item</h2>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Quantity:
        <input type="number" name="quantity" min="0" value={formData.quantity} onChange={handleChange} />
      </label>
      <label>
        Low Stock Threshold:
        <input type="number" name="lowThreshold" min="0" value={formData.lowThreshold} onChange={handleChange} />
      </label>
      <label>
        Category:
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="Fresh">Fresh</option>
          <option value="Frozen">Frozen</option>
          <option value="Dairy">Dairy</option>
          <option value="Drinks">Drinks</option>
          <option value="Others">Others</option>
        </select>
      </label>
      <label>
        Supplier:
        <select name="supplier" value={formData.supplier} onChange={handleChange}>
          <option value="Brakes">Brakes</option>
          <option value="Bookers">Bookers</option>
          <option value="Costco">Costco</option>
          <option value="Holland and Barrett">Holland and Barrett</option>
          <option value="Urban">Urban</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        Brakes URL:
        <input type="url" name="brakesUrl" value={formData.brakesUrl} onChange={handleChange} />
      </label>
      <label>
        Urban URL:
        <input type="url" name="urbanUrl" value={formData.urbanUrl} onChange={handleChange} />
      </label>
      <button type="submit">Add Stock</button>
    </form>
  );
}

export default AddStockForm;