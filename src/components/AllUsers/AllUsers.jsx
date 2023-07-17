import MaterialTable from "@material-table/core";
import React, { useEffect, useState } from "react";
import getAllUsers from "../../api/getAllEngineers";
import Card from "../card/Card";
import UpdateUser from "../model/UpdateUser";

function AllUsers() {
  let [customer, setCustomer] = useState([]);
  let [count, setCount] = useState({ APPROVED: 0, PENDING: 0, TICKETS: 0 });
  let [show, setShow] = useState(false);
  let [oldData, setOldData] = useState({ name: "", email: "", status: "",userId:'' });

  const columns = [
    {
      title: "ID",
      field: "_id",
    },
    {
      title: "NAME",
      field: "name",
    },
    { title: "USERID", field: "userId" },
    { title: "EMAIL", field: "email" },
    { title: "STATUS", field: "userStatus" },
    { title: "CREATED TICKETS", field: "ticketsCreated" },
  ];

  function countStatus(data) {
    let obj = { APPROVED: 0, PENDING: 0, TICKETS: 0 };
    for (let i = 0; i < data.length; i++) {
      obj[data[i].userStatus]++;
      obj.TICKETS += data[i].ticketsCreated;
    }
    setCount((prev) => obj);
  }

  async function getAllUsersFn() {
    try {
      let data = await getAllUsers("CUSTOMER");
      setCustomer(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllUsersFn();
  }, []);

  useEffect(() => {
    if (customer.length) countStatus(customer);
  }, [customer]);

  function print(data, str) {
    if (str == "edit") {
      setShow(true);
      console.log(data);
      let obj = {
        name: data.name,
        email: data.email,
        status: data.status,
        userId:data._id
      };
      setOldData((prev) => obj);
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-evenly">
        <Card
          color={"primary"}
          heading={"Users"}
          data={customer.length}
          text={"light"}
        />
        <Card
          color={"success"}
          heading={"APPROVED"}
          data={count.APPROVED}
          text={"light"}
        />
        <Card color={"muted"} heading={"PENDING"} data={count.PENDING} />
        <Card color={"warning"} heading={"TICKETS"} data={count.TICKETS} />
      </div>
      <MaterialTable
        title="All CUSTOMER"
        columns={columns}
        data={customer}
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
      {show && (
        <UpdateUser
        userId={oldData.userId}
          addUser={getAllUsersFn}
          show={show}
          setShow={setShow}
          oldEmail={oldData.email}
          oldName={oldData.name}
          oldStatus={oldData.status}
        />
      )}
    </div>
  );
}

export default AllUsers;
