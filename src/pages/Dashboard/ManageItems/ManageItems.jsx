import { FaDeleteLeft } from "react-icons/fa6";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDelete = (item) => {
        console.log(item);
        Swal.fire({
          title: "Are you sure?",
          text: "You want to delete food item.!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                refetch()
                  Swal.fire({
                    title: "Deleted!",
                    text: `${item.name} has been deleted.`,
                    icon: "success",
                  });
                }
          }
        });
    }
    return (
      <div>
        <h1>{menu.length}</h1>
        <SectionTitle
          heading={"MANAGE ITEMS"}
          subHeading={"---Hurry Up!---"}
        ></SectionTitle>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.image} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <th>
                    <Link to={`/dashboard/updateItem/${item._id}`}>
                      <button
                        className="btn btn-accent btn-md rounded-full text-white text-xl"
                      >
                        <FaEdit className="text-2xl"></FaEdit>
                      </button>
                    </Link>
                  </th>
                  <th>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-accent btn-md bg-red-600 rounded-full text-white text-xl"
                    >
                      <FaDeleteLeft className="text-2xl"></FaDeleteLeft>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default ManageItems;