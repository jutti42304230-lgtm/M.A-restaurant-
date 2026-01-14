
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { RestaurantProvider } from './store/RestaurantContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { POS } from './pages/POS';
import { AdminDashboard } from './pages/Admin/Dashboard';
import { Contact } from './pages/Contact';

const App: React.FC = () => {
  return (
    <RestaurantProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/pos" element={<POS />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </RestaurantProvider>
  );
};

export default App;
