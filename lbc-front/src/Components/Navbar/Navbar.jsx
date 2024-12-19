import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, UserAddIcon, LoginIcon, CogIcon, CubeIcon } from "@heroicons/react/outline";
import Image from "../../Pics/coin.png";

export default function Navbar() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 bg-blue-600">
          <div className="w-2"></div>
          <Link to="/">
            <img src={Image} alt="Logo" className="w-12" />
          </Link>
          <Link to="/" className="text-lg font-bold">
            COINCOIN
          </Link>
          <div className="w-2"></div>
        </div>

        <ul className="flex space-x-6 items-center">
          {isAuthenticated ? (
            <>
              <li className="flex items-center space-x-1">
                <HomeIcon className="w-5 h-5" />
                <Link to="/products" className="hover:text-gray-200 transition">
                  Produits
                </Link>
              </li>
              <li className="flex items-center space-x-1">
                <CubeIcon className="w-5 h-5" />
                <Link to="/createproduct" className="hover:text-gray-200 transition">
                  Créer Produit
                </Link>
              </li>
              <li className="flex items-center space-x-1">
                <CogIcon className="w-5 h-5" />
                <Link to="/admin" className="hover:text-gray-200 transition">
                  Admin
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center space-x-1">
                <UserAddIcon className="w-5 h-5" />
                <Link to="/register" className="hover:text-gray-200 transition">
                  Register
                </Link>
              </li>
              <li className="flex items-center space-x-1">
                <LoginIcon className="w-5 h-5" />
                <Link to="/login" className="hover:text-gray-200 transition">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
