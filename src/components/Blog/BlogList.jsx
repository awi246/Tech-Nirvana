import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blogsData from '../../../public/data/blogs.json';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs(blogsData);
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">All Blogs</h2>
      
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map(blog => (
          <div
            key={blog.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >            
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                  {blog.title}
                </h3>
                
                <div className="flex items-center mt-2">
                  <img
                    src={blog.author_profile}
                    alt={`${blog.author}'s profile`}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <p className="text-sm text-gray-500">By {blog.author}</p>
                </div>
                <p className="text-gray-700 mt-4">
                  {blog.content.substring(0, 150)}...
                </p>
              </div>
              
              <div className="mt-6">
                <Link
                  to={`/blogs/${blog.id}`}
                  className="text-indigo-500 hover:text-indigo-700 font-medium flex items-center"
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
