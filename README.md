# Yalantis Node.js School

## Getting Started

### Prerequisites
* Git
* Node.js >= 14.0.0
* NPM >= 6.14.0
* Docker Desktop

### Step 1: clone repo
* git clone https://github.com/alexLauk/yalantis_nodejs_typescript.git
* cd yalantis_nodejs_typescript

### Step 2: install dependencies
npm install

### Step 3: run docker-compose
npm run docker:dev

### Step 4: run migration
npm run migration:run

### Step 5: run seed (if you need)
npm run seed:run

### Step 6: run your app
npm run dev

## Tests

### Step 1: run docker-compose for test
npm run docker:test

### Step 2: run tests
npm run test

## Linting
npm run lint

## API routes

Method | Route | Description
-------|-------|-------------
--- | /api | Base endpoint
POST | /api/auth/register | Register endpoint
POST | /api/auth/login | Login endpoint
PUT | /api/auth/change-password | Change password endpoint
GET | /api/user | Returns all users
GET | /api/user/{id} | Returns a user by id 
PUT | /api/user | Updates user data
DELETE | /api/user/{id}  | Deletes user data
GET | api/uploads/{filename} | Returns users avatar
