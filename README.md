
```markdown
# Next.js 14 Project with React Query and Context API

## Project Overview

This project is a Next.js 14 application that demonstrates the use of React Query for efficient data fetching and caching, along with the Context API for state management across components. The application fetches data from a fake API, displays it on the home page, and provides detailed views for individual items.

## Key Technologies

- Next.js 14
- React Query (Tanstack Query)
- Context API
- TypeScript
- Tailwind CSS

## Project Structure

```
src/
├── app/
│   ├── item/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AppWrapper.tsx
│   ├── ItemList.tsx
│   └── UserCard.tsx
├── context/
│   └── AppContext.tsx
└── lib/
    └── queryClient.ts
```

## Component Breakdown

### 1. AppContext (src/context/AppContext.tsx)
- Manages `commonValue` and `userName` states
- Provides `setCommonValue` and `setUserName` functions to update the state
- Uses the 'use client' directive to work as a Client Component

### 2. AppWrapper (src/components/AppWrapper.tsx)
- Wraps the application with QueryClientProvider and AppProvider
- Ensures that React Query and the Context API are available throughout the app

### 3. Layout (src/app/layout.tsx)
- Wraps the entire application with the AppWrapper
- Includes the UserCard component
- Provides a consistent layout across all pages

### 4. Home Page (src/app/page.tsx)
- Renders the ItemList component
- Provides a title for the page

### 5. ItemList (src/components/ItemList.tsx)
- Uses React Query to fetch items and user name
- Displays items in a grid layout
- Sets the common value and user name in the context

### 6. Item Detail Page (src/app/item/[id]/page.tsx)
- Uses dynamic routing to fetch and display item details
- Implements a back button for navigation
- Uses React Query for efficient data fetching

### 7. UserCard (src/components/UserCard.tsx)
- Retrieves the user name from the context
- Renders consistently across all pages

### 8. Query Client (src/lib/queryClient.ts)
- Configures the React Query client for the application

## Data Flow

1. The application starts by fetching a list of items and a random user name when the home page loads.
2. These data are cached using React Query to prevent unnecessary refetching.
3. The user name is stored in the context and displayed in the UserCard component.
4. When a user clicks on an item, they are taken to the detail page, which fetches and displays specific item information.
5. The common value set on the home page is accessible on the detail page through the context.

## Key Functionalities

1. **Data Fetching and Caching**: React Query is used to fetch data from the API and cache the results, reducing unnecessary network requests.
2. **State Management**: The Context API is used to manage and share state across components, particularly for the user name and common value.
3. **Dynamic Routing**: Next.js dynamic routing is used to create individual pages for each item.
4. **Responsive Design**: Tailwind CSS is used to create a responsive layout that adapts to different screen sizes.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints Used

- Items: `https://jsonplaceholder.typicode.com/posts`
- User Name: `https://api.namefake.com/`

## Future Improvements

1. Implement error handling for API requests
2. Add unit and integration tests
3. Implement server-side rendering for improved SEO
4. Add pagination or infinite scrolling for the item list
5. Implement a search functionality

For more detailed information about specific components or functionalities, refer to the inline comments in the respective files.
```
