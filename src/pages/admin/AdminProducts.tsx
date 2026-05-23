import React, { useState, useEffect } from 'react';
import API_URL from '../../config';
import { getImageUrl } from '../../utils/image';
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
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing 
      ? `${API_URL}/products/${currentProduct.id}` 
      : `${API_URL}/products`;
    const method = isEditing ? 'PUT' : 'POST';

    const formData = new FormData();
    formData.append('name', currentProduct.name || '');
    formData.append('description', currentProduct.description || '');
    formData.append('price', String(currentProduct.price || 0));
    formData.append('category', currentProduct.category || '');
    formData.append('stock', String(currentProduct.stock || 0));
    formData.append('imageUrl', currentProduct.imageUrl || '');
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setIsEditing(false);
        setCurrentProduct({ name: '', description: '', price: 0, imageUrl: '', category: '', stock: 0 });
        setImageFile(null);
        fetchProducts();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setImageFile(null);
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
          <div className="form-group">
            <label>Upload Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <small style={{ color: '#666' }}>Upload from device (preferred)</small>
          </div>
          <div className="form-group">
            <label>OR Image URL</label>
            <input name="imageUrl" value={currentProduct.imageUrl} onChange={handleInputChange} />
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
              setImageFile(null);
            }}>Cancel</button>
          )}
        </div>
      </form>

      <div className="products-list">
        <h2>Existing Products</h2>
        <div className="table-container">
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
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img 
                        src={getImageUrl(product.imageUrl)} 
                        alt={product.name} 
                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      {product.name}
                    </div>
                  </td>
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
    </div>
  );
};

export default AdminProducts;
