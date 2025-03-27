import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../../../appwriteConfig";
import { toast } from "react-toastify";
import Slider from "./Slider"; // Import Slider component

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user details
  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user details. Please log in again.");
        navigate("/login");
      }
    };

    getUser();
  }, [navigate]);


  return (
    <div>
      {/* Breadcrumb Section */}
      <section>
        <div className="breadcrumb-main">
          <div className="container">
            <div className="breadcrumb-container">
              <h2 className="page-title">My Profile</h2>
            </div>
          </div>
        </div>
      </section>

      <div className="blog-section">
        <div className="container">
          <div className="row">
            
            {/* Sidebar */}
            <Slider />

            {/* Profile Content */}
            <div id="content" className="col-sm-9 all-blog my-account">
              <div className="row">
                <div className="col-md-12">
                  <div className="well">
                    <h2>Profile Information</h2>

                    {user ? (
                      <div>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>User ID:</strong> {user.$id}</p>

                       
                      </div>
                    ) : (
                      <p>Loading user details...</p>
                    )}
                  </div>
                </div>
              </div> {/* End of Row */}
            </div> {/* End of Profile Content */}
          </div> {/* End of Row */}
        </div> {/* End of Container */}
      </div>
    </div>
  );
};

export default Profile;
