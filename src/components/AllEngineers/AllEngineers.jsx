import MaterialTable from "@material-table/core";
import React, { useEffect, useState } from "react";
import getAllUsers from "../../api/getAllEngineers";
import Card from "../card/Card";
import UpdateEngineer from "../model/UpdateEngineer";

function AllEngineers() {
  let [show, setShow] = useState(false);
  let [engineers, setEngineers] = useState([]);
  let [oldEngineerData, setOldEngineerData] = useState({
    name: "",
    email: " ",
    engineerId: "",
    status: "",
  });
  let [count, setCount] = useState({ APPROVED: 0, PENDING: 0 });
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
    { title: "ASSIGNED", field: "ticketsAssigned" },
  ];

  async function getAllEngineersHandle() {
    try {
      
      let data = await getAllUsers("ENGINEER");
      setEngineers(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllEngineersHandle();
  }, []);

  function countStatus(data) {
    let obj = { APPROVED: 0, PENDING: 0 };
    for (let i = 0; i < data.length; i++) {
      obj[data[i].userStatus]++;
    }
    setCount((prev) => obj);
  }

  useEffect(() => {
    if (engineers.length) countStatus(engineers);
  }, [engineers]);

  function print(data, str) {
    if (str == "edit") {
      let obj = {
        name: data.name,
        email: data.email,
        engineerId: data.userId,
        status: data.userStatus,
      };

      setOldEngineerData((prev) => obj);

      setShow(true);
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-evenly pb-2">
        <Card
          color={"primary"}
          data={engineers.length}
          heading={"Engineers"}
          text={"light"}
        />
        <Card
          color={"success"}
          data={count.APPROVED}
          heading={"APPROVED"}
          text={"light"}
        />
        <Card
          color={"secondary"}
          data={count.PENDING}
          heading={"PENDING"}
          text={"light"}
        />
      </div>
      <MaterialTable
        title="All Engineers"
        columns={columns}
        data={engineers}
        actions={[
          {
            icon: () => (
              <img width={"20px"} className="text-center" src="/edit.png" />
            ),
            tooltip: "Edit Engineer",
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
        <UpdateEngineer
          addEngineer = {getAllEngineersHandle}
          engineerId={oldEngineerData.engineerId}
          oldEmail={oldEngineerData.email}
          oldName={oldEngineerData.name}
          oldStatus={oldEngineerData.status}
          setShow={setShow}
          show={show}
        />
      )}
    </div>
  );
}

export default AllEngineers;
