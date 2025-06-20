import { useParams, Link } from 'react-router-dom';

const companies = {
  adidas: {
    name: 'Adidas',
    description:
      'Adidas is a global leader in athletic footwear, apparel, and accessories, focusing on innovation and sustainability.',
    products: [
      'Running Shoes',
      'Sports Apparel',
      'Urban Streetwear',
      'clothes',
      'Athletic Accessories',
    ],
    website: 'https://www.adidas.ca/en',
  },
  puma: {
    name: 'Puma',
    description:
      'Puma delivers cutting-edge sportswear and lifestyle products, targeting Gen-Z and sports enthusiasts worldwide.',
    products: ['Sneakers', 'Training Gear', 'Casual Wear', 'Sports Accessories'],
    website: 'https://ca.puma.com/ca/en',
  },
  nike: {
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
  const company = companies[companyId?.toLowerCase()];

  if (!company) {
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
            {company.products.map((product, idx) => (
              <li key={idx} className="list-group-item px-0">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                {product}
              </li>
            ))}
          </ul>

          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary mt-4"
          >
            Visit Official Website
          </a>

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
