import FoodCard from "../../../Components/FoodCard/FoodCard";

const OrderTab = ({ items }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 my-8 md-10">
      {items.map((item) => (
        <FoodCard key={item._id} item={item}></FoodCard>
      ))}
    </div>
  );
};

export default OrderTab;
