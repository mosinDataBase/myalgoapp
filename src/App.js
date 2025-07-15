// src/App.jsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import OTPPage from './pages/OTPPage';
import HomePage from './pages/HomePage';
import DashboardLayout from './components/DashboardLayout';
import PrivateRoute from './components/routes/PrivateRoute';

// Pages inside dashboard

import WatchListPage from './pages/WatchListPage';
import OrdersPage from './pages/OrdersPage';
import TradesPage from './pages/TradesPage';
import ManagementPage from './pages/ManagementPage';
import OrderLogsPage from './pages/OrderLogsPage';
import ActivityLogsPage from './pages/ActivityLogsPage';
import TradeSettingsPage from './pages/TradeSettingsPage';
import OptionAnalyticsPage from './pages/OptionAnalyticsPage';
import BroadcastMessagesPage from './pages/BroadcastMessagesPage';
import SupportPage from './pages/SupportPage';
import DashboardPage from './pages/DashboardPage';
import NetPositionPage from './components/NetPosition/NetPositionPage';
import URLS from './config/apiUrls';

const App = () => {
  return (
    <Router >
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/home" element={<HomePage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/watchlist"
          element={
            <PrivateRoute>
              <DashboardLayout> <WatchListPage /> </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <OrdersPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/trades"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <TradesPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/net-position"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <NetPositionPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/management"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <ManagementPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/order-logs"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <OrderLogsPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/activity-logs"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <ActivityLogsPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/trade-settings"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <TradeSettingsPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/option-analytics"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <OptionAnalyticsPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/broadcast-messages"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <BroadcastMessagesPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/support"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <SupportPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
