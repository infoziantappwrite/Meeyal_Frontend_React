import { useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import Slider from "./Slider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    await axios.post(
      `${API_URL}/users/login`,
      {
        username: formData.username,
        password: formData.password,
      },
      {
        withCredentials: true, // ✅ This enables cookie handling
      }
    );

    toast.success("Login successful!");

    // Redirect after short delay (or use navigate from react-router-dom)
    setTimeout(() => {
      
      window.location.href = "/"; // ✅ Full reload (or use navigate('/'))
    }, 2000);
  } catch (err) {
    const message = err.response?.data?.message || err.response?.data?.error || "Login failed.";
    toast.error(message);
    setError(message);
  }
};


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
                    <p>Create an account to shop faster, track orders, and manage preferences.</p>
                    <Link to="/register" className="btn btn-primary">Continue</Link>
                  </div>
                </div>

                {/* Returning Customer */}
                <div className="col-md-6 mb-4">
                  <div className="well">
                    <h2>Returning Customer</h2>
                    <p><strong>I am a returning customer</strong></p>
                    {error && <p className="text-danger">{error}</p>}
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="input-username">Username</label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="Username"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="input-password">Password</label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password"
                          className="form-control"
                          required
                        />
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
