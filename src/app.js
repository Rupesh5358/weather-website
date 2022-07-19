const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utlis/geocode')
const weatherStack = require('./utlis/forecast')

console.log(__dirname)
// console.log(__filename)
console.log(path.join(__dirname,'../public'))
const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('views',viewPath)
app.set('view engine','hbs')
hbs.registerPartials(partialPath)


app.use(express.static(publicDirectoryPath))
// app.get('',(req,res)=>{
//     //  res.send('hello express!')
//      res.send('<h1>Hello express!</h1>')

// })

// app.get('/help',(req,res)=>{
//     // res.send('help page')
//     res.send([{
//         name : 'Rupesh',
//         age : 22
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('Welcome to AboutWeather Website...')
// })
app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name :'Rupesh Padature'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title :'About me',
        name : 'Rupesh Padature'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText : 'This is some helpful text',
        title : 'help',
        name : 'Rupesh Padature'
    })
})

// app.get('/weather',(req,res)=>{
//     res.send('Weather for now is below!')
// })

app.get('/weather',(req,res)=>{
   
    if (!req.query.address) {
        console.log(res.query)
        return res.send({
            error : 'No address is provided!'
        })
    }
    // res.send({
    //     forecast : forecast,
    //     // location : 'Sambhajinagar',
    //     address : req.query.address
    // })

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error : error
            })
        }

    weatherStack(latitude,longitude,(error,{req_data})=>{
        if(error){
            return res.send({
                error : error
            })
        }

        res.send({
            forecast :req_data,
            location : location,
            address : req.query.address
        })
    })    
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        error : 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    // res.send('404 page')
    res.render('error',{
        error : 'Page not found',
        title : '404',
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})