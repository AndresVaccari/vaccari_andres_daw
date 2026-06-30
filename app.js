const ciudad = document.getElementById("ciudad")
const estado = document.getElementById("estado")
const boton = document.getElementById("btnClima")


async function getClima () {
    try {
        if (ciudad.value.trim() == "") {
            estado.textContent = "Ingrese una ciudad"
            return
        }

        boton.disable

        estado.textContent = "Cargando"
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ciudad.value}&count=1`)
        const data = await response.json()
        const results = data.results

        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${results[0].latitude}&longitude=${results[0].longitude}&current_weather=true`)
        const weatherData = await weatherResponse.json()

        estado.textContent = `${ciudad.value} -- Temperatura ${weatherData.current_weather.temperature} -- Viento ${weatherData.current_weather.windspeed} -- Codigo Clima ${weatherData.current_weather.weathercode}`
    } catch (e) {
        estado.textContent = `Ocurrio un error ${e}`
    } finally {
        boton.enable
    }
}


boton.addEventListener("click", () => getClima())