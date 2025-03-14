import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, replace, useLocation, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../Components/SocialLogin/SocialLogin";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const from = location.state?.from?.pathname || "/";
  // console.log(from);

    const handleSubmit = (event) =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
      console.log(email, password);
      
      signIn(email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "LogIn successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, {replace:true})
        })
        .catch(error => {
        console.error(error);
        
      })

    }
    return (
      <>
        <Helmet>
          <title>Bistro Boss | LogIn</title>
        </Helmet>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
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
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <Link
                      to="/signup"
                      className="label-text-alt link link-hover text-blue-500"
                    >
                      New Here ? SignUp.
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary w-full">Login</button>
                </div>
              </form>
            </div>
            <SocialLogin/>
          </div>
        </div>
      </>
    );
};

export default Login;