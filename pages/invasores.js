import * as colombia from "../main.js"

let invasoresURL = colombia.url + '/api/v1/InvasiveSpecie'

fetch(invasoresURL)
    .then(response => response.json())
    .then(especies => {
        let invasores = document.getElementById('invasores')
        invasores.innerHTML = '';

        let table = document.createElement('table')
        table.className = 'table table-bordered'
        table.innerHTML = `
        <colgroup>
            <col span="2">
            <col span="1">
            <col span="3">
        </colgroup>
        <thead>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Nombre cientifico</th>
                <th scope="col" class="col-impact">Impacto</th>
                <th scope="col">Manejo</th>
                <th scope="col">Nivel de Riesgo</th>
                <th scope="col">Imagen</th>
            </tr>
        </thead>
        <tbody>
        
        </tbody>
        `
        let body = table.querySelector('tbody')

        especies.forEach(especie => {
            let row = document.createElement('tr')
            row.innerHTML = `
            <td>${especie.name}</td>
            <td>${especie.scientificName}</td>
            <td>${especie.impact}</td>
            <td>${especie.manage}</td>
            <td>${especie.riskLevel}</td>
            <td><img src="${especie.urlImage}" class="img-fluid"></td>
            `
            const riskLevel = parseInt(especie.riskLevel);
            if (riskLevel === 1) {
                row.classList.add('table-primary');
            } else if (riskLevel === 2) {
                row.classList.add('table-success');
            }

            body.appendChild(row)
        })
        invasores.appendChild(table)
    })
    .catch(error => {
        console.error("Error fetching species:", error);
        let invasores = document.getElementById('invasores');
        if (invasores) {
            invasores.innerHTML = "<p>Error cargando los datos de las especies invasoras.</p>";
        }
    });

    
