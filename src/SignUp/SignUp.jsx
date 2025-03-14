import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SocialLogin from "../Components/SocialLogin/SocialLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

      const {
        register,reset,
        handleSubmit,

      } = useForm();

      const onSubmit = (data) => {
          console.log(data);
        createUser(data.email, data.password)
          .then((result) => {
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data.name, data.photoUrl)
              .then(() => {
                console.log("User Profile Info Updated.");
                const userInfo = {
                  name: data.name,
                  email:data.email
                }
                axiosPublic.post("/users", userInfo)
                  .then(res => {
                    console.log("user added to the database.");
                    if (res.data.insertedId) {
                      Swal.fire({
                        title: "User Created Successfully!",
                        icon: "success",
                        draggable: true,
                      });
                      reset();
                      navigate("/");
                    }
                })
              })
            .catch(error=>console.error(error)
            )
          })
          .catch((error) => {
            console.error(error);
          });
        };
    
    
    return (
        <>
        <Helmet>
          <title>Bistro Boss | SignUp</title>
        </Helmet>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">SignUp now!</h1>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    name="name"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo Url</span>
                  </label>
                  <input
                    type="text"
                    {...register("photoUrl", { required: true })}
                    name="photoUrl"
                    placeholder="Photo Url"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <Link
                      to="/login"
                      className="label-text-alt link link-hover text-orange-400"
                    >
                      Already Have an accunt?LogIn.
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary w-full">SignUp</button>
                </div>
              </form>
            </div>
          <SocialLogin/>
          </div>
        </div>
      </>
    );
};

export default SignUp;