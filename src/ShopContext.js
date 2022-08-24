import { createContext, useReducer, useContext } from "react";
import { initialState, shopReducer } from "./shopReducer";

const ShopContext = createContext(initialState);

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const addToCart = (product) => {
    const updatedCart = [...state.products, product];
    updatePrice(updatedCart);
    dispatch({ type: "ADD_TO_CART", payload: { products: updatedCart } });
  };

  const removeFromCart = (product) => {
    const updatedCart = state.products.filter(
      (currentProduct) => currentProduct.id !== product.id
    );
    updatePrice(updatedCart);

    dispatch({ type: "REMOVE_FROM_CART", payload: { products: updatedCart } });
  };

  const updatePrice = (products) => {
    const total = products.reduce((accumulator, value) => {
      return accumulator + value.price;
    }, 0);
    //   let total = 0;
    //   products.forEach((product) => (total += product.price));
    dispatch({ type: "UPDATE_PRICE", payload: { total } });
    // };
  };

  const value = {
    total: state.total,
    products: state.products,
    addToCart,
    removeFromCart
  };

  console.log("state.total", state.total);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

const useShop = () => {
  const context = useContext(ShopContext);

  if (context === undefined)
    throw new Error("useshop must be used in shopcontext");

  return context;
};

export default useShop;
