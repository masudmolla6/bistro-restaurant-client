import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transaction, setTransaction] = useState("");
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [cart, refetch] = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const totalPrice = cart.reduce((total, item) => item.price + total, 0);
  
  useEffect(() => {
    if(totalPrice>0){
          axiosSecure.post("/create-payment-intent", { price: totalPrice })
      .then(res => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
    })
    }
  },[axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

      const { error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card
      })

      if (error) {
        console.error("Error", error);
        setError(error.message);
      }
      else {
        console.log('paymentMethod', paymentMethod);
        setError("");
      }

      const { paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
        clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || "anonymous",
              email:user?.email || "anonymous"
            }
          }
        }
      )
        
      if (confirmError) {
        console.log("confirm Error", confirmError);
      }
      else {
        console.log("paymentIntent", paymentIntent);
        if (paymentIntent.status === "succeeded") {
          console.log("transaction Id", paymentIntent.id);
          setTransaction(paymentIntent.id);

          // now save the payment in the database.
          const payment = {
            email: user?.email,
            price: totalPrice,
            transactionId:paymentIntent.id,
            date: new Date(),
            cartIds: cart.map(item => item._id),
            menuItemIds: cart.map(item => item.menuId),
            status:"pending"        
          }

          const res = await axiosSecure.post("/payments", payment);
          console.log("Payment Data Saved In the Database", res.data);
          refetch();
          if (res.data?.paymentResult?.insertedId) {
            Swal.fire({
              title: `Thank You So Much For your Payment.`,
              icon: "success",
              draggable: true,
            });
          }

        }
      }
  }
  
    return (
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-accent"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-3xl text-red-600 text-center">{error}</p>
        {transaction && (
          <p className="text-3xl text-red-600 text-center">You Transacton id : { transaction}</p>
        )}
      </form>
    );
};

export default CheckoutForm;