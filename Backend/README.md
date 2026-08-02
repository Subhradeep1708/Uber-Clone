# Uber Clone — Backend API Docs



## 1. Users Register

Endpoint: `POST /users/register`

**Description:**
- Registers a new user, hashes their password, and returns a JWT token plus the created user object.

**Request URL**
- POST `/users/register`

**Request body (JSON)**
- `fullname` (object) - required: contains `firstname` (string, required) and `lastname` (string, optional)
- `email` (string) - required, must be a valid email
- `password` (string) - required, minimum 6 characters

Example request body:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "s3cretpw"
}
```

Example cURL:

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"John","lastname":"Doe"},"email":"john@example.com","password":"s3cretpw"}'
```

**Validation / Errors**
- On validation failure the API responds with `400 Bad Request` and an array of validation errors in the shape:

```json
{
  "errors": [
    { "msg": "Please enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

**Successful Response (201 Created)**
- Returns a JSON object containing the JWT `token` and the `user` document. The password is not returned in the response.

Example success response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f0c8e8a1b2c3d4e5f6a7b8",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

**Other status codes**
- `400 Bad Request` — validation errors or missing required fields.
- `500 Internal Server Error` — unexpected server errors.

**Notes**
- The server hashes the `password` before saving and does not include it in the returned `user` object.
- Ensure your environment variable `JWT_SECRET` is set to validate token generation.

## 2. Users Login

Endpoint: `POST /users/login`

**Description:**
- Authenticates an existing user with email and password, then returns a JWT token plus the user object.

**Request URL**
- POST `/users/login`

**Request body (JSON)**
- `email` (string) - required, must be a valid email
- `password` (string) - required, minimum 6 characters

Example request body:

```json
{
  "email": "john@example.com",
  "password": "s3cretpw"
}
```

Example cURL:

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"s3cretpw"}'
```

**Validation / Errors**
- On validation failure the API responds with `400 Bad Request` and an array of validation errors in the shape:

```json
{
  "errors": [
    { "msg": "Please enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

**Authentication Errors**
- Returns `401 Unauthorized` when the email does not exist or the password is incorrect.

Example error response:

```json
{
  "message": "Invalid email or password"
}
```

**Successful Response (200 OK)**
- Returns a JSON object containing the JWT `token` and the `user` document. The password is not returned in the response.

Example success response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f0c8e8a1b2c3d4e5f6a7b8",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

**Other status codes**
- `400 Bad Request` — validation errors or missing required fields.
- `401 Unauthorized` — invalid credentials.
- `500 Internal Server Error` — unexpected server errors.

**Notes**
- The login flow looks up the user by email, selects the stored password for comparison, and returns a JWT token on success.
