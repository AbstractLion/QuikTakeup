import React, { useState } from "react";
import "../App.css";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4001";

const socket = socketIOClient(ENDPOINT);

export default function Students() {
  const [response, setResponse] = useState([]);
  socket.on("questionUpdate", (data) => {
    setResponse(data);
  });
  function goBack() {
    socket.emit("move", "back");
  }
  function goNext() {
    socket.emit("move", "next");
  }
  return (
    <div className="App">
      <button onClick={goBack}>Back</button>
      <button onClick={goNext}>Next</button>
      {response.map((question) => {
        return (
          <div>
            <p style={question.active ? { fontWeight: "bold" } : null}>
              {question.question}
            </p>
            {!question.claimed ? (
              <p>Question is unclaimed</p>
            ) : (
              <p>Claimed by {question.claimed}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
