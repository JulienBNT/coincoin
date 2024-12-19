import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook pour naviguer

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/users/register", {
        name: formData.name,
        email: formData.email,
        age: formData.age,
        password: formData.password,
      });

      console.log("Utilisateur créé avec succès", response.data);
      setError(""); // Clear l'erreur au cas où

      // Réinitialisation du formulaire
      setFormData({
        name: "",
        email: "",
        age: "",
        password: "",
        confirmPassword: "",
      });

      // Redirection vers "/"
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erreur lors de la création du compte");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Créer un compte</h2>

        {error && (
          <div className="p-2 mt-4 text-red-700 bg-red-200 border border-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mt-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Âge
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirmez le mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}
