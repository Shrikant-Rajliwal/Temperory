import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; // Adjust import path if needed

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://temperory-backend.onrender.com/items/getAll")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Products</h1>
      <div className="flex flex-wrap">
        {items.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
