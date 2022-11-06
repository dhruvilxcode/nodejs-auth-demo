# NodeJS Authentication

### Step 1: Clone this repository & Create .env file at root.

```js
MONGODB_URL = "paste mongodb connection url"

JWT_SECRET = "your secret"
```

### Routes

`/auth/signin`

Params: email, password

`/auth/signup`

Params: email, password, firstname, lastname