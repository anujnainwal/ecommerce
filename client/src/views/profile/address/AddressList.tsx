import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditAddress from "./EditAddress";

interface Address {
  _id: number;
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

interface AddressListProps {
  addresses: any[];
  onSave: (updatedAddress: Address) => void;
  onDelete: (id: number) => void;
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  onSave,
  onDelete,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedAddress, setEditedAddress] = useState<Address | null>(null);

  let { isLoading, isError, data } = useSelector(
    (state: any) => state.address_slice
  );

  const handleEditClick = (address: Address) => {
    setEditingId(address._id);
    setEditedAddress({ ...address });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedAddress(null);
  };

  const handleSaveClick = () => {
    if (editedAddress) {
      onSave(editedAddress);
      handleCancelEdit();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (editedAddress) {
      setEditedAddress({ ...editedAddress, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="p-6">
      {data?.addressInfo?.length > 0 ? (
        data?.addressInfo?.map((item: any) => (
          <div
            key={item._id}
            className="border border-gray-300 p-4 rounded-lg shadow-md mb-6 bg-white hover:shadow-lg transition-shadow duration-300"
          >
            {editingId === item._id ? (
              <div>
                <EditAddress editId={editingId} details={editedAddress} />

                {/* <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editedAddress?.name || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={editedAddress?.phoneNumber || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={editedAddress?.address || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  ></textarea>
                </div> */}

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveClick}
                    className="px-4 py-2 text-sm text-white bg-blue rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                    {item?.addressType}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item._id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="font-semibold text-lg mb-1">{item.name}</p>
                <p className="text-gray-700 text-sm mb-1">
                  Phone: {item.phoneNumber}
                  {item.phoneNumber2 && `, ${item.phoneNumber2}`}
                </p>
                <p className="text-gray-600 text-sm">
                  {item.address}, {item.locality}, {item.zip}, {item.city},{" "}
                  {item.state}, {item.country}
                </p>
                {item.isDefault && (
                  <span className="text-xs text-green-600 font-semibold">
                    Default Address
                  </span>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No addresses found.</p>
      )}
    </div>
  );
};

export default AddressList;
