(function(){

    var juego ={
        palabra: 'ALURA',
        estado: 1,
        adivinando:['A', 'L'],
        errado: ['B', 'J', 'K', 'C']
    }
    var $html ={
        hombre: document.getElementById('img-Hombre'),
        linea : document.getElementById('lienas'),
        adivinando: document.querySelector('.adivinado'),
        errado: document.querySelector('.errado')
    } 

    //function dibujar(juego){
        //Actualizar la imagen del ahorcado
        var $elem
        $elem = $html.hombre;
        $elem.src ="../img/estado " + juego.estado + ".png";

         //Creamos las letras adivinadas
        var palabra = juego.palabra;
        var adivinando = juego.adivinando;
        $elem = $html.adivinando;
        for (let letra of palabra){
            let $span = document.createElement('span');
            let $txt = document.createTextNode('__');
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
        for(let letra of errado){
            let $span = document.createElement('span');
            let $txt = document.createTextNode(letra);
            $span.setAttribute('class','errado')
            $span.appendChild($txt);
            $elem.appendChild($span);

        }

    //}
    console.log(juego);

}());