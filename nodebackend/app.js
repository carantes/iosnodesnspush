const app = require('./express')
const routes = require('./routes')

// Unhandled errors
process.on('uncaughtException', function(err){
  console.log('Uncaught Exception', err.message)
});

// Routes
app.use('/', routes)

// Start Server
const PORT = 3000

module.exports = app.listen(PORT, () => {
  console.log(`Express server running at port [${PORT}]...`)
})