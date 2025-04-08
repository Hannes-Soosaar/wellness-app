import React from "react";
import api from "../lib/axios";


interface LoginProps {
  // Define any props you want to pass to the component
}

const Login: React.FC = () => {

  const [email:String, setEmail:string] = React.useState("");
  const [password:String, setPassword:string] = React.useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      


return (

  <div className="login-container">
    <h2>Login</h2>
    <form>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
)
}

export default Login;