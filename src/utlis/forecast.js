const request = require('request')

const weatherStack = (latitude,longitude,callback)=> {
     
    const weatherStack_url = 'http://api.weatherstack.com/current?access_key=28a46dbdc3403ea043ed1bd968a49fa3&query='+ latitude +','+ longitude 
    // +'&units=f'


    request({url : weatherStack_url,json:true},(error,{body})=> {
       

      if(error){
          callback('Unable to connect weather services!',undefined)
      }
      else if(body.error){
          callback('Please provide valid location!',undefined)
      }
      else{
        const forecastdata = { req_data : "Today's descriptive weather condition is " + body.current.weather_descriptions[0]+'. It is currently ' +body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out. ' + "Humidity is " + body.current.humidity + "."}

          callback(undefined,forecastdata)
      }
  })
}
 
module.exports = weatherStack