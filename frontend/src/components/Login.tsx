import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
// import { clsx } from "clsx";
// import AuthCard from "./AuthCard";
// import SubmitButton from "./SubmitButton";
// import InputField from "./InputField";
// import FooterLink from "./FooterCard";

export function Login() {
  // Set up states and routing for connection
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include", // stores cookie
        body: JSON.stringify(data),
      });

      // Home Navigation
      if (response.ok) {
        nav("/", { replace: true });

        // Error handling
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

//  LOGIN FORM
  return (
    <div className="w-full h-screen flex bg-[url(./assets/img/bg-img3.jpg)] bg-cover bg-center bg-[#4F674F] bg-opacity-90 ">
      {/*Left half of the screen - bg styling*/}
      <div className="w-1/2 h-full flex flex-col bg-[#4F674F] bg-opacity-90 items-center justify-center"></div>
      {/*Right half of the screen - login form*/}
      <div className="w-1/2 h-full flex flex-col bg-[#4F674F] bg-opacity-90 items-center justify-center ">
        <div className="bg-white shadow-md shadow-black  border-[#4f674f] rounded-lg max-w-sm p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl font-bold text-gray-900 font-montserrat">
            Login
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="font-montserrat text-sm font-bold text-gray-900 block mt-4 mb-1">
              Pseudo or email:{" "}
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              placeholder="Enter pseudo or email"
              // ... is used for collecting arguments or copy/fuse objects or arrays => here: pseudoOrEmail
              {...register("pseudoOrEmail")}
              required
            />
            {errors.pseudoOrEmail && (
              <p className="error">{errors.pseudoOrEmail.message} </p>
            )}

            <label className="font-montserrat text-sm font-bold text-gray-900 block mt-4 mb-1">
              Password:
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="password"
              placeholder="Enter password"
              {...register("password")}
              required
            />
            {errors.password && (
              <p className="error">{errors.password.message} </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-montserrat text-white bg-[#4F674F] hover:bg-green-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6 mb-1"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="text-sm font-medium mt-2 mb-1 text-gray-500">
              <p>
                Don't have an account? <Link className="text-blue-600 hover:underline" to="/signup">Please register here</Link>
              </p>
            </div>
          </form>
        {error && <span className="text-red-500">{error}</span>}
        </div>
      </div>
    </div>
  );

  //  return (
  //   <div
  //     className={clsx(
  //       "w-full h-screen flex",
  //       "bg-[url('./assets/img/bg-img3.jpg')] bg-cover bg-center",
  //       "bg-[#4F674F] bg-opacity-90"
  //     )}
  //   >
  //     {/* Left half of the screen - only on large screens */}
  //     <div className="w-1/2 h-full hidden lg:flex flex-col bg-[#4F674F] bg-opacity-90 items-center justify-center">
  //       {/* Image, logo ou slogan */}
  //     </div>

  //     {/* Right half of the screen - login form */}
  //     <div className="w-full lg:w-1/2 h-full flex flex-col bg-[#4F674F] bg-opacity-90 items-center justify-center px-4">
  //       <AuthCard title="Login">
  //         <form onSubmit={handleSubmit(onSubmit)} noValidate>
  //           <InputField
  //             label="Pseudo or email"
  //             placeholder="Enter pseudo or email"
  //             register={register("pseudoOrEmail", { required: "This field is required" })}
  //             error={errors.pseudoOrEmail}
  //           />

  //           <InputField
  //             label="Password"
  //             placeholder="Enter password"
  //             type="password"
  //             register={register("password", { required: "Password is required" })}
  //             error={errors.password}
  //           />

  //           <SubmitButton loading={loading} text="Login" />

  //           <FooterLink
  //             text="Don't have an account?"
  //             linkText="Register here"
  //             to="/signup"
  //           />

  //           {error && <span className="text-red-500 block mt-2">{error}</span>}
  //         </form>
  //       </AuthCard>
  //     </div>
  //   </div>
  // );
}


export default Login;
