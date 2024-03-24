console.log('javascript connected!');
    
const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 5000,
    pause: false
}) 

const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function() {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
})

async function fetchWeather() {
    let apiKey = process.env.OPEN_WEATHER_API_KEY;
    let city = 'Atlanta';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        displayWeather(data);
    } catch (error) {
        console.error('There was an error.', error);
    }
    
}

function displayWeather(data) {
    document.querySelector('#weather-temp').textContent = `${data.main.temp}\u00B0 F`;
    document.querySelector('#weather-description').textContent = data.weather[0].main;
    let icon = document.createElement('img');
    icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    document.querySelector('#weather-icon').appendChild(icon);
    document.querySelector('#city').textContent = `in ${data.name}`;
  
}

fetchWeather();
