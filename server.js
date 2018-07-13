const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('shout', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maitenance.hbs', {
        pageTitle: 'UNDER CONSTRUCTION',
        errorMessage: "We're working on it..."
    });
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome... WELCOME TO YOUR DOOM!!!!! MUHAHAHAHAHA!!!!!'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to fulfill this request'
    });
});

app.listen(PORT, () =>{
    console.log("Server running on AndrE 3000!");
});