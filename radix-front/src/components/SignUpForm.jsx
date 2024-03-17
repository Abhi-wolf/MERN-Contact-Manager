import { Button, Link, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useForm } from "react-hook-form";
import { REACT_APP_BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

function SignUpForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    const { fullName, email, password } = data;
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${REACT_APP_BASE_URL}/users/register`,
        {
          fullName,
          email,
          password,
        }
      );

      console.log(response);
      toast.success("Registration success full");
      navigate("/signIn");
    } catch (err) {
      console.log(err.Axios);
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
      reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 text-xl w-[80%] justify-center items-center"
    >
      <div className="w-full  flex flex-col gap-1">
        <label className="">Full Name</label>
        <TextField.Root size="3">
          <TextField.Input
            type="name"
            disabled={isLoading}
            placeholder="Full name *"
            {...register("fullName", {
              required: "Name is required",
            })}
          />
        </TextField.Root>
      </div>
      <div className="w-full  flex flex-col gap-1">
        <label className="">Email</label>
        <TextField.Root size="3">
          <TextField.Input
            type="email"
            disabled={isLoading}
            placeholder="Email address *"
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
          <p className="text-red-300 text-sm capitalize">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="w-full  flex flex-col gap-1">
        <label>Password</label>
        <TextField.Root size="3">
          <TextField.Input
            type="password"
            disabled={isLoading}
            placeholder="Password *"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value:
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])/,
                message:
                  "Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character",
              },
            })}
          />
        </TextField.Root>
        {errors.password && (
          <p className="text-red-400 text-sm capitalize">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <Button size="4" disabled={isLoading}>
          Sign up
        </Button>
      </div>

      <div className="w-full flex justify-center ">
        <Link size="2" color="blue" onClick={() => navigate("/signIn")}>
          Already have an account? Sign In
        </Link>
      </div>
    </form>
  );
}

export default SignUpForm;
