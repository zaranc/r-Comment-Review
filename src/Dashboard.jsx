import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProductForm from './EditProductForm.jsx';
import AddProduct from './AddProduct.jsx';
import { api_url } from './constant/constant.js';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    let res = await axios.get(api_url)
    setProducts(res.data);
    setSortedProducts(res.data.slice().sort((a, b) => a.name.localeCompare(b.name)));
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.price.toString().includes(term)
    );
    setSortedProducts(filtered.slice().sort((a, b) => a.name.localeCompare(b.name)));
  };

  const handleDeleteConfirmation = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      handleDelete(productId);
    }
  };

  const handleDelete = async (productId) => {
    await axios.delete(api_url + `/${productId}`)
    setSortedProducts(sortedProducts.filter((product) => product.id !== productId));
    console.error('Error deleting product:');
  };

  const handleEdit = (productId) => {
    const productToEdit = products.find(product => product.id === productId);
    setEditingProduct(productToEdit);
  };

  const handleAdd = async () => {
      let  newProductData = {
        name : newProduct.name,
        price : newProduct.price,
        description : newProduct.description
      };
      const response = await axios.post(api_url, newProductData);
      setProducts([...products, response.data]);
      setShowPopup(false);
  };

  const handleEditComplete = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container">
        <div className="search-container">
          <input type="search" placeholder='Search The Product..' value={searchTerm} onChange={handleSearch} />
          <button className="btn btn-primary" onClick={() => setShowPopup(true)}>Add Product</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(product.id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteConfirmation(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showPopup && (
          <AddProduct
            newProduct={newProduct}
            onAdd={handleAdd}
            onClose={() => setShowPopup(false)}
            onInputChange={handleInputChange}
          />
        )}
        {editingProduct && (
          <EditProductForm
            product={editingProduct}
            onEdit={handleEditComplete}
          />
        )}

        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentItems.length < itemsPerPage}>Next</button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
