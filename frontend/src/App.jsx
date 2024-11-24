import React, { lazy, Suspense, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";

import Layout from "./layout/Layout";
import Login from "./pages/Login";
import AuthContext, { AuthContextProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AuditorDashboard from "./pages/auditor/AuditorDashboard";
import MaintenanceDashboard from "./pages/maintenance/MaintenanceDashboard";
import Audit from "./pages/auditor/Audit";
import PlanningScheduling from "./pages/auditor/PlanningScheduling";
import ProductDashboard from "./pages/product/ProductDashboard";
import InventoryDashboard from "./pages/inventory/InventoryDashboard";


function App() {
  return (
    <AuthContextProvider>
      <RoutesWrapper />
    </AuthContextProvider>
  );
}


function RoutesWrapper() {
  const { loggedIn, role, loading } = useContext(AuthContext);

  // If still loading the auth state, show a loading screen
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="flex items-center justify-center h-screen">
            <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
                </div>
            </div>
        </div>
      </div>  
    );
  }

  return (
    <Routes>
      {/**Auth */}
      <Route path='/register' element={!loggedIn ? <Register /> : role === 'admin' ? <Navigate to='/admin/dashboard' /> : role === 'auditor' ? <Navigate to='/auditor/dashboard' /> : <Navigate to='/market' />} />
      <Route path='/login' element={!loggedIn ? <Login /> : role === 'admin' ? <Navigate to='/admin/admindashboard' /> : role === 'auditor' ? <Navigate to='/auditor/auditordashboard' /> : role === 'maintenanceTechnician' ? <Navigate to='/maintenance/maintenancedashboard' /> : role === 'inventoryManager' ? <Navigate to='/inventory/inventoryDashboard' />  : role === 'productManager' ? <Navigate to='/productManager/productDashboard' />: <Navigate to='/market' />} />
    

    {/**MarketPage */}
    <Route path='/market' element={loggedIn && role === 'user' ? <Navigate to='/login' /> : null} />


    <Route path="/" element={<Layout />}>
      {/**AdminPage */}
      <Route path='/admin' element={!(loggedIn && role === 'admin') ? <Navigate to='/login' /> : null} >
        <Route path="admindashboard" element={<AdminDashboard />} />
      </Route>

      {/**ProductManagerPage */}
      <Route path='/productManager' element={!(loggedIn && role === 'productManager') ? <Navigate to='/login' /> : null} >
        <Route path="productDashboard" element={<ProductDashboard />} />
      </Route>

      {/**InventoryManagerPage */}
      <Route path='/inventory' element={!(loggedIn && role === 'inventoryManager') ? <Navigate to='/login' /> : null} >
        <Route path="inventoryDashboard" element={<InventoryDashboard />} />
      </Route>

      {/**AuditorPage */}
      <Route path='/auditor' element={!(loggedIn && role === 'auditor') ? <Navigate to='/login' /> : null} >
        <Route path="auditordashboard" element={<AuditorDashboard />} />
        <Route path="audit" element={<Audit />} />
        <Route path="planning" element={<PlanningScheduling />} />
      </Route>

      {/**Maintenance */}
      <Route path='/maintenance' element={!(loggedIn && role === 'maintenanceTechnician') ? <Navigate to='/login' /> : null} >
        <Route path="maintenancedashboard" element={<MaintenanceDashboard />} />
      </Route>
    </Route>
  </Routes>
  );
}


export default App;
