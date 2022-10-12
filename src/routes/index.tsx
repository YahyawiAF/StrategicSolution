import React from "react";
import { Routes, Route } from "react-router-dom";
import { withFallback } from "./withFallback";

const MainLayout = withFallback(
  React.lazy(() => import("~/layouts/MainLayout"))
);
const RegisterLayout = withFallback(
  React.lazy(() => import("~/layouts/RegisterLayout"))
);

const LandingPage = withFallback(React.lazy(() => import("~/pages/Customers")));
const Products = withFallback(React.lazy(() => import("~/pages/Products")));
const About = withFallback(React.lazy(() => import("~/pages/Customers")));
const Orders = withFallback(React.lazy(() => import("~/pages/Orders")));
const Pricings = withFallback(React.lazy(() => import("~/pages/Pricings")));
const AddCustomers = withFallback(
  React.lazy(() => import("~/pages/Customers/Profile"))
);
const AddProduct = withFallback(
  React.lazy(() => import("~/pages/Products/AddProduct"))
);

const Login = withFallback(React.lazy(() => import("~/pages/Login")));
const Register = withFallback(React.lazy(() => import("~/pages/Register")));

const RenderRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<RegisterLayout />}>
        <Route path="/" element={<Login />} />
      </Route>
      <Route element={<RegisterLayout />}>
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/patient" element={<LandingPage />}></Route>
        <Route path="/patient/:id" element={<AddCustomers />} />
        <Route path="/patient/add-customer" element={<AddCustomers />} />

        <Route path="/insurance/add-product" element={<AddProduct />} />
        <Route path="/insurance/:id" element={<AddProduct />} />
        <Route path="/insurance" element={<Products />} />

        <Route path="/about" element={<About />} />
        <Route path="/pricings" element={<Pricings />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
    </Routes>
  );
};

export default RenderRouter;
