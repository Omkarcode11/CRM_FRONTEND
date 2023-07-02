import MaterialTable from "@material-table/core";
import React, { useEffect, useState } from "react";
import { getTickets } from "../../api/getTickets";

function AllTickets() {
  let [engineers, setEngineers] = useState([]);
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

  useEffect(() => {
    getTickets()
      .then((res) => setEngineers(res))
      .catch((res) => console.log(res));
  }, []);

  return (
    <div>
      <MaterialTable
        title="All Engineers"
        columns={columns}
        data={engineers}
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

export default AllTickets;
