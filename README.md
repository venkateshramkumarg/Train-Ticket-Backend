# Train Ticket Booking System

Welcome to the Train Ticket Booking System. This application allows administrators to manage users, stations, trains, and bookings through a RESTful API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Admin](#admin)
  - [Stations](#stations)
  - [Trains](#trains)
  - [Users](#users)
  - [Bookings](#bookings)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd TrainTicket
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the database using Prisma:
    ```sh
    npx prisma migrate dev
    ```

4. Start the application:
    ```sh
    npm start
    ```

## Usage

The application runs on `http://localhost:3000/api`. You can use tools like Postman or curl to interact with the API.

## API Endpoints

### Admin

- **Create Admin**
    ```http
    POST /api/admin/create/admin/new
    ```
    **Request Body:**
    ```json
    {
      "user_name": "admin_name",
      "password": "password",
      "email": "admin@example.com"
    }
    ```

- **Delete Admin**
    ```http
    DELETE /api/admin/delete/admin/:name
    ```

- **Update Admin**
    ```http
    PUT /api/admin/update/admin/:name
    ```
    **Request Body:**
    ```json
    {
      "password": "new_password",
      "email": "new_email@example.com"
    }
    ```

### Stations

- **Create Station**
    ```http
    POST /api/stations/create/station/new
    ```
    **Request Body:**
    ```json
    {
      "user_name": "admin_name",
      "stationId": "station_id",
      "stationName": "station_name"
    }
    ```

- **Delete Station**
    ```http
    DELETE /api/stations/delete/station/:id
    ```

- **Get Station by ID**
    ```http
    GET /api/stations/stations/:id
    ```

### Trains

- **Create Train**
    ```http
    POST /api/trains/create/train/new
    ```
    **Request Body:**
    ```json
    {
      "user_name": "admin_name",
      "trainNo": "train_number",
      "trainName": "train_name",
      "noOfSeatsAvailable": "number_of_seats",
      "departureDate": "departure_date",
      "stationIds": ["station_id1", "station_id2"]
    }
    ```

- **Delete Train**
    ```http
    DELETE /api/trains/delete/train/:number
    ```

### Users

- **Create User**
    ```http
    POST /api/users/create/user/new
    ```
    **Request Body:**
    ```json
    {
      "user_name": "user_name",
      "password": "password",
      "email": "user@example.com"
    }
    ```

- **Delete User**
    ```http
    DELETE /api/users/delete/user/:name
    ```

- **Update User**
    ```http
    PUT /api/users/update/user/:name
    ```
    **Request Body:**
    ```json
    {
      "password": "new_password",
      "email": "new_email@example.com"
    }
    ```

### Bookings

- **Create Booking**
    ```http
    POST /api/bookings/create/booking/new
    ```
    **Request Body:**
    ```json
    {
      "user_name": "user_name",
      "trainNo": "train_number",
      "seatNo": "seat_number"
    }
    ```

- **Delete Booking**
    ```http
    DELETE /api/bookings/delete/booking/:id
    ```

## Environment Variables

Create a [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FVS%20CODE%2FNodeJS%2FTrainTicket%2FTrainTicket%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\VS CODE\NodeJS\TrainTicket\TrainTicket\.env") file in the root directory and add the following environment variables:
