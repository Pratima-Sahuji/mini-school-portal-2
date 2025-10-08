import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <h1 className="mb-4">Welcome to School Portal</h1>
        <div className="d-flex gap-3 justify-content-center">
          <button 
            className="btn btn-primary btn-lg px-4"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button 
            className="btn btn-outline-primary btn-lg px-4"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;