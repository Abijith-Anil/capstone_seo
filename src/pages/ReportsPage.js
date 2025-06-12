import React from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const reportsData = [
  {
    id: 1,
    title: 'May 2025 Campaign Performance',
    summary: 'Overview of campaign metrics and ROI for May 2025.',
    date: '2025-06-01',
  },
  {
    id: 2,
    title: 'Client Engagement Report',
    summary: 'Analysis of client interactions and feedback from last quarter.',
    date: '2025-05-15',
  },
  {
    id: 3,
    title: 'Monthly Ad Spend Breakdown',
    summary: 'Detailed spend report across all active campaigns for May.',
    date: '2025-06-05',
  },
];

// Sample data for graphs
const campaignPerformanceData = [
  { name: 'Week 1', clicks: 400, conversions: 240 },
  { name: 'Week 2', clicks: 300, conversions: 139 },
  { name: 'Week 3', clicks: 200, conversions: 980 },
  { name: 'Week 4', clicks: 278, conversions: 390 },
];

const adSpendData = [
  { name: 'Social Media', spend: 4000 },
  { name: 'Search Ads', spend: 3000 },
  { name: 'Email Marketing', spend: 2000 },
  { name: 'Affiliate', spend: 2780 },
];

const ReportsPage = () => {
  return (
    <div className="container py-5" style={{ maxWidth: 900 }}>
      <h1 className="mb-4">Reports</h1>

      {reportsData.length === 0 ? (
        <p className="text-center text-muted">No reports available at the moment.</p>
      ) : (
        <div className="mb-5">
          {reportsData.map(({ id, title, summary, date }) => (
            <div key={id} className="mb-4 p-3 border rounded shadow-sm bg-white">
              <h5>{title}</h5>
              <small className="text-muted">{new Date(date).toLocaleDateString()}</small>
              <p className="text-muted">{summary}</p>
            </div>
          ))}
        </div>
      )}

      {/* Graph Section */}
      <h3 className="mb-3">Campaign Performance (Clicks & Conversions)</h3>
      <div style={{ width: '100%', height: 300 }} className="mb-5">
        <ResponsiveContainer>
          <LineChart data={campaignPerformanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="clicks" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="conversions" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h3 className="mb-3">Monthly Ad Spend by Channel</h3>
      <div style={{ width: '100%', height: 300 }} className="mb-5">
        <ResponsiveContainer>
          <BarChart data={adSpendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="spend" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <Link to="/dashboard" className="btn btn-link">
          &larr; Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ReportsPage;
