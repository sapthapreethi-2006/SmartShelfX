import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginComponent/LoginPage";
import RegisterPage from "./Components/LoginComponent/RegisterPage";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import ManagerMenu from "./Components/LoginComponent/ManagerMenu";
import VendorMenu from "./Components/LoginComponent/VendorMenu";
import ShowUserDetails from "./Components/LoginComponent/ShowUserDetails";
import SKUReport from "./Components/SKUComponent/SKUReport";
import SKUEntry from "./Components/SKUComponent/SKUEntry";
import SKUEdit from "./Components/SKUComponent/SKUEdit";
import ProductEntry from "./Components/ProductComponent/ProductEntry";
import NewEntry from "./Components/ProductComponent/NewEntry";
import ProductReport from "./Components/ProductComponent/ProductReport";
import UpdatePrice from "./Components/ProductComponent/UpdatePrice";
import ProductPriceEdit from "./Components/ProductComponent/ProductPriceEdit";
import ProductStockEdit from "./Components/ProductComponent/ProductStockEdit";
import TransactionIn from "./Components/TransactionComponent/TransactionIn";
import TransactionOut from "./Components/TransactionComponent/TransactionOut";
import ProductPieAnalysis from "./Components/ChartComponent/ProductPieAnalysis";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user-details" element={<ShowUserDetails />} />
        <Route path="/admin" element={<AdminMenu />} />
        <Route path="/manager" element={<ManagerMenu />} />
        <Route path="/vendor" element={<VendorMenu />} />
        <Route path="/sku-list" element={<SKUReport />} />
        <Route path="/sku-addition" element={<SKUEntry />} />
        <Route path="/sku-edit/:id" element={<SKUEdit />} />
        <Route path="/product-entry" element={<ProductEntry />} />
        <Route path="/new-entry" element={<NewEntry />} />
        <Route path="/product-list" element={<ProductReport />} />
        <Route path="/update-price/:productCode" element={<UpdatePrice />} />
        <Route path="/edit-price/:pid" element={<ProductPriceEdit />} />
        <Route path="/edit-stock/:pid/:no" element={<ProductStockEdit />} />
        <Route path="/transaction-in" element={<TransactionIn />} />
        <Route path="/transaction-out" element={<TransactionOut />} />
        <Route path="/product-analysis" element={<ProductPieAnalysis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
