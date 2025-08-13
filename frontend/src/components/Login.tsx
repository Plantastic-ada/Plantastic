import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
//STYLES COMPONENTS
import AuthCard from "./AuthCard";
import SubmitButton from "./SubmitButton";
import InputField from "./InputField";
import FooterLink from "./FooterCard";
import Description from "./Description";
import BackgroundWrapper from "./BackgroundWrapper";

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
      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row flex-1">
        {/*  Logo & description  */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6">
          <Description
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
    {/* </div> */}
    </BackgroundWrapper>
  );
}

export default Login;
