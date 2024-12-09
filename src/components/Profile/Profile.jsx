import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [form, setForm] = useState({ email: user.email, password: '', profileImage: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    if (e.target.name === 'profileImage') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, profileImage: reader.result });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const updatedUser = { ...user };
    if (form.email) updatedUser.email = form.email;
    if (form.password) updatedUser.password = form.password;
    if (form.profileImage) updatedUser.profileImage = form.profileImage;
    updateProfile(updatedUser);
    setMessage('Profile updated successfully');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl mb-4">Profile</h2>
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          New Password:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
            className="w-full px-3 py-2 border rounded"
          />
        </label>
        <label className="block mb-4">
          Profile Image:
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </label>
        {form.profileImage && (
          <img src={form.profileImage} alt="Profile" className="mb-4 w-24 h-24 rounded-full" />
        )}
        <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
