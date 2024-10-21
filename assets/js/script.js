async function mostrarPersonaje(i, id, contenedorCards, color) {
    try {
        let url = "https://swapi.dev/api/people/" + i
        let response = await fetch(url);
        let data = await response.json();

            constructora(data, id, contenedorCards, color);
    }
    catch {
        console.log("error", error);
    }
}
//mostrarPersonaje();


//funcion selectora
let contadorUno = 1;
let contadorDos = 6;
let contadorTres = 11;

const seleccionar = (id, contenedorCards, color) => {
    if (id == 'seccionUno') {
        if (contadorUno < 6) {
            generador(contadorUno, id, contenedorCards, color).next();
            contadorUno++
            console.log(contadorUno)
        } else {
            $("div").remove(`.${id}`)
            contadorUno = 1;
        }
    } else if (id == 'seccionDos') {
        if (contadorDos < 11) {
            generador(contadorDos, id, contenedorCards, color).next();
            contadorDos++
        } else {
            $("div").remove(`.${id}`)
            contadorDos = 6;
        }
    } else if (id == 'seccionTres') {
        if (contadorTres < 16) {
            generador(contadorTres, id, contenedorCards, color).next();
            contadorTres++
        } else {
            $("div").remove(`.${id}`)
            contadorTres = 11;
        }
    }
}


class Personaje {
    constructor(name, height, weight) {
        this.name = name;
        this.height = height;
        this.weight = weight;
    }
}

class buscarPersonaje extends Personaje {
    constructor(name, height, weight, id, contenedorCards, color) {
        super(name, height, weight);
        this.id = id;
        this.contenedorCards = contenedorCards;
        this.color = color;
    }
}


//funcion generadora solicitada para llamar a nuestro fecher
function* generador(i, id, location, color) {
    while (true) {
        yield mostrarPersonaje(i, id, location, color)
    }
}


//funcion constructora
function constructora(data, id, contenedorCards, color) {
    let personaje = new buscarPersonaje(data.name, data.height, data.mass, id, contenedorCards, color)

    insertarDatos(personaje)
}


//insertar datos
function insertarDatos(personaje) {
    $(`#${personaje.contenedorCards}`).append(`

    <div class="col-12 col-md-6 col-lg-4 ${personaje.id}">
    <div class="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s"
        style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
        <div class="timeline-icon" style="background-color: ${personaje.color};"><i class="fa fa-briefcase" aria-hidden="true"></i>
        </div>
        <div class="timeline-text">
            <h6 style="font-weight: bold">${personaje.name}</h6>
            <p>Estatura ${personaje.height} cm. Peso ${personaje.weight} kg.</p>
        </div>
    </div>
    </div>
    `)
}



