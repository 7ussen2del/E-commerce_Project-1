import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let OrderContext = createContext();

let headers = { token: localStorage.getItem("userToken") };

export default function OrderContextProvider(props) {
  let [ordersDetails, setOrderDetails] = useState([]);
  let [lastOrder, setLastOrder] = useState(null);

  function makeOrder(id, value) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
        { shippingAddress: value },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function getOrders(id) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then((response) => {
        setOrderDetails(response?.data);
        return response;
      })
      .catch((err) => err);
  }

  useEffect(() => {
    setLastOrder(ordersDetails[ordersDetails.length - 1]);
  },[ordersDetails]);

  return (
    <OrderContext.Provider
      value={{ getOrders, ordersDetails, lastOrder, makeOrder }}
    >
      {props.children}
    </OrderContext.Provider>
  );
}
