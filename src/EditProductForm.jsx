import React, { useState } from 'react';
import axios from 'axios';
import { api_url } from './constant/constant';

function EditProductForm({ product, onEdit }) {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct({...editedProduct, [name]: value});
  };

  const handleEdit = async () => {
    try {
      await axios.put(`${api_url}/${editedProduct.id}`, editedProduct);
      onEdit();
    } catch (error) {
      console.error('Error editing product: ', error);
    }
  };
  


  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-inner">
          <h2>Edit Product</h2>
          <label>Name:</label>
          <input type="text" name="name" value={editedProduct.name} onChange={handleInputChange} />
          <label>Description:</label>
          <input type="text" name="description" value={editedProduct.description} onChange={handleInputChange} />
          <label>Price:</label>
          <input type="number" name="price" value={editedProduct.price} onChange={handleInputChange} />
          <button type="submit" onClick={handleEdit}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default EditProductForm;