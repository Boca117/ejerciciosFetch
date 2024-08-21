let url = 'https://api-colombia.com'
let descripcionGeneral = url + '/api/v1/Country/Colombia'
let departamentos = url + '/api/v1/Department'

fetch(descripcionGeneral)
.then(response => response.json())
.then(data => {
    let container = document.getElementById("container")
    let description = document.createElement("div")
    container.innerHTML = ""
    description.innerHTML = `
    <div class="p-3 gap-2 d-flex flex-column align-items-center">
        <h5>${data.description}</h5>
        <img src="/img/Collage-Colombia.jpg" class="w-75 object-fit-cover">
    </div>
    `
    container.appendChild(description)
})


fetch(departamentos)
.then(response => response.json())
.then(cards => {
    for (let i = 0; i < cards.length; i++) {
        let container = document.getElementById("container")
        let card = document.createElement("div")
        card.className = "card col-10 col-md-5 col-lg-3 col-xl-2"
        card.innerHTML = `
        <img src="" class="card-img-top" >
        <div class="card-body text-center">
            <h5 class="card-title">${cards[i].name}</h5>
            <p class="card-text"># de Municipios: ${cards[i].municipalities}</p>
            <p class="card-text"># de Habitantes: ${cards[i].population}</p> 
            <p class="card-text">Superficie: ${cards[i].surface}</p>
        <div class="text-center">
        <button class="btn btn-primary" onclick="redirigirADetalles('${cards[i].id}')">Detalles</button>
        </div>
        </div>`
        
        container.appendChild(card)
    }
  })