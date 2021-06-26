// console.log('client side javasript is loadedededed') 


//fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

 

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const iconOne = document.querySelector('#icon-1')

messageOne.textContent = ''
messageTwo.textContent = 'Enter a location above to get the forcast for that location!'


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    const location = search.value
    fetch('/weather?address=' + location).then((response) =>{
        response.json().then((data) => {
            messageOne.textContent = 'Here is your forcast:'
            if (data.error) {
                messageTwo.textContent = data.error
                iconOne.src = '/img/tiny.gif'
            } else {
                messageTwo.textContent = data.location + ' ' + data.forcast
                iconOne.src = data.weather_icon
                // console.log(data)
            }
        })
    })
})