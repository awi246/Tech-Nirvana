import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import blogsData from '../../../public/data/blogs.json';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const foundBlog = blogsData.find(b => b.id === parseInt(id));
    if (foundBlog) {
      setBlog(foundBlog);
    } else {
      navigate('/blogs');
    }
  }, [id, navigate]);

  const handleDelete = () => {
    const index = blogsData.findIndex(b => b.id === blog.id);
    if (index !== -1) {
      blogsData.splice(index, 1);
      navigate('/blogs');
    }
  };

  if (!blog) return null;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-3xl mb-4">{blog.title}</h2>
      <div className="flex items-center text-gray-600">
        {blog.author_profile && (
          <img
            src={blog.author_profile}
            alt={`${blog.author}'s profile`}
            className="w-12 h-12 rounded-full mr-4"
          />
        )}
        <span>By {blog.author}</span>
      </div>
      <div className="mt-4">{blog.content}</div>
      <div className="mt-6 flex space-x-4">
        <Link to={`/edit-blog/${blog.id}`} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Edit
        </Link>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;
