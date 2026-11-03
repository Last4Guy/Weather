const cityTitleElement = document.getElementById('cityTitle')
const headerWeaterImg = document.getElementById('headerWeaterImg')
const headerTempC = document.getElementById('headerTempC')
const headerFeelsLike = document.getElementById('headerFeelsLike')
const headerHumidity = document.getElementById('headerHumidity')
const headerWind = document.getElementById('headerWind')
const tableWeater = document.getElementById('tableWeater')
const weaterBlock = document.getElementById('weaterBlock')
const weaterBlocke = document.getElementById('weaterBlocke')

const cityInput = document.getElementById('cityInput')
document.addEventListener('submit', function(event){
    event.preventDefault()
    // showLoading()
    submitTapped()
})

function showLoading() {
    const awaitBlock = document.createElement('div')
    awaitBlock.textContent = 'Ожидайте загрузки'
    weaterBlocke.appendChild(awaitBlock)
}

function submitTapped() {
    const query = cityInput.value.trim()
    fetchApi(query)
}

function fetchApi(query) {
    const baseUrl = 'api.weatherapi.com'
    const apiVer = 'v1'
    const apiType = 'forecast.json'
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const daysCount = 7
    const hour = 17
    const lang = 'RU'

    const url = 'https://' + baseUrl + '/' + apiVer + '/' + apiType + '?key=' + apiKey + '&q=' + query + '&days=' + daysCount + '&hour=' + hour + '&lang=' + lang
    cityTitleElement.textContent = apiKey

//     fetch(url)
//     .then(response => response.json())
//     .then(data => {
//         return new Promise(resolve => {
//             setTimeout(() => {
//                 resolve(data);
//             }, 2000);
//         });
//     })
//     .then(data => renderUI(data))
//     .catch(error => console.error(error.message))
}
function renderUI(data) {
    cityTitleElement.textContent = data.location.name
    headerWeaterImg.src = data.current.condition.icon
    headerTempC.textContent = data.current.temp_c
    headerFeelsLike.textContent = data.current.feelslike_c + ' °С'
    headerHumidity.textContent = data.current.humidity + '%'
    
    const windMS = data.current.wind_kph * 1000 / 3600
    headerWind.textContent = windMS.toFixed(2) + ' м/c'

    tableWeater.innerHTML = ''
    const dayWeaterElement = document.createElement('tr')
    const imgWeater = document.createElement('tr') 
    const tempWeater = document.createElement('tr')
    data.forecast.forecastday.forEach((day) => {
        weaterBlock.classList.replace('weater_block_hidden', 'weater_block') 
        weaterBlocke.classList.replace('weater_blocke', 'weater_blocke_hidden') 
        weaterBlocke.innerHTML = ''
        
        const dayTdWeaterElement = document.createElement('td')
        dayTdWeaterElement.textContent = day.date

        dayWeaterElement.appendChild(dayTdWeaterElement)
                
        const imgTdWeater = document.createElement('td')
        const logoImgElement = document.createElement('img')
        logoImgElement.src = day.hour[0].condition.icon

        imgTdWeater.appendChild(logoImgElement)
        imgWeater.appendChild(imgTdWeater)
        
        const tempCWeater = document.createElement('td')
        tempCWeater.textContent = day.hour[0].temp_c + ' °'
        const tempFLWeater = document.createElement('td')
        tempFLWeater.textContent = day.hour[0].feelslike_c + ' °'
        tempFLWeater.className = 'td__feelslike'

        tempWeater.appendChild(tempCWeater)
        tempWeater.appendChild(tempFLWeater)
    })
    tableWeater.appendChild(dayWeaterElement)
    tableWeater.appendChild(imgWeater)
    tableWeater.appendChild(tempWeater)
}