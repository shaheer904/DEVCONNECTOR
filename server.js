const express = require('express')
const app = express()
const connnectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const path = require('path')
//Connect DB
connnectDB()
// Init Middleware
app.use(express.json({ extented: false }))

//Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.htmlgit'))
  })
}
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
