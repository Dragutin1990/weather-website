const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for espress config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'DJ'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'DJ'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Some helpful text',
        name: 'DJ'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send ({ error })
        } 

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
              return console.log({ error })
            }
            res.send({  
                address: req.query.address,      
                forecast: forecastData,
                location
            })
    })
  
               
    // }])
  })
}) 



  
    // geocode(address, (error, { latitude, longitude, location } = {}) => {
  
    //   if (error) {
    //     return console.log(error)
    //   }
        
    //     forecast(latitude, longitude, (error, forecastData) => {
    //       if (error) {
    //         return console.log(error)
    //       }
    
    //       console.log(location)
    //       console.log(forecastData)
    //     })
    // }) 
  
  

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
        name: 'DJ',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'DJ',
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})