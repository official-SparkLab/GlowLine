import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";

export const EmployeeAttendeceForm = ({ row }) => {
  const today = new Date().toISOString().split("T")[0];

    const [empName, setEmpName] = useState()
    const [attendence, setAttendence] = useState()
    const [description, setdescription] = useState()
    const [date, setDate] = useState(today)


    const handleOptionChange = (e) => {
        setAttendence(e.target.value)
    }

    let empPaymentItem = {
       emp_name:empName,
       date,
       attendance : attendence,
       description
    }

    useEffect(() => {
        if (row != undefined) {
        setEmpName(row.emp_name);
        setAttendence(row.attendance);
        setdescription(row.description);
        setDate(row.date);
        }
    }, [])

    const submitEmployeeAttendenceDetails = async (e) => {
        e.preventDefault()
        if (row == undefined) {
            try {
                const res = await axios.post(`${GlobalService.path}/addEmployeeAttendence`, empPaymentItem);
                console.log(res);
                alert("Attendence added successfully")
                window.location.reload();
            } catch (error) {
                alert("Failed to add employee attendence")
                console.log(error);
            }
        } else {
            try {
                const res = await axios.put(`${GlobalService.path}/addEmployeeAttendence/${row.emp_id}`, empPaymentItem);
                console.log(res);
                alert("Attendence updated successfully")
                window.location.reload()
            } catch (error) {
                alert("Failed to update Attendence")
                console.log(error);
            }
        }

    }



    return (
        <>
            <div className="Main-Wrapper">
            <form onSubmit={submitEmployeeAttendenceDetails} >

            <div className="modal-dialog" style={{ width: "100%" }}>
                <div className="modal-content">
                    <div className="modal-header">

                        <h2 className="modal-title" id="myModalLabel">
                            Attendance Details
                        </h2>
                    </div>
                    <div className="modal-body">
                    <div className="form-group">
                      <label> Name</label>
                      <div className="row">
                        <div className="col-sm-6">
                          <input
                            type="text"
                            id="name-input"
                            name="txt_name"
                            className="form-control"
                            placeholder="Enter Name"
                            required=""
                            value={empName}
                            onChange={(e)=>setEmpName(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="date"
                            id="name-input"
                            name="txt_name"
                            className="form-control"
                            placeholder="Enter Name"
                            required=""
                            value={date}
                            onChange={(e)=>setDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  
                    <div className="form-group">
                                        <label>Attendence</label>
                                        <input type='radio' value='Yes' checked={attendence === 'Yes'}
                                            name="option" onChange={handleOptionChange} />Yes &nbsp; &nbsp;
                                        <input type='radio' value='No' checked={attendence === 'no'}
                                            name="option" onChange={handleOptionChange} />No &nbsp; &nbsp;
                                        
                                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        type="text"
                        id="position-input"
                        name="txt_desc"
                        className="form-control"
                        placeholder="Description "
                        required=""
                        defaultValue={""}
                        value={description}
                        onChange={(e)=>setdescription(e.target.value)}
                      />
                    </div>
                    </div>
                    <div className="modal-footer">
                    <input
                      type="submit"
                      name="btn_save"
                      className="btn btn-success"
                      defaultValue="Add"
                    />
                    <button
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    </div>

                </div>
            </div>
        </form>
            </div>

        </>
    )
}

