import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Image from "../../Pics/coin.png"

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Jouets', 'Sport', 'Maison', 'Décoration'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products/all');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des produits');
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);

    if (selectedCategory === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-semibold text-center mb-8">Nos Produits</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="mb-6 flex justify-center items-center">
        <label htmlFor="category" className="mr-4 text-lg">Filtrer par catégorie :</label>
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={Image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{product.category}</p>
            <p className="text-lg font-bold text-gray-700">{product.price} €</p>

            <Link 
              to={`/product/${product._id}`}
              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md mt-4 inline-block"
            >
              Afficher
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
