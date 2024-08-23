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

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const departmentId = urlParams.get('id'); 

    if (departmentId) {
        detalles(departmentId);
    } else {
        document.getElementById("detalles").innerHTML = `
        <div class='m-5 p-5 text-center bg-dark text-light rounded fw-bold d-flex flex-column justify-content-center align-items-center'>
            <h2>Querido Usuario</h2>
            <h3>Por favor, seleccione un departamento</h3>
        </div>
        `;
    }
}
