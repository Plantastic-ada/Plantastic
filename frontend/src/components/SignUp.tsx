import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { signUpSchema, type SignUpFormData } from "../schemas/signUpSchema";

const SignUp: React.FC = () => {
  const [apiMessage, setApiMessage] = useState<React.ReactNode>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema), // replaces submitHandler
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (formData) => {
    try {
      const response = await fetch("api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer-fake-token-123",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 401) {
        setApiMessage("Missing or invalid token");
        return;
      }
      if (!response.ok) {
        setApiMessage(`Error: ${data.error || "Registration failed"}`);
        return;
      }
      setApiMessage(
        <>
          Welcome <strong>{data[0].pseudo}</strong>! Registration successful.{" "}
          Please <Link to="/login">login</Link> to enjoy Plantastic 🌿
        </>
      );
      reset();
    } catch (error: unknown) {
      console.error(error);
      setApiMessage("An error occured.");
    }
  };

  // SIGN UP FORM
  return (
    <>
      <h1>Sign up</h1>
      
      <form className="App" onSubmit={handleSubmit(onSubmit)} noValidate > {/*disables the HTML validation, done with zod*/}
        <input type="text" placeholder="Username" {...register("pseudo")} />
        {errors.pseudo && <p className="error">{errors.pseudo.message} </p>}

        <input type="email" placeholder="Email" {...register("email")} />
        {errors.email && <p className="error">{errors.email.message} </p>}

        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        {errors.password && <p className="error">{errors.password.message} </p>}

        <input type="submit" value="Create an account" />
        <p>
          Already have an account? You can <Link to="/login">log in here</Link>
        </p>
      </form>
      {apiMessage && <p className="message">{apiMessage}</p>}
    </>
  );
};

export default SignUp;
