import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import { Header, Restuarent } from "./App";
// import reportWebVitals from "./reportWebVitals";
// import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurentMenu from "./components/RestaurentMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Applayout = () => {
  return (
    <>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/menu/:resId",
        element: <RestaurentMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
// root.render(<Applayout />);

// root.render(<RouterProvider router={Applayout} />);

// reportWebVitals();
