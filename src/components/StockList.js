import React from 'react';
import './StockList.css';

function StockList({ stock, isAdmin, onUpdate, onRemove }) {
  return (
    <div className="stock-list">
      <h2>Stock Items</h2>
      {stock.length === 0 ? (
        <p>No stock items available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Links</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {stock.map(item => {
              const isLow = item.lowThreshold !== undefined && item.quantity <= item.lowThreshold;
              return (
                <tr key={item.id} className={isLow ? 'low-stock' : ''}>
                  <td>{item.name}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={e => onUpdate(item.id, parseInt(e.target.value) || 0)}
                      className={isLow ? 'low-stock-input' : ''}
                    />
                  </td>
                  <td>{item.category}</td>
                  <td>{item.supplier}</td>
                  <td>
                    {item.brakesUrl && (
                      <a href={item.brakesUrl} target="_blank" rel="noreferrer">
                        Brakes
                      </a>
                    )}
                    {item.urbanUrl && (
                      <>
                        {item.brakesUrl && ' | '}
                        <a href={item.urbanUrl} target="_blank" rel="noreferrer">
                          Urban
                        </a>
                      </>
                    )}
                  </td>
                  {isAdmin && (
                    <td>
                      <button onClick={() => onRemove(item.id)}>Delete</button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default StockList;