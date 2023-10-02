import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GlobalService } from "../service/GlobalService";

function UpdateUser() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchparam = queryParams.get("id");


    const [name, setName] = useState("");
    const [mobile_no, setMobilNo] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

      const navigate = useNavigate();
      function handlCloseModal() {
        navigate("/users");
      }


      // Fetch User By ID
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              `${GlobalService.path}/userById/${searchparam}`
            );
            const data = await response.json();
           setName(data.data.user_name);
           setEmail(data.data.user_email);
           setPassword(data.data.user_password);
           setGender(data.data.user_gender);
           setMobilNo(data.data.user_contact);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, [searchparam]);


       // Update the Form Data through update API
const updateEnquiryData = async (e) => {
  e.preventDefault();
    // Capitalize the first letter and letter after each space
    const capitalize = (str) => {
      return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };
    let item = {
      user_name: capitalize(name),
      user_gender: gender,
      user_contact: mobile_no,
      user_email: email,
      user_password: password,
    };
  try {
    let result = await fetch(`${GlobalService.path}/updateUser/${searchparam}`, {  // Replace "recordId" with the actual ID of the record to be updated
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });

    if (result.ok) {
      alert("User Updated Successfully");
      navigate("/users");
      window.location.reload();
      // Clear the fields by resetting the state variables
   
    } else {
      // Handle error case
      alert("Failed to update users.");
    }
  } catch (err) {
    console.log(err);
    alert("Failed to update record.");
  }
};


  return (
    <div>
          <form>
                <div
                  className="modal fade"
                  id="updateUser"
                  tabIndex={-1}
                  role="dialog"
                  aria-labelledby="myModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" style={{ width: "60%" }}>
                  <div className="modal-content">
                  <div className="modal-header">
                    <h2 className="modal-title" id="myModalLabel">
                      Update User
                    </h2>
                  </div>
                  <hr />
                  <div className="modal-header">
                    <h4 className="modal-title" id="myModalLabel">
                      User Details
                    </h4>
                  </div>

                  <div className="modal-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            name="date"
                            id="date"
                            className="form-control"
                            placeholder="Enter name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label>Gender</label>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <label htmlFor="male">
                            <input
                              type="radio"
                              id="male"
                              name="gender"
                              value="Male"
                              checked={gender === "Male"}
                              onChange={(e) => setGender(e.target.value)}
                            />
                            Male
                          </label>
                          <label htmlFor="female">
                            <input
                              type="radio"
                              id="female"
                              name="gender"
                              value="Female"
                              required
                              checked={gender === "Female"}
                              onChange={(e) => setGender(e.target.value)}
                            />
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Mobile No</label>
                          <input
                            type="text"
                            name="mobileNo"
                            id="mobileNo"
                            className="form-control"
                            placeholder="Enter Mobile No"
                            maxLength={10}
                            required
                            value={mobile_no}
                            onChange={(e) => setMobilNo(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Email ID</label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter Email Address"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Password</label>
                          <div className="input-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              id="password"
                              className="form-control"
                              placeholder="Enter Password"
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <div
                              className="input-group-addon"
                              style={{ cursor: "pointer" }}
                            >
                              <span
                                className="input-group-text"
                                onClick={togglePasswordVisibility}
                              >
                                <FontAwesomeIcon
                                  icon={showPassword ? faEyeSlash : faEye}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6"></div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <input
                      type="button"
                      name="btn_save"
                      className="btn btn-primary"
                      value="Update"
                      onClick={updateEnquiryData}
                    />
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                      onClick={handlCloseModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                  </div>
                </div>
              </form>
    </div>
  )
}

export default UpdateUser