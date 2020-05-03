const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const errorElement = document.querySelector('#error')
const forcastElement = document.querySelector('#forecast')

weatherForm.addEventListener('submit', e => {
    e.preventDefault()
    const location = searchElement.value
    const query = 'http://localhost:3000/weather?address=' + location
    errorElement.textContent = 'Loading...'
    forcastElement.textContent = ''
    fetch(query).then( response => {
    response.json().then(data => {
        errorElement.textContent = ''
        if(data.error){
            errorElement.textContent = data.error
            return console.log(data.error)
        }
        forcastElement.innerHTML = 'Location : ' + data.city + '<br>' + "It's currently " + data.temperature + ' degrees out there. (' + data.description + ')'
    })
})
})