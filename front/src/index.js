import React from 'react';
import App from './App'
import { createRoot } from "react-dom/client";

// ReactDOM.render(<App />, document.getElementById('root')) 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    // <React.StrictMode>

    <App  />
    //  </React.StrictMode>

);