import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout/Layout';
import POSPage from './pages/POSPage';
import InventoryPage from './pages/InventoryPage';
import BranchesPage from './pages/BranchesPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './styles/theme.css';
import SubscriptionsPage from './pages/SubscriptionsPage';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<Layout />}>
            <Route path="/pos" element={<POSPage />} />
            <Route path="/inventario" element={<InventoryPage />} />
            <Route path="/sucursales" element={<BranchesPage />} />
            <Route path="/ajustes" element={<SettingsPage />} />
            <Route path="/" element={<Navigate to="/pos" />} />
            <Route path="/suscripciones" element={<SubscriptionsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}