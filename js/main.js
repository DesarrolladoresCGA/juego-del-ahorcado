(function(){

    var juego ={
        palabra: 'ALURA',
        estado: 7,
        adivinando:['A', 'L'],
        errado: ['B', 'J', 'K', 'C']
    }
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
        dibujar(juego);
    }

    dibujar(juego);
}());