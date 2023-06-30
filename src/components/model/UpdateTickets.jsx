import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import updateTicketApi from "../../api/updateTickets";

export default function UpdateTickets({
  addTicket,
  oldTitle,
  oldDescription,
  oldPriority,
  TicketId,
  show,
  setShow,
}) {
  let [priority, setPriority] = useState("");
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [comment, setComment] = useState("");
  let [status, setStatus] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function updateTicketHandle() {
    let body;
    if (localStorage.getItem("CrmUserType") == "CUSTOMER") {
      body = {
        title,
        description,
        ticketPriority: priority,
      };
    }else if(localStorage.getItem('CrmUserType')=='ENGINEER'){
      body = {
        status,
        comment,
      }
    }

    let data = await updateTicketApi(body, TicketId);

    addTicket();
    setPriority(1);
    setTitle("");
    setDescription("");
    handleClose();
  }

  useEffect(() => {
    setDescription(oldDescription);
    setTitle(oldTitle);
    setPriority(oldPriority);
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {localStorage.getItem("CrmUserType") === "CUSTOMER" && (
            <form>
              <div className="d-flex justify-content-between ">
                <label className="h4 pe-2 text-muted ">Title</label>
                <input
                  value={title}
                  className="p-2 h6 border rounded w-75"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex justify-content-between ">
                <label className="h4 pe-2 text-muted">Descrpition</label>
                <input
                  value={description}
                  className="p-2 h6 border rounded w-75"
                  placeholder="Descrpition"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex align-items-center justify-content-between ">
                <label className="h4 pe-2 text-muted">Priority</label>
                <select
                  className="form-control w-75"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  placeholder="Priority"
                  required
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>
            </form>
          )}
          {localStorage.getItem("CrmUserType") === "ENGINEER" && (
            <form>
              <div className="d-flex justify-content-between ">
                <label className="h4 pe-2 text-muted">Comment</label>
                <input
                  value={comment}
                  className="p-2 h6 border rounded w-75"
                  placeholder="Comment"
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex align-items-center justify-content-between ">
                <label className="h4 pe-2 text-muted">STATUS</label>
                <select
                  className="form-control w-75"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  placeholder="STATUS"
                  required
                >
                  <option value={"OPEN"}>OPEN</option>
                  <option value={"CLOSE"}>CLOSED</option>
                  <option value={"IGNORE"}>IGNORE</option>
                  <option value={"BLOCKED"}>BLOCK</option>
                </select>
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateTicketHandle}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
