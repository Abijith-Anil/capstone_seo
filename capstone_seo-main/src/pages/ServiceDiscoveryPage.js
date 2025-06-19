import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storage, db } from '../firebase/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import '../App.css';

const ServiceDiscoveryPage = () => {
  const [products, setProducts] = useState([]);
  const [imageUrls, setImageUrls] = useState({
    adidas: '',
    puma: '',
    nike: '',
    underarmour: ''
  });
  const [loading, setLoading] = useState(true);

  // Default products data
  const defaultProducts = [
    {
      id: 'adidas',
      name: 'Adidas',
      description: '2025 — Digital ad campaign boosting urban streetwear visibility.',
      imageKey: 'Addidas.png',
      linkPath: '/companies/adidas',
      year: 2025,
      website: 'https://www.adidas.ca/en',
      products: [
        'Running Shoes',
        'Sports Apparel',
        'Urban Streetwear',
        'Athletic Accessories',
      ]
    },
    {
      id: 'puma',
      name: 'Puma',
      description: '2023 — Social media strategy targeting Gen-Z lifestyle enthusiasts.',
      imageKey: 'Puma.png',
      linkPath: '/companies/puma',
      year: 2023,
      website: 'https://ca.puma.com/ca/en',
      products: ['Sneakers', 'Training Gear', 'Casual Wear', 'Sports Accessories']
    },
    {
      id: 'nike',
      name: 'Nike',
      description: '2024 — Performance-focused email marketing to increase loyalty.',
      imageKey: 'Nike.png',
      linkPath: '/companies/nike',
      year: 2024,
      website: 'https://www.nike.com/ca',
      products: [
        'Performance Shoes',
        'Athletic Apparel',
        'Training Equipment',
        'Lifestyle Wear',
      ]
    },
    {
      id: 'underarmour',
      name: 'Under Armour',
      description: '2024 — Full-funnel campaign for winter athletic gear in Canada.',
      imageKey: 'UnderArmour.png',
      linkPath: '/companies/underarmour',
      year: 2024,
      website: 'https://www.underarmour.ca/fr-ca/',
      products: [
        'Compression Wear',
        'Running Shoes',
        'Winter Athletic Gear',
        'Sports Accessories',
      ]
    }
  ];

  // Function to create initial products data in Firestore
  const createInitialProducts = async () => {
    try {
      console.log('Creating initial products data...');
      const promises = defaultProducts.map(product => 
        addDoc(collection(db, 'products'), {
          ...product,
          createdAt: serverTimestamp(),
          isActive: true
        })
      );
      await Promise.all(promises);
      console.log('Initial products data created successfully');
      return defaultProducts;
    } catch (error) {
      console.error('Error creating initial products data:', error);
      return defaultProducts; // Return default data as fallback
    }
  };

  useEffect(() => {
    const loadProductsAndImages = async () => {
      try {
        // Fetch products from Firestore
        const productsSnapshot = await getDocs(collection(db, 'products'));
        let productsData;

        if (productsSnapshot.empty) {
          // No products exist, create default data
          console.log('No products found, creating initial data...');
          productsData = await createInitialProducts();
        } else {
          // Products exist, use them
          productsData = productsSnapshot.docs.map(doc => ({
            firestoreId: doc.id,
            ...doc.data()
          }));
          console.log('Found existing products:', productsData);
        }

        setProducts(productsData);

        // Load images from Firebase Storage for all products
        const imagePromises = productsData.map(async (product) => {
          try {
            // Check if imageKey exists and is not empty
            if (!product.imageKey) {
              console.warn(`No imageKey found for product ${product.name}`);
              return { id: product.id, url: '' };
            }
            
            const imageRef = ref(storage, product.imageKey);
            const imageUrl = await getDownloadURL(imageRef);
            return { id: product.id, url: imageUrl };
          } catch (error) {
            console.error(`Error loading image for ${product.name}:`, error);
            return { id: product.id, url: '' };
          }
        });

        const imageResults = await Promise.all(imagePromises);
        const imageUrlsMap = {};
        imageResults.forEach(result => {
          imageUrlsMap[result.id] = result.url;
        });

        setImageUrls(imageUrlsMap);

      } catch (error) {
        console.error('Error loading products and images:', error);
        // Fallback to default data if there's an error
        setProducts(defaultProducts);
        
        // Set empty image URLs for fallback
        const fallbackImageUrls = {};
        defaultProducts.forEach(product => {
          fallbackImageUrls[product.id] = '';
        });
        setImageUrls(fallbackImageUrls);
      } finally {
        setLoading(false);
      }
    };

    loadProductsAndImages();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading our work...</p>
        </div>
      </div>
    );
  }

  return (
  <div className="container py-5">
    <div className="text-center mb-5">
      <h1 className="display-5 fw-bold">
        <span className="text-primary">&lt;&lt;</span> Our Work <span className="text-primary">&gt;&gt;</span>
      </h1>
      <p className="lead text-muted">Brands we've proudly collaborated with on innovative marketing campaigns.</p>
    </div>

    <div className="row g-4">
      {products.map((product) => (
        <div key={product.firestoreId || product.id} className="col-md-6 col-lg-4">
          <Link to={product.linkPath} className="text-decoration-none text-reset">
            <div className="card h-100 shadow-sm border-0 work-card" role="button">
              <img 
                src={imageUrls[product.id] || null} 
                alt={`${product.name} Project`} 
                className="card-img-top rounded-top"
                style={{ 
                  height: '200px', 
                  objectFit: 'contain', 
                  backgroundColor: '#f8f9fa',
                  display: imageUrls[product.id] ? 'block' : 'none'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {!imageUrls[product.id] && (
                <div 
                  className="card-img-top rounded-top d-flex align-items-center justify-content-center"
                  style={{ height: '200px', backgroundColor: '#f8f9fa' }}
                >
                  <span className="text-muted">No Image Available</span>
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title fw-semibold">{product.name}</h5>
                <p className="card-text text-muted">{product.description}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ServiceDiscoveryPage;