import React from 'react';

function AddProduct({ newProduct, onAdd, onClose, onInputChange }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-inner">
          <button className="close-btn" onClick={onClose}>Close</button>
          <h2>Add New Product</h2>
          <form onSubmit={onAdd}>
            <label>Name:</label>
            <input type="text" name="name" value={newProduct.name} onChange={onInputChange} />
            <label htmlFor="description">Description:</label>
            <input type="text" name="description" value={newProduct.description} onChange={onInputChange} />
            <label htmlFor="price">Price:</label>
            <input type="number" name="price" value={newProduct.price} onChange={onInputChange} min="0" step="0.01" />
            <button type="submit">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
