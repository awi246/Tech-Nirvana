import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="text-center mt-20">
    <h1 className="text-5xl mb-4">Welcome to BlogApp</h1>
    <p className="mb-6">
      A simple blog platform build as a task for Tech Nirvana.
    </p>
    <Link to="/blogs" className="bg-purple-500 text-white px-4 py-2 rounded">
      View Blogs
    </Link>
  </div>
);

export default Home;
