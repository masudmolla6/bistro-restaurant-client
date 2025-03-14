import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    console.log(image_hosting_api);

    const onSubmit = async (data) => {
        // image upload to imagebb and get an url
        const imageFile = { image: data.image[0] };
        
        const res = await axiosPublic.post(image_hosting_api,imageFile, {
            headers: {
                "content-type":"multipart/form-data"
            }
        })
        if (res.data.success) {
            // now send the menu item data to the sever with img url.
            const menuItem = {
              name: data.name,
              category: data.category,
              price: data.price,
              recipe: parseFloat(data.recipe),
              image: res.data.data.display_url,
            };
            const menuRes = await axiosSecure.post("/menu", menuItem);
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
              reset();
              // Show Success Popup
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} is added to the menu`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
        }

        // console.log(data.image[0].name);
        console.log(res.data);
    }
    return (
      <div>
        <SectionTitle
          heading={"Add An Item"}
          subHeading={"---What's new?---"}
        ></SectionTitle>
        <div className="bg-blue-900 text-center px-3 py-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Recipe Name*</span>
              </div>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Recipe Name"
                className="input input-bordered w-full"
              />
            </label>
            <div className="flex gap-6">
              {/* category */}
              <label className="form-control w-full my-6">
                <div className="label">
                  <span className="label-text">Category*</span>
                </div>
                <select
                  defaultValue="default"
                  {...register("category", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option disabled value="default">
                    Select a Category.
                  </option>
                  <option value="salad">Salad</option>
                  <option value="pizza">Pizza</option>
                  <option value="soup">Soup</option>
                  <option value="dessert">Dessert</option>
                  <option value="drinks">Drinks</option>
                </select>
              </label>

              {/* price */}
              <label className="form-control w-full my-6">
                <div className="label">
                  <span className="label-text">Price*</span>
                </div>
                <input
                  {...register("price", { required: true })}
                  type="number"
                  placeholder="Price"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Recipe Details</span>
              </div>
              <textarea
                {...register("recipe")}
                className="textarea textarea-bordered h-24"
                placeholder="Recipe Details"
              ></textarea>
            </label>
            <div className="form-control w-full my-6">
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              />
            </div>
            <button className="btn btn-outline btn-info text-white">
              Add Item <FaUtensils className="ml-4"></FaUtensils>
            </button>
          </form>
        </div>
      </div>
    );
};

export default AddItems;