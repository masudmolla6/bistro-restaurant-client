import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
    const { _id, name, recipe, image, price, category } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const [, refetch] = useCart();

  const handleAddToCart = (item) => {
    if (user && user.email) {
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price
      }
      axiosSecure.post("/carts", cartItem)
        .then(res => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${name} added successfully.`,
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
      })
      
    }
    else {
      Swal.fire({
        title: "You are not logged.",
        text: "Please Login to Add to the cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", {state:{from:location}})
        }
      });
    }
  }
    
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {name}
          <div className="badge badge-secondary">${price}</div>
        </h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">
            <Link
              onClick={()=>handleAddToCart(item)}
            >
              Add To Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
