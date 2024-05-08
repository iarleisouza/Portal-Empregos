const express    = require('express')
const exphbs     = require('express-handlebars')
const app        = express()
const path       = require('path')
const db         = require('./db/connection')
const bodyParser = require('body-parser')
const job        = require('./models/job')
const sequelize  = require('sequelize')
const op         = sequelize.Op

const PORT =  3000

app.listen(PORT, function(){
    console.log(`O express está rodando na porta ${PORT}`)
})

// body parser
app.use(bodyParser.urlencoded({ extended: false }))

// handle bars
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs.engine({defaultLayout: 'main.hbs'}))
app.set('view engine', 'handlebars')

//static folder
//app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(__dirname + '../../' + '/public'))

// db connection
db
 .authenticate()
 .then(() => {
    console.log("Conectou ao banco de dados com sucesso")
 })
 .catch(err => {
    console.log("Ocorreu um erro ao conectar", err)
 })


// routes
app.get('/', (req,res) => {

   let search = req.query.job
   let query  = '%'+search+'%' //PH -> PHP, Word -> wordpress, press -. wordpress
 if(!search) {

   
 job.findAll({
   
   order: [
   
   ['createdAt', 'DESC']

 ]})
 .then(jobs => {

    res.render('index',{
      jobs
    })
 })
 .catch(err => console.log(err))
 } else {
 job.findAll({
   where: {title:{[op.like]: query}},
   order: [
   
   ['createdAt', 'DESC']

 ]})
 .then(jobs => {

    res.render('index',{
      jobs, search
    })
 })
 .catch(err => console.log(err))
}
})

// jobs routes
app.use('/jobs', require('./routes/jobs'))