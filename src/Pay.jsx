import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import logo2 from "./logo2.jpg";
import axios from "axios";

const CODE =
  "pk_test_51JyI2gJrbknIQQ1lnp26R8UZiaHm64CpaEVlrSSyhFgdFY32b8KgIZCg9yooCZjmJhlcxHdrzk0Yk4QV87LWcswI00QF8YU3oQ";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const submitRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/checkout/lucre",
          {
            tokenId: stripeToken.id,
            amount: 3000,
          }
        );
        console.log(res.data);
        history.push("/nod");
      } catch (err) {
        console.log(err);
      }
    };

    stripeToken && submitRequest();
  }, [stripeToken, history]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {stripeToken ? (
        <span>Processing.. Pls wait</span>
      ) : (
        <StripeCheckout
          name="The Enigma Project"
          image={logo2}
          billingAddress
          shippingAddress
          description="Tour total is $30"
          amount={3000}
          token={onToken}
          stripeKey={CODE}
          email="info@enigmaproject.com"
        >
          <button
            style={{
              border: "none",
              width: 120,
              borderRadius: 5,
              padding: "20px",
              backgroundColor: "black",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Pay
          </button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;
