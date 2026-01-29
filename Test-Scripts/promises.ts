
const userLeft: Boolean = false

// Testing Promises: 
const watchService = new Promise((resolve, reject) =>{
    if(!userLeft){
        resolve('User is watching!')
    }
    else{
        reject('Goodbye :(')
    }
    
})

watchService.then((message) => { 
    console.log(`Response: ${message}`)})
    .catch((message) => {
        console.log(`Response: ${message}`)
    })
