import React, { useState, type FormEvent} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";


export function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();


  const {
    register, 
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("authToken", token);
        nav("/home", { replace: true });
      } else {
        const { message } = await response.json();
        setError(message || "Invalid pseudo or password");
      }
    } catch (err) {
      setError(
        `An error as occured while trying to log in, please try again. ${err}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Pseudo or email: </label>
        <input
          type="text"
          placeholder="Enter pseudo or email"
          {...register("pseudoOrEmail")} 
          required
        />
        {errors.pseudoOrEmail && (<p className="error">{errors.pseudoOrEmail.message} </p>)}

        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter password"
          {...register("password")}
          required
        />
        {errors.password && (<p className="error">{errors.password.message} </p>)}


        <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
        </button>
        <p>Don't have an account? Please register <Link to="/signup">here</Link></p>
      </form>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}

export default Login;
