import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../../../appwriteConfig"; // Import Appwrite account instance
import Slider from "./Slider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(account.createEmailPasswordSession);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    try {
      await account.createEmailPasswordSession(formData.email, formData.password);
  
      const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 1 day
      const session = await account.getSession("current"); // Get the current session
      localStorage.setItem("session", JSON.stringify({ id: session.$id, expires: expirationTime }));
  
      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 3000, // 3-second delay before redirection
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
  
      setTimeout(() => {
        navigate("/"); // Redirect after 3 seconds
      }, 3000);
    } catch (err) {
      toast.error("Login failed. Please try again!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
  
      console.log(err);
    }
  };
  

  // Check and delete expired sessions
  useEffect(() => {
    const checkSession = async () => {
      const sessionData = JSON.parse(localStorage.getItem("session"));

      if (sessionData) {
        const { id, expires } = sessionData;

        if (Date.now() >= expires) {
          try {
            await account.deleteSession(id); // Delete from Appwrite
          } catch (error) {
            console.error("Error deleting session:", error);
          }
          localStorage.removeItem("session"); // Remove from localStorage
          navigate("/login"); // Redirect to login
        }
      }
    };

    checkSession();
  }, [navigate]);


  return (
    <div>
      <section>
      <div className="breadcrumb-main">
          <div className="container">
            <div className="breadcrumb-container">
              <h2 className="page-title">Login Account</h2>
            </div>
          </div>
        </div>
      </section>

      <div className="blog-section">
        <div className="container">
          <div className="row">

            {/* Sidebar */}
            <Slider />

            {/* Main Content */}
            <div id="content" className="col-sm-9 all-blog my-account">
              <div className="row">
                {/* New Customer */}
                <div className="col-md-6">
                  <div className="well">
                    <h2>New Customer</h2>
                    <p><strong>Register Account</strong></p>
                    <p>By creating an account you will be able to shop faster, track orders, and manage your preferences.</p>
                    <Link to="/register" className="btn btn-primary">Continue</Link>
                  </div>
                </div>

                {/* Returning Customer */}
                <div className="col-md-6">
                  <div className="well">
                    <h2>Returning Customer</h2>
                    <p><strong>I am a returning customer</strong></p>
                    {error && <p className="text-danger">{error}</p>}
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label className="control-label" htmlFor="input-email">E-Mail Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="E-Mail Address"
                          id="input-email"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="control-label" htmlFor="input-password">Password</label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password"
                          id="input-password"
                          className="form-control"
                          required
                        />
                        <Link to="/forgot-password">Forgotten Password?</Link>
                      </div>
                      <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                  </div>
                </div>
              </div> {/* End of Row */}
            </div> {/* End of Main Content */}
          </div> {/* End of Row */}
        </div> {/* End of Container */}
      </div>
    </div>
  );
};

export default LoginPage;
