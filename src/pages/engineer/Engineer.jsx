import MaterialTable from "@material-table/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTickets } from "../../api/getTickets";
import CreateTicket from "../../components/model/CreateTicket";
import UpdateTickets from "../../components/model/UpdateTickets";
import Card from "../../components/card/Card";
// import "./Customer.css";
import LogoutConformationBox from "../../components/comformation/LogoutConformationBox";
import SendEmail from "../../components/model/SendEmail";

function Engineer() {
  let [oldTitle, setOldTitle] = useState("");
  let [showEmail, setShowEmail] = useState(false);
  let [oldDescription, setOldDescription] = useState("");
  let [userId, setUserId] = useState("");
  let [oldPriority, setOldPriority] = useState("");
  let [ticketId, setTicketId] = useState("");
  let [ticketStatusCount, setTicketStatusCount] = useState({
    OPEN: 0,
    CLOSE: 0,
    IGNORE: 0,
    BLOCK: 0,
  });

  let [show, setShow] = useState(false);
  let [user, setUser] = useState({ name: "", userType: "" });
  let [data, setData] = useState([]);
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
    { title: "DESCRIPTION", field: "description" },
    { title: "REPORTER", field: "reporter" },
    { title: "PRIORITY", field: "ticketPriority" },
    { title: "STATUS", field: "status" },
  ];

  const countingStatus = (data) => {
    let count = {
      OPEN: 0,
      CLOSE: 0,
      INPROGRESS: 0,
      BLOCK: 0,
    };

    for (let i = 0; i < data.length; i++) {
      count[data[i].status]++;
    }
    setTicketStatusCount((prev) => ({ ...count }));
  };

  const getTic = async () => {
    try {
      let tickets = await getTickets();
      countingStatus(tickets);
      setData(tickets);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("CrmToken");
    if (token) {
      let name = localStorage.getItem("CrmUserName");
      let type = localStorage.getItem("CrmUserType");
      if (name && type && type == "ENGINEER") {
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

  function print(data, str) {
    if (str == "edit") {
      setOldDescription(data.description);
      setOldTitle(data.title);
      setOldPriority(data.ticketPriority);
      setTicketId(data._id);
      setShow(true);
    } else if (str == "email") {
      setShowEmail(true);
      setTicketId(data._id);
      setUserId(data.reporter);
    }
  }

  return (
    <div className="bg-light vh-100 p-5">
      <div className="btn btn-danger logout">
        <LogoutConformationBox />
      </div>

      <div className="text-success">
        <h1 className="text-center">Welcome {user?.name}</h1>
        <p className="text-center text-muted h4">
          Take a look at all you tickets below Which you have assignee!
        </p>
      </div>
      <div className="d-flex flex-wrap justify-content-evenly">
        <Card
          color={"primary"}
          data={ticketStatusCount.OPEN}
          heading={"OPEN"}
          text={"light"}
        />
        <Card
          color={"success"}
          data={ticketStatusCount.CLOSE}
          heading={"CLOSE"}
        />
        <Card
          color={"secondary"}
          data={ticketStatusCount.INPROGRESS}
          heading={"INPROGRESS"}
          text={"light"}
        />
        <Card
          color={"danger"}
          data={ticketStatusCount.BLOCK}
          heading={"BLOCKED"}
          text={"light"}
        />
      </div>
      <div>
        <MaterialTable
          title="Tickets raised by you"
          columns={columns}
          data={data}
          actions={[
            {
              icon: () => (
                <img width={"20px"} className="text-center" src="/edit.png" />
              ),
              tooltip: "Edit Ticket",
              onClick: (e, rowData) => {
                print(rowData, "edit");
              },
            },
            {
              icon: () => (
                <img width={"20px"} className="text-center" src="/email.png" />
              ),
              tooltip: "Send An Email",
              onClick: (e, rowData) => {
                print(rowData, "email");
              },
            },
          ]}
        />
      </div>
      <hr />
      <h3 className="text-center text-danger">{errorMsg}</h3>
      <h4 className="text-center">Facing any issues? Raise a ticket!</h4>

      <UpdateTickets
        show={show}
        setShow={setShow}
        oldDescription={oldDescription}
        oldPriority={oldPriority}
        oldTitle={oldTitle}
        TicketId={ticketId}
        addTicket={getTic}
      />
      {showEmail && (
        <SendEmail
          show={showEmail}
          setShow={setShowEmail}
          userId={userId}
          ticketId={ticketId}
        />
      )}
    </div>
  );
}

export default Engineer;
