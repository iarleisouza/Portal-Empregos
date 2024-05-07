const express = require('express')
const router = express.Router()
const job    = require('../models/job')
const { where } = require('sequelize')

// rota teste
router.get('/test', (req, res) => {
    res.send('Deu certo!')
})

// detalhe da vaga -> view/1, view/2
router.get('/view/:id', (req, res) => job.findOne({
    where: {id: req.params.id}
}).then(job => {
    
    res.render('view', {
        job
    })
}).catch(err => console.log(err)))

// form da rota de envio
router.get('/add', (req, res) => {
    res.render('add')
})

// add job via post
router.post('/add', (req, res) => {

    let {title, salary, company, description, email, new_job} = req.body
    // Insert 
    
    job.create({
        title,
        salary,
        company,
        description,     
        email,
        new_job
})

    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router