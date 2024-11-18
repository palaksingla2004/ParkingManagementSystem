import React from 'react'
import '../styles/Login.css';

const login = () => {
  return (
    <div>
      <div class="login-container">
    <h2>Login</h2>
    <form>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
    </div>
  )
}

export default login
  