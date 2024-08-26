export let url = 'https://api-colombia.com'
let descripcionGeneral = url + '/api/v1/Country/Colombia'
export let departamentos = url + '/api/v1/Department'
export let region = url + '/api/v1/Region'


fetch(descripcionGeneral)
.then(response => response.json())
.then(data => {
    let contenedor = document.getElementById("description")
    if (contenedor) {

        let description = document.createElement("div")
        contenedor.innerHTML = "";
        description.innerHTML = `
        <div class="p-3 gap-2 d-flex flex-column align-items-center">
        <h5>${data.description}</h5>
        </div>
        `
        contenedor.appendChild(description)
    }
    
})
.catch(error => console.error('Error fetching description:', error));  

function mostrarDepartamentos(deptos) {

    let container = document.getElementById("container")
    if (container) {
        
        container.innerHTML = "";   
        
        deptos.forEach(c => {
            
            let imagenes = `./img/${c.name}.jpg`
            
            let card = document.createElement("div")
            card.className = "card col-10 col-md-5 col-lg-3 col-xl-2"
            card.innerHTML = `
            <img src="${imagenes}" class="image justify-content-between" >
            <div class="card-body text-center">
            <h5 class="card-title">${c.name}</h5>
            <p class="card-text"># de Municipios:  ${c.municipalities}</p>
            <p class="card-text"># de Habitantes:  ${c.population}</p> 
            <p class="card-text">Superficie:  ${c.surface}</p>
            <div class="text-center">
            <button class="btn btn-primary" onclick="redirigirADetalles('${c.id}')">Detalles</button>
            </div>
            </div>`    
            
            container.appendChild(card)
        })
    }
}


let categoriasGlobal;
let listaDepartamentos = []

fetch(region)
.then(response => response.json())
.then(categorias => {
    categoriasGlobal = categorias;

    let filtros = document.getElementById("filtros");
    if (filtros) {
        let categoriasUnicas = Array.from(new Set(categorias.map(region => region.name)));
        
        categoriasUnicas.forEach(categoria => {
            let check = document.createElement("div");
            check.className = "form-check d-flex align-items-center flex-wrap gap-2";
            check.innerHTML = `
            <div class="d-flex gap-2 flex-wrap">
            <input id="${categoria}" class="form-check-input" type="checkbox" value="${categoria}" onclick="filtrarPorRegion()">
            <label class="form-check-label" for="${categoria}">
            ${categoria}
            </label>
            </div>
            `;
            filtros.appendChild(check);
        });
        fetch(departamentos)
        .then(response => response.json())
        .then(cards => {
            listaDepartamentos = cards
            mostrarDepartamentos(cards)
        });
    }
});

export function filtrarPorRegion() {
    let checkeados = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(check => check.value);
    let filtrados = listaDepartamentos.filter(card => {
        let region = categoriasGlobal.find(region => region.id === card.regionId);
        return checkeados.length === 0 || (region && checkeados.includes(region.name));
    });

    return filtrados;
}



export function filtrarPorBuscador() {
    let busqueda = document.getElementById("input_buscador").value.toLowerCase();
    let filtradas = filtrarPorRegion();
    if (busqueda) {
        filtradas = filtradas.filter(card => 
            card.name.toLowerCase().includes(busqueda) || 
            card.municipalities.toString().includes(busqueda) || 
            card.population.toString().includes(busqueda) || 
            card.surface.toString().includes(busqueda)
        );
    } else {
        document.getElementById("container").innerHTML = "No se encontraron resultados";
    }
    mostrarDepartamentos(filtradas);
}
  
function initializePage() {
    let filtros = document.getElementById("filtros");
    let button = document.getElementById("button");
    
    if (filtros) {
        filtros.addEventListener("change", () => filtrarPorBuscador());
    }

    if (button) {
        button.addEventListener("click", () => filtrarPorBuscador());
    }
}

initializePage();

export function redirigirADetalles(departmentId) {
    window.location.href = `./pages/detalles.html?id=${departmentId}`;
}

window.redirigirADetalles = redirigirADetalles;
window.filtrarPorRegion = filtrarPorRegion;
window.filtrarPorBuscador = filtrarPorBuscador;