const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/test-artesanatools", { useNewUrlParser: true });



const moncrud = require('./src').default


const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});


const User = mongoose.model("User", UserSchema)


const app = moncrud();

app.addCruds([
    User,
])

app.listen(3000);
