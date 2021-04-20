// CONIFG.JS
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    MONGODB: process.env.MONGODB,
    DEVELOPMENT_DATABASE: process.env.DEVELOPMENT_DATABASE,
    port: process.env.PORT,
    JWT_USER_AUTHKEY: process.env.JWT_USER_AUTHKEY,
};