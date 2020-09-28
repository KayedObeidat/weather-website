const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express() //to store the express application , we call express() to generate the application
// .get() let us configure what the server should do when
//someone try to get the resource at a specific url
//maybe we should send back HTML or JSON

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(path.join(__dirname, '../templates/views'))
const partialPaths = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs') //allows you to set a value for a given express setting
app.set('views', viewsPath)
hbs.registerPartials(partialPaths) // takes a path to  directory where a partial lives

//setup static directory to serve
app.use(express.static(publicDirectoryPath)) // customize the server
//static means that we can refresh the page infinity times without having any changes 

app.get('',(req, res) => {
    res.render('index', {// allows us to render one of our handlebars templetes
                        //parameter should match up with the (.hbs) file 
        title: 'Weather',
        name: 'Kayed Obeidat'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kayed Obeidat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpGuide: 'if you need any help don\'t hesitate to contact us',
        title: 'Help',
        name: 'Kayed Obeidat'
    })
})

//app.get('', (req, res) => { //req = request, res = response
//    res.send('<h1>Weather</h1>') // allow us to send something back to the requester
            //the tags used to send back HTML 
//})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Kayed',
//     }, {
//         name: 'Obeidat'
//     }])
    // we send back JSON
//})

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } ={}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

//    console.log(req.query.address)
//     res.send({
//         location: 'Amman',
//         forecast: 'Cloudy weather',
//         address: req.query.address
//     })
})




app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kayed Obeidat',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {    //to send a message to the user that the link you entered is wrong
    res.render('404', {         //we put it in almost the end of my script because it will search for every .get() command and if it get no matches it will send this text
                                //if it founds the / something that is one og the .get() commands it doesnt need to continue to look down 
        title: '404',
        name: 'Kayed Obeidat',
        errorMessage: 'Page not found'
    })     
})  

app.listen(3000, () => { // start up the server, it takes the port as the parameter
    console.log('Server is up on port 3000')
}) 