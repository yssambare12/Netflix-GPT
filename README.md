# Pet Medicine Search Tool

A React-based veterinary medicine search application that helps pet owners find the right medicines for their pets using AI-powered search.

## Features

- **AI-Powered Search**: Uses GPT API to recommend medicines based on user queries
- **Multi-language Support**: Search in English, Marathi, or Hindi
- **Local Inventory Integration**: Matches AI recommendations with local shop inventory
- **Detailed Medicine Information**: View ingredients, benefits, and usage in Marathi
- **Responsive Design**: Modern UI with Tailwind CSS

## Search Flow

1. **User Input**: Enter queries like "dog supplements", "milk increase medicine", "pet vitamins" in English or Marathi
2. **AI Processing**: GPT API processes the query and returns top 5 medicine recommendations
3. **Inventory Matching**: System compares AI results with local shop inventory
4. **Results Display**: Shows matching inventory items first, followed by AI recommendations
5. **Detailed View**: Click any medicine card to see detailed information in Marathi

## Technology Stack

- **Frontend**: React.js with Redux Toolkit
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI GPT API
- **Authentication**: Firebase Auth
- **State Management**: Redux Toolkit

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables for OpenAI API
4. Run the development server: `npm start`

## Environment Variables

Create a `.env` file with:

```
REACT_APP_GITHUB_AI_TOKEN=your_openai_api_key
```

## Usage

1. **Initial State**: View featured medicines from local inventory
2. **Search**: Enter medicine queries in any supported language
3. **Results**: Browse AI recommendations and inventory matches
4. **Details**: Click medicine cards for comprehensive information
5. **Language**: Switch between English, Marathi, and Hindi

## Local Inventory

The system includes a predefined inventory of veterinary medicines with:

- Medicine names
- Prices (in INR)
- Product images
- Categories

## API Integration

- **OpenAI GPT**: For medicine recommendations and detailed information
- **Local Data**: For inventory matching and featured products

## Responsive Design

- Mobile-first approach
- Grid layouts for medicine cards
- Modal dialogs for detailed views
- Touch-friendly interactions

## Future Enhancements

- Shopping cart functionality
- Order management
- Vet consultation booking
- Medicine availability updates
- User reviews and ratings
