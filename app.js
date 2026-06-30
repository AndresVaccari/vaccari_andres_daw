const ciudad = document.getElementById("ciudad")
const estado = document.getElementById("estado")
const boton = document.getElementById("btnClima")


async function getClima () {
    try {
        estado.className = ""

        if (ciudad.value.trim() == "") {
            estado.className = "error"
            estado.textContent = "Ingrese una ciudad"
            return
        }

        boton.disable
        boton.className = "disabled"

        estado.textContent = "Cargando"
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ciudad.value}&count=1`)
        const data = await response.json()
        const results = data.results

        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${results[0].latitude}&longitude=${results[0].longitude}&current_weather=true`)
        const weatherData = await weatherResponse.json()

        estado.innerHTML = 
        `
            <p>${ciudad.value}</p>
            <p>Temperatura ${weatherData.current_weather.temperature}</p>
            <p>Viento ${weatherData.current_weather.windspeed}</p>
            <p>Codigo Clima ${weatherData.current_weather.weathercode}</p>
        `
    } catch (e) {
        estado.className = "error"
        estado.textContent = `Ocurrio un error ${e}`
    } finally {

        boton.className = ""
        boton.enable
    }
}


boton.addEventListener("click", () => getClima())