const mongoose = require('mongoose');

const { user, pass, host } = process.env
const connectionURL = `mongodb+srv://${user}:${pass}@${host}`;


const databaseOptions = {useNewUrlParser: true, useUnifiedTopology: true, 
                         useCreateIndex: true};

mongoose.connect(connectionURL, databaseOptions).catch(error => console.log(error));


mongoose.connection.on('connected', () => console.log('success'));

