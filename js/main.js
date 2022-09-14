(function(){

    btnNuevo = document.getElementById('btnNuevoJuego');
    btnDesistir = document.getElementById('btnDesistir');

    var palabras = [
        'ALURA',
        'NIÑO',
        'AFINIDAD',
        'PROGRAMAR',
        'ORACLE',
        'YOUTUBE'
    ];

    //variable para almacenar la confgracion actual
    var juego = null;
    var finalizado = false;
    
    var $html ={
        hombre: document.getElementById('img-Hombre'),
        adivinando: document.querySelector('.adivinado'),
        errado: document.querySelector('.errado')
    } 

    function dibujar(juego){
        //Actualizar la imagen del ahorcado
        var $elem
        $elem = $html.hombre;

        var estado = juego.estado;

        if(estado === 8){

            estado = juego.previo;
        }

        $elem.src ="../img/estado " + estado + ".png";

         //Creamos las letras adivinadas
        var palabra = juego.palabra;
        var adivinando = juego.adivinando;
        $elem = $html.adivinando;

        //borrar los elementos anteriores
        $elem.innerHTML ='';

        for (let letra of palabra){

            let $span = document.createElement('span');
            let $txt = document.createTextNode('');

            if(adivinando.indexOf(letra) >= 0){
                $txt.nodeValue = letra;
            }

            $span.setAttribute('class','letra adivinada');
            $span.appendChild($txt);
            $elem.appendChild($span);
        }
        //creamos las letras erraas
        var errado = juego.errado;
        $elem = $html.errado;
        //borrar los elementos anteriores
        $elem.innerHTML ='';

        for(let letra of errado){

            let $span = document.createElement('span');
            let $txt = document.createTextNode(letra);
            $span.setAttribute('class','errado')
            $span.appendChild($txt);
            $elem.appendChild($span);

        }
    }
    function adivinar(juego, letra){

        let estado = juego.estado;

        if(estado === 1 || estado === 8){
            return;
        }

        var adivinando = juego.adivinando;
        var errado = juego.errado;

        if(adivinando .indexOf(letra) >= 0 || errado.indexOf(letra) >= 0){
            return;
        }

        var palabra = juego.palabra;

        if(palabra.indexOf(letra) >=0){
            let ganado = true;
            for(let l of palabra){
                if(adivinando.indexOf(l) < 0 && l  != letra){
                    ganado = false;
                    juego.previo = juego.estado;
                    break;
                }
            }
            if(ganado){
                juego.estado = 8;
            }
            adivinando.push(letra);
        }else{
            juego.estado--;
            errado.push(letra);
        }
    }

    window.onkeypress = function adivinarLetra(e){
        var letra = e.key;

        ///convertir letra minuscula en mayuscula
        letra = letra.toUpperCase();
        //chequear que sea una letra valida
        if(!/[*A-ZÑ]/.test(letra)){
            return;
        }
        adivinar(juego, letra);

        var estado = juego.estado;

        if(estado === 8 && !finalizado){

            setTimeout(alertaGanado, 500);
            finalizado = true;

        }else if(estado === 1 && !finalizado){

            let palabra = juego.palabra;

            let fn = alertaPerdido.bind(undefined , palabra);

            setTimeout(fn, 500);

            finalizado = true;
        }

        dibujar(juego);
    }
    window.nuevoJuego = function nuevoJuego(){
        
        var palabra = palabraAleatoria();

        finalizado = false;

        juego = {};

        juego.palabra = palabra;

        juego.estado = 7;

        juego.adivinando = [];

        juego.errado = [];

        dibujar(juego);
    }

    function palabraAleatoria(){
        var index = ~~(Math.random() * palabras.length);
        return palabras[index];
    }
    function alertaGanado(){
        alert("Felicidades, ganaste!");
    } 
    function alertaPerdido( palabra){
        alert("Lo siento, perdiste... la palabra era: " + palabra);
    }
    function aletaDesistir(){
        alert("Lo siento, perdiste... intentalo de nuevo");

        nuevoJuego();
    }

    nuevoJuego();
    console.log(juego); 


    btnNuevo.addEventListener('click',nuevoJuego);
    btnDesistir.addEventListener('click',aletaDesistir);
}());