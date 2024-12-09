import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import blogsData from "../../../public/data/blogs.json";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const BlogForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    if (isEdit) {
      const blog = blogsData.find((b) => b.id === parseInt(id));
      if (blog) {
        setForm({ title: blog.title, content: blog.content });
      } else {
        navigate("/blogs");
      }
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const blog = blogsData.find((b) => b.id === parseInt(id));
      if (blog && blog.author === user.email) {
        blog.title = form.title;
        blog.content = form.content;
        toast.success("Post edited successfully!");
        navigate(`/blogs/${blog.id}`);
      } else {
        toast.error("You are not authorized to edit this post.");
      }
    } else {
      const newBlog = {
        id: Date.now(),
        title: form.title,
        content: form.content,
        author: user.email,
        createdAt: new Date().toISOString(),
      };
      blogsData.push(newBlog);
      toast.success("Post created successfully!");
      navigate("/blogs");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl mb-4">
        {isEdit ? "Edit Blog" : "Create New Blog"}
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Title:
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </label>
        <label className="block mb-4">
          Content:
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows="10"
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </label>
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          {isEdit ? "Update Blog" : "Post Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
