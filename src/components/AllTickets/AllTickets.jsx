import MaterialTable from "@material-table/core";
import React, { useEffect, useState } from "react";
import { getTickets } from "../../api/getTickets";
import Card from "../card/Card";
import UpdateTickets from "../model/UpdateTickets";

function AllTickets() {
  let [show, setShow] = useState(false);
  let [tickets, setTickets] = useState([]);
  let [ticketStatusCount, setTicketStatusCount] = useState({
    OPEN: 0,
    CLOSE: 0,
    INPROGRESS: 0,
    BLOCK: 0,
  });
  let [oldTicket,setOldTicket] = useState({
      oldTitle:"",
      oldDescription:"",
      oldPriority:"",
      oldComment:""
  })

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
    { title: "ASSIGNEE", field: "assignee" },
    { title: "PRIORITY", field: "ticketPriority" },
    { title: "STATUS", field: "status" },
    { title: "COMMENT", field: "comment" },
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
    setTicketStatusCount((prev) => ({ prev, ...count }));
  };

  async function gettingAllTickets() {
    try {
      let data = await getTickets();
      setTickets(data);
    } catch (err) {
      console.log(err, "Error from while getting from tickets use as a admin");
    }
  }

  useEffect(() => {
    gettingAllTickets()
  }, []);

  useEffect(() => {
    if (tickets.length) countingStatus(tickets);
  }, [tickets]);

  function print(data, str) {
    if (str == "edit") {
      // console.log(data)
      setShow(true)
      let obj = {
        oldTitle:data.title,
        oldDescription:data.description,
        oldPriority:data.ticketPriority,
        oldComment:data.comment,
        ticketId :data._id,
        oldAssignee:data.assignee
    }
    setOldTicket(obj)

    }
  }

  return (
    <div>
      <div className="d-flex justify-content-evenly">
        <Card
          color={"primary"}
          heading={"TICKETS"}
          data={tickets.length}
          text={"light"}
        />
        <Card
          color={"success"}
          heading={"OPEN"}
          data={ticketStatusCount.OPEN}
          text={"light"}
        />
        <Card
          color={"secondary"}
          heading={"CLOSE"}
          data={ticketStatusCount.CLOSE}
          text={"light"}
        />
        <Card
          color={"warning"}
          heading={"INPROGRESS"}
          data={ticketStatusCount.INPROGRESS}
        />
        <Card
          color={"danger"}
          heading={"BLOCKED"}
          data={ticketStatusCount.BLOCK}
          text={"light"}
        />
      </div>
      <MaterialTable
        title="All Tickets"
        columns={columns}
        data={tickets}
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
      {show &&
      <UpdateTickets
      addTicket={gettingAllTickets}
      oldTitle={oldTicket.oldTitle}
      oldAssignee = {oldTicket.oldAssignee}
      oldDescription={oldTicket.oldDescription}
      oldPriority={oldTicket.oldPriority}
      TicketId={oldTicket.ticketId}

        show={show}
        setShow={setShow}
      />
    }
    </div>
  );
}

export default AllTickets;
