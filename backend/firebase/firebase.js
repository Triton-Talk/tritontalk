const admin = require('firebase-admin')

//set up firebase admin
const serviceAccount = require("./tritontalk-d063d-firebase-adminsdk-hnpwi-f1538684d6.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tritontalk-d063d.firebaseio.com"
});

module.exports = admin