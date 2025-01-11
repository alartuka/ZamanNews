import { Container } from "@mui/material";
import React from "react";
import ReactCodeInput from "react-code-input";
import addTask from "./assets/addTask";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Task List</h1>
      </header>
      <Container className="Task_input">
        {/* <input type="text" id="userInput" value = "Enter new tasks here
        " onFocus={} */}
        <ReactCodeInput type="text" addTask />

      </Container>
    </div>
  );
}

export default App;
