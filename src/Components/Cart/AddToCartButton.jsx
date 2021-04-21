import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthentication, useStateContext } from "../../context";
import { isAlreadyAdded, addProductToCart } from "../../utils";

export const AddToCartButton = ({
  product,
  setMessage,
  setDisableButton,
  disableButtonWhileProcessing
}) => {
  const navigate = useNavigate();
  const { state, dispatch } = useStateContext();
  const { isUserLoggedIn, userId } = useAuthentication();

  let isRendered = useRef(false);
  useEffect(() => {
    isRendered.current = true;
    return () => {
      isRendered.current = false;
    };
  }, []);

  return (
    <>
      <button
        style={{ display: !product.inStock ? "none" : "block" }}
        disabled={disableButtonWhileProcessing}
        className={
          disableButtonWhileProcessing
            ? "btn btn-outline-primary btn-disabled btn-sm-size"
            : "btn btn-outline-primary btn-sm-size"
        }
        onClick={() => {
          isUserLoggedIn
            ? isAlreadyAdded(state.itemsInCart, product._id)
              ? navigate("/cart")
              : addProductToCart({
                  setMessage,
                  setDisableButton,
                  dispatch,
                  state,
                  product,
                  isRendered,
                  userId
                })
            : navigate("/login");
        }}
      >
        {isAlreadyAdded(state.itemsInCart, product._id)
          ? "Go to Cart"
          : "Add to Cart"}
      </button>
    </>
  );
};
