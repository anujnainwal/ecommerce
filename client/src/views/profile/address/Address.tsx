import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Country, State, City } from "country-state-city";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Select from "react-select";

import { register_address_validation } from "../../../validations/address/address.validation";
import AddressList from "./AddressList";
import { useDispatch } from "react-redux";
import { fetchAddressListThunk } from "../../../features/addresses/addressesThunk";
interface dataTypes {
  _id: string;
  role: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  accessToken: string;
}

interface AddressFormInputs {
  name: string;
  phoneNumber: string;
  phoneNumber2: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  landmark: string;
  addressType: "Home" | "Work" | "Other";
}

const Address = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddressFormInputs>({
    resolver: joiResolver(register_address_validation),
  });
  const data = localStorage.getItem("userData");
  const userInfo: dataTypes = data ? JSON.parse(data) : null;
  let dispatch = useDispatch<any>();

  const [address, setAddress] = useState<any>([
    {
      id: 1,
      name: "Anuj Nainwal",
      phoneNumber: "1234567890",
      phoneNumber2: "9876543210",
      address: "123 Main St",
      locality: "Central Park",
      city: "New York",
      state: "NY",
      country: "USA",
      zip: "10001",
      landmark: "Near Park",
      isDefault: true,
      addressType: "Home",
    },
  ]);

  const [isFormVisible, setFormVisible] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    dispatch(fetchAddressListThunk({ token: userInfo.accessToken }));
  }, [userInfo.accessToken]);

  const onSubmit: SubmitHandler<AddressFormInputs> = (data) => {
    setAddress([...address, { ...data, id: Date.now() }]);
    setFormVisible(false);
  };

  const handleCancel = () => {
    setFormVisible(false);
  };

  return (
    <div className="relative p-6 max-w-3xl mx-auto">
      {/* Add Address Form */}
      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-md">
        {isFormVisible ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              Add a New Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name")}
                  className="border p-2 rounded w-full"
                />
                {errors.name && (
                  <span className="text-red text-xs">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phoneNumber")}
                  className="border p-2 rounded w-full"
                />
                {errors.phoneNumber && (
                  <span className="text-red text-xs">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Alternate Phone Number"
                  {...register("phoneNumber2")}
                  className="border p-2 rounded w-full"
                />
                {errors.phoneNumber2 && (
                  <span className="text-red text-xs">
                    {errors.phoneNumber2.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Address"
                  {...register("address")}
                  className="border p-2 rounded w-full"
                />
                {errors.address && (
                  <span className="text-red text-xs">
                    {errors.address.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Locality"
                  {...register("locality")}
                  className="border p-2 rounded w-full"
                />
                {errors.locality && (
                  <span className="text-red text-xs">
                    {errors.locality.message}
                  </span>
                )}
              </div>
              <>
                <div>
                  {" "}
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
                        className="w-full"
                      />
                    )}
                  />
                  {errors.country && (
                    <span className="text-red text-xs">
                      {errors.country.message}
                    </span>
                  )}
                </div>

                {/* State Selector */}
                <div>
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
                        className="w-full"
                      />
                    )}
                  />
                  {errors.state && (
                    <span className="text-red text-xs">
                      {errors.state.message}
                    </span>
                  )}
                </div>

                {/* City Selector */}
                <div>
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
                        className="w-full"
                      />
                    )}
                  />
                  {errors.city && (
                    <span className="text-red text-xs">
                      {errors.city.message}
                    </span>
                  )}
                </div>
              </>

              <div>
                <input
                  type="text"
                  placeholder="ZIP Code"
                  {...register("zip")}
                  className="border p-2 rounded w-full"
                />
                {errors.zip && (
                  <span className="text-red text-xs">{errors.zip.message}</span>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Landmark"
                  {...register("landmark")}
                  className="border p-2 rounded w-full"
                />
                {errors.landmark && (
                  <span className="text-red text-xs">
                    {errors.landmark.message}
                  </span>
                )}
              </div>
              <div>
                <select
                  {...register("addressType")}
                  className="border p-2 rounded w-full"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                </select>
                {errors.addressType && (
                  <span className="text-red text-xs">
                    {errors.addressType.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <div>
                <button className="bg-blue text-white p-2 rounded-md">
                  Use My Current Location
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue text-white px-4 py-2 rounded-md"
                >
                  Save Address
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div
            onClick={() => setFormVisible(true)}
            className="text-blue font-bold uppercase flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaPlus className="text-lg" /> Add a New Address
          </div>
        )}
      </div>

      {/* Address List */}
      <AddressList addresses={address} />
    </div>
  );
};

export default Address;
