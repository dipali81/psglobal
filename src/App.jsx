import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Error404 from "./pages/Error404/index";
import Login from "./pages/Login/index.jsx";

import SharedComponent from "./shared/SharedComponent.jsx";

import ScrollToTop from "./utils/ScrollToTop.jsx";
import Dashboard from "./pages/Dashboard/index.jsx";
import Query from "./pages/Query/index.jsx";
import Sales from "./pages/Sales/index.jsx";
import Users from "./pages/Users/index.jsx";
import Products from "./pages/Products/index.jsx";
import Subscriptions from "./pages/Subscription/index.jsx";
import AddProducts from "./pages/AddProducts/index.jsx";
import ShowQuery from "./pages/ShowQuery/index.jsx";
import ShowRevenue from "./pages/ShowRevenue/";
import Announcement from "./pages/Announcement/index.jsx";
import Payment from "./pages/Payment/index.jsx";
import ViewProduct from "./pages/ViewProduct/index.jsx";
import EditProducts from "./pages/EditProducts/index.jsx";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SharedComponent />}>
            <Route index element={<Dashboard />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/view-product" element={<ViewProduct />} />
            <Route path="/edit" element={<EditProducts />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/users" element={<Users />} />
            <Route path="/query" element={<Query />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProducts />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/announcement" element={<Announcement />} />
            <Route path="/showquery" element={<ShowQuery />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/view-revenue" element={<ShowRevenue />} />

            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
