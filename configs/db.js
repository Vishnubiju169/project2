const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/testapi', {
        useNewUrlParser: true, 

        useUnifiedTopology: true 
    }).then(() => console.log('MongoDb connected successfuly...'));
}