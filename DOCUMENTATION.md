# Developer Documentation

This document provides an overview of the codebase structure, key architectural decisions, and details about the recent refactoring.

## Architecture Overview

The application is built using **Next.js 14 (App Router)** and follows a component-based architecture. The main logic was originally contained within a single monolithic `page.tsx` file but has since been refactored into smaller, reusable components and custom hooks to improve maintainability and readability.

### Key Directories

- **`app/components/`**: Contains presentational components. These components are primarily responsible for rendering UI and receiving data via props.
- **`app/hooks/`**: Contains custom React hooks that encapsulate business logic, state management, and side effects.
- **`app/context/`**: Contains React Context providers for global state (e.g., Authentication).
- **`app/data/`**: Contains static data files (e.g., the vocabulary list).
- **`app/lib/`**: Contains configuration files and utility functions (e.g., Firebase setup).
- **`app/types/`**: Contains TypeScript interfaces and type definitions shared across the application.

## Refactoring Summary

The main goal of the refactoring was to decompose the monolithic `page.tsx` into modular pieces without altering the functionality or UI/UX.

### 1. Custom Hooks (`app/hooks/`)

Logic was extracted from `page.tsx` into the following hooks:

- **`useAuth`** (in `context/AuthContext.tsx`): Handles Google Sign-In, Logout, and user session state.
- **`useLocalStorage`**: A generic hook for persisting state to `localStorage` (used for user preferences like `showExamples`, `autoScroll`, etc.).
- **`useFavorites`**: Manages the user's favorite words, including optimistic UI updates and syncing with Firebase Firestore.
- **`useVocabulary`**: Handles filtering (search, alphabet), pagination, and data slicing logic.
- **`useScrollPreservation`**: Manages scroll position when navigating between pages or when auto-scroll is disabled.

### 2. UI Components (`app/components/`)

The UI was broken down into the following components:

- **`Header`**: Displays the app title, description, and view toggle (Vocabulary/Favorites).
- **`AuthButton`**: Handles the login/logout UI and user profile display.
- **`Controls`**: Contains the toggle buttons for Speaker, Translation, Examples, and Auto Scroll.
- **`FilterBar`**: Contains the search input and alphabet filter buttons.
- **`VocabularyCard`**: Renders a single vocabulary item.
- **`Pagination`**: Renders the pagination controls.
- **`DateTimeDisplay`**: Displays the current date and time.
- **`Footer`**: Displays the footer content, including social links.

### 3. Type Definitions (`app/types/`)

- **`Vocabulary`**: Defines the structure of a vocabulary item (id, word, translation, example, etc.).

## Data Flow

1.  **State Initialization**: `page.tsx` initializes the main state using custom hooks.
2.  **Data Processing**: `useVocabulary` processes the raw `vocabularyList` based on current filters and pagination settings.
3.  **Rendering**: Processed data is passed down to `VocabularyCard` components via the grid layout in `page.tsx`.
4.  **User Interaction**: User actions (clicking favorite, changing page, searching) trigger handlers in `page.tsx` or within specific components, which then update the state via the custom hooks.
5.  **Persistence**:
    - **Local**: `useLocalStorage` saves UI preferences.
    - **Cloud**: `useFavorites` syncs favorite IDs to Firebase Firestore.

## Firebase Integration

- **Authentication**: Uses Google Auth Provider.
- **Firestore**: Stores user data in the `users` collection. Each document is keyed by the user's UID and contains a `favorites` array.
- **Offline Persistence**: Firestore is configured with `enableIndexedDbPersistence` (or `persistentLocalCache` in newer SDKs) to allow the app to work offline and sync changes when the connection is restored.

## Future Improvements

- **Virtualization**: For very large lists, consider using `react-window` or `react-virtualized` to improve rendering performance.
- **Server-Side Rendering (SSR)**: Currently, the app is heavily client-side (`use client`). Moving some data fetching or initial rendering to the server could improve initial load times.
- **Testing**: Add unit tests for custom hooks and components using Jest and React Testing Library.
