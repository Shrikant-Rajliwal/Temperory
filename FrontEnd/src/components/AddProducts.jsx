import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ImCross } from 'react-icons/im';

const AddProduct = () => {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState(""); // URL instead of file
  const [Duration, setDuration] = useState("");
  const [Instructor, setInstructor] = useState("");
  const [Price, setPrice] = useState("");
  const [Published, setPublished] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      Name,
      Description,
      Image,
      Duration,
      Instructor,
      Price,
      Published
    };

    try {
      const res = await axios.post("https://temperory-backend.onrender.com/items/create", productData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      navigate("/admin");
      alert("Product added successfully");
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const handleRedirect = () => {
    navigate("/admin");
  };

  return (
    <div className="relative shadow-md max-w-4xl mx-auto mt-20 p-5">
      <h1 className='text-3xl font-bold text-center mb-5'>Add Product</h1>
      <button onClick={handleRedirect} type="button" className='absolute right-2 top-2 p-2 text-xl'><ImCross /></button>
      <form className='flex flex-wrap gap-6 justify-center' onSubmit={handleSubmit}>
        <div className='flex flex-col w-80'>
          <label htmlFor='Name' className='font-bold mb-2'>Product Name</label>
          <input
            type="text"
            id="Name"
            placeholder='Enter Product Name'
            className='border border-gray-300 p-2 rounded'
            value={Name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='flex flex-col w-80'>
          <label htmlFor='Description' className='font-bold mb-2'>Product Description</label>
          <textarea
            id="Description"
            placeholder='Enter Product Description'
            className='border border-gray-300 p-2 rounded'
            value={Description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className='flex flex-col w-80'>
          <label htmlFor='Image' className='font-bold mb-2'>Product Image URL</label>
          <input
            type="text"
            id="Image"
            placeholder='Enter Product Image URL'
            className='border border-gray-300 p-2 rounded'
            value={Image}
            onChange={e => setImage(e.target.value)}
          />
        </div>
        <div className='flex flex-col w-80'>
          <label htmlFor='Price' className='font-bold mb-2'>Product Price (₹)</label>
          <input
            type="text"
            id="Price"
            placeholder='Enter Product Price'
            className='border border-gray-300 p-2 rounded'
            value={Price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>
        <div className='flex justify-center w-full'>
          <button type="submit" className='bg-green-500 p-3 rounded text-white font-bold'>Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
