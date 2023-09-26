
const express = require('express');
const app = express();
var cors = require('cors');
const { default: mongoose } = require('mongoose');
const { userSchema } = require('./models/userModel');
const routes = require('./routes/routes');
require('dotenv').config();

const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

app.use('/users', routes);

//connect to the db server and  start app server
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Database connection successful');
    app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})}).catch(err => {
    console.log(err);
});