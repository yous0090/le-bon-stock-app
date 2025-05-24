import React from "react";

function StockItem({ item, updateQuantity, user, removeStockItem }) {
  const isLow = item.quantity <= item.lowThreshold;

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 0) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const colorMap = {
    Frozen: "#2196f3",
    Dairy: "#4caf50",
    Drinks: "#ff9800",
    Fresh: "#e91e63",
    Others: "#9e9e9e",
  };

  const color = colorMap[item.category] || "#9e9e9e";

  return (
    <li
      className={`stock-item ${isLow ? "low-stock" : ""}`}
      style={{ borderLeft: `5px solid ${color}` }}
    >
      <div className="stock-info">
        <h3>{item.name}</h3>
        <p>Quantity: {item.quantity}</p>
        <p>Category: {item.category}</p>
        <p>Supplier: {item.supplier}</p>
        {item.supplierLink && (
          <p>
            <a
              href={item.supplierLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Supplier Link
            </a>
          </p>
        )}
      </div>
      <div className="stock-controls">
        <button
          onClick={handleDecrement}
          disabled={user === "staff" && item.quantity === 0}
          title="Decrease quantity"
        >
          -
        </button>
        <button onClick={handleIncrement} title="Increase quantity">
          +
        </button>
        {user === "admin" && (
          <button
            onClick={() => removeStockItem(item.id)}
            title="Remove stock item"
            style={{
              marginLeft: "10px",
              backgroundColor: "#f44336",
              color: "white",
              borderRadius: "4px",
              padding: "5px 8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        )}
      </div>
    </li>
  );
}

export default StockItem;