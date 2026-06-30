const ciudad = document.getElementById("ciudad")
const estado = document.getElementById("estado")
const boton = document.getElementById("btnClima")


async function getClima () {
    try {
        boton.disable

        estado.textContent = "Cargando"
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ciudad.value}&count=1`).then((r) => {
            console.log("r", r)
        })

        const data = response

        console.log("response", response)
        console.log("data", data)

        estado.textContent = "Clima Cargado"
    } catch (e) {
        console(e)
        estado.textContent = "Error"
    } finally {
        boton.enable
    }
}


boton.addEventListener("click", () => getClima())