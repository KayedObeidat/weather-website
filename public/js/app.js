const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JavaScript'
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevent default behaviour which is to refresh the server , instead it will do nothing
    const location = search.value
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    // we delete http://localhost:3000 it will use local host if we're running on local host or heroku app URL
    fetch('/weather?address=' + location).then((response) => {  //what happens here is that we fetch a JSON data from URL and parsed into a javascript object
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})