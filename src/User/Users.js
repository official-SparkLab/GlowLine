import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";
import UpdateUser from "./UpdateUser";
import SideBar from "../SideBar";
import Header from "../header";
import Footer from "../Footer";
import { GlobalService } from "../service/GlobalService";

function Users() {


  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [mobile_no, setMobilNo] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Store Product Data
  const createUser = async (e) => {
    e.preventDefault();

    if(!gender)
    {
      alert("Please select a gender");
    }
    
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
      let result = await fetch(`${GlobalService.path}/addUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      });

      const data = await result.json();

      if (data.errors) {
        // Handle validation errors
        const errorMessages = Object.values(data.errors).flat();
        errorMessages.forEach((errorMessage) => {
          alert(errorMessage);
          // Display the error message to the user, e.g., append it to a div
        });
      } else if (data.Message) {
        // Handle success message
        alert("User Added Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save record.");
    }
  };

//Delete User
  const handleDelete = (user_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (confirmDelete) {
      fetch(`${GlobalService.path}/deleteuser/${user_id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
          // Handle the error case here
        });
    }
  };


  //fetch User 
  const [tableData,setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${GlobalService.path}/fetchUser`);
        const data = await response.json();
        // Filter out records with status not equal to 1
        setTableData(data.data);
        
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    fetchData();
  },[]);

const[showUpdate,setShowUpdate] = useState(false);
  const updateData = (id) => {
    const user_id = id;
    setShowUpdate(true)
    navigate(`/users?id=${user_id}`);
  };

  return (
      <div className="page-container">
       <SideBar/>

        {/* Page Content */}
        <div className="page-content">
        <Header/>
          <div className="panel panel-white">
            <div className="panel-heading">
              <h4 className="panel-title">Add rows</h4>
            </div>
            <div className="panel-body">
              <button
                type="button"
                className="btn btn-success m-b-sm"
                data-toggle="modal"
                data-target="#myModal"
              >
                Add new User
              </button>
              {/* Modal */}
             
                <div
                  className="modal fade"
                  id="myModal"
                  tabIndex={-1}
                  role="dialog"
                  aria-labelledby="myModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" style={{ width: "60%" }}>
                  <div className="modal-content">
                  <div className="modal-header">
                    <h2 className="modal-title" id="myModalLabel">
                      Create User
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
                      value="Add"
                      onClick={createUser}
                    />
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                  </div>
                </div>
            
              <br />
             
              <div>
              <hr style={{ height: 5, color: "black", margin: "auto" }} />
              <div className="table-container">
                <table
                  id="example3"
                  className="display table"
                 
                >
                  <thead className="sticky-header">
                    <tr>
                      <th>Sr.No</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Mobile No</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.length>0 ? ( tableData.map((row, index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{row.user_name}</td>
                        <td>{row.user_gender}</td>
                        <td>{row.user_contact}</td>
                        <td>{row.user_email}</td>
                        <td>
                        <button
                                type="button"
                                id="btndelete"
                                className="btn btn-danger btn-sm"
                                title="Delete"
                                aria-hidden="true"
                                onClick={() => handleDelete(row.user_id)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                              <button
                                type="button"
                                style={{ marginLeft: "5px" }}
                                className="btn btn-primary btn-sm"
                                title="Update"
                                data-target="#updateUser"
                                data-toggle="modal"
                                onClick={()=>updateData(row.user_id)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              {showUpdate &&
                              <UpdateUser/>}
                        </td>
                      </tr>
                    ))):(<td>No Data Available  </td>)}
                  </tbody>
                </table>
              </div>
              </div>
            
            </div>
          </div>
          <Footer/>
        </div>
      </div>
  );
}

export default Users;