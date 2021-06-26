const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

// load weather API modules built previously
const getLocation = require('./utils/getLocation')
const getWeather = require('./utils/getWeather')

// console.log(__dirname)
// console.log(path.join(__dirname, "../public"))

const app = express()
const port = process.env.PORT || 3001

// Define paths for Express config
const pubPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlesbars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) 

// Setup global handlebars variables
app.locals.creatorName = "Jonathan Caldwell"
app.locals.dateTime = new Date()
app.locals.year = app.locals.dateTime.getFullYear()

// Setup static directory to serve files from public directory
app.use(express.static(path.join(pubPath)))

// Setup handlebars apps based on paths 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Reporterages!',
        name: 'Jonathan Caldwell'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Helpfullness area of site',
        helpText: 'Welcome to the help area, this is where you can get some support'
    })
})

app.get('/help/*',(req, res) => {
    res.render('help', {
        title: 'Help article not found',
        helpText: 'Please click help above to start over or check your URL'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About this site and me',
        name: 'Jonathan Caldwell'
    })
})

app.get('/weather', (req, res) => {
    // Check for an address and provide an error if not is given
        if (!req.query.address) {
            return res.send ({
            error: 'You must enter an address'
            })
        }


    // Send JSON object back from backend lookup
    // res.send({
    //     address: req.query.address,
    //     location: 'Ohio',
    //     forcast: 'Sunny and 98F',
    //     title: 'Weatherz!!!!',
    //     })
        // Use External API tool to lookup data
    getLocation(req.query.address, (error, {lat, lon, location} = {}) => {
    if (error) {
        return res.send({error})
    } else {
        getWeather(lat, lon, (error, weatherData, weather_icon) => {
            // console.log(req.query)
            if (error) {
                return res.send({error:error})
            } else {
                // res.write('In ')
                // res.write(location)
                // res.write(' ')
                // res.write(weatherData)
                res.send({
                    address: req.query.address,
                    location,
                    forcast: weatherData,
                    title: 'Weatherz!!!!',
                    weather_icon
                    })
                }
            // res.end()
            }) 
        }
    
    })
    
})

app.get('/home', (req, res) => {
    res.redirect('/')
})

app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Error 404: Page Not Found' });
  });

app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})


// app.get('/', (req, res) => {
//     res.send('<h1>Weather</h1>welcome to the weather website')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Jonathan',
//         age: 43
//     }, {
// name: 'Susy',
// age: 44
//     }

// ])
// })