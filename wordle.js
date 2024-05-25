var intentos=0;
var arrayEsp=["arroz", "exito", "cosas", "comer","arbol"];
var arrayEng=["apple","drink","books","fruit","table"];
var fila;
var modoOscuro=false;
var arrayInputs=document.getElementsByTagName("input");
var idiomaPalabra="esp";
var palabraCorrecta=palabraAleatoria("esp");

function cambioIdioma(idioma){
    switch (idioma) {
        case "eng":
            Swal.fire({
                title: 'The language has been changed to English',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
              idiomaPalabra="eng";
            break;
        case "esp":
            Swal.fire({
                title: 'Has cambiado el idoma a Español',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
              idiomaPalabra="esp";
            break;
        default:
            break;
    }
    palabraCorrecta=palabraAleatoria(idiomaPalabra);
    intentos=0;
    limpiar();
    habilitarFila("fila0");
    focusCaja1();
}


function randomNum(max) {
    return Math.floor(Math.random() * max);
}

function palabraAleatoria(idioma){
var palabra="";
    switch (idioma) {
        case "esp":
            palabra=arrayEsp[randomNum(5)];
            break;
        case "eng":
            palabra=arrayEng[randomNum(5)];
            break;
        default:
            break;
    }
    console.log("La palabra correcta es " + palabra);
    return palabra;
}


function modo() {

    if (modoOscuro==false) {
        document.body.style.backgroundColor="#303030";
        for (let index = 0; index < arrayInputs.length; index++) {
            arrayInputs[index].style.backgroundColor="#202020";
            arrayInputs[index].style.color="white";
        }
        document.getElementById("tabla").style.background="#008cff";
        document.getElementById("titulo").style.color="white";
        document.getElementById("modo").src="modo-claro.png";
        document.getElementById("modo").style.transition="0.5s";
        document.getElementById("footer").style.color="white";
        focusCaja1();
        modoOscuro=true;
    }
    else{
        document.body.style.backgroundColor="rgba(211, 227, 237, 0.694)";
        for (let index = 0; index < arrayInputs.length; index++) {
            arrayInputs[index].style.backgroundColor="rgb(238, 238, 238)";
            arrayInputs[index].style.color="black";
        }
        document.getElementById("titulo").style.color="black";
        document.getElementById("tabla").style.background="rgba(53,47,157,1)";
        document.getElementById("modo").src="modo-oscuro.png";
        document.getElementById("footer").style.color="black";
        focusCaja1();
        modoOscuro=false;
    }

}

function limpiar(){
    for (let index = 0; index < arrayInputs.length; index++) {
        arrayInputs[index].value="";
        arrayInputs[index].setAttribute("disabled","");
        if (modoOscuro) {
            arrayInputs[index].style.backgroundColor="#202020";
            arrayInputs[index].style.color="white";
        }
        else{
            arrayInputs[index].style.backgroundColor="rgb(238, 238, 238)";
            arrayInputs[index].style.color="black";
        }
        
    }
}


function seleccionarFila(claseFila){
    var fila=document.getElementsByClassName(claseFila);
    return fila;
}


function crearPalabra(nomFila){
    var fila=seleccionarFila(nomFila);
    var palabra="";

    for (let index = 0; index < fila.length; index++) {
        palabra+=fila[index].value;
    }
    return palabra.toLowerCase();
}

function recorrerPalabra(palabraCorrecta,palabraUsu,nomFila){

    for (let index = 0; index < palabraCorrecta.length; index++) {

        if (palabraCorrecta.charAt(index)==palabraUsu.charAt(index)) {
            fila=seleccionarFila(nomFila);
            fila[index].style.backgroundColor="#2BAC38";
            fila[index].style.color="white";
        }

        else if (palabraCorrecta.includes(palabraUsu.charAt(index))) {
            fila=seleccionarFila(nomFila);
            fila[index].style.backgroundColor="orange";
            fila[index].style.color="white";
        }
        else{
            fila=seleccionarFila(nomFila);
            fila[index].style.backgroundColor="#606060";
            fila[index].style.color="white";
        }

    }
    transicionInputs(nomFila);
}


function disabledRow(nomFila){
    var fila=seleccionarFila(nomFila);

    for (let index = 0; index < fila.length; index++) {
        fila[index].setAttribute("disabled","");
    }
}

function habilitarFila(nomFila) {
    var ultimo=parseInt(nomFila.charAt(nomFila.length-1)) + 1;
    nomFila=nomFila.substring(0, nomFila.length-1);
    nomFila+=ultimo;

    var fila=seleccionarFila(nomFila);
    for (let index = 0; index < fila.length; index++) {
        fila[index].removeAttribute("disabled");
    }
}

function habilitarJuego(nomFila) {

    var fila=seleccionarFila(nomFila);
    for (let index = 0; index < fila.length; index++) {
        fila[index].removeAttribute("disabled");
    } 

}

function reiniciar(){
    intentos=0;
    limpiar();
    habilitarJuego("fila1");
    document.getElementById("comprobar").style.display="block";
    document.getElementById("reiniciar").style.display="none";
    palabraCorrecta=palabraAleatoria(idiomaPalabra);
    focusCaja1()
}

function focusCaja1(){
    document.getElementById("caja1").focus();
}

function transicionInputs(nomFila){
    var valor=0;
    var filaTransicion=seleccionarFila(nomFila);

    for (let index = 0; index < filaTransicion.length; index++) {
        valor+=0.2;
        filaTransicion[index].style.transitionDelay=(valor +  "s");
    }
}



function probarFila(nomFila){
    palabraUsu=crearPalabra(nomFila);  
    console.log(palabraUsu);

    if(palabraUsu.length==5){
        if (palabraUsu!=palabraCorrecta) {
            recorrerPalabra(palabraCorrecta,palabraUsu,nomFila);
            disabledRow(nomFila);
            habilitarFila(nomFila);
            intentos++;
        }
        else{
            recorrerPalabra(palabraCorrecta,palabraUsu,nomFila);
            disabledRow(nomFila);
            Swal.fire({
                icon: 'success',
                title: 'Enhorabuena',
                text: '¡Has ganado!',
                })
            document.getElementById("comprobar").style.display="none";
            document.getElementById("reiniciar").style.display="block";
        }
    }
    else{
        Swal.fire({
            title: 'Mínimo 5 caracteres',
            icon: 'info',
            focusConfirm: false,
            })
    }
    if (intentos>4) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Has perdido! La palabra es ' + palabraCorrecta.toUpperCase(),
            })
            document.getElementById("comprobar").style.display="none";
            document.getElementById("reiniciar").style.display="block";
    }
}
/*
function enter(){
    var tecla=event.keyCode;
    if (tecla==13) {
        return comprobar();
    }
}
window.onkeydown=enter;
*/

function comprobar() {
    switch (intentos) {
        case 0:
            probarFila("fila1");
            document.getElementById("caja6").focus();
            break;
        case 1:
            probarFila("fila2");
            document.getElementById("caja11").focus();
            break;
        case 2:
            probarFila("fila3");
            document.getElementById("caja16").focus();
            break;
        case 3:
            probarFila("fila4");
            document.getElementById("caja21").focus();
            break;
        case 4:
            probarFila("fila5");
            break;
        default:
            break;
    } 
}









