# Ecommerce Demo

This project is a web-based application built using Node.js, Express, and MongoDB ecommerce app.

## Table of Contents

-   [Live Demo](#live-demo)
-   [Installation](#installation)
-   [Technologies Used](#technologies-used)
-   [API Endpoints](#api-endpoints)
-   [MongoDB Models](#mongodb-models)
-   [Component Details (REACT)](#component-details-react)
-   [Backend Structure](#backend-structure)
-   [Contact](#contact)

## Live Demo

Check out the live version :

-   **Website**: [https://ecommerce-app-eta-virid.vercel.app/](https://ecommerce-app-eta-virid.vercel.app/)

Note: The first request is going to take around 60 secs to start the server.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/miranas11/ecommerceApp
    ```

2. Change the ENV setting in config.js from "PROD" to "DEV"

    For frontend

    ```bash
    cd frontend/src/config.js
    ```

    For Backend

    ```bash
    cd backend/config.js
    ```

3. Install the dependencies and start servers:

    ```bash
    cd backend
    npm install
    node server.js
    ```

    ```bash
    cd frontend
    npm install
    npm start
    ```

## Technologies Used

### Backend

-   Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
-   Express.js: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
-   MongoDB ATLAS: A NoSQL database for modern applications that use a flexible, JSON-like format to store data.
    data.

### Frontend

-   React: A JavaScript library for building user interfaces, maintained by Facebook and a community of individual developers and companies.

### Tools and Packages

-   jwt (JSON Web Tokens): A compact, URL-safe means of representing claims to be transferred between two parties. It is used for authentication and authorization.
-   bcrypt: A library to help you hash passwords.
-   cors: A package for providing a Connect/Express middleware that can be used to enable CORS with various options.
-   cookie-parser: Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
-   mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js that provides a straight-forward, schema-based solution to model your application
-   express.js: A minimal and flexible Node.js web application framework.
-   axios: A promise-based HTTP client for the browser and Node.js.
-   react-router-dom: A collection of navigational components that compose declaratively with your application.
-   js-cookie: A simple, lightweight JavaScript API for handling browser cookies.

## API Endpoints

| HTTP Verbs | Endpoints     | Action                                           |
| ---------- | ------------- | ------------------------------------------------ |
| POST       | /register     | Register a new user                              |
| POST       | /login        | Authenticate and return a JWT token              |
| GET        | /products     | Fetch all products or by filter (category/price) |
| GET        | /products/:id | Fetch a single product by ID                     |
| POST       | /cart         | Add items to the cart                            |
| GET        | /cart         | Fetch the current user's cart                    |
| PUT        | /cart/:id     | Update item quantity in the cart                 |
| DELETE     | /cart/:id     | Remove an item from the cart                     |
| GET        | /wishlist     | Fetch the current user's wishlist                |
| DELETE     | /wishlist/:id | Remove an item from the cart                     |

### MongoDB Models

#### 1. Cart Model

The `Cart` model links user carts with products and manages item details.

-   **\_id**: References the `User` model (required).
-   **items**:
    -   **productId**: References `Product`.
    -   **quantity**: Number of items (default: 1, min: 1).

#### 2. Product Model

Represents products in the database.

-   **name**: Name of the product (required, trimmed).
-   **description**: Product description (required).
-   **price**: Price of the product (required, min: 0).
-   **category**: Product category (required, enum: ["electronics", "fashion", "home", "sports", "toys", "other"]).
-   **imageUrl**: URL of the product image (required).
-   **stock**: Stock count (required, min: 0, default: 0).

#### 3. User Model

Defines user details and handles authentication.

-   **name**: User's full name (required).
-   **email**: Unique user email (required, validated, lowercase).
-   **password**: User password (required, min length: 8 characters).

#### 4. Whitelist Model

Tracks products whitelisted by users.

-   **\_id**: References the `User` model (required).
-   **items**:
    -   **productId**: References `Product`.

These models facilitate user-cart interactions, product management, user authentication, and whitelisting functionality.

## Component Details (REACT)

## Backend Structure

### validateToken Middleware

-   We use this middleware in all the api calls that needs a user logged in
-   We send the jwt token in the cookie on this middleware validated the jwt token
-   If no token or validation fails to sends the corresponding error code and message and we handle and redirect to login page in front end

```javascript
const validateToken = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
        return res.status(403).json({
            success: false,
            message: "No token provided! Login Again",
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to authenticate token! Login Again",
            });
        }

        req.user = user;

        next();
    });
};
```

### JWT creation

-   After creating new user or succesful login of user we create a jwt token and send it in response.

```javascript
const token = jwt.sign(
    { name: foundUser.name, id: foundUser._id },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
);
res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
});
```

### Password Ecnryption (bcrypt)

-   We used bcrypt ot encrypt password
-   We created methods in the UserModel itself.
-   First method is called whenever we save a docuemnt of User Model.The pre method is called before saving so it modifies a ecnrypts in password before saving
-   In second method we are creating out own method findAndValidate which is used when we are trying to login in it finds the users and checks if the password matches

```javascript
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

UserSchema.statics.findAndValidate = async function (email, password) {
    const foundUser = await this.findOne({ email });
    if (!foundUser) return false;
    const validPassword = await bcrypt.compare(password, foundUser.password);
    return validPassword ? foundUser : false;
};
```

### Response Format

All API responses follow a consistent format for both success and failure scenarios to simplify error handling and data processing.

#### Success Response Format

When a request is successfully processed, the response structure is as follows:

```json
{
    "success": true,
    "data": {
        // Relevant data object (e.g., user, product, etc.)
    }
}
```

#### Failure Response Format

```json
{
    "success": true,
    "message": {
        // the error message
    }
}
```

## Contact

If you have any questions or suggestions, please contact:

-   Name: Mir Anas
-   Email: anasmir24@gmail.com
