import React, { useState,useContext } from "react";
import itemContext from "../Context/ItemContext";

const IncreaseQuantity = ({ close,id }) => {
    const context = useContext(itemContext)
  const {addItem,getItems,items} = context
  const baseurl = "https://inventory-management-x54z.onrender.com/api/";

  const [formData, setFormData] = useState({
    quantity: 0,
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseurl + "log/increaseQuantity/"+id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: localStorage.getItem("inventoryToken"),
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();
      console.log(json);
      if (json.success) {
        getItems();
        close();
        window.alert("Successfully!");
      }
    } catch (error) {
      console.log(error);
      window.alert("Error");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="shadow-md rounded px-8 pt-6 pb-8"
      >
        <h2 className="block text-gray-700 text-xl font-bold mb-2">
          Increase Item Quantity
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="quantity"
          >
            Quantity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            type="number"
            placeholder="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}

            required={true}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Increase
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncreaseQuantity;
