import featured from "../../../assets/home/featured.jpg";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import "./Featured.css";

const Featured = () => {
  return (
    <div className="featured-item bg-fixed pt-10 my-10">
      <SectionTitle
        heading={"Featured Items"}
        subHeading={"---Check it out---"}
      ></SectionTitle>
      <div className="md:flex justify-center items-center px-36 py-16">
        <div>
          <img src={featured} alt="" />
        </div>
        <div className="md:ml-10 text-white">
          <h3 className="text-xl">March 20, 2023</h3>
          <h3 className="text-xl">WHERE CAN I GET SOME?</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
            voluptate autem debitis quis tenetur, quos doloribus dicta optio
            velit impedit, amet nobis doloremque deleniti expedita corporis
            placeat, odio vitae! Libero, assumenda adipisci impedit minima ipsa
            commodi consectetur. Consequuntur dolores dolore ut iste veritatis
            quia, nesciunt architecto aperiam eveniet, assumenda dolorum.
          </p>
          <button className="btn border-b-2 border-b-orange-500 my-4">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
