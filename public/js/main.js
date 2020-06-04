const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const errorElement = document.querySelector('#error')
const forcastElement = document.querySelector('#forecast')
const searchBtn = document.querySelector('#searchBtn')
const currentLocationBtn = document.querySelector('#currentLocationBtn')

searchBtn.addEventListener('click', e => {
    e.preventDefault()
    const location = searchElement.value
    const query = '/weather?address=' + location
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

let positionOptions = {
    timeout : Infinity,
    maximumAge : 0,
    enableHighAccuracy : true
  }

currentLocationBtn.addEventListener('click', e => {
    e.preventDefault()
    console.log("HELLO")
    if(!navigator.geolocation){
        errorElement.textContent = 'Geolocation is not supported by your browser. :('
        return
    }
    navigator.geolocation.getCurrentPosition(position => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        const query = `/location?lat=${latitude}&lon=${longitude}`

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

    }, () => {}, positionOptions)
})


/*weatherForm.addEventListener('submit', e => {
    e.preventDefault()
    const location = searchElement.value
    const query = '/weather?address=' + location
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
})*/
