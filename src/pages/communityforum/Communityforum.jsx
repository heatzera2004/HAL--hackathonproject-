// src/CommunityForum.js
import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';

const LOCAL_STORAGE_KEY = 'communityForumDiscussions';

const defaultDiscussion = {
  id: 1,
  title: 'Farming Techniques and Fertilizers',
  content: 'Let’s discuss the best practices for farming and effective use of fertilizers. Share your tips and experiences!',
  imageUrl: '', // Default image if any
  replies: [],
};

const CommunityForum = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [discussions, setDiscussions] = useState([]);
  const [replyContent, setReplyContent] = useState('');
  const [replyImage, setReplyImage] = useState(null);
  const [replyImageUrl, setReplyImageUrl] = useState('');
  const [currentPostId, setCurrentPostId] = useState(null);

  useEffect(() => {
    // Load discussions from local storage on component mount
    const storedDiscussions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    if (storedDiscussions.length === 0) {
      // Initialize with default discussion if none exists
      setDiscussions([defaultDiscussion]);
    } else {
      setDiscussions(storedDiscussions);
    }
  }, []);

  useEffect(() => {
    // Save discussions to local storage whenever it changes
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(discussions));
  }, [discussions]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(url);
    }
  };

  const handleReplyImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setReplyImage(file);
      setReplyImageUrl(url);
    }
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const newDiscussion = {
      id: Date.now(),
      title,
      content,
      imageUrl,
      replies: [],
    };
    setDiscussions([...discussions, newDiscussion]);
    setTitle('');
    setContent('');
    setImage(null);
    setImageUrl('');
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    const newReply = {
      id: Date.now(),
      content: replyContent,
      imageUrl: replyImageUrl,
    };
    setDiscussions(discussions.map((discussion) =>
      discussion.id === currentPostId
        ? { ...discussion, replies: [...discussion.replies, newReply] }
        : discussion
    ));
    setReplyContent('');
    setReplyImage(null);
    setReplyImageUrl('');
    setCurrentPostId(null);
  };

  const handleReplyToPost = (postId) => {
    setCurrentPostId(postId);
  };

  return (
    <Layout>
    <div className="bg-green-100 min-h-screen p-8">
      <header className="bg-green-500 p-4 text-white text-center rounded-md shadow-md">
        <h1 className="text-3xl font-bold">Community Forum</h1>
      </header>
      <main className="mt-8 max-w-4xl mx-auto">
        <section className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-green-700">Latest Discussions</h2>
          <ul className="mt-4 space-y-4">
            {discussions.map((discussion) => (
              <li key={discussion.id} className="border p-4 rounded-md shadow-sm hover:bg-green-50">
                <h3 className="text-xl font-semibold">{discussion.title}</h3>
                <p className="text-gray-700 mt-2">{discussion.content}</p>
                {discussion.imageUrl && (
                  <div className="mt-4">
                    <img src={discussion.imageUrl} alt="Discussion" className="max-w-full h-auto rounded-md shadow-sm" />
                  </div>
                )}
                <button onClick={() => handleReplyToPost(discussion.id)} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                  Reply
                </button>
                {currentPostId === discussion.id && (
                  <form onSubmit={handleReplySubmit} className="mt-4">
                    <div className="mb-4">
                      <label htmlFor="replyContent" className="block text-sm font-medium text-gray-700">Reply Content</label>
                      <textarea
                        id="replyContent"
                        rows="4"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        required
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="replyImage" className="block text-sm font-medium text-gray-700">Upload Image</label>
                      <input
                        type="file"
                        id="replyImage"
                        accept="image/*"
                        onChange={handleReplyImageChange}
                        className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm"
                      />
                      {replyImage && (
                        <div className="mt-4">
                          <img src={replyImageUrl} alt="Uploaded preview" className="max-w-full h-auto rounded-md shadow-sm" />
                        </div>
                      )}
                    </div>
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Submit Reply</button>
                  </form>
                )}
                {discussion.replies && discussion.replies.length > 0 && (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="text-lg font-semibold text-green-600">Replies</h4>
                    <ul className="mt-2 space-y-2">
                      {discussion.replies.map((reply) => (
                        <li key={reply.id} className="border p-2 rounded-md shadow-sm">
                          <p className="text-gray-700">{reply.content}</p>
                          {reply.imageUrl && (
                            <div className="mt-2">
                              <img src={reply.imageUrl} alt="Reply" className="max-w-full h-auto rounded-md shadow-sm" />
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-8 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-green-700">Post a New Discussion</h2>
          <form onSubmit={handlePostSubmit} className="mt-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                id="content"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm"
              />
              {image && (
                <div className="mt-4">
                  <img src={imageUrl} alt="Uploaded preview" className="max-w-full h-auto rounded-md shadow-sm" />
                </div>
              )}
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Post</button>
          </form>
        </section>
      </main>
    </div>
    </Layout>
  );
};

export default CommunityForum;
