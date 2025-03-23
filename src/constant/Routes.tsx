import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Template from "../pages/CreateTemplate";
import ResumeBuilder from "../pages/MyResumes";
import { PATH } from "./paths";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PATH.home} element={<Home />} />
      <Route path={PATH.myTemplates} element={<ResumeBuilder />} />
      <Route path={PATH.template} element={<Template />} />
      <Route path={PATH.editResume} element={<Template />} />
    </Routes>
  );
};

export default AppRoutes;
