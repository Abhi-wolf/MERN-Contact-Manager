import { Button, Link, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { REACT_APP_BASE_URL } from "../../constants";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { toast } from "sonner";

function SignInForm() {
  const navigate = useNavigate();
  const { setToken, setNewUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    console.log(data.email);
    const { email, password } = data;
    setIsLoading(true);
    try {
      const response = await axios.post(`${REACT_APP_BASE_URL}/users/login`, {
        email,
        password,
      });
      setToken(response.data.accessToken);
      setNewUser(response.data.name);
      console.log(response.data);
      reset();
      toast.success("Signed in successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      reset();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 text-xl w-[80%] justify-center items-center"
    >
      <div className="w-full  flex flex-col gap-2">
        <label className="">Email</label>
        <TextField.Root size="3">
          <TextField.Input
            type="email"
            disabled={isLoading}
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email address",
              },
            })}
          />
        </TextField.Root>
        {errors.email && (
          <p className="text-red-300 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="w-full  flex flex-col gap-2">
        <label>Password</label>
        <TextField.Root size="3">
          <TextField.Input
            type="password"
            disabled={isLoading}
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
        </TextField.Root>
        {errors.password && (
          <p className="text-red-300 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Button size="4" disabled={isLoading}>
          Sign in
        </Button>
      </div>

      <div className="w-full flex justify-center ">
        <Link size="2" color="blue" onClick={() => navigate("/signUp")}>
          Don't have an account? Sign Up
        </Link>
      </div>
    </form>
  );
}

export default SignInForm;
