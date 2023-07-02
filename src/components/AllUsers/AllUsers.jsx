import MaterialTable from "@material-table/core";
import React, { useEffect, useState } from "react";
import getAllUsers from "../../api/getAllEngineers";
import Card from "../card/Card";

function AllUsers() {
  let [customer, setCustomer] = useState([]);
  let [count, setCount] = useState({ APPROVED: 0, PENDING: 0,TICKETS:0 });

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
    let obj = { APPROVED: 0, PENDING: 0,TICKETS:0 };
    for (let i = 0; i < data.length; i++) {
      obj[data[i].userStatus]++;
      obj.TICKETS += data[i].ticketsCreated
    }
    setCount((prev) => obj);
  }
   


  useEffect(() => {
    getAllUsers("CUSTOMER")
      .then((res) => setCustomer(res))
      .catch((res) => console.log(res));
  }, []);

  useEffect(() => {
    if (customer.length) countStatus(customer);
  }, [customer]);

  return (
    <div>
      <div className="d-flex justify-content-evenly">
        <Card color={"primary"} heading={"Users"} data={customer.length} text={'light'}/>
        <Card color={"success"} heading={"APPROVED"} data={count.APPROVED} text={'light'} />
        <Card color={"muted"} heading={"PENDING"} data={count.PENDING} />
        <Card color={"warning"} heading={"TICKETS"} data={count.TICKETS}/>
        
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
    </div>
  );
}

export default AllUsers;
