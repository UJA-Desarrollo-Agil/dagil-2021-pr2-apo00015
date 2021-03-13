// ---------------------------------------------------------------------------
// Edit this file to define your game. It should have at least four
// sets of content: undum.game.situations, undum.game.start,
// undum.game.qualities, and undum.game.init.
// ---------------------------------------------------------------------------

/* A unique id for your game. This is never displayed. I use a UUID,
 * but you can use anything that is guaranteed unique (a URL you own,
 * or a variation on your email address, for example). */
undum.game.id = "apo00015_CompraRutinaria";

/* A string indicating what version of the game this is. Versions are
 * used to control saved-games. If you change the content of a game,
 * the saved games are unlikely to work. Changing this version number
 * prevents Undum from trying to load the saved-game and crashing. */
undum.game.version = "1.0";

/* A variable that changes the fade out speed of the option text on
 * a mobile. */
undum.game.mobileHide = 2000

/* A variable that changes the options fade out speed. */
undum.game.fadeSpeed = 1500

/* A variable that changes the slide up speed after clicking on an
 * option. */
undum.game.slideUpSpeed = 500

/* The situations that the game can be in. Each has a unique ID. */
undum.game.situations = {
    start: new undum.SimpleSituation(
        "<h1>Un nuevo dia</h1>\
        <img src='media/games/tutorial/casa.jpg' class='float_right'>\
        <p>Muy buenos días, futuro ingeniero informático, como puedes ver ya ha comenazado un precioso y soleado nuevo día\
        el cuál será mas increible que ayer pero menos que mañana. </p>\
        \
        <p>Lo primero de todo será levantarse con gran energía y prepararse para comenzar este magnífico día</p>\
        \
        <p class='transient'>Click <a href='hub'>aquí para continuar con la aventura</a></p>"
    ),

    // NB: The 'hub' situation which is the main list of topics, is
    // defined wholly in the HTML file, and doesn't have an entry in
    // the game.situations dictionary in this file.

    // For variety, here we define a situation using the top-level
    // Situation type. This is a neat approach to generate text by
    // looking it up in the HTML document. For static text that makes
    // more sense than writing it longhand.
    situations: new undum.Situation({
        enter: function (character, system, from) {
            system.write($("#s_situations").html());
        },
        tags: ["opción"],
        optionText: "",
        displayOrder: 1
    }),

    desayuno: new undum.SimpleSituation(
        "<div>\
        <p>Muy bien, has decidido empezar el día desayunando, para ello podrás elegir entre diferentes alimentos, recuerda que no todo es saludable y algunas cosas te podrás bajar la energía:\
        <img src='media/img/desayuno.jpg'/>\
        <br>\
        <ul class='options'>\
        <li> <p> <a href='./cola_cao' class='once'>Cola cao </a> </p> </li>\
        <li> <p> <a href='./fruta' class='once'>Pieza de fruta </a> </p> </li>\
        <li> <p> <a href='./tostadas' class='once'>Tostadas </a> </p> </li>\
        <li> <p> <a href='./redbull' class='once'>Tomar un RedBull </a> </p> </li>\
        <li> <p> <a href='./pizza' class='once'>Pizza</a> </p> </li>\
        </ul>\
        <p>Una vez que hayas terminado tu elección de desayuno podrás volver a continuar tu historia, <a href='hub'>pincha aquí para volver</a></p>\
        </div>"
        ,
        {
            tags: ["topic"],
            diplayOrder: 2,
            heading: "Desayunando",
            actions: {
                'cola_cao': function (character, system, action) {

                    system.setQuality("energia", character.qualities.energia + 10);
                    system.setCharacterText("<p>Buena elección, un colacao siempre sienta bien</p>");
                },
                'tostadas': function (character, system, action) {

                    system.setQuality("energia", character.qualities.energia + 1);
                    system.setCharacterText("<p>2 buenas tostadas siempre sienta bien</p>");
                },
                'fruta': function (character, system, action) {

                    system.setQuality("energia", character.qualities.energia + 20);
                    system.setCharacterText("<p>Una manera saludable de empezar el día</p>");
                },
                'pizza': function (character, system, action) {

                    system.setQuality("energia", character.qualities.energia - 5);
                    system.setCharacterText("<p>No es una buena elección, poca gente toma en el desayuno una pizza</p>");
                },
                'redbull': function (character, system, action) {

                    system.setQuality("energia", character.qualities.energia - 10);
                    system.setCharacterText("<p>No creo que sea lo mejor para empezar el día</p>");
                },
            },
            exit: function (character, system, to) {

            }
        }
    ),
    salir: new undum.SimpleSituation(
        "<div>\
        <p>De acuerdo, ahora vamos a preparanos para salir de casa, para ello vamos a ver que cosas podemos coger para ir preparados:</p>\
        <br>\
        <p>En el salón nos encontramos <a href='./_llaves' class='once'>unas llaves de coche </a>y  un precioso <a href='./_paraguas' class='once'> paraguas </a>.</p>\
        <br>\
        <p>Por otro lado, en tu dormitorio encontramos <a href='./_mascarilla' class='once'> mascarilla </a> para protegernos del COVID, <a href='./_movil' class='once'>tu teléfono móvil </a> y debajo de tu\
        cama encontramos la <a href='./_cartera' class='once'> cartera </a>, sabiendo que es importante llevar el dinero para comprar las cosas.</p>\
        <br>\
		<img src='media/img/salir.jpg'/>\
        <p>Una vez que hayas terminado tu elección objetos a llevar podrás dirigirte al supermercado, <a href='./_salir'>pinchando aquí</a></p>\
        </div>"
        ,
        {
            tags: ["topic"],
            diplayOrder: 2,
            heading: "Saliendo de Casa",
            actions: {
                '_mascarilla': function (character, system, action) {
                    system.setQuality("mascarilla", true);
                    system.setCharacterText("<p>Bien hecho, es importante protegernos en tiempos de pandemia</p>");
                },
                '_llaves': function (character, system, action) {
                    system.setCharacterText("<p>Siento ser yo quien te diga esto, pero no tienes carnet de conducir</p>");
                },
                '_paraguas': function (character, system, action) {
                    system.setCharacterText("<p>Por si no lo recuerdas hoy hace un día soleado, no te va a hacer falta</p>");
                },
                '_movil': function (character, system, action) {
                    system.setQuality("movil", true);
                    system.setCharacterText("<p>Bien, ya has cogido el móvil.</p>");
                },
                '_cartera': function (character, system, action) {
                    system.setQuality("cartera", true);
                    system.setCharacterText("<p>Eso esta bien, necesitamos la cartera para poder comprar</p>");
                },
                '_salir': function (character, system, action) {
                    //Debemos comprobar que al menos ha cogido la mascarilla y la cartera
                    if (character.qualities.mascarilla == false) {
                        system.setCharacterText("<p>No puedes salir a la calle sin mascarilla, recuerda que hay una pandemia</p>");
                    }
                    if (character.qualities.cartera == false) {
                        system.setCharacterText("<p>No puedes salir a la calle sin cartera, deberias llevar dinero para comprar</p>");
                    }
                    if (character.qualities.mascarilla && character.qualities.cartera) {
                        //Nos dirigimos a la escena de la calle
                        system.doLink("super");
                    }
                }
            },
            exit: function (character, system, to) {

            }
        }
    ),
    super: new undum.SimpleSituation(

        "<p>Una vez que has llegado al supermercado deberás elegir cuál será la comida que vas a comprar.</p>\
        <p>Para saber que tienes que comprar deberás ver la <a href=./lista class='once'> lista de la compra. </a></p>\
		<img src='media/img/mercadona.jpg'>\
        <br>\
        <p>Como se puede apreciar en el supermercado hay varias cosas a elegir para comer, por tanto elige la que tienes apuntada en la lista o juegatela</p>\
        <ul class='options'>\
        <li> <p> <a href='./pizza'>Pizza refrigerada </a> </p> </li>\
        <li> <p> <a href='./tortilla'>Tortilla de patatas </a> </p> </li>\
        <li> <p> <a href='./ensaladilla'>Ensaladilla rusa </a> </p> </li>\
        <li> <p> <a href='./fideos'>Fideos orientales </a> </p> </li>\
        <li> <p> <a href='./lasana'>Lasaña</a> </p> </li>\
        </ul>\
        <p>Una vez que ya hayas elegido lo que comprar podrás volver a casa, <a href='./continuar'>pinchando aquí </a></p>\
        "

        // <!--Enlace a otra situacion creado -->
        ,
        {
            tags: ["topic"],
            diplayOrder: 2,
            heading: "Super Mercado",
            actions: {
                'lista': function (character, system, action) {

                    if (character.qualities.movil == true) {
                        system.setCharacterText("<p>Como has cogido el móvil, puedes saber que lo que tienes que comprar es una lasaña precocinada</p>");
                    } else {
                        system.setCharacterText("<p>Mala suerte, se te ha olvidado el teléfono, tendrás que improvisar </p>");
                    }

                },
                'pizza': function (character, system, action) {
                    system.setCharacterText("<p>Entonces tú elección es la pizza</p>");
                    system.setQuality("pizza", true);
                    system.setQuality("tortilla", false);
                    system.setQuality("lasana", false);
                    system.setQuality("fideos", false);
                    system.setQuality("ensaladilla", false);
                },
                'lasana': function (character, system, action) {

                    system.setCharacterText("<p>Entonces tú elección es la lasaña</p>");
                    system.setQuality("pizza", false);
                    system.setQuality("tortilla", false);
                    system.setQuality("lasana", true);
                    system.setQuality("fideos", false);
                    system.setQuality("ensaladilla", false);

                },
                'tortilla': function (character, system, action) {

                    system.setCharacterText("<p>Entonces tú elección es la tortilla </p>");
                    system.setQuality("pizza", false);
                    system.setQuality("tortilla", true);
                    system.setQuality("lasana", false);
                    system.setQuality("fideos", false);
                    system.setQuality("ensaladilla", false);

                },
                'ensaladilla': function (character, system, action) {

                    system.setCharacterText("<p>Entonces tú elección es la ensaladilla/p>");
                    system.setQuality("pizza", false);
                    system.setQuality("tortilla", false);
                    system.setQuality("lasana", false);
                    system.setQuality("fideos", false);
                    system.setQuality("ensaladilla", true);

                },
                'fideos': function (character, system, action) {

                    system.setCharacterText("<p>Entonces tú elección son los fideos orientales</p>");
                    system.setQuality("pizza", false);
                    system.setQuality("tortilla", false);
                    system.setQuality("lasana", false);
                    system.setQuality("fideos", true);
                    system.setQuality("ensaladilla", false);

                },
                'continuar': function (character, system, action) {
                    if (!character.qualities.pizza && !character.qualities.ensaladilla && !character.qualities.lasana && !character.qualities.tortilla && !character.qualities.fideos) {
                        system.setCharacterText("<p>Debes elegir algo, sino para que hemos venido al MERCADONA</p>");
                    } else {
                        //Nos dirigimos a la última situación
                        system.doLink("regreso");
                    }
                }

            },
            exit: function (character, system, to) {
                if (character.qualities.lasana) {
                    system.setCharacterText("<p>Bien has cumplido tu objetivo y has comprado la lasaña</p>");
                } else {
                    //Nos dirigimos a la última situación
                    system.setCharacterText("<p>Por lo visto lo que tenias que comprar era una lasaña pero tienes tanta hambre que ya te da igual</p>");
                }
            }
        }

    ),

    regreso: new undum.SimpleSituation(
        "<p>Ya hemos regresado a casa, con nuestra compra por tanto ya hemos conseguido nuestro objetivo.</p>\
        ahora nos pondremos a preparar la comida y seguiremos estudiando y preparando las "
        ,
        {
            tags: ["topic"],
            diplayOrder: 2,
            heading: "Regreso a Casa",
            actions: {

            },
            exit: function (character, system, to) {

            }
        }

    ),
    progress: new undum.SimpleSituation(
        "<p>Sometimes you want to make the change in a quality into a more\
        significant event. You can do this by animating the change in\
        quality. If you <a href='./boost-stamina-action'>boost your\
        stamina</a>, you will see the stamina change in the normal\
        way in the character panel. But you will also see a progress\
        bar appear and animate below.</p>",
        {
            tags: ["topic"],
            heading: "Showing a Progress Bar",
            displayOrder: 5,
            actions: {
                // I'm going indirect here - the link carries out an
                // action, which then uses doLink to directly change
                // the situation.  This isn't the recommended way (I
                // could have just changed situation in the link), but
                // it illustrates the use of doLink.
                "boost-stamina-action": function (character, system, action) {
                    system.doLink("boost-stamina");
                }
            },
            exit: function (character, system, to) {
                system.animateQuality(
                    'stamina', character.qualities.stamina + 1
                );
            }
        }
    ),
    // Again, we'll retrieve the text we want from the HTML file.
    "saving": new undum.Situation({
        enter: function (character, system, from) {
            system.write($("#s_saving").html());
        },
        tags: ["topic"],
        displayOrder: 6,
        optionText: "Saving and Loading"
    }),

};

