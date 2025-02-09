import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBarComponent from "./NavBar";
import {ProductProvider} from "./ProductContext"; 
import ProductsTable from "./ProductsTable";
import AddProducts from "./AddProduct";
import UpdateProduct from "./UpdateProduct"; // ✅ Import the missing component
import { UpdateProductContextProvider } from './UpdateProductContext'
import { SupplierContextProvider } from './SupplierContext'
import SupplierPage from './SupplierPage'

function App() {
  return (
    <ProductProvider> 
      <Router>
        <NavBarComponent />
        <div className="container">
          <UpdateProductContextProvider>
            <SupplierContextProvider>
            <Routes>
              <Route exact path="/" element={<ProductsTable />} />
              <Route exact path="/addproduct" element={<AddProducts />} />
              <Route exact path="/updateproduct" element={<UpdateProduct />} />
              <Route exact path="/supplierpage" element={<SupplierPage />} />
            </Routes>
            </SupplierContextProvider>
          </UpdateProductContextProvider>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;


