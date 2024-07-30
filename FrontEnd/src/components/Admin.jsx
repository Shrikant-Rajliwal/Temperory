import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';
import { PiNotePencilFill } from 'react-icons/pi';
import UpdateProduct from './UpdateProduct'; // Import the UpdateProduct component

const Admin = () => {
  const [items, setItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get('https://temperory-backend.onrender.com/items/getAll')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  const deleteItem = async (itemId) => {
    const isConfirmed = window.confirm('Do you want to delete this item?');
    if (isConfirmed) {
      try {
        await axios.delete(`https://temperory-backend.onrender.com/items/delete/${itemId}`);
        setItems(items.filter((item) => item._id !== itemId));
        console.log('Item deleted successfully');
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleUpdateProduct = (product) => {
    setSelectedProduct(product);
    setIsUpdating(true);
  };

  const updateProductInState = (updatedProduct) => {
    setItems(items.map(item => item._id === updatedProduct._id ? updatedProduct : item));
    setIsUpdating(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <Link to="/addproduct">
          <button className="border-none p-2 bg-blue-700 rounded-lg text-white font-bold">
            Add product
          </button>
        </Link>
        <div>
          <h1 className="mt-4 text-2xl font-semibold">All Products Admin Panel</h1>
        </div>
      <div className="flex flex-wrap">
        {items.map((product) => (
          <div key={product._id} className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white lg:w-72">
            <img className="w-full" src={product.Image} alt={product.Name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{product.Name}</div>
              <p className="text-gray-700 text-base">{product.Description}</p>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-evenly items-center">
              <span className="block text-lg bg-blue-300 text-black font-semibold mr-2 mb-2 p-2 rounded-full">
                Price :{product.Price} Rs
              </span>
              <MdDeleteForever
                className="text-red-600 text-3xl cursor-pointer"
                onClick={() => deleteItem(product._id)}
              />
              <PiNotePencilFill 
                className="text-gray-600 text-3xl cursor-pointer"
                onClick={() => handleUpdateProduct(product)} 
              />
            </div>
          </div>
        ))}
      </div>
      {isUpdating && (
        <UpdateProduct 
          product={selectedProduct} 
          onClose={() => setIsUpdating(false)}
          onUpdate={updateProductInState}
        />
      )}
    </div>
  );
};

export default Admin;
