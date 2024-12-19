import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Image from "../../Pics/coin.png"

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération du produit');
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-8">{product.name}</h1>
        
        <p className="text-lg font-bold">Catégorie: {product.category}</p>
        <p className="text-lg font-bold">Prix: {product.price} €</p>
        <p className="text-sm mt-4">{product.description}</p>
      </div>
    </div>
  );
}
