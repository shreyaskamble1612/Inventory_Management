import React, { useState, useEffect ,useContext} from "react";
import { Popup } from "reactjs-popup";
import AddItem from "./AddItem";
import IncreaseQuantity from "./IncreaseQuantity";
import DecreaseQuantity from "./DecreaseQuantity";
import itemContext from "../Context/ItemContext";


const Items = () => {

  const context = useContext(itemContext)
  const {addItem,getItems,items} = context
  const [searchedItems, setSearchedItems] = useState(items);


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



  useEffect(() => {
    setSearchedItems(items)
  }, []);

  return (
    <div className="py-4 px-8">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="🔍&nbsp; &nbsp; Search..."
          onChange={(e) => {
            searchItems(e.target.value);
          }}
          className="border border-gray-300 px-3 py-2 outline-blue-500 rounded-md mr-4"
        />

        <Popup
          trigger={
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Add 
            </button>
          }
          modal
        >
          {(close) => (
            <div className="bg-blue-50 shadow-lg rounded-md border-2">
              <AddItem close={close} />
            </div>
          )}
        </Popup>
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
          {items.map((item, index) => (
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
                <Popup
                  trigger={
                    <button className="border border-slate-400 w-8 h-8 text-lg rounded-md">
                      +
                    </button>
                  }
                  modal
                >
                  {(close) => (
                    <div className="bg-blue-50 shadow-lg rounded-md border-2">
                      <IncreaseQuantity close={close} id={item._id}/>
                    </div>
                  )}
                </Popup>
                <Popup
                  trigger={
                    <button className="border border-slate-400 w-8 h-8 text-lg rounded-md">
                      -
                    </button>
                  }
                  modal
                >
                  {(close) => (
                    <div className="bg-blue-50 shadow-lg rounded-md border-2">
                      <DecreaseQuantity  close={close} id={item._id} />
                    </div>
                  )}
                </Popup>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
