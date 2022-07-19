const request = require('request')

const geocode = (address,callback)=> {

    const Geocoding_url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiMGZyYW5reSIsImEiOiJja24waGQ4bXgwbmpyMnFwZjU3enZkbGgyIn0.e49cj3_pZZ06-z_1lvDIIQ&limit=1'
    
    request({url : Geocoding_url, json : true},(error,{body})=>{
        if(error){
            callback('Unable to connect weather services!',undefined)
        }
        else if(body.features.length === 0){
            callback('Please provide valid location!',undefined)
        }
        else{
            const data = {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            }

            const {latitude,longitude,location} = data
            callback(undefined,data)
        }
    })
}


module.exports = geocode