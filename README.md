# MonCRUD
Easily generates RESTfull APIs using a MongoDB database.

This node module creates resources from Mongoose models and exposes them using an Express server.


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

Decorate your express app with moncrud

```javascript
const moncrud = require('moncrud')
const express = require('express')
const baseApp = express()

//
// Perform additional configurarions on express instance
//

// Decorate with moncrud
const app = moncrud(baseApp)
```

Alternatively, you can just have moncrud set everything up for you
```javascript
const moncrud = require('moncrud')
const app = moncrud() 
```

Then tell MonCRUD to automatically generate a RESTfull resource for your Model:

```javascript
// Default route is Model name in lowercase. In this case, '/user'
app.addCrud(User)

// Or you can customize your routing
app.addCrud(User, '/admins')

// You can also add a lot of models all at once (default routings will be applyed)
app.addCruds([
    User,
    Product,
    Store,
    Supplier
])


// Start up your express server!
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
