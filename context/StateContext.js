//IMPORT NECESSARY LIBARIES
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
} from "react";
import { toast } from "react-hot-toast";

//USE THE CREATECONTEXT HOOK TO CREATE CONTEXT
const Context = createContext();

export const StateContext = ({ children }) => {
  //WE ARE PASSING THE CHILDREN PROPS SO THIS WILL AFFECT ALL THE CHILDREN

  //DECLARE INITIAL STATES NEEDED IN THE PROJECT
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  //Create a function to manage the states

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item?._id === product?._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
        product.quantity = quantity;
        setCartItems([...cartItems, {...product}])
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item?._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice  - foundProduct.price * foundProduct.quantity);

    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item?._id !== id);

    if(value === 'inc'){
      setCartItems( [...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
    }else if(value === 'dec'){
      if(foundProduct.quantity > 1){
        setCartItems( [...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
      }


    }
  }
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  //THEN CREATE CONTEXT PROVIDER IN THE RETURN BLOCK, REMEMBER CONTEXT IS DECLARED ALREADY.
  //we just wrap everything with the context.provider so all the children can have access to it
  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalQuantities,
        setTotalPrice
      }}
    >
      {children}
    </Context.Provider>
  );
  //THEN GO TO PAGES, IN _APP.JS
};

//CREATE A FUNCTION THAT WILL MAKE YOU TO EASILY GRAB THE STATE, this will allow you to use your useStateContext just like a hook.
export const useStateContext = () => useContext(Context);
