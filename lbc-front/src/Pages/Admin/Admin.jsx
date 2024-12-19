import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des utilisateurs');
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProducts(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des produits');
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/users/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: { id: userId },
      });
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      setError('Erreur lors de la suppression de l\'utilisateur');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/products/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: { id: productId },
      });
      setProducts(products.filter(product => product._id !== productId));
    } catch (err) {
      setError('Erreur lors de la suppression du produit');
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setUpdatedName(product.name);
    setUpdatedCategory(product.category);
    setUpdatedDescription(product.description);
    setUpdatedPrice(product.price);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/products/update/${selectedProduct._id}`,
        {
          name: updatedName,
          category: updatedCategory,
          description: updatedDescription,
          price: updatedPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const updatedProducts = products.map(product =>
        product._id === selectedProduct._id ? response.data : product
      );
      setProducts(updatedProducts);
      closeModal();
    } catch (err) {
      setError('Erreur lors de la mise à jour du produit');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-semibold text-center mb-8">Gestion des utilisateurs et produits</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <h2 className="text-2xl font-semibold text-center mb-4">Liste des utilisateurs</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Nom</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Âge</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.age}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEditProduct(user)}
                    className="text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md ml-2"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-center mb-4">Liste des produits</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Nom</th>
              <th className="py-2 px-4 border-b text-left">Catégorie</th>
              <th className="py-2 px-4 border-b text-left">Créé par</th>
              <th className="py-2 px-4 border-b text-left">Prix</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.category}</td>
                <td className="py-2 px-4 border-b">{product.user ? product.user.name : "N/A"}</td>
                <td className="py-2 px-4 border-b">{product.price} €</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md ml-2"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-center mb-4">Modifier le produit</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                id="name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Catégorie
              </label>
              <input
                type="text"
                id="category"
                value={updatedCategory}
                onChange={(e) => setUpdatedCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Prix
              </label>
              <input
                type="number"
                id="price"
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Annuler
              </button>
              <button
                onClick={handleUpdateProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
