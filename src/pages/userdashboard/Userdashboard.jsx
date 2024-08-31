import React, { useState } from "react";
import Layout from "../../components/layout/Layout";

const Userdashboard = () => {
  const [focusedSection, setFocusedSection] = useState(null);

  const diseaseHistory = [
    { id: 1, name: "Powdery Mildew", description: "Affects cucurbits, particularly in humid conditions." },
    { id: 2, name: "Late Blight", description: "Serious disease in tomatoes and potatoes, caused by Phytophthora infestans." },
    { id: 3, name: "Root Rot", description: "Common in overwatered plants, leading to decaying roots." },
  ];

  const orderHistory = [
    { id: 1, item: "Copper Fungicide", date: "2024-03-10", forDisease: "Powdery Mildew" },
    { id: 2, item: "Potato Seeds", date: "2024-04-02", forDisease: "Late Blight" },
    { id: 3, item: "Soil Moisture Sensor", date: "2024-05-15", forDisease: "Root Rot" },
  ];

  const posts = [
    { id: 1, title: "Managing Powdery Mildew", content: "Tips and tricks for managing powdery mildew in your garden." },
    { id: 2, title: "Preventing Late Blight", content: "Best practices for preventing late blight in tomatoes and potatoes." },
    { id: 3, title: "Understanding Root Rot", content: "How to identify and prevent root rot in your plants." },
  ];

  const handleFocus = (section) => {
    setFocusedSection(section);
  };

  const getFocusClass = (section) => (section === focusedSection ? "transform scale-105 shadow-xl" : "");

  return (
    <Layout>
    <div className="min-h-screen bg-green-50 p-10">
      <h1 className="text-5xl font-extrabold text-green-800 mb-10 text-center">Plant & Agriculture Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Disease History Section */}
        <div
          className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${getFocusClass('diseaseHistory')}`}
          onClick={() => handleFocus('diseaseHistory')}
        >
          <h2 className="text-3xl font-bold text-green-700 mb-6">Plant Disease History</h2>
          <ul className="space-y-6">
            {diseaseHistory.map((disease) => (
              <li key={disease.id} className="bg-green-100 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold">{disease.name}</h3>
                <p className="text-gray-700 mt-2">{disease.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Order History Section */}
        <div
          className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${getFocusClass('orderHistory')}`}
          onClick={() => handleFocus('orderHistory')}
        >
          <h2 className="text-3xl font-bold text-green-700 mb-6">Order History</h2>
          <ul className="space-y-6">
            {orderHistory.map((order) => (
              <li key={order.id} className="bg-green-100 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold">{order.item}</h3>
                <p className="text-gray-700 mt-2"><strong>Date:</strong> {order.date}</p>
                <p className="text-gray-700"><strong>For Disease:</strong> {order.forDisease}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Your Posts Section */}
        <div
          className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${getFocusClass('posts')}`}
          onClick={() => handleFocus('posts')}
        >
          <h2 className="text-3xl font-bold text-green-700 mb-6">Your Posts</h2>
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.id} className="bg-green-100 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-700 mt-2">{post.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Userdashboard;
