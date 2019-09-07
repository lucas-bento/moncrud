# MonCRUD
Easily generates RESTfull resources from Mongoose models using express.



## Instalation

```shell
npm install moncrud
```

## Usage

First, have a Mongoose Model:

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model("User", UserSchema)
```

Then tell MonCRUD to automatically generate a RESTfull resource for your Model:

```javascript
const moncrud = require('moncrud')
const app = moncrud();

app.addCruds([
    User,
])

app.listen(3000);

```

You can then got to http://localhost:3000/user to:

### Create a user
```javascript
POST http://localhost:3000/user

{
    "name":"lukita",
    "email","lukita@email.com"
}
```

### Read a user
```javascript
GET http://localhost:3000/user/:id
```

### Read all users
```javascript
GET http://localhost:3000/user
```

### Update a user
```javascript
PUT http://localhost:3000/user/:id

{
    "email","lukita@new_email.com"
}
```

### Delete a user
```javascript
DELETE http://localhost:3000/user/:id
```

### Overwrite a user
```javascript
PATCH http://localhost:3000/user/:id

{
    "name":"lukita v2",
    "email","lukita@newer_email.com"
}
```
