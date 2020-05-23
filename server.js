const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const hbs = require("hbs");
const exphbs = require("express-handlebars");

require('dotenv').config();

const app = express();

const mongoose = require('mongoose');

var MONGODB_URI = process.env.MONGOLAB_YELLOW_URI || "mongodb://cubed-oviraptor-3kkn7f9heblh4c35y4zz9zwu.herokudns.com/dimensions?authSource=admin";
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(MONGODB_URI,options)


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
