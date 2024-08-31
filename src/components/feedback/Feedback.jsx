import React, { useState } from 'react';

const Feedback = () => {
  const [formData, setFormData] = useState({
    feedback: '',
    email: '',
    name: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ feedback: '', email: '', name: '' });
    }, 2000);
  };

  return (
    <div className="w-full h-full max-w-4xl mx-auto p-4 bg-green-light rounded-lg shadow-md flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-green-dark mb-4 text-center">We'd Love Your Feedback!</h2>
      {submitted ? (
        <div className="text-center text-green-700">
          <p className="text-lg">Thank you for your feedback!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-lg font-medium text-green-dark">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-lg font-medium text-green-dark">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              className="p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="feedback" className="text-lg font-medium text-green-dark">Feedback:</label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Enter your feedback here..."
              className="p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows="6"
              required
            />
          </div>
          <button
            type="submit"
            className="self-center px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Feedback;
