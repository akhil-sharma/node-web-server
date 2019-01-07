const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/partials');
hbs.registerHelper('currentYear', function (){
    return new Date().getFullYear();
});
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}\n`;
    fs.appendFileSync('log.txt', log);
    console.log(log);
    next();
});

// app.use((req, res, next) => {
//     res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    res.render('home.hbs', {
        location: 3000
    })
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});


app.get('/bad', (req,res)=>{
    res.send({
        errorMessage: "unable to send the data"
    });
});

app.listen(3000, ()=>{
    console.log('server is now up on port 3000');
});