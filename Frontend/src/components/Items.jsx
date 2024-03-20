import React, { useState, useEffect } from "react";

const Items = () => {
  const baseurl = "http://localhost:5000/api/";
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);

  const [searchedItems, setSearchedItems] = useState(items);
  const handleAddItem = () => {};

  const handleRemoveItem = (index) => {};

  const searchItems = (query) => {
    if (query.length >= 1) {
      const searched = items.filter((item) => {
        if (item.name.toLowerCase().includes(query.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
      setSearchedItems(searched);
    } else {
      setSearchedItems(items);
    }
  };

  const getItems = async () => {
    try {
      const response = await fetch(baseurl + "item/getItemsByUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authtoken: localStorage.getItem("inventoryToken"),
        },
      });

      const json = await response.json();
      console.log(json);
      if (json.success) {
        setItems(json.items);
        setSearchedItems(json.items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="py-4 px-8">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="🔍&nbsp; &nbsp; Search..."
          onChange={(e) => {
            searchItems(e.target.value)
          }}
          className="border border-gray-300 px-3 py-2 outline-blue-500 rounded-md mr-4"
        />
        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Item
        </button>
      </div>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Sold</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchedItems.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.quantity}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ₹ {item.price.$numberDecimal}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.category}
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.sold}</td>
              <td className="border border-gray-300 px-4 py-2 flex space-x-5 justify-center">
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="border border-slate-400 w-8 h-8 text-lg rounded-md"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="border border-slate-400 w-8 h-8 text-lg rounded-md"
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
