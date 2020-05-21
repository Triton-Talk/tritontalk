const mongoose = require('mongoose');

const { user, pass, host } = process.env
const connectionURL = `mongodb+srv://${user}:${pass}@${host}`;


const databaseOptions = {useNewUrlParser: true, useUnifiedTopology: true, 
                         useCreateIndex: true};

mongoose.set('useFindAndModify', false);

module.exports = mongoose.connect(connectionURL, databaseOptions).catch(e => console.log(e));

mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
