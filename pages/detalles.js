import * as colombia from '../main.js'


function detalles(departmentId) {
    fetch(colombia.departamentos)
    .then(response => response.json())
    .then(departamentos => {
        
        const departamento = departamentos.find(d => d.id == departmentId);

        if (departamento) {
            let detalles = document.getElementById("detalles");
            detalles.innerHTML = '';
            
            let imagenes = `../img/${departamento.name}.jpg`;

            let card = document.createElement("div");
            card.className = "bg-dark rounded d-flex flex-wrap justify-content-center align-self-center gap-3 p-3";
            card.innerHTML = `
            <img class="object-fit-cover rounded border border-light float-start col-10 col-md-7 col-lg-5 img-fluid" src="${imagenes}" alt="">
            <div class="border border-light rounded d-flex flex-column gap-2 p-2 col-10 col-md-7 col-lg-5">
                <h3 class="align-self-center text-center text-light">${departamento.name}</h3>
                <ul class="text-start text-light w-100">
                <li>${departamento.description}</li>
                <li>Tiene ${departamento.municipalities} municipios</li>
                <li>Su población es de ${departamento.population} habitantes</li>
                </ul>
            </div>`;
            
            detalles.appendChild(card);

        } else {
            document.getElementById("detalles").innerHTML = "<p>Departmento no válido</p>";
        }
    })
    .catch(error => {
        console.error("Error fetching department data:" , error);
        document.getElementById("detalles").innerHTML = "<p>Error cargando los datos de la API</p>";
    })    
}

let ciudadesURL = colombia.url + '/api/v1/City'
let ciudadesxDepartamento = [];
function mostrarCiudades(ciudades) {
    let ciudadesLista = document.getElementById("ciudades");
    if (ciudadesLista) {  
        ciudadesLista.innerHTML = '';  
        ciudades.forEach(ciudad => {
            let card = document.createElement("div");
            card.className = "card col-10 col-md-5 col-lg-3 col-xl-2 d-flex flex-wrap";
            card.innerHTML = `
            <div class="card-body text-center">
                <img src="../img/Colombia-1.jpg" class="image justify-content-between" >
                <h5 class="card-title">${ciudad.name}</h5>
            </div>`;
            
            ciudadesLista.appendChild(card);
        });
    }
}

function ciudad(departmentId) {
    fetch(ciudadesURL)
    .then(response => response.json())
    .then(ciudades => {
        ciudadesxDepartamento = ciudades.filter(c => c.departmentId == departmentId);
        mostrarCiudades(ciudadesxDepartamento); 
    })
    .catch(error => {
        console.error("Error fetching cities:", error);
        let ciudadesLista = document.getElementById("ciudades");
        if (ciudadesLista) {
            ciudadesLista.innerHTML = "<p>Error cargando los datos de las ciudades.</p>";
        }
    });
}


let areasURL = colombia.url + '/api/v1/NaturalArea'
let areasxDepartamento = [];

function mostrarAreas(areas) {
    let areasLista = document.getElementById("areas");
    if (areasLista) {  
        areasLista.innerHTML = '';  
        areas.forEach(area => {
            let card = document.createElement("div");
            card.className = "card col-10 col-md-5 col-lg-3 col-xl-2 d-flex flex-wrap";
            card.innerHTML = `
            <div class="card-body text-center p-3">
                <img src="../img/Collage-Colombia.jpg" class="image justify-content-between" > 
                <h5 class="card-title">${area.name}</h5>
                <p class="card-text">Area: ${area.landArea}</p>
            </div>`;

            areasLista.appendChild(card);
        });
    }
}
function areasNaturales(departmentId) {
    fetch(areasURL)
    .then(response => response.json())
    .then(areas => {
        let 
        areasxDepartamento = areas.filter(a => a.departmentId == departmentId);
        mostrarAreas(areasxDepartamento);

    })
    .catch(error => {
        console.error("Error fetching areas:", error);
        let areasLista = document.getElementById("areas");
        if (areasLista) {
            areasLista.innerHTML = "<p>Error cargando los datos de las áreas naturales.</p>";
        }
    });
}

function filtro() {
    let filtrar = document.getElementById("select").value;

    if (filtrar == '1') {
        mostrarCiudades(ciudadesxDepartamento);
        document.getElementById("areas").innerHTML = '';
    } else if (filtrar == '2') {
        mostrarAreas(areasxDepartamento);
        document.getElementById("ciudades").innerHTML = '';
    } else {
        mostrarCiudades(ciudadesxDepartamento);
        mostrarAreas(areasxDepartamento);
    }
}

function buscarCiudad() {
    let busquedaCiudad = document.getElementById("buscadorCiudad").value.toLowerCase();
    let filtradasCiudad = filtro()
    if (busquedaCiudad) {
        filtradasCiudad = ciudadesxDepartamento.filter(ciudad => ciudad.name.toLowerCase().includes(busquedaCiudad));
        mostrarCiudades(filtradasCiudad);  
    } else {
        mostrarCiudades(ciudadesxDepartamento);
    }
}


document.getElementById("buttonCiudad").addEventListener("click", buscarCiudad);

function buscarArea() {
    let busquedaArea = document.getElementById("buscadorAreas").value.toLowerCase();
    let filtradasArea = filtro()
    if (busquedaArea) {
        filtradasArea = areasxDepartamento.filter(area => area.name.toLowerCase().includes(busquedaArea));
        mostrarAreas(filtradasArea);  
    } else {
        mostrarAreas(areasxDepartamento);
    }
}

document.getElementById("buttonAreas").addEventListener("click", buscarArea);
document.getElementById("select").addEventListener("change", filtro);


window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const departmentId = urlParams.get('id'); 

    if (departmentId) {
        detalles(departmentId);
        ciudad(departmentId);
        areasNaturales(departmentId);
    } else {
        document.getElementById("detalles").innerHTML = `
        <div class='m-5 p-5 text-center bg-dark text-light rounded fw-bold d-flex flex-column justify-content-center align-items-center'>
            <h2>Querido Usuario</h2>
            <h3>Por favor, seleccione un departamento</h3>
        </div>
        `;
    }
}

