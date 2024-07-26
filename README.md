# Chat App using ReactJS, Express, NodeJS, MongoDB, and Socket.IO

## Project Description
This project is a comprehensive chat application that combines a robust backend with a dynamic frontend. The backend is built with Node.js, Express, and MongoDB, while the frontend is developed using React, Redux, and other modern JavaScript libraries.

## Features
- **Authentication**: Secure user authentication with JWT and bcrypt.
- **File Uploads**: Image uploads using Multer and Cloudinary.
- **Real-Time Communication**: Real-time updates with Socket.IO.
- **Data Validation**: Request validation with express-validator.
- **Responsive UI**: Modern and responsive user interface with MUI (Material-UI).
- **State Management**: Efficient state management with Redux Toolkit.
- **Data Visualization**: Interactive charts and graphs with Chart.js and react-chartjs-2.

## Installation

### Prerequisites
- Node.js
- npm (Node Package Manager)

### Backend Setup
1. Clone the repository:
    ```sh
    git clone <repository_url>
    cd <repository_name>/backend
    ```

2. Install backend dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the backend directory and add the necessary environment variables:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```sh
    cd ../frontend
    ```

2. Install frontend dependencies:
    ```sh
    npm install
    ```

3. Start the frontend development server:
    ```sh
    npm run dev
    ```

## Usage
- Access the frontend at `http://localhost:3000`
- The backend API is available at `http://localhost:5000`

## Scripts

### Backend
- `npm start`: Starts the backend server
- `npm run dev`: Starts the backend server with nodemon for development

### Frontend
- `npm run dev`: Starts the frontend development server
- `npm run build`: Builds the frontend for production
- `npm run lint`: Lints the frontend codebase
- `npm run preview`: Previews the production build

## Dependencies

### Backend
- **bcrypt**: ^5.1.1
- **cloudinary**: ^2.3.0
- **cookie-parser**: ^1.4.6
- **cors**: ^2.8.5
- **dotenv**: ^16.4.5
- **express**: ^4.19.2
- **express-validator**: ^7.1.0
- **jsonwebtoken**: ^9.0.2
- **mongoose**: ^8.5.1
- **multer**: ^1.4.5-lts.1
- **socket.io**: ^4.7.5
- **uuid**: ^10.0.0

### Backend Dev Dependencies
- **@faker-js/faker**: ^8.4.1
- **@types/bcrypt**: ^5.0.2
- **@types/cookie-parser**: ^1.4.7
- **@types/express**: ^4.17.21
- **@types/jsonwebtoken**: ^9.0.6
- **@types/multer**: ^1.4.11
- **@types/uuid**: ^10.0.0
- **nodemon**: ^3.1.4

### Frontend
- **@emotion/react**: ^11.11.4
- **@emotion/styled**: ^11.11.5
- **@mui/icons-material**: ^5.16.1
- **@mui/material**: ^5.16.1
- **@mui/x-data-grid**: ^7.10.0
- **@reduxjs/toolkit**: ^2.2.6
- **axios**: ^1.7.2
- **chart.js**: ^4.4.3
- **moment**: ^2.30.1
- **react**: ^18.3.1
- **react-chartjs-2**: ^5.2.0
- **react-dom**: ^18.3.1
- **react-helmet-async**: ^2.0.5
- **react-hot-toast**: ^2.4.1
- **react-redux**: ^9.1.2
- **react-router-dom**: ^6.24.1
- **socket.io-client**: ^4.7.5

### Frontend Dev Dependencies
- **@types/react**: ^18.3.3
- **@types/react-dom**: ^18.3.0
- **@vitejs/plugin-react-swc**: ^3.5.0
- **eslint**: ^8.57.0
- **eslint-plugin-react**: ^7.34.2
- **eslint-plugin-react-hooks**: ^4.6.2
- **eslint-plugin-react-refresh**: ^0.4.7
- **vite**: ^5.3.1

## Contributing
We welcome contributions! Please fork the repository and submit pull requests.

## License
This project is licensed under the MIT License.

## Contact
For questions or feedback, please contact [Your Name] at [your-email@example.com].
