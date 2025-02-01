import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { registerSchema } from "../../validations/auth/registerSchema.validation";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: joiResolver(registerSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[#f8f4fb2b] rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Create Account
      </h2>
      <p className="text-gray-400 text-center mb-4">
        Please register below to create an account
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {[
          { id: "username", label: "Username" },
          { id: "email", label: "Email", type: "email" },
          { id: "password", label: "Password", type: "password" },
          {
            id: "confirm_password",
            label: "Confirm Password",
            type: "password",
          },
        ].map(({ id, label, type = "text" }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block text-sm font-medium text-gray-700"
            >
              {label}
            </label>

            <input
              {...register(id as keyof FormData)}
              id={id}
              type={type}
              className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors[id as keyof FormData]
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              style={{
                border: `${
                  errors[id as keyof FormData] ? "1px solid red" : ""
                }`,
                outline: "none",
              }}
            />

            {errors[id as keyof FormData] && (
              <p className="text-red-500 text-xs" style={{ color: "red" }}>
                {errors[id as keyof FormData]?.message}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Register
        </button>
        <div className="text-center">
          <a href="/" className="text-blue-600 hover:underline">
            Back to Home
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
