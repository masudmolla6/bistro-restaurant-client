import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
  const [menu] = useMenu();
  console.log();
  const popular = menu.filter(item => item.category === "popular");
  // const [menu, setMenu] = useState([]);
  // useEffect(() => {
  //     fetch("menu.json")
  //         .then(res => res.json())
  //         .then(data => {
  //             const popularItems = data.filter(item => item.category === "popular");
  //         setMenu(popularItems);
  //     })
  // },[])
  return (
    <section className="mb-12 text-center">
      <SectionTitle
        heading={"FROM OUR MENU"}
        subHeading={"---Check it out---"}
      ></SectionTitle>
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-3">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <button className="btn border-b-2 border-b-violet-500 mt-10">
        View Full Menu
      </button>
    </section>
  );
};

export default PopularMenu;