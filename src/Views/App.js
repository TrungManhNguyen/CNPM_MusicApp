import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import DefaultLayout from "./Layouts/DefaultLayout/DefaultLayout";
import { publicRoute, privateRoute } from "../Routers";
import PrivateDefaultLayout from "./Layouts/DefaultLayout/DefaultLayout";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {
            publicRoute.map((route, index) => {
              let Page = route.component
              return (
                <Route key={index} path={route.path} element={
                  <DefaultLayout>
                    {Page}
                  </DefaultLayout>
                } />
              )
            })
          }

          {
            privateRoute.map((route, index) => {
              let Page = route.component
              return (
                <Route key={index} path={route.path} element={
                  <>
                    {Page}
                  </>
                } />
              )
            })
          }


        </Routes>
      </Router>
    </>
  );
}

export default App;