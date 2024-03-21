import React, { useContext, useState } from "react";
import itemContext from "../Context/ItemContext";

const AddItem = (props) => {
  const context = useContext(itemContext)
  const {addItem,getItems} = context
  const {close} = props
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const json = await addItem(formData);
      console.log(json);
      if (json.success) {
        getItems()
        close()
        window.alert("Added Successfully!");
      }
    } catch (error) {
      console.log(error);
      window.alert("Error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
      >
        {/* Name and Category */}
        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm text-lg border-gray-300 rounded-md p-2 outline-blue-500"
            required={true}
            
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm text-lg border-gray-300 rounded-md p-2 outline-blue-500"
            required={true}
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            required={true}
            className="mt-1 block w-full shadow-sm text-lg border-gray-300 rounded-md p-2 outline-blue-500"
          />
        </div>

        {/* Quantity and Sold */}
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm text-lg border-gray-300 rounded-md p-2 outline-blue-500"
            required={true}
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            required={true}
            min={1}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm text-lg border-gray-300 rounded-md p-2 outline-blue-500"
          />
        </div>

        {/* Submit Button - Full Width at Bottom */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
