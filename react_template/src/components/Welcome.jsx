// src/components/Welcome.jsx
import React from 'react';
import Button from './ui/Button';
import Card from './ui/Card';

const Welcome = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-700 dark:text-green-500 mb-2">
              Market Match Platform
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Connecting farmers and buyers directly
            </p>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold mb-2">Are you a Farmer or a Buyer?</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Select your role to personalize your experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={() => onRoleSelect('farmer')}
              className="py-8 text-lg"
              color="green"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-2">👨‍🌾</span>
                <span className="font-medium">Farmer (Producer)</span>
              </div>
            </Button>
            
            <Button 
              onClick={() => onRoleSelect('buyer')}
              className="py-8 text-lg"
              color="blue"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-2">🛒</span>
                <span className="font-medium">Buyer</span>
              </div>
            </Button>
          </div>
        </Card>

        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>Already have an account? You can log in after selecting your role.</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;