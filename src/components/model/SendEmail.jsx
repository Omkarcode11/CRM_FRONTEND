import React, { useEffect, useId, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import userDetails from "../../api/userDetails";
import sendMail from "../../api/sendMail";

function SendEmail({ show, setShow, userId ,ticketId}) {
  let [subject, setSubject] = useState("");
  let [showAlert,setShowAlert] = useState(false)
  let [description, setDescription] = useState("");
  let [email, setEmail] = useState('');

  let handleClose = () => setShow(false);

 async function sendEmail() {
    let body = {
        ticketId: ticketId,
        subject: subject,
        content: description,
        recipientEmails:email,
        requester: localStorage.getItem('CrmUserName'),
    }

    let data = await sendMail(body)

    if(data.accepted){
       
    }
     
      
    // console.log(subject,description,email,ticketId,localStorage.getItem('CrmUserName'));
  }

  useEffect(() => {
    
      userDetails(userId)
        .then((res) => setEmail(res.email))
        .catch((res) => console.log(res));
    
  }, []);

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Send An Email</Modal.Title>
        </Modal.Header>
          {showAlert &&
           <div class="alert alert-success" role="alert">
           Email Send Successfully
         </div>
          }
        <Modal.Body>
          <form>
            <div className="d-flex justify-content-between ">
              <label className="h4 pe-2 text-muted ">Subject</label>
              <input
                value={subject}
                className="p-2 h6 border rounded w-75"
                placeholder="Subject"
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-between ">
              <label className="h4 pe-2 text-muted">Descrpition</label>
              <input
                value={description}
                className="p-2 h6 border rounded w-75"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={sendEmail}>
            Send Email
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SendEmail;
