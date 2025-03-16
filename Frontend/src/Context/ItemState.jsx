import { useState } from "react";
import itemContext from "./ItemContext";

const ItemState = (props) => {
  const baseurl = "https://localhost:5000/api/";
  const [items, setItems] = useState([]);

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

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
        setItems(json.items.reverse());
        setValues(json.items);
      }
    } catch (error) {
      console.log(error);
    } 
  };

  const addItem = async (formData) => {
    const response = await fetch(baseurl + "item/addItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("inventoryToken"),
      },
      body: JSON.stringify(formData),
    });

    const json = await response.json();
    return json;
  };

  const setValues = (items) => {
    let totalProducts = items.length;
    setTotalProducts(totalProducts);

    let sum1 = 0;
    let sum2 = 0;
    let sum3 = 0;
    for (let i = 0; i < items.length; i++) {
      let cur = items[i];
      sum1 += cur.price.$numberDecimal * cur.quantity;
      sum2 += cur.quantity;
      sum3 += cur.price.$numberDecimal * cur.sold;
    }
    setTotalPrice(sum1);
    setTotalItems(sum2);
    setTotalSales(sum3);
  };
  return (
    //sending props in context
    <itemContext.Provider
      value={{
        getItems,
        setItems,
        addItem,
        items,
        totalItems,
        totalProducts,
        totalPrice,
        totalSales
      }}
    >
      {props.children}
    </itemContext.Provider>
  );
};

export default ItemState;
