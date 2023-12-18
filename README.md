# belvo-backend-test

## Description

This project has been developed as part of a technical test for Santex. The application is built in TypeScript and uses MongoDB as the database. Below are some important aspects of the development:

## Database

The choice of MongoDB as the database was based on the nature of the data provided for the test. The data did not have a strong relationship between them, and MongoDB, with its flexible document model, adapted well to this situation. Mongoose was used as the Object-Document Mapper (ODM) to facilitate interaction with the MongoDB database from the Node.js application.

## Repositories

To access data in the database, repositories were implemented using the repository design pattern. Repositories act as an intermediate layer between the application logic and the database, providing a clean and consistent interface to interact with data models.

## Interfaces

Interfaces were used to define clear contracts between different parts of the system. This helps decouple concrete implementations from interfaces, making unit testing easier and improving code maintainability.

## Usage Guide

### Prerequisites

1. **Docker**: Make sure you have Docker installed on your machine as the database is mounted in a Docker image (check DockerFile and docker-compose files).

### Configuration

1. Open the `.env` file aif you want to change something

### Execution Steps

1. **Build the Database**: Execute the following command to build and mount the database:

   ```bash
   npm run buildDatabase

   ```
2. **Start the application**: Execute the following command:

   ```bash
   npm run start

   ```
### Endpoints in the Financial Transactions API

#### 1. **Add Transactions (many)**
 - **Description:** Allows adding new transactions (Array) to the database.
   - **HTTP Method:** `POST`
   - **Endpoint:** `/transactions/createMany`
   - **Request Body (Example):**
     ```json
     [
       {
         "reference": "000051",
         "date": "2020-01-03",
         "amount": "-51.13",
         "type": "outflow",
         "category": "groceries",
         "user_email": "janedoe@email.com"
       }
     ]
     ```
   - **Successful Response (Status Code 201):**
     ```json
     [
       {
         "reference": "000051",
         "date": "2020-01-03",
         "amount": "-51.13",
         "type": "outflow",
         "category": "groceries",
         "user_email": "janedoe@email.com"
       }
     ]
     ```

#### 2. **Add Transactions (one)**
 - **Description:** Allows adding a transaction to the database.
   - **HTTP Method:** `POST`
   - **Endpoint:** `/transactions/createone`
   - **Request Body (Example):**
     ```json
     
       {
         "reference": "000051",
         "date": "2020-01-03",
         "amount": "-51.13",
         "type": "outflow",
         "category": "groceries",
         "user_email": "janedoe@email.com"
       }
     
     ```
   - **Successful Response (Status Code 201):**
     ```json
     
       {
         "reference": "000051",
         "date": "2020-01-03",
         "amount": "-51.13",
         "type": "outflow",
         "category": "groceries",
         "user_email": "janedoe@email.com"
       }
     
     ```

#### 3. **Transaction Summary**
   - **Description:** Provides a summary showing the total inflow and outflow for each user.
   - **HTTP Method:** `GET`
   - **Endpoint:** `/transactions?group_by=type`
   - **Example Response:**
     ```json
     [
       {
         "user_email": "janedoe@email.com",
         "total_inflow": "2651.44",
         "total_outflow": "-761.85"
       },
       {
         "user_email": "johndoe@email.com",
         "total_inflow": "0.00",
         "total_outflow": "-51.13"
       }
     ]
     ```

#### 4. **User Summary by Category**
   - **Description:** Shows the sum of amounts per transaction category for a specific user.
   - **HTTP Method:** `GET`
   - **Endpoint:** `/transactions/{user_email}/summary`
   - **Example Response:**
     ```json
     {
       "inflow": {
         "salary": "2500.72",
         "savings": "150.72"
       },
       "outflow": {
         "groceries": "-51.13",
         "rent": "-560.00",
         "transfer": "-150.72"
       }
     }
     ```
#### 5. **Get All Transactions**
   - **Description:** Retrieves a list of all transactions.
   - **HTTP Method:** `GET`
   - **Endpoint:** `/transactions/all`
   - **Example Response:**
     ```json
     [
       {
         "reference": "000051",
         "date": "2020-01-03",
         "amount": "-51.13",
         "type": "outflow",
         "category": "groceries",
         "user_email": "janedoe@email.com"
       }
     ]
     ```

#### I added a postman collection in postman_collection folder