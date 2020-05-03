const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = process.env.MONGODB_URL;
const databaseOptions = {useNewUrlParser: true, useUnifiedTopology: true, 
                         useCreateIndex: true};

mongoose.connect(connectionURL, databaseOptions);
