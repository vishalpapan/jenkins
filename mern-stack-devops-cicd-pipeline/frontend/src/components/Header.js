import React from 'react';

const Header = ({ user, logout }) => {
  return (
    <header className="header">
      <h1>🚀 DevOps Task Manager</h1>
      {user && (
        <div className="header-right">
          <span>Welcome, {user.username}!</span>
          <button className="btn btn-secondary" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;