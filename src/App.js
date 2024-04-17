import React from "react";
import MyRoutes from "./routes/MyRoutes";
import { CountProvider } from "./utils/utils";

function App() {

  return (
    <div className="App">
      <CountProvider>
        <MyRoutes />
      </CountProvider>
    </div>
  );
}

export default App;


