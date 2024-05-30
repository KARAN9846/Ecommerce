const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI)
        .then((data) => {
            console.log(`Mongodb connected with server: ${data.connection.host}`);
        })
        .catch((err) => {
            console.error(`Error connecting to the database. \n${err}`);
            process.exit(1); // Exit process with failure
        });
};

module.exports = connectDatabase;
