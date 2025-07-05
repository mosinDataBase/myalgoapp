import React from 'react';
import StatsCard from './StatsCard';
import ChartCard from './ChartCard';
import MarketWatch from './MarketWatch';
import QuoteViewer from './QuoteViewer';
import OrderSummary from './OrderSummary';
import RecentOrders from './RecentOrders';

const DashboardMain = () => (
  <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
    <StatsCard title="Portfolio Value" value="₹1,25,000" />
    <StatsCard title="Today's P&L" value="₹+1,200" delta="+3%" />
    <StatsCard title="Open Orders" value="4" />
    <ChartCard />
    <MarketWatch />
    <QuoteViewer />
    <OrderSummary />
    <RecentOrders />
  </div>
);

export default DashboardMain;
