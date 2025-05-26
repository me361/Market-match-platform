// src/components/MarketPrices.jsx
import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';

const MarketPrices = () => {
  const [priceData, setPriceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState('all');
  const [product, setProduct] = useState('all');

  // Mock data - in a real app, this would come from an API call
  const mockPriceData = [
    {
      id: 1,
      product: 'Tomatoes',
      category: 'Vegetables',
      region: 'Nairobi',
      price: 120,
      unit: 'kg',
      date: '2023-04-15',
      trend: 'up', // up, down, stable
      changePercentage: 5.2
    },
    {
      id: 2,
      product: 'Maize',
      category: 'Cereals',
      region: 'Nakuru',
      price: 42,
      unit: 'kg',
      date: '2023-04-15',
      trend: 'down',
      changePercentage: 3.7
    },
    {
      id: 3,
      product: 'Potatoes',
      category: 'Vegetables',
      region: 'Nyeri',
      price: 35,
      unit: 'kg',
      date: '2023-04-15',
      trend: 'stable',
      changePercentage: 0.5
    },
    {
      id: 4,
      product: 'Milk',
      category: 'Dairy',
      region: 'Eldoret',
      price: 65,
      unit: 'liter',
      date: '2023-04-15',
      trend: 'up',
      changePercentage: 8.3
    },
    {
      id: 5,
      product: 'Bananas',
      category: 'Fruits',
      region: 'Mombasa',
      price: 15,
      unit: 'piece',
      date: '2023-04-15',
      trend: 'stable',
      changePercentage: 0
    },
    {
      id: 6,
      product: 'Tomatoes',
      category: 'Vegetables',
      region: 'Mombasa',
      price: 130,
      unit: 'kg',
      date: '2023-04-15',
      trend: 'up',
      changePercentage: 7.1
    },
    {
      id: 7,
      product: 'Maize',
      category: 'Cereals',
      region: 'Nairobi',
      price: 45,
      unit: 'kg',
      date: '2023-04-15',
      trend: 'up',
      changePercentage: 2.2
    },
    {
      id: 8,
      product: 'Beans',
      category: 'Cereals',
      region: 'Nakuru',
      price: 110,
      unit: 'kg',
      date: '2023-04-15',
      trend: 'down',
      changePercentage: 1.8
    }
  ];

  const regions = ['all', 'Nairobi', 'Mombasa', 'Nakuru', 'Nyeri', 'Eldoret'];
  const products = ['all', 'Tomatoes', 'Maize', 'Potatoes', 'Milk', 'Bananas', 'Beans'];
  const categories = ['all', 'Vegetables', 'Fruits', 'Cereals', 'Dairy'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPriceData(mockPriceData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredData = priceData.filter(item => {
    const matchesRegion = region === 'all' || item.region === region;
    const matchesProduct = product === 'all' || item.product === product;
    return matchesRegion && matchesProduct;
  });

  // Function to render trend icon and color
  const renderTrend = (trend, percentage) => {
    switch (trend) {
      case 'up':
        return (
          <div className="flex items-center text-red-600 dark:text-red-400">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>{percentage}%</span>
          </div>
        );
      case 'down':
        return (
          <div className="flex items-center text-green-600 dark:text-green-400">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
            </svg>
            <span>{percentage}%</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
            </svg>
            <span>{percentage}%</span>
          </div>
        );
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Market Price Trends</h2>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="w-full sm:w-auto">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Region
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full sm:w-40 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-500"
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r === 'all' ? 'All Regions' : r}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Product
          </label>
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full sm:w-40 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-500"
          >
            {products.map((p) => (
              <option key={p} value={p}>
                {p === 'all' ? 'All Products' : p}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-auto flex items-end">
          <Button
            color="secondary"
            size="sm"
            onClick={() => {
              setRegion('all');
              setProduct('all');
            }}
            className="mb-1"
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <svg className="animate-spin h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No price data available for the selected filters</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Region
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price (KES)
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Trend
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {item.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900 dark:text-white">
                    {item.price}/{item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    {renderTrend(item.trend, item.changePercentage)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-400">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-6">
        <Card className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <div className="flex items-start">
            <svg className="w-6 h-6 mr-3 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-medium text-green-700 dark:text-green-500">Price Information</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                These prices are collected daily from major markets across the country. Use this information to make informed pricing decisions for your produce. Prices may vary based on quality and exact location.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MarketPrices;