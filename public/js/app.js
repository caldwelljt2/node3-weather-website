console.log('client side javasript is loadedededed') 


//fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = 'Enter a location above to get the forcast for that location!'

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    const location = search.value
    fetch('http://127.0.0.1:3001/weather?address='+location).then((response) =>{
        response.json().then((data) => {
            messageOne.textContent = 'Here is your forcast:'
            if (data.error) {
                messageTwo.textContent = data.error
            } else {
                messageTwo.textContent = data.location + ' ' + data.forcast
                // console.log(data)
            }
        })
    })
})