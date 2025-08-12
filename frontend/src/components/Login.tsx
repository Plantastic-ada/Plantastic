import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import logo from "../assets/img/plantastic_logo2.png";
import { clsx } from "clsx";
import AuthCard from "./AuthCard";
import SubmitButton from "./SubmitButton";
import InputField from "./InputField";
import FooterLink from "./FooterCard";
import Description from "./Description";
import BackgroundWrapper from "../components/BackgroundWrapper";

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

  return (
    <BackgroundWrapper>
    <div
      className={clsx(
        "w-full h-screen flex flex-col lg:flex-row",
        "bg-[url('./assets/img/bg-img2.jpg')] bg-cover bg-center relative"
      )}
    >
      {/* Global overlay */}
      <div className="absolute inset-0 bg-[#253025]/90"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row flex-1">
        {/*  Logo & description  */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6">
          <Description
            logo={logo}
            descriptionTextJSX={
              <>
                🌿 <b>Plantastic</b> – The app that pampers your plants! 🌱
                <br />
                No more forgetting or overdoing it!
                <br />
                Receive <b>smart reminders</b>, tailored <b>advice</b>, and{" "}
                <b>fun facts</b>.
                <br />
                🍀 With <b>Plantastic</b>, grow your <b>indoor garden</b> 🍀
              </>
            }
          />
        </div>

        {/*  Form  */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 py-6">
          <AuthCard title="Login">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <InputField
                label="Pseudo or email"
                placeholder="Enter pseudo or email"
                register={register("pseudoOrEmail", {
                  required: "This field is required",
                })}
                error={errors.pseudoOrEmail}
              />

              <InputField
                label="Password"
                placeholder="Enter password"
                type="password"
                register={register("password", {
                  required: "Password is required",
                })}
                error={errors.password}
              />

              <SubmitButton loading={loading} text="Login" />

              <FooterLink
                text={
                  <>
                    Don't have an account?
                    <br />
                  </>
                }
                linkText="Register here"
                to="/signup"
              />

              {error && (
                <span className="text-red-500 block mt-2">{error}</span>
              )}
            </form>
          </AuthCard>
        </div>
      </div>
    </div>
    </BackgroundWrapper>
  );

  //  LOGIN FORM
  // return (
  //   <div className="w-full h-screen flex bg-[url(./assets/img/bg-img.jpg)] bg-cover bg-center bg-[#4F674F] bg-opacity-90 ">
  //     {/*Left half of the screen - logo & description*/}
  //     <div className="w-1/2 h-full flex flex-col bg-[#4F674F] bg-opacity-90 items-center justify-center">
  //       <img src={logo} alt="Plantastic logo" className="" />
  //       <div className="block mt-2 text-sm antialiased font-normal leading-normal text-center text-inherit text-[#FFFFE3] font-montserrat">
  //         <p>
  //           🌿 <b> Plantastic </b>  – The app that pampers your plants! 🌱 <br /> No more
  //           forgetting or overdoing it! <br /> Receive <b>smart reminders</b> , tailored <b>advice</b>
  //           ,and <b>fun facts</b> . <br /> 🍀 With <b>Plantastic,</b>  grow your <b>indoor
  //           garden</b>  🍀
  //         </p>
  //       </div>
  //     </div>

  //     {/*Right half of the screen - login form*/}
  //     <div className="w-1/2 h-full flex flex-col bg-[#4F674F] bg-opacity-90 items-center justify-center ">
  //       <div className="bg-white shadow-md shadow-black  border-[#4f674f] rounded-lg max-w-sm p-4 sm:p-6 lg:p-8">
  //         <h1 className="text-2xl font-bold text-gray-900 font-montserrat">
  //           Login
  //         </h1>
  //         <form onSubmit={handleSubmit(onSubmit)}>
  //           <label className="font-montserrat text-sm font-bold text-gray-900 block mt-4 mb-1">
  //             Pseudo or email:{" "}
  //           </label>
  //           <input
  //             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
  //             type="text"
  //             placeholder="Enter pseudo or email"
  //             // ... is used for collecting arguments or copy/fuse objects or arrays => here: pseudoOrEmail
  //             {...register("pseudoOrEmail")}
  //             required
  //           />
  //           {errors.pseudoOrEmail && (
  //             <p className="error">{errors.pseudoOrEmail.message} </p>
  //           )}

  //           <label className="font-montserrat text-sm font-bold text-gray-900 block mt-4 mb-1">
  //             Password:
  //           </label>
  //           <input
  //             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
  //             type="password"
  //             placeholder="Enter password"
  //             {...register("password")}
  //             required
  //           />
  //           {errors.password && (
  //             <p className="error">{errors.password.message} </p>
  //           )}

  //           <button
  //             type="submit"
  //             disabled={loading}
  //             className="w-full font-montserrat text-white bg-[#4F674F] hover:bg-green-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6 mb-1"
  //           >
  //             {loading ? "Logging in..." : "Login"}
  //           </button>
  //           <div className="text-sm font-medium mt-2 mb-1 text-gray-500">
  //             <p>
  //               Don't have an account?{" "}
  //               <Link className="text-blue-600 hover:underline" to="/signup">
  //                 Please register here
  //               </Link>
  //             </p>
  //           </div>
  //         </form>
  //         {error && <span className="text-red-500">{error}</span>}
  //       </div>
  //     </div>
  //   </div>
  // );

  // return (
  //   <div
  //     className={clsx(
  //       "w-full h-screen flex",
  //       "bg-[url('./assets/img/bg-img2.jpg')] bg-cover bg-center",
  //       "bg-[#4F674F] bg-opacity-90"
  //     )}
  //   >
  //     {/* Left half of the screen - only on large screens */}
  //     <div className="w-1/2 h-full hidden lg:flex flex-col bg-[#253025] bg-opacity-90 items-center justify-center">
  //       <Description
  //         logo={logo}
  //         descriptionTextJSX={
  //           <>
  //             🌿 <b> Plantastic</b> – The app that pampers your plants! 🌱{" "}
  //             <br />
  //             No more forgetting or overdoing it!
  //             <br />
  //             Receive <b>smart reminders,</b> tailored <b>advice</b>
  //             ,and <b>fun facts</b> .<br />
  //             🍀 With <b>Plantastic,</b> grow your <b>indoor garden</b> 🍀
  //           </>
  //         }
  //       />
  //     </div>

  //     {/* Right half of the screen - login form */}
  //     <div className="w-full lg:w-1/2 h-full flex flex-col bg-[#253025] bg-opacity-90 items-center justify-center px-4">
  //       <AuthCard title="Login">
  //         <form onSubmit={handleSubmit(onSubmit)} noValidate>
  //           <InputField
  //             label="Pseudo or email"
  //             placeholder="Enter pseudo or email"
  //             register={register("pseudoOrEmail", {
  //               required: "This field is required",
  //             })}
  //             error={errors.pseudoOrEmail}
  //           />

  //           <InputField
  //             label="Password"
  //             placeholder="Enter password"
  //             type="password"
  //             register={register("password", {
  //               required: "Password is required",
  //             })}
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
