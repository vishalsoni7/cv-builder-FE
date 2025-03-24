import { Toaster } from "react-hot-toast";
import "./App.css";
import { NavBar } from "./component/NavBar";
import AppRoutes from "./constant/Routes";

function App() {
  return (
    <>
      <NavBar />
      <AppRoutes />
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default App;
