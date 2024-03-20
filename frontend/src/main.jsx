import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import SuccessScreen from "./screen/SuccessScreen.jsx";
// import ChangeRequestForm from "./screen/ChangeRequestForm.jsx";
// import ChangeImplementation from "./screen/ChangeImplementation.jsx";
// import CurrentOwner from "./screen/CurrentOwner.jsx";
import NdtAdmin from "./screen/NdtAdmin.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<NdtAdmin />} />
      <Route path="/success" element={<SuccessScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
