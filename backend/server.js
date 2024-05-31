const app = require("./app");

const dotenv = require("dotenv");

const connectDatabase = require("./config/database")

// Handling Uncaught Exception

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(` shutting down the server due to Unhandeld Promise Rejections `)
    process.exit(1)
})


// Config

dotenv.config({path:"backend/config/config.env"})


// Connecting to database

connectDatabase()


const server = app.listen(process.env.PORT,() => {

    console.log('server is working on http://localhost:${process.env.PORT}');
})


// Unhandeld Promise Rejections

process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to Unhandeld Promise Rejections `);

    server.close(()=> {
        process.exit(1)
    })
})