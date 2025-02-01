import "./App.css";
import MainRouters from "./routers/MainRouters";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="app">
      <MainRouters />
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
};

export default App;