// ---------------------------------------------------------------------------
/* Id the la situación en la que empezamos */
undum.game.start = "start";

// ---------------------------------------------------------------------------
/* Here we define all the qualities that our characters could
 * possess. We don't have to be exhaustive, but if we miss one out then
 * that quality will never show up in the character bar in the UI. */
undum.game.qualities = {
    mascarilla: new undum.OnOffQuality(
        "Mascarilla", { priority: "0001", group: 'stats', onDisplay: "&#10003;" }
    ),
    movil: new undum.OnOffQuality(
        "Movil", { priority: "0001", group: 'stats', onDisplay: "&#10003;" }
    ),
    cartera: new undum.OnOffQuality(
        "Cartera", { priority: "0001", group: 'stats', onDisplay: "&#10003;" }
    ),
    energia: new undum.IntegerQuality(
        "Energia", { priority: "0001", group: 'stats' }
    ),
    pizza: new undum.OnOffQuality(
        "Pizza", { priority: "0001", group: 'stats', onDisplay: "&#10003;" }
    ),
    tortilla: new undum.OnOffQuality(
        "Tortilla", { priority: "0001", group: 'stats', onDisplay: "&#10003;" }
    ),
    lasana: new undum.OnOffQuality(
        "Lasaña", { priority: "0001", group: 'stats', onDisplay: "&#10003;" }
    ),
    ensaladilla: new undum.OnOffQuality(
        "Ensaladilla", { priority: "0001", group: 'stats', onDisplay: "&#10003;" }
    ),
    fideos: new undum.OnOffQuality(
        "Fideos", { priority: "0001", group: 'stats', onDisplay: "&#10003;" }
    ),
};

// ---------------------------------------------------------------------------
/* Las cualidades se muestran en grupos en la barra de caracteres. Esta
  * determina los grupos, su encabezado (que puede ser nulo para ningún
  * encabezado) y pedidos. Calidad Las definiciones sin grupo aparecen en
  * el fin. Es un error que una definición de calidad pertenezca a un
  * grupo inexistente. */
undum.game.qualityGroups = {
    stats: new undum.QualityGroup(null, { priority: "0001" }),
    progress: new undum.QualityGroup('Progress', { priority: "0002" })
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function (character, system) {
    character.qualities.energia = 0;
    character.qualities.mascarilla = false;
    character.qualities.cartera = false;
    character.qualities.movil = false;
    character.qualities.tortilla = false;
    character.qualities.ensaladilla = false;
    character.qualities.lasana = false;
    character.qualities.pizza = false;
    character.qualities.fideos = false;


    system.setCharacterText("<p>Comienzas tu nuevo día.</p>");
};
