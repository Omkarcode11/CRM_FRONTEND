import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { createTicketApi } from "../../api/createTickets";

export default function CreateTicket({addTicket}) {
  const [show, setShow] = useState(false);
  let [priority, setPriority] = useState(1);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function createTicketHandle() {
    
    let body = {
      title,
      description,
      ticketPriority: priority,
    };
    let data= await createTicketApi(body);

    addTicket()
    setPriority(1);
    setTitle("");
    setDescription("");
    handleClose()
  }

  return (
    <>
      <Button
        className="nextButton btn btn-success float-end"
        onClick={handleShow}
      >
        Create Ticket
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createTicketHandle}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
