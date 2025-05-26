# Market Match Platform

## Project Overview
Market Match is a web-based platform designed to connect farmers with buyers, facilitating agricultural trade in a modern, efficient way. The platform is built using React for the frontend and includes features for both farmers and buyers to interact seamlessly.

## Tech Stack
- Frontend: React 18.2.0 with Vite
- UI Framework: Material-UI 5.15.11 + TailwindCSS
- Database: Supabase
- State Management: React Context API
- Icons: React Icons
- Development Tools: ESLint, PostCSS, Autoprefixer

## Key Features
1. **User Authentication**
   - Dual role system (Farmer/Buyer)
   - Login/Signup functionality
   - Guest access option

2. **Product Management**
   - Product listing creation
   - Search functionality with filters
   - Category-based organization
   - Location-based search

3. **Search & Filter System**
   - Advanced search capabilities
   - Multiple filter options (category, price, location)
   - Sort by relevance, price, distance, and rating

4. **Location Services**
   - Geolocation integration
   - Distance calculation
   - Location-based matching

5. **Dark Mode Support**
   - System preference detection
   - Manual toggle option
   - Persistent theme selection

## Project Structure
```
market-match-platform/
├── react_template/          # Frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # React context providers
│   │   ├── services/        # API and service integrations
│   │   └── supabaseClient.js # Supabase configuration
│   ├── package.json        # Dependencies and scripts
│   └── vite.config.js      # Vite configuration
└── backend/                # Backend application
```

## Environment Setup
1. Create a `.env` file in the react_template directory with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
```

2. Install dependencies:
```bash
cd react_template
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Debugging History
During development, several issues were addressed:

1. **Environment Variable Configuration**
   - Changed from SUPABASE_URL/KEY to VITE_SUPABASE_URL/KEY
   - Updated configuration in supabase.ts and server/index.ts

2. **Component Issues**
   - Implemented missing ProductCard component
   - Fixed import statements in BuyerDashboard
   - Added proper Material-UI integration

3. **React Hook Usage**
   - Fixed invalid hook calls
   - Ensured hooks are only called within components
   - Updated React and related package versions for compatibility

4. **API Integration**
   - Updated API base URL configuration
   - Implemented proper environment variable access
   - Added error handling for API calls

## Best Practices Implemented
1. **Code Organization**
   - Modular component structure
   - Separation of concerns
   - Consistent file naming

2. **State Management**
   - Efficient use of React hooks
   - Context API for global state
   - Proper state initialization

3. **Error Handling**
   - Comprehensive error messages
   - User-friendly error displays
   - Proper error logging

4. **Performance**
   - Optimized component rendering
   - Efficient data fetching
   - Proper use of useEffect dependencies

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Future Enhancements
1. Real-time messaging system
2. Advanced filtering options
3. Rating and review system
4. Transaction history
5. Mobile application development

## Troubleshooting
Common issues and solutions:

1. **Invalid Hook Calls**
   - Ensure React version consistency
   - Check for multiple React installations
   - Verify hook usage within components

2. **Environment Variables**
   - Prefix with VITE_ for frontend access
   - Restart development server after changes
   - Check .env file location

3. **API Connection Issues**
   - Verify Supabase credentials
   - Check API endpoint configuration
   - Confirm network connectivity

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- React team for the excellent framework
- Supabase for the backend solution
- Material-UI for the component library
- All contributors who helped debug and improve the platform 