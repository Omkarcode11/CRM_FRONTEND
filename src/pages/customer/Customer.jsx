import MaterialTable from "@material-table/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTickets } from "../../api/getTickets";
import CreateTicket from "../../components/model/CreateTicket";

function Customer() {
  let [user, setUser] = useState({ name: "", userType: "" });
  let [data, setData] = useState([]);
  let [showModel, setShowModel] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const columns = [
    {
      title: "ID",
      field: "_id",
    },
    {
      title: "TITLE",
      field: "title",
    },
    { title: "DESCRPITION", field: "description" },
    { title: "ASSIGNEE", field: "assignee" },
    { title: "PRIORITY", field: "ticketPriority" },
    { title: "STATUS", field: "status" },
  ];

 const getTic = async()=> {
    try {
      let tickets = await getTickets();
      setData(tickets);
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  useEffect(() => {
    let token = localStorage.getItem("CrmToken");
    if (token) {
      let name = localStorage.getItem("CrmUserName");
      let type = localStorage.getItem("CrmUserType");
      if (name && type && type == "CUSTOMER") {
        setUser({
          name: name,
          userType: type,
        });
        getTic();
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  // const addTicket = async () => {
  //   getTic()
  // };

  return (
    <div className="bg-light vh-100 p-5">
      <div className="text-success">
        <h1 className="text-center">Welcome {user?.name}</h1>
        <p className="text-center text-muted h4">
          Take a look at all you tickrts below !
        </p>
      </div>
      <div>
        <MaterialTable
          title="Tickets raised by you"
          columns={columns}
          data={data}
        />
      </div>
      <hr />
      <h3 className="text-center text-danger">{errorMsg}</h3>
      <h4 className="text-center">Facing any issues? Raise a ticket!</h4>
      <button className="btn btn-lg btn-success float-end mx-3">
        <CreateTicket addTicket={getTic} />
      </button>
    </div>
  );
}

export default Customer;
