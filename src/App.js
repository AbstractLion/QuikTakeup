import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4001";

const socket = socketIOClient(ENDPOINT);

function App() {
  const [response, setResponse] = useState([]);
  const [studentName, setStudentName] = useState("Leon");
  let claimedQuestions = [];
  socket.on("questionUpdate", (data) => {
    setResponse(data);
  });
  function claimQuestion(questionID) {
    socket.emit("questionClaim", {id: questionID, name: studentName});
  }
  function handleNameChange(event) {
    setStudentName(event.target.value);
  }
  return (
    <div className="App">
      <textarea onChange={handleNameChange}></textarea>
      {response.map((question) => {
        return (
          <div>
            <p>{question.question}</p>
            {!question.claimed ? (
              <a
                href="#"
                onClick={() => {
                  claimQuestion(question.id);
                }}
              >
                Claim Question
              </a>
            ) : (
              <p>Claimed by {question.claimed}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default App;
