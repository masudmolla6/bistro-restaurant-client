import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);
    return (
        <div>
            <SectionTitle heading={"Payment"} subHeading={"Please Pay to eat."}></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;