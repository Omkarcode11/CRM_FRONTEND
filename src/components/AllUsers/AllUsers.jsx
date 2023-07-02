import MaterialTable from "@material-table/core";
import React, { useEffect, useState } from "react";
import getAllUsers from "../../api/getAllEngineers";

function AllUsers() {
  let [customer, setCustomer] = useState([]);
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

  useEffect(() => {
    getAllUsers("CUSTOMER")
      .then((res) => setCustomer(res))
      .catch((res) => console.log(res));
  }, []);

  return (
    <div>
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
