import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Template from "../pages/CreateTemplate";
import ResumeBuilder from "../pages/MyResumes";
import { PATH } from "./paths";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Route for the home page */}
      <Route path={PATH.home} element={<Home />} />

      {/* Route for viewing saved resume templates */}
      <Route path={PATH.myTemplates} element={<ResumeBuilder />} />

      {/* Route for creating a new template */}
      <Route path={PATH.template} element={<Template />} />

      {/* Route for editing an existing resume (uses the same component as Template) */}
      <Route path={PATH.editResume} element={<Template />} />
    </Routes>
  );
};

export default AppRoutes;
