const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const db = require("./schema/");
const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors);

// Routes
app.use(require("./routes/home"));

db.sequelize.sync();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`The server is running on port ${ PORT }`);
});
