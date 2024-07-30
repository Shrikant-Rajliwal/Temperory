import React, { useState } from "react";
import axios from "axios";

const UpdateProduct = ({ product, onClose, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!updatedProduct.Name) tempErrors.Name = "Product Name is required";
    if (!updatedProduct.Price || updatedProduct.Price <= 0)
      tempErrors.Price = "Valid Product Price is required";
    if (!updatedProduct.Description) tempErrors.Description = "Product Description is required";
    if (!updatedProduct.Image) tempErrors.Image = "Product Image URL is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    try {
      const response = await axios.put(
        `https://temperory-backend.onrender.com/items/${product._id}`,
        updatedProduct
      );
      console.log("Product updated successfully");
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 flex items-center justify-center">
        {/* Modal Content */}
        <div className="relative top-0 p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg z-50">
          <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="Name"
              value={updatedProduct.Name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Name && <p className="text-red-600 text-sm mt-1">{errors.Name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Price</label>
            <input
              type="number"
              name="Price"
              value={updatedProduct.Price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Price && <p className="text-red-600 text-sm mt-1">{errors.Price}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
            <textarea
              name="Description"
              value={updatedProduct.Description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Description && <p className="text-red-600 text-sm mt-1">{errors.Description}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image URL</label>
            <input
              type="text"
              name="Image"
              value={updatedProduct.Image}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Image && <p className="text-red-600 text-sm mt-1">{errors.Image}</p>}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
