const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const hbs = require("hbs");
const exphbs = require("express-handlebars");

require('dotenv').config();

const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dimensions');

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

// Establish main hbs layout
app.engine('hbs', exphbs({ defaultLayout: 'main'}));

app.set('views', (__dirname + '/views'));
app.set('view engine', 'hbs');


const mainRouter = require("./routes/mainRouter");

app.use("/", mainRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
