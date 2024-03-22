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
import ChangeRequestForm from "./screen/ChangeRequestForm.jsx";
// import ChangeImplementation from "./screen/ChangeImplementation.jsx";
// import CurrentOwner from "./screen/CurrentOwner.jsx";
// import NdtAdmin from "./screen/NdtAdmin.jsx";
// import LineManager from "./screen/LineManager.jsx";
// import HoD from "./screen/HoD.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<ChangeRequestForm />} />
      <Route path="/success" element={<SuccessScreen />} />
      {/* <Route path="/s1" element={<ChangeImplementation />} />
      <Route path="/s2" element={<CurrentOwner />} />
      <Route path="/s3" element={<NdtAdmin />} />
      <Route path="/s4" element={<LineManager />} />
      <Route path="/hod" element={<HoD />} /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
