import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000

const randFactURL = "https://uselessfacts.jsph.pl/"
const randNumFactURL = "http://numbersapi.com/"

let randomContent;
let numTrivia;
let randTrivia;

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res) => {

    try {
        const randResponse = await axios.get(randFactURL + "api/v2/facts/today");
        const randTriviaResponse = await axios.get(randFactURL + "api/v2/facts/random");
        randomContent  = randResponse.data;
        randTrivia = randTriviaResponse.data;

        res.render("index.ejs", {
            randomContent: randomContent.text,
            randTrivia: randTrivia.text
        })
    }
    catch (error) {
        res.render("index.ejs", {
            randomContent: error.message,
            randTrivia: error.message
        })
    }
})

app.post("/favNumForm", async (req, res) => {

    if (req.body.favNum === '') {
        req.body.favNum = 18;
    }

    try {
        const numResponse = await axios.get(randNumFactURL + req.body.favNum);
        numTrivia = numResponse.data;

        res.render("index.ejs", {
            randomContent: randomContent.text,
            numTrivia,
            randTrivia: randTrivia.text
        })
    }
    catch (error) {
        res.render("index.ejs", {
            randomContent: error.message,
            numTrivia: error.message,
            randTrivia: randTrivia.text
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
