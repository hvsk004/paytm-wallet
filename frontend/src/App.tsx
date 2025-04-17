import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { SendMoney } from "./pages/sendMoney";
import "./App.css";
function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/sendMoney" element={<SendMoney />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
