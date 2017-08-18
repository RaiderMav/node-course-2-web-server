const express = require('express'),
  app = express(),
  PORT = process.env.PORT || 3000,
  hbs = require('hbs'),
  fs = require('fs')

hbs.registerPartials(__dirname + `/views/partials`)
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now}: ${req.method}${req.url}`
  console.log(log)
  fs.appendFile(`server.log`, log + '\n', (err) => {
    if (err) {
      console.log(`Unable to append to server.log`)
    }
  })
  next()
})

// app.use((req, res, next) => {
//   res.render(`maintenance`)
// })

hbs.registerHelper(`getCurrentYear`, () => {
  return new Date().getFullYear()
})

hbs.registerHelper(`screamIt`, (text) => text.toUpperCase())

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: `Home Page`,
    welcomeMessage: `Welcome to Nonconformisto's webpage`
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: `Error.  Handling error`
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: `About Page`
  })
})

app.use(express.static(__dirname + '/public'))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
