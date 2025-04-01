import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageHomeOut from "../pages/PageHomeOut";

export default function RouterMain() {
  return (
    <Router basename="/landing">
      <Routes>
        <Route path="/" element={<PageHomeOut />} />
      </Routes>
    </Router>
  );
}
