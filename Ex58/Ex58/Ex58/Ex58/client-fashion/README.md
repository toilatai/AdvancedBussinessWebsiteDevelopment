# client-fashion

This project is the client-facing Angular application for the Fashion Website (Exercise 58).

## Features
- Display fashion items grouped by style
- Search and filter by style categories
- View detailed fashion information with WYSIWYG descriptions
- Responsive gallery layout

## Running the Application

### Prerequisites
- Node.js installed
- MongoDB server running locally with 'FashionData' database
- server-fashion API running on port 4000

### Installation & Build
```bash
cd client-fashion
npm install
npm start
```

The application will be available at http://localhost:4002

## API Integration

The client communicates with server-fashion API through a proxy defined in `proxy.conf.json`:
- `/api/fashions` → `http://localhost:4000/fashions`

## Project Structure
- `src/app/components/` - All UI components
- `src/app/fashion.service.ts` - API communication service
- `src/styles.css` - Global styles and gallery layout
