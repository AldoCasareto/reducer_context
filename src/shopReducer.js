export const initialState = {
  total: 0,
  products: []
};

export const shopReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TO_CART":
      console.log("addtocart", payload);
      return { ...state, products: payload.products };
    case "REMOVE_FROM_CART":
      console.log("remove to cart", payload);
      return { ...state, products: payload.products };
    case "UPDATE_PRICE":
      console.log("update price", payload);
      return { ...state, total: payload.total };
    default:
      throw new Error("no case for type found in shop reducer");
  }
};
