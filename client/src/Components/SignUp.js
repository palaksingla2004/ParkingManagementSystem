import React from 'react'
import '../styles/Signup.css'

const signup = () => {
  return (
    <div>

      <div class="signup-container">
    <h2>Signup</h2>
    <form>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" required/>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required/>
      </div>
      <div class="form-group">
        <label for="phone">Phone No</label>
        <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" title="Enter a valid 10-digit phone number" required/>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required/>
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" name="role" required>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
      <button type="submit" class="signup-button">Sign Up</button>
    </form>
  </div>
    </div>
    
  )
}

export default signup