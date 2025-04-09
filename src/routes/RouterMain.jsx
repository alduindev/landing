import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import RouterHomeIn from "./in/RouterHomeIn";
import RouterHomeOut from "./out/RouterHomeOut";
import RouteAuth from "../modules/helpers/RouteAuth";
import UIHeader from "../components/organism/UIHeader";
import UIFooter from "../components/organism/UIFooter";

export default function RouterMain() {
  return (
    <Suspense fallback={null}>
      <UIHeader />
      <Routes>
        <Route
          path="/ecosistema/*"
          element={
            <RouteAuth>
              <RouterHomeIn />
            </RouteAuth>
          }
        />

        <Route path="/*" element={<RouterHomeOut />} />
      </Routes>
      <UIFooter variante='minimal' />
    </Suspense>
  );
}
