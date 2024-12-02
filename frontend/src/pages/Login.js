import React, { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)


  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault()

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      toast.success(dataApi.message)
      navigate('/')
      fetchUserDetails()
      fetchUserAddToCart()
    }

    if(dataApi.error){
      toast.error(dataApi.message)
    }
  }


  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-6 w-full max-w-sm mx-auto rounded">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="Login Icon" className="rounded-full"/>
          </div>

          <form className="pt-5 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter email id"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label>Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit mx-auto hover:underline hover:text-red-500 mt-2"
              >
                Forgot password ?
              </Link>
            </div>

            <button className=" text-white bg-red-600 hover:bg-red-800 hover:scale-110 px-5 py-1 w-full max-w-[100px] rounded-full transition-all mx-auto block mt-5">
              Login
            </button>
          </form>

          <p className="my-6">
            Don't have an account ?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-600 hover:underline hover:text-red-800"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
