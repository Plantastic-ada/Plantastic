import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { User } from '../mocks/handlers';

export function Login() {
//   const [users, setUsers] = useState<User[]>([]);
  // const [pseudo, setPseudo] = useState("");
  // const [email, setEmail] = useState("");
  const [pseudoOrEmail, setPseudoOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const checkLogin = async (e: React.FormEvent) => {
    e.preventDefault();                    
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ pseudoOrEmail, password }),
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
      <form onSubmit={checkLogin}>
        <label>Pseudo or email: </label>
        <input
          type="text"
          onChange={(e) => setPseudoOrEmail (e.target.value)} 
          required
        />

        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{loading ? "Signing in..." : "Sign in"}</button>
      </form>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}



export default Login;

// export default function Login() {
//   return <div>LOGIN PAGE</div>;
// }
