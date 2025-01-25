// index.jsx
import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function App() {
    return (
        <div className="app">
            <h1>Welcome to React!</h1>
            <p>Start building your app by editing <code>index.jsx</code>.</p>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
