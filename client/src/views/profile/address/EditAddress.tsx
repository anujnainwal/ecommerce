import React, { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import Select from "react-select";

interface AddressForm {
  name: string;
  phoneNumber: string;
  phoneNumber2?: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  landmark?: string;
  isDefault?: boolean;
  addressType: "Home" | "Work" | "Other";
}

interface EditInfo {
  editId: string;
  details: AddressForm;
}

const EditAddress: React.FC<EditInfo> = ({ editId, details }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddressForm>({ defaultValues: details });

  const [states, setStates] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    if (details.country) {
      let country = Country.getAllCountries();
      let findCountry = country.filter((items) => {
        return items.name.toLowerCase() == details.country;
      });
      console.log("asdsa", findCountry);
      setSelectedCountry(findCountry[0]);
    }
    if (details.state) {
      let states = State.getAllStates();
      let findState = states.filter((items) => {
        console.log("sda", items);
        return items.name.toLowerCase() == details.country;
      });
      console.log("Sad", findState);
      setSelectedState(findState[0]);
    }
  }, [details]);

  useEffect(() => {
    if (selectedCountry) {
      console.log("==>sd", details.state);
      setStates(
        State.getStatesOfCountry(selectedCountry || details.state) || []
      );
    }
  }, [selectedCountry]);

  const onSubmit: SubmitHandler<AddressForm> = (data) => {
    console.log("Updated ,Address:", data);
  };

  return (
    <>
      <h3 className="text-xl font-bold mb-4">Edit Address: {editId}</h3>
      {console.log("sadas", details)}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("name")}
              className="border p-2 rounded w-full mt-2"
            />
            {errors.name && (
              <span className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              {...register("phoneNumber")}
              className="border p-2 rounded w-full mt-2"
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-xs mt-1">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          {/* Alternate Phone Number */}
          <div>
            <label htmlFor="phoneNumber2" className="block text-sm font-medium">
              Alternate Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter an alternate phone number"
              {...register("phoneNumber2")}
              className="border p-2 rounded w-full mt-2"
            />
            {errors.phoneNumber2 && (
              <span className="text-red-500 text-xs mt-1">
                {errors.phoneNumber2.message}
              </span>
            )}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter your address"
              {...register("address")}
              className="border p-2 rounded w-full mt-2"
            />
            {errors.address && (
              <span className="text-red-500 text-xs mt-1">
                {errors.address.message}
              </span>
            )}
          </div>

          {/* Locality */}
          <div>
            <label htmlFor="locality" className="block text-sm font-medium">
              Locality
            </label>
            <input
              type="text"
              placeholder="Enter your locality"
              {...register("locality")}
              className="border p-2 rounded w-full mt-2"
            />
            {errors.locality && (
              <span className="text-red-500 text-xs mt-1">
                {errors.locality.message}
              </span>
            )}
          </div>

          {/* Country Selector */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium">
              Country
            </label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={Country.getAllCountries()}
                  getOptionLabel={(e) => e.name}
                  getOptionValue={(e) => e.isoCode}
                  value={selectedCountry}
                  onChange={(item) => {
                    field.onChange(item.name);
                    setSelectedCountry(item);
                  }}
                  placeholder="Select Country"
                  className="w-full mt-2"
                />
              )}
            />
            {errors.country && (
              <span className="text-red-500 text-xs mt-1">
                {errors.country.message}
              </span>
            )}
          </div>

          {/* State Selector */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium">
              State
            </label>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={
                    selectedCountry
                      ? State.getStatesOfCountry(selectedCountry.isoCode)
                      : []
                  }
                  getOptionLabel={(e) => e.name}
                  getOptionValue={(e) => e.isoCode}
                  value={selectedState}
                  onChange={(item) => {
                    field.onChange(item.name);
                    setSelectedState(item);
                  }}
                  placeholder="Select State"
                  className="w-full mt-2"
                />
              )}
            />
            {errors.state && (
              <span className="text-red-500 text-xs mt-1">
                {errors.state.message}
              </span>
            )}
          </div>

          {/* City Selector */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium">
              City
            </label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={
                    selectedState
                      ? City.getCitiesOfState(
                          selectedState.countryCode,
                          selectedState.isoCode
                        )
                      : []
                  }
                  getOptionLabel={(e) => e.name}
                  getOptionValue={(e) => e.name}
                  value={selectedCity}
                  onChange={(item) => {
                    field.onChange(item.name);
                    setSelectedCity(item);
                  }}
                  placeholder="Select City"
                  className="w-full mt-2"
                />
              )}
            />
            {errors.city && (
              <span className="text-red-500 text-xs mt-1">
                {errors.city.message}
              </span>
            )}
          </div>

          {/* ZIP Code */}
          <div>
            <label htmlFor="zip" className="block text-sm font-medium">
              ZIP Code
            </label>
            <input
              type="text"
              placeholder="Enter ZIP Code"
              {...register("zip")}
              className="border p-2 rounded w-full mt-2"
            />
            {errors.zip && (
              <span className="text-red-500 text-xs mt-1">
                {errors.zip.message}
              </span>
            )}
          </div>

          {/* Landmark */}
          <div>
            <label htmlFor="landmark" className="block text-sm font-medium">
              Landmark (Optional)
            </label>
            <input
              type="text"
              placeholder="Enter landmark (optional)"
              {...register("landmark")}
              className="border p-2 rounded w-full mt-2"
            />
            {errors.landmark && (
              <span className="text-red-500 text-xs mt-1">
                {errors.landmark.message}
              </span>
            )}
          </div>

          {/* Address Type */}
          <div>
            <label htmlFor="addressType" className="block text-sm font-medium">
              Address Type
            </label>
            <select
              {...register("addressType")}
              className="border p-2 rounded w-full mt-2"
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
            {errors.addressType && (
              <span className="text-red-500 text-xs mt-1">
                {errors.addressType.message}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-6 w-full md:w-auto"
        >
          Save Address
        </button>
      </form>
    </>
  );
};

export default EditAddress;
