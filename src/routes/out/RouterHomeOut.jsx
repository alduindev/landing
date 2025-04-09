import { Routes, Route } from "react-router-dom";
import PageHomeOut from '../../pages/PageHomeOut'; 

const RouterHomeOut = () => {
  return (
    <Routes>
      <Route path="/" element={<PageHomeOut />} />
    </Routes>
  );
};

export default RouterHomeOut;
