import { Link } from "react-router";
import Cover from "../../shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, coverImg }) => {
  // console.log(title);
  return (
    <>
      <div className="pt-8 text-center">
        {title && <Cover img={coverImg} title={title}></Cover>}
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-3 mt-16">
          {items.map((item) => (
            <MenuItem key={item._id} item={item}></MenuItem>
          ))}
        </div>
        <Link to={`/order/${title}`}>
          {" "}
          <button className="btn border-b-2 border-b-orange-500 my-4">
            ORDER YOUR FAVOURITE FOOD
          </button>
        </Link>
      </div>
    </>
  );
};

export default MenuCategory;
