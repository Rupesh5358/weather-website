



// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//      console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=pune').then((response)=>{
    
//     response.json().then((data)=>{
//         if (data.error) {
//             console.log(data.error)
//         }
//         else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#mesg-1')
const messagetwo = document.querySelector('#mesg-2')

// messageone.textContent = 'Rupesh D Padature'
messageone.textContent = 'Loading data.....'
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    // example
    // console.log('testing')
//     fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//      console.log(data)
//     })
// })

fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response)=>{
    
    response.json().then((data)=>{
        if (data.error) {
            // console.log(data.error)
            messageone.textContent = data.error
        }
        else{
            // console.log(data.location)
            // console.log(data.forecast)
            messageone.textContent = data.location
            messagetwo.textContent = data.forecast
        }
    })
})

})