import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import loginSchema from "../../../validations/auth/loginSchema.validation";
import { joiResolver } from "@hookform/resolvers/joi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import loginThunkApi from "../../../features/auth/login/loginThunk";
import customHotAlert from "../../../utils/customToast.helper";

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginDrawerProps {
  onClose: () => void;
}

const LoginDrawer: React.FC<LoginDrawerProps> = ({ onClose }) => {
  let dispatch = useDispatch<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: joiResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    let { email, password, rememberMe } = data;
    let response = await dispatch(
      loginThunkApi({
        email: email,
        password: password,
        rememberMe: rememberMe,
      })
    );
    if (response.payload.status_code === 200) {
      customHotAlert("success", response.payload.message);
      onClose();
    } else if (response.payload.error.code === 400) {
      customHotAlert("error", response.payload.error.message);
    }
  };
  let userState = useSelector((state: any) => state.auth);

  return (
    <div className="p-6 max-w-lg mx-auto  rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Welcome Back
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className={`w-full px-4 py-3 border ${
              errors.email ? "border-red outline-none" : "border-gray-300"
            } rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          />
          {errors.email && (
            <p className="text-sm text-red mt-2">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password <span className="text-red">*</span>
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="Enter your password"
            className={`w-full px-4 py-3 border ${
              errors.password ? "border-red" : "border-gray-300"
            } rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          />
          {errors.password && (
            <p className="text-sm text-red mt-2">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mb-6">
          <button
            type="submit"
            className={`w-full ${
              userState.isLoading
                ? "cursor-not-allowed bg-gray-300 hover:bg-gray-400 text-black"
                : "cursor-pointer"
            } py-3 bg-gray-700 text-white font-semibold text-lg rounded-full hover:bg-gray-800 transition duration-300`}
            disabled={userState.isLoading}
          >
            {userState.isLoading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>

      {/* Forgot Password */}
      <div className="text-center mb-6">
        <button className="text-sm text-blue-500 hover:underline">
          Forgot your password?
        </button>
      </div>

      {/* Create Account */}
      <div>
        <Link
          to="/register"
          className="block w-full py-3 text-center bg-gray-100 text-gray-700 font-semibold text-lg rounded-full border border-gray-300 hover:bg-gray-200 transition duration-300"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default LoginDrawer;
