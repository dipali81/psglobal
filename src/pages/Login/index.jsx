import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [error, setError] = useState({
    emailColor: "neutral",
    emailError: "Enter your email here",
    emailPass: false,
    passColor: "neutral",
    passError:
      "The password should consist of more than 8 characters, at least one special character and a number are mandatory.",
    passPass: false,
  });

  function handlePass(e) {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setError({
        ...error,
        passError: "The password cannot be deleted",
        passColor: "red",
        passPass: false,
      });
    } else if (
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,36}$/.test(
        e.target.value
      )
    ) {
      setError({
        ...error,
        passError: "Password is valid",
        passColor: "green",
        passPass: true,
      });
    } else {
      setError({
        ...error,
        passError:
          "The password should consist of more than 8 characters, at least one special character and a number are mandatory.",
        passColor: "red",
        passPass: false,
      });
    }
  }
  function handleEmail(e) {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setError({
        ...error,
        emailError: "E-Mail cannot be empty",
        emailColor: "red",
        emailPass: false,
      });
    } else if (
      // eslint-disable-next-line no-useless-escape
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(e.target.value)
    ) {
      setError({
        ...error,
        emailError: "Email must be valid",
        emailColor: "green",
        emailPass: true,
      });
    } else {
      setError({
        ...error,
        emailError: "Email should be valid",
        emailColor: "red",
        emailPass: false,
      });
    }
  }


  async function loginUser(event) {
    event.preventDefault()
  
      const response = await fetch(`${config.baseUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      })
  
      const data = await response.json()
  
      if (data.user) {
        localStorage.setItem('email', data.user)
      console.log('success')
      const str='Logging you in!';
      setErr(str)
      navigate('/')
      } else {
      const str='Please check your email and password'
  
      setErr(str)
      }
    }


  return (
    <div className=" lg:flex overflow-hidden min-h-screen">
      <div className="lg:w-1/2 login-bg  xl:max-w-screen-sm">
        <div className="py-8  login-bg flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center ">
            <div></div>
            <div className=" text-2xl text-white tracking-wide ml-2 font-semibold">
              <img className="h-8" src="../assets/logo.png" alt="Logo" />

            </div>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className=" text-3xl text-blue-600 font-display font-semibold lg:text-left xl:text-4xl
            xl:text-bold mb-2"
          >
            Welcome, Admin!
          </h2>
          <p className="text-white font-semibold">Log in to your panel</p>
          <div className="mt-12">
            {err !== "" && (
              <p className="bg-red-100  border-2 border-red-600 shadow-sm rounded text-red py-[8px] px-[10px] mb-[10px]">
                {err}
              </p>
            )}

            <form onSubmit={loginUser} className="pb-12">
              <div>
                <div className="text-sm font-bold text-gray-300 mb-1 tracking-wide">
                  Email Address
                </div>
                <input
                  className="px-5 border-4 border-transparent rounded focus:border-blue-400  w-full text-lg py-2 border-b border-gray-300 focus:outline-none "
                  placeholder="admin@mail.com"
                  value={email}
                  onChange={handleEmail}
                  type="email"
                  required
                />
                {error.emailColor === "neutral" ? (
                  <small className="w-[300px] inline-block font-semibold neutral text-slate-100">
                    {error.emailError}
                  </small>
                ) : null}
                {error.emailColor === "red" ? (
                  <small className="w-[300px] inline-block font-semibold red text-red-500">
                    {error.emailError}
                  </small>
                ) : null}
                {error.emailColor === "green" ? (
                  <small className="w-[300px] inline-block font-semibold green text-green-500">
                    {error.emailError}
                  </small>
                ) : null}
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="mb-1 text-sm font-bold text-gray-300 tracking-wide">
                    Password
                  </div>
                </div>
                <input
                  className="px-5 border-4 border-transparent rounded focus:border-blue-400 w-full text-lg py-2  border-gray-300 focus:outline-none "
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={handlePass}
                  required
                  minLength={8}
                />
                {error.passColor === "neutral" ? (
                  <small className="w-[300px] mt-2 inline-block font-semibold neutral text-slate-100">
                    {error.passError}
                  </small>
                ) : null}
                {error.passColor === "red" ? (
                  <small className="w-[300px] mt-2 inline-block font-semibold red text-red-500">
                    {error.passError}
                  </small>
                ) : null}
                {error.passColor === "green" ? (
                  <small className="w-[300px] mt-2 inline-block font-semibold green text-green-500">
                    {error.passError}
                  </small>
                ) : null}
              </div>
              <div className="mt-10">
                <button
                onClick={loginUser}
                  className="bg-blue-600 hover:bg-blue-800 cursor-pointer transition-color text-gray-100 p-4 w-full rounded-full tracking-wide
                        font-semibold font-display focus:outline-none focus:shadow-outline 
                        shadow-lg"
                  disabled={
                    error.emailPass === false || error.passPass === false
                  }
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-[#fff] flex-1 h-screen">
        <div className=" transform duration-200 hover:scale-105 ">
          <img src="../assets/dashboard/analytic.png" />
        </div>
      </div>
    </div>
  );
};

export default Login;
