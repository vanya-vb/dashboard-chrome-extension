const body = document.body;
const author = document.getElementById('author');
const time = document.getElementById('time');

fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    .then(res => res.json())
    .then(data => {
        console.log(data.urls.regular)
        body.style.backgroundImage = `url(${data.urls.regular})`;
        author.textContent = `By: ${data.user.name}`;
    })
    .catch(err => {
        body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1623018035782-b269248df916?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
        author.textContent = 'By: David Pupăză';
    });

fetch('https://api.coingecko.com/api/v3/coins/ethereum')
    .then(res => {
        if (!res.ok) {
            throw Error('Something went wrong');
        }

        return res.json();
    })
    .then(data => {
        document.getElementById('crypto-top').innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `;

        document.getElementById('crypto').innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `;
    })
    .catch(err => console.log(err))

function getCurrentTime() {
    const date = new Date();
    time.textContent = date.toLocaleTimeString('en-us', { timeStyle: 'short' })
}

setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error('Weather data not available')
            }

            return res.json();
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById("weather").innerHTML = `
            <img src=${iconUrl} />
            <p class="weather-temp">${Math.round(data.main.temp)}º</p>
            <p class="weather-city">${data.name}</p>
        `
        })
        .catch(err => console.error(err))
})
