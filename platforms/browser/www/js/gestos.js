let app = {
    inicio: function(){
        this.iniciaBotones();
        this.iniciaFastClick();
        this.iniciaHammer();
    },

    iniciaBotones: function(){
        let buttonClaro = document.querySelector("#claro");
        let buttonOscuro = document.querySelector("#oscuro");

        buttonClaro.addEventListener("click", this.ponloClaro, false);
        buttonOscuro.addEventListener("click", this.ponloOscuro, false);
    },

    iniciaFastClick: function(){
        FastClick.attach(document.body);
    },

    iniciaHammer: function(){
        let zona = document.getElementById('zona-gestos');
        let hammertime = new Hammer(zona);

        hammertime.get('pinch').set({enable: true}); // you have to enable this events
        hammertime.get('rotate').set({enable: true});

        zona.addEventListener('webkitAnimationEnd', function(){
            zona.className = '';
        }, false);

        hammertime.on('doubletap', function(ev){
            zona.className = 'doubletap';
        });

        hammertime.on('press', function(ev){
            zona.className = 'press';
        });

        hammertime.on('swipe', function(ev){
            let clase = undefined;
            direccion = ev.direction;

            if (direccion == 4) clase = 'swipe-derecha';
            if (direccion == 2) clase = 'swipe-izquierda';

            zona.className = clase;
        });

        hammertime.on('rotate', function(ev){
            let umbral = 25;
            if (ev.distance > umbral) zona.className = 'rotate';
        });
    },

    ponloClaro: () => document.body.className = 'claro',

    ponloOscuro: () => document.body.className = 'oscuro'
}

if ('addEventListener' in document){
    document.addEventListener('DOMContentLoaded', function (){
        FastClick.attach(document.body);
        app.inicio();
    }, false);
}