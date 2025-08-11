import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";

export default function Toaster(props) {
  const [show, setShow] = useState(props.show);
  const [message, setMessage] = useState(props.message);
  useEffect(() => {
    setMessage(props.message?props.message:'Heeey bud');
  }, [props.message]);
  return (
    <Toast
      style={{
        position: "absolute",
        top: 90,
        right: 0,
      }}
      onClose={() => setShow(false)}
      show={show}
      delay={4000}
      autohide
    >
      <Toast.Body style={{ minHeight: "80px", minWidth: "250px", backgroundColor:'#13b955', color:'#fff',  }}  >
        {message}
      </Toast.Body>
    </Toast>
  );
}
