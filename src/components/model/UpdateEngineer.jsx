import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import updateEngineersApi from "../../api/updateEngineersApi";

export default function UpdateEngineer({
  oldName,
  oldStatus,
  oldEmail,
  engineerId,
  show,
  setShow,
  addEngineer,
}) {
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [status, setStatus] = useState("");
  const handleClose = () => setShow(false);

  async function updateEngineerHandle() {
    let body = {};

    if (name.length) body.name = name;
    if (email.length) body.email = email;
    if (status.length) body.userStatus = status;
    console.log(body);
    await updateEngineersApi(body, engineerId);

    addEngineer();
    setName("");
    setEmail("");
    handleClose();
  }

  useEffect(() => {
    setName(oldName);
    setStatus(oldStatus);
    setEmail(oldEmail);
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Engineer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="d-flex justify-content-between ">
              <label className="h4 pe-2 text-muted ">Name</label>
              <input
                value={name}
                className="p-2 h6 border rounded w-75"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-between ">
              <label className="h4 pe-2 text-muted">Email</label>
              <input
                value={email}
                className="p-2 h6 border rounded w-75"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="d-flex align-items-center justify-content-between ">
              <label className="h4 pe-2 text-muted">Status</label>
              <select
                className="form-control w-75"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Status"
                required
              >
                <option value={"APPROVED"}>APPROVED</option>
                <option value={"PENDING"}>PENDING</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateEngineerHandle}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
