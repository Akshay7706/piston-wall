import React, { useState, useEffect } from 'react';
import API_URL from '../../config';
import './AdminProducts.css';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
    stock: 0,
  });

  const token = localStorage.getItem('adminToken');

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing 
      ? `${API_URL}/products/${currentProduct.id}` 
      : `${API_URL}/products`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentProduct),
      });

      if (response.ok) {
        setIsEditing(false);
        setCurrentProduct({ name: '', description: '', price: 0, imageUrl: '', category: '', stock: 0 });
        fetchProducts();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="admin-products">
      <h1>Product Management</h1>

      <form className="product-form" onSubmit={handleSubmit}>
        <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input name="name" value={currentProduct.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input name="category" value={currentProduct.category} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="number" step="0.01" name="price" value={currentProduct.price} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input type="number" name="stock" value={currentProduct.stock} onChange={handleInputChange} required />
          </div>
          <div className="form-group full-width">
            <label>Image URL</label>
            <input name="imageUrl" value={currentProduct.imageUrl} onChange={handleInputChange} required />
          </div>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea name="description" value={currentProduct.description} onChange={handleInputChange} required />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="save-btn">{isEditing ? 'Update Product' : 'Add Product'}</button>
          {isEditing && (
            <button type="button" className="cancel-btn" onClick={() => {
              setIsEditing(false);
              setCurrentProduct({ name: '', description: '', price: 0, imageUrl: '', category: '', stock: 0 });
            }}>Cancel</button>
          )}
        </div>
      </form>

      <div className="products-list">
        <h2>Existing Products</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td className="actions">
                  <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
