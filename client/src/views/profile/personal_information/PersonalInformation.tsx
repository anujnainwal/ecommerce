import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  name: string;
  email: string;
  mobile: string;
}

const PersonalInformation: React.FC = () => {
  const [isEditable, setIsEditable] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("Form submitted with data: ", data);
  };

  const handleEdit = () => {
    setIsEditable((prevState) => !prevState);
  };

  return (
    <div className="container mx-auto p-3  max-w-3xl">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Personal Information
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            defaultValue="Anuj Singh"
            {...register("name", { required: "Full Name is required" })}
            disabled={!isEditable}
            className="mt-2 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            defaultValue="user@example.com"
            {...register("email", { required: "Email is required" })}
            disabled={!isEditable}
            className="mt-2 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="tel"
            defaultValue="123-456-7890"
            {...register("mobile", { required: "Mobile number is required" })}
            disabled={!isEditable}
            className="mt-2 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.mobile && (
            <span className="text-red-500 text-sm">
              {errors.mobile.message}
            </span>
          )}
        </div>

        <div className="flex gap-6 items-center">
          <button
            type="button"
            onClick={handleEdit}
            className="px-4 py-4 bg-blue text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {isEditable ? "Cancel" : "Edit"}
          </button>
          {isEditable && (
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            >
              Save
            </button>
          )}
        </div>
      </form>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-800">FAQs</h2>
        <div className="mt-8">
          <h3 className="font-semibold text-lg">
            What happens when I update my email address (or mobile number)?
          </h3>
          <p className="mt-3 text-gray-600">
            Your login email id (or mobile number) changes, likewise. You'll
            receive all your account-related communication on your updated email
            address (or mobile number).
          </p>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold text-lg">
            When will my account be updated with the new email address (or
            mobile number)?
          </h3>
          <p className="mt-3 text-gray-600">
            It happens as soon as you confirm the verification code sent to your
            email (or mobile) and save the changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
