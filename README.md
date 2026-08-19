# Youth Opportunity Matcher

A production-ready React application that helps students and young professionals discover opportunities based on their skills, education, interests, location, and career goals.

## Features

- **Profile Management**: Create and edit professional profiles with skills, education, interests, and career goals
- **Smart Matching**: Transparent rule-based matching algorithm that calculates compatibility scores (0-100%)
- **Opportunity Discovery**: Browse 18+ mock opportunities across 6 categories
- **Advanced Search**: Real-time search across opportunity titles, organizations, descriptions, and skills
- **Multi-Filter System**: Filter by category, location, mode, education level, and match score
- **Sorting Options**: Sort by best match, newest, deadline, or highest match
- **Save Opportunities**: Bookmark opportunities for later review with localStorage persistence
- **Application Tracking**: Track application status through the hiring process
- **Professional Dashboard**: View statistics, recommendations, and recent activity
- **Responsive Design**: Fully responsive interface for desktop, tablet, and mobile devices

## Technology Stack

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Bootstrap 5** - UI framework
- **Bootstrap Icons** - Icon library
- **JavaScript ES6+** - Programming language

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd youth-opportunity-matcher
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be generated in the `dist` directory.

## Application Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context for state management
├── data/               # Mock data (opportunities, skills, etc.)
├── pages/              # Page components
├── utils/              # Utility functions (matching, storage, helpers)
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## Pages

- **Home** - Landing page with featured opportunities and categories
- **Opportunities** - Main opportunity discovery interface with search and filters
- **Opportunity Details** - Detailed view of individual opportunities
- **Dashboard** - Personal dashboard with statistics and recommendations
- **Profile** - Profile management interface
- **Saved** - View saved opportunities
- **Applications** - Track application statuses

## Matching Algorithm

The matching algorithm calculates a compatibility score based on:

- **Skills (40%)**: How many of the required skills match your profile
- **Interests (20%)**: Alignment with your stated interests
- **Education (15%)**: Whether your education level meets requirements
- **Location (10%)**: Geographic compatibility and remote options
- **Career Goals (15%)**: Alignment with your career objectives

**Score Categories:**
- 80-100: Excellent Match
- 60-79: Good Match
- 40-59: Moderate Match
- 0-39: Low Match

## Data Persistence

The application uses localStorage to persist:
- User profile information
- Saved opportunities
- Application statuses

All data remains available after browser refresh and sessions.

## Opportunity Categories

- Scholarship
- Internship
- Freelancing
- Training
- Competition
- Startup Program

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Quality

- Functional React components with hooks
- Clean component architecture
- No console.log statements in production code
- No unused imports
- Responsive design following mobile-first approach
- Accessibility best practices (semantic HTML, ARIA labels)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is a demo application with mock data for educational purposes.

## Future Enhancements

- Backend API integration
- User authentication
- Real-time opportunity updates
- Email notifications
- Advanced analytics
- Social sharing features
- Multi-language support

## Author
- ***ABDUL SABOOR***

---
