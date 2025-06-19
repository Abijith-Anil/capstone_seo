import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Fallback data in case Firestore data is not available
const fallbackCompanies = {
  adidas: {
    id: 'adidas',
    name: 'Adidas',
    description:
      'Adidas is a global leader in athletic footwear, apparel, and accessories, focusing on innovation and sustainability.',
    products: [
      'Running Shoes',
      'Sports Apparel',
      'Urban Streetwear',
      'Athletic Accessories',
    ],
    website: 'https://www.adidas.ca/en',
  },
  puma: {
    id: 'puma',
    name: 'Puma',
    description:
      'Puma delivers cutting-edge sportswear and lifestyle products, targeting Gen-Z and sports enthusiasts worldwide.',
    products: ['Sneakers', 'Training Gear', 'Casual Wear', 'Sports Accessories'],
    website: 'https://ca.puma.com/ca/en',
  },
  nike: {
    id: 'nike',
    name: 'Nike',
    description:
      'Nike is a powerhouse brand offering innovative performance gear and inspiring athletes globally.',
    products: [
      'Performance Shoes',
      'Athletic Apparel',
      'Training Equipment',
      'Lifestyle Wear',
    ],
    website: 'https://www.nike.com/ca',
  },
  underarmour: {
    id: 'underarmour',
    name: 'Under Armour',
    description:
      'Under Armour specializes in performance apparel, footwear, and gear designed for athletes and fitness lovers.',
    products: [
      'Compression Wear',
      'Running Shoes',
      'Winter Athletic Gear',
      'Sports Accessories',
    ],
    website: 'https://www.underarmour.ca/fr-ca/',
  },
};

const CompanyDetailPage = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // First try to fetch from Firestore
        const companiesQuery = query(
          collection(db, 'products'),
          where('id', '==', companyId?.toLowerCase())
        );
        const companiesSnapshot = await getDocs(companiesQuery);

        if (!companiesSnapshot.empty) {
          // Found company data in Firestore
          const companyData = companiesSnapshot.docs[0].data();
          console.log('Found company data in Firestore:', companyData);
          
          // Convert Firestore data to expected format
          setCompany({
            id: companyData.id,
            name: companyData.name,
            description: companyData.description || companyData.description,
            products: companyData.products || [],
            website: companyData.website || '#'
          });
        } else {
          // Fallback to hardcoded data
          console.log('No company data found in Firestore, using fallback data');
          const fallbackCompany = fallbackCompanies[companyId?.toLowerCase()];
          if (fallbackCompany) {
            setCompany(fallbackCompany);
          } else {
            setError('Company not found');
          }
        }
      } catch (err) {
        console.error('Error fetching company data:', err);
        // Fallback to hardcoded data on error
        const fallbackCompany = fallbackCompanies[companyId?.toLowerCase()];
        if (fallbackCompany) {
          setCompany(fallbackCompany);
        } else {
          setError('Company not found');
        }
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchCompanyData();
    } else {
      setError('No company ID provided');
      setLoading(false);
    }
  }, [companyId]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-3">Company Not Found</h2>
        <p className="text-muted">Sorry, we could not find details for that company.</p>
        <Link to="/service-discovery" className="btn btn-primary mt-3">
          Back to Our Work
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h1 className="card-title display-4 mb-3">{company.name}</h1>
          <p className="card-text lead">{company.description}</p>

          <h4 className="mt-5 mb-3">Key Products</h4>
          <ul className="list-group list-group-flush">
            {company.products && company.products.length > 0 ? (
              company.products.map((product, idx) => (
                <li key={idx} className="list-group-item px-0">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  {product}
                </li>
              ))
            ) : (
              <li className="list-group-item px-0 text-muted">
                No products information available
              </li>
            )}
          </ul>

          {company.website && company.website !== '#' && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary mt-4"
            >
              Visit Official Website
            </a>
          )}

          <div className="mt-4">
            <Link to="/service-discovery" className="btn btn-link">
              &larr; Back to Our Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;
