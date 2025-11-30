
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { AdminProducts } from './pages/admin/Products';
import { AdminOrders } from './pages/admin/Orders';
import { AdminCustomers } from './pages/admin/Customers';
import { AdminCMS } from './pages/admin/CMS';
import { AdminMedia } from './pages/admin/Media';
import { AdminSettings } from './pages/admin/Settings';

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AdminLayoutWrapper = () => (
  <AdminLayout>
    <Outlet />
  </AdminLayout>
);

const AdminApp: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Login */}
        <Route path="/" element={<AdminLogin />} />
        
        {/* Protected Admin Routes */}
        <Route element={<AdminLayoutWrapper />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/customers" element={<AdminCustomers />} />
          <Route path="/cms" element={<AdminCMS />} />
          <Route path="/media" element={<AdminMedia />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Route>

        {/* Catch all redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AdminApp;
