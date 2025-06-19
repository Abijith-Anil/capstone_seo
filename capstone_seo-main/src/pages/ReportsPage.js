import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import { collection, query, where, getDocs, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';

const ReportsPage = () => {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  // Function to generate realistic random report data
  const generateRandomReportData = (userId, period = 'monthly') => {
    const baseVisits = 10000 + Math.floor(Math.random() * 15000); // 10K-25K
    const conversionRate = 2.5 + Math.random() * 3; // 2.5%-5.5%
    const adSpend = 5000 + Math.floor(Math.random() * 20000); // $5K-$25K
    const totalRevenue = adSpend * (1.5 + Math.random() * 2); // 1.5x to 3.5x ROI
    
    return {
      userId,
      reportType: period,
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear(),
      websiteVisits: baseVisits,
      conversionRate: Number(conversionRate.toFixed(1)),
      totalRevenue: Math.floor(totalRevenue),
      adSpend,
      roi: Number((totalRevenue / adSpend).toFixed(2)),
      impressions: baseVisits * (8 + Math.floor(Math.random() * 12)), // 8-20x visits
      clicks: Math.floor(baseVisits * 0.05 * (1 + Math.random())), // ~5% CTR
      emailSubscribers: Math.floor(baseVisits * 0.02 * (1 + Math.random())), // ~2% subscription rate
      socialEngagement: Math.floor(Math.random() * 5000) + 1000, // 1K-6K
    };
  };

  // Function to create initial report data
  const createInitialReportData = async (userId) => {
    try {
      console.log('Creating initial report data for user:', userId);
      
      const reportData = generateRandomReportData(userId, selectedPeriod);
      await addDoc(collection(db, 'reportData'), {
        ...reportData,
        createdAt: serverTimestamp()
      });

      console.log('Initial report data created successfully');
      return reportData;
    } catch (error) {
      console.error('Error creating initial report data:', error);
      return null;
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/');
      return;
    }

    const fetchReportData = async () => {
      try {
        const reportsQuery = query(
          collection(db, 'reportData'),
          where('userId', '==', user.uid)
          // Removed orderBy and reportType filter to avoid composite index
        );
        
        const reportsSnapshot = await getDocs(reportsQuery);
        
        if (!reportsSnapshot.empty) {
          // Filter and sort in JavaScript to avoid composite index
          const reports = reportsSnapshot.docs.map(doc => doc.data())
            .filter(report => report.reportType === selectedPeriod)
            .sort((a, b) => {
              const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
              const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
              return bTime - aTime;
            });
          
          if (reports.length > 0) {
            setReportData(reports[0]); // Use the latest report
            console.log('Found existing report data:', reports[0]);
          } else {
            // No data for this period, create initial data
            console.log('No report data found for this period, creating initial data...');
            const newReportData = await createInitialReportData(user.uid);
            if (newReportData) {
              setReportData(newReportData);
            } else {
              setReportData(generateRandomReportData(user.uid, selectedPeriod));
            }
          }
        } else {
          // No data exists, create initial data
          console.log('No report data found, creating initial data...');
          const newReportData = await createInitialReportData(user.uid);
          if (newReportData) {
            setReportData(newReportData);
          } else {
            // Fallback to random data if creation fails
            setReportData(generateRandomReportData(user.uid, selectedPeriod));
          }
        }
      } catch (error) {
        console.error('Error fetching report data:', error);
        // Set fallback data on error
        setReportData(generateRandomReportData(user.uid, selectedPeriod));
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [navigate, selectedPeriod]);

  if (loading) {
    return <div className="text-center mt-5">Loading reports...</div>;
  }
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Performance Reports</h2>
          
          {/* Period Selector */}
          <div className="mb-4">
            <select 
              className="form-select w-auto"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Report Cards */}
          <div className="row g-4 mb-5">
            <div className="col-md-6 col-lg-3">
              <div className="card text-center h-100">
                <div className="card-body">
                  <h5 className="card-title">Website Visits</h5>
                  <h3 className="text-primary">{reportData?.websiteVisits?.toLocaleString() || '0'}</h3>
                  <p className="text-muted mb-0">This {selectedPeriod}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card text-center h-100">
                <div className="card-body">
                  <h5 className="card-title">Conversion Rate</h5>
                  <h3 className="text-success">{reportData?.conversionRate || '0'}%</h3>
                  <p className="text-muted mb-0">Average conversion</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card text-center h-100">
                <div className="card-body">
                  <h5 className="card-title">Total Revenue</h5>
                  <h3 className="text-warning">${reportData?.totalRevenue?.toLocaleString() || '0'}</h3>
                  <p className="text-muted mb-0">Generated revenue</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card text-center h-100">
                <div className="card-body">
                  <h5 className="card-title">ROI</h5>
                  <h3 className="text-info">{reportData?.roi || '0'}x</h3>
                  <p className="text-muted mb-0">Return on investment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Report Summary - {reportData?.month} {reportData?.year}</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h6>Performance Metrics:</h6>
                      <ul className="list-unstyled">
                        <li><strong>Website Visits:</strong> {reportData?.websiteVisits?.toLocaleString() || '0'}</li>
                        <li><strong>Conversion Rate:</strong> {reportData?.conversionRate || '0'}%</li>
                        <li><strong>Ad Spend:</strong> ${reportData?.adSpend?.toLocaleString() || '0'}</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h6>Financial Overview:</h6>
                      <ul className="list-unstyled">
                        <li><strong>Total Revenue:</strong> ${reportData?.totalRevenue?.toLocaleString() || '0'}</li>
                        <li><strong>Return on Investment:</strong> {reportData?.roi || '0'}x</li>
                        <li><strong>Profit Margin:</strong> {reportData?.totalRevenue && reportData?.adSpend 
                          ? ((reportData.totalRevenue - reportData.adSpend) / reportData.totalRevenue * 100).toFixed(1) 
                          : '0'}%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
