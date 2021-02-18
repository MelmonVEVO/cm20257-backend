# API

URL: `http://localhost:8080`. All requests must include the **Content-type** header with the value as **application/json**

## Authentication
All authenticated routes (i.e. ones that alter what food a user has) must include a **token** field in the header of the request and the token is generated when a login request is made.