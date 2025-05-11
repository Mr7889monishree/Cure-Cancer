import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import {useStateContext } from '../context/Index';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const { createUser, fetchUserByEmail } = useStateContext();
  const { user } = usePrivy();

  const handleOnboarding = async (e) => {
    e.preventDefault();

    // Ensure user is authenticated and email is available
    if (!user || !user.email?.address) {
      console.error('User email not found');
      return;
    }

    const userData = {
      username:user,
      age: parseInt(age, 10),
      location,
      createdBy: user.email.address,
      onboardingAt: new Date().toISOString(),
    };

    try {
      // Create user
      const newUser = await createUser(userData);

      if (newUser) {
        // Fetch the created user and set the context
        await fetchUserByEmail(user.email.address);
        navigate('/'); // Navigate to profile page after successful onboarding
      } else {
        console.error('Failed to create user.');
      }
    } catch (err) {
      console.error('Onboarding error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md rounded-xl bg-[#1c1c24] p-8 shadow-lg">
        <h2 className="mb-2 text-center text-5xl">👋</h2>
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Welcome! Let&apos;s get started
        </h2>
        <form onSubmit={handleOnboarding}>
          <div className="mb-4">
            <label htmlFor="username" className="mb-2 block text-sm text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="mb-2 block text-sm text-gray-300">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="mb-2 block text-sm text-gray-300">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
