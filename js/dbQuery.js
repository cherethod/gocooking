

const crearRecetaDestacada = (value, tipo, dificultad, titulo, subtitulo, ingredientes) => {
  let contenedor = document.querySelector('.contenedor__principal-destacadas');
  dificultad=dificultad.toLowerCase()
  console.log(dificultad)

  tipo=tipo.toLowerCase()
  hrefEnlace=urlToString(titulo, subtitulo);

  // <--   CREA EL DIV CONTENEDOR  -->
  contenedorReceta = document.createElement('div');
  contenedorReceta.setAttribute('class', 'contenedor__receta-destacada');
  contenedorReceta.setAttribute('id', `contenedor-destacada${value}`)
  contenedor.appendChild(contenedorReceta);

  // <--   CREA EL DIV CONTENEDOR DETALLES --> 
  contenedorReceta = document.getElementById(`contenedor-destacada${value}`);
  contenedorDetallesReceta = document.createElement('div');
  contenedorDetallesReceta.setAttribute('class', 'contenedor__detalles-receta');
  contenedorDetallesReceta.setAttribute('id', `contenedor-detalles${value}`)
  contenedorReceta.appendChild(contenedorDetallesReceta);

  // <--   CREA LA IMAGEN DE LA RECETA  -->
  contenedorDetallesReceta = document.getElementById(`contenedor-detalles${value}`);
  imgReceta = document.createElement('img');
  imgReceta.setAttribute('class', 'imagen__receta-destacada');
  imgReceta.setAttribute('src', './img/Wok-de-fideos-chinos-con-gambas-1.png');
  contenedorDetallesReceta.appendChild(imgReceta);

  // <--   CREA CONTENEDOR DEL TITULO - SUBTITULO  -->
  contenedorTitulo = document.createElement('div');
  contenedorTitulo.setAttribute('class', 'panel__titulo-receta');
  contenedorTitulo.setAttribute('id', `contenedor-titulo${value}`)
  contenedorDetallesReceta.appendChild(contenedorTitulo);

  // <--   CREA EL TITULO Y SUBTITULO  -->
  contenedorTitulo = document.getElementById(`contenedor-titulo${value}`);
  elemTitulo = document.createElement('h3');
  elemTitulo.setAttribute('class', 'titulo__receta-destacada');
  elemTitulo.innerHTML = titulo;
  contenedorTitulo.appendChild(elemTitulo);

  elemSubtitulo = document.createElement('h3');
  elemSubtitulo.setAttribute('class', 'subtitulo__receta-destacada');
  elemSubtitulo.innerHTML = subtitulo;
  contenedorTitulo.appendChild(elemSubtitulo);

  subtitleFix('subtitulo__receta-destacada', 21, 26, 30, 15);

  // <--   CREA CONTENEDOR INFO DE LA RECETA  -->
  contenedorInfoReceta = document.createElement('div');
  contenedorInfoReceta.setAttribute('class', 'contenedor__info-receta');
  contenedorInfoReceta.setAttribute('id', `contenedor-info${value}`)
  contenedorDetallesReceta.appendChild(contenedorInfoReceta);

  // <--   CREA CONTENEDOR DE INGREDIENTES  -->
  contenedorInfoReceta = document.getElementById(`contenedor-info${value}`);
  contenedorIngredientesReceta = document.createElement('div');
  contenedorIngredientesReceta.setAttribute('class', 'contenedor__ingredientes-receta');
  contenedorIngredientesReceta.setAttribute('id', `contenedor-ingredientes${value}`)
  contenedorInfoReceta.appendChild(contenedorIngredientesReceta);


  // <--   CREA LA LISTA DE INGREDIENTES  -->
  contenedorIngredientesReceta = document.getElementById(`contenedor-ingredientes${value}`);
  listaIngredientes = document.createElement('ul');
  listaIngredientes.setAttribute('class', 'lista__ingredientes-receta')
  listaIngredientes.setAttribute('id', `lista-ingredientes${value}`);
  contenedorIngredientesReceta.appendChild(listaIngredientes);

  // <--   CREA ELEMENTOS DE LA LISTA  -->
  listaIngredientes = document.getElementById(`lista-ingredientes${value}`);

  //Bucle para crear cada li por cada ingrediente del la array
  for (let z = 0; z < ingredientes.length; z++) {
    const elem = ingredientes[z];
    itemLista = document.createElement('li');
    itemLista.innerHTML = `${elem}`;
    listaIngredientes.appendChild(itemLista);
    ingredientsFix();
  }
  

  // <--   CREA CONTENEDOR NIVEL DE DIFICULTAD  -->
  contenedorDificultad = document.createElement('div');
  contenedorDificultad.setAttribute('class', `contenedor__nivel-dificultad ${dificultad}`);  //añadir dificultad importada de la base de datos
  contenedorDificultad.setAttribute('id', `contenedor-nivel${value}`);
  contenedorInfoReceta.appendChild(contenedorDificultad);

  // <--   CREA IMAGEN NIVEL  -->
  contenedorDificultad = document.getElementById(`contenedor-nivel${value}`);
  imgNivel = document.createElement('img');
  imgNivel.setAttribute('src', './img/nivel-small.png');
  contenedorDificultad.appendChild(imgNivel);

  // <--   CREA CONTENEDOR BARRAS NIVEL  -->
  contenedorBarrasNivel = document.createElement('div');
  contenedorBarrasNivel.setAttribute('class', 'contenedor__barras-nivel');
  contenedorBarrasNivel.setAttribute('id', `contenedor-barras${value}`);
  contenedorDificultad.appendChild(contenedorBarrasNivel);

  // <--   CREA BARRA FACIL  -->
  contenedorBarrasNivel = document.getElementById(`contenedor-barras${value}`);
  barraFacil = document.createElement('div');
  barraFacil.setAttribute('class', 'barra__nivel-facil');
  barraFacil.setAttribute('title', 'Krilín pudo con ella!');
  contenedorBarrasNivel.appendChild(barraFacil);

  // <--   CREA BARRA MEDIO  -->
  barraMedio = document.createElement('div');
  barraMedio.setAttribute('class', 'barra__nivel-medio');
  barraFacil.setAttribute('title', 'Llévate alguna semilla Senzu por si acaso!');
  contenedorBarrasNivel.appendChild(barraMedio);

  // <--   CREA BARRA DIFICIL  -->
  barraDificil = document.createElement('div');
  barraDificil.setAttribute('class', 'barra__nivel-dificil');
  barraFacil.setAttribute('title', 'Deberás usar la Genki-dama!');
  contenedorBarrasNivel.appendChild(barraDificil);

  // <--   CREA CONTENEDORBOTON FIGHT  -->
  contenedorBtnFight = document.createElement('div');
  contenedorBtnFight.setAttribute('class', 'btn_fight');
  contenedorBtnFight.setAttribute('id', `btn-fight${value}`);
  contenedorInfoReceta.appendChild(contenedorBtnFight);

  // <--   CREA DECORACION BTN SUPERIOR  -->
  contenedorBtnFight = document.getElementById(`btn-fight${value}`);
  imgBtnTop = document.createElement('img');
  imgBtnTop.setAttribute('class', 'btn__decoracion-top');
  imgBtnTop.setAttribute('src', './img/Ins_Eff.png');
  contenedorBtnFight.appendChild(imgBtnTop);

  // <--   CREA ENLACE BOTON  -->
  enlaceBtnFight = document.createElement('a');
  enlaceBtnFight.setAttribute('class', 'btn_enlace');
  
  enlaceBtnFight.setAttribute('href', `./recetas/${tipo}/${hrefEnlace}.html`);
  enlaceBtnFight.innerHTML = 'Enfrentarse';
  contenedorBtnFight.appendChild(enlaceBtnFight);

  // <--   CREA DECORACION BTN SUPERIOR  -->
  imgBtnBot = document.createElement('img');
  imgBtnBot.setAttribute('class', 'btn__decoracion-bot');
  imgBtnBot.setAttribute('src', './img/Ins_Eff.png');
  contenedorBtnFight.appendChild(imgBtnBot);
}

const crearListaRecetas = (value, tipo, titulo, subtitulo)=> { 
let contenedor = document.getElementById('lista-recetas-tipo');

  receta = document.createElement('li');
  receta.setAttribute('class', `item__listado-recetas`);
  receta.setAttribute('id', `item__listado-recetas${value}`);
  contenedor.appendChild(receta);

  tipo=tipo.toLowerCase()
  hrefEnlace=urlToString(titulo, subtitulo);

  receta = document.getElementById(`item__listado-recetas${value}`)
  enlace = document.createElement('a');
  enlace.setAttribute('class', 'enlace__item-lista-recetas');
  enlace.setAttribute('href', `../recetas/${tipo}/${hrefEnlace}.html`)
  enlace.innerHTML = `${titulo} ${subtitulo}`;
  receta.appendChild(enlace);
}

const rellenarRecetaCompleta = (tipo, dificultad, titulo, subtitulo, arrayIngredientesFixed, instrucciones)=> {
  
  url = window.location.href;
  tipo=tipo.toLowerCase()
  hrefEnlace=urlToString(titulo, subtitulo);

  if (url.includes(`${tipo}/${hrefEnlace}.html`)== true) {
    document.getElementById('texto-titulo-receta-completa').innerHTML=titulo;
    document.getElementById('texto-subtitulo-receta-completa').innerHTML=subtitulo;
    subtitleFix('subtitulo__receta-completa',29,34,39,8)

    // FIX SUBTITULOS TEMP
//     subtitulos=document.getElementById('texto-subtitulo-receta-completa');
//     valor1=29;
//     valor2=34;
//     valor3=39;

//     fixedString = "";
    
// /**/
//     size=window.getComputedStyle(subtitulos).fontSize;
//     sizeFix=size.slice(0,-2);
//     sizeFix=Number(sizeFix);
//     sizeFix=Math.floor(sizeFix);
// /**/
//     elementChar= subtitulos.innerHTML.length; // ¿Es recomendable usar el let?
//     characterString=subtitulos.innerHTML; 
//         if (elementChar>valor1 && elementChar<valor2) {
//             subtitulos.style.fontSize=`${sizeFix-1}px`;
//         }
//         if (elementChar>=valor2 && elementChar<=valor3){
//             subtitulos.style.fontSize=`${sizeFix-2}px`;
//             subtitulos.style.marginLeft='8%';
//         }
//         if  (elementChar>=(valor3+1)) {
//             for (let z = 0; z < (valor3 -1); z++) {
//                 const character = characterString[z];
//                 fixedString=fixedString+character;
//             }
//             subtitulos.innerHTML=`${fixedString}...`;
//             subtitulos.style.fontSize=`${sizeFix-2}px`;
//             subtitulos.style.marginLeft='8%';
//         }
  

    //Bucle para crear cada li por cada ingrediente del la array
 
    for (let z = 0; z < arrayIngredientesFixed.length; z++) {
    const elem = arrayIngredientesFixed[z];
    itemLista = document.createElement('li');
    itemLista.innerHTML = `${elem}`;
    document.querySelector('.lista__ingredientes-receta').appendChild(itemLista);

    document.querySelector('.texto__dificultad-receta-completa').innerHTML=`Dificultad de la receta: ${dificultad}`;

    // contenedorInstrucciones=document.querySelector('.contenedor__instrucciones-receta-completa');
    // textoInstrucciones=document.createElement('p');
    // textoInstrucciones.setAttribute('class', 'instrucciones__receta-completa');
    // console.log(typeof(instrucciones))
    // textoInstrucciones.innerHTML=instrucciones;
    // contenedorInstrucciones.appendChild(textoInstrucciones);

    document.querySelector('.contenedor__instrucciones-receta-completa').innerHTML=instrucciones;
  }
  }
}


const importarLista = async(modelo)=>{
  let infoRecetas;
  try {
    const obtenerLista = await fetch('https://sheet.best/api/sheets/54625907-6ae9-4f85-9498-95a0949b61a3?_format=records');
    const contenidoLista = await obtenerLista.json();
    infoRecetas = Object.entries(contenidoLista)
    for (let y = 0; y < infoRecetas.length; y++) {
      const receta = infoRecetas[y];
      tipo = receta[1].Tipo;
      titulo = receta[1].Titulo;
      subtitulo = receta[1].Subtitulo;

      if (modelo == tipo) {
        crearListaRecetas(y, tipo, titulo, subtitulo);
        // script crear listado ** añadir atributo value que será igual a Y para las id's de los elementos
      }
    }
  } catch (error2) {
    console.log(error2)
  }
}


const importarDb = async (accion, modelo) => {
  let infoData;
  let arrayIngredientesFixed = [];
  try {
    const obtenerData = await fetch('https://sheet.best/api/sheets/72aaac2e-404c-463d-93d4-6adceef3570d?_format=records');

    const contenidoData = await obtenerData.json();
    infoData = Object.entries(contenidoData)

    for (let y = 0; y < infoData.length; y++) {
      const receta = infoData[y];

      tipo = receta[1].Tipo;
      dificultad = receta[1].Dificultad;
      titulo = receta[1].Titulo;
      subtitulo = receta[1].Subtitulo;
      ingredientes = receta[1].Ingredientes;
      ingredientes = ingredientes.split([","]);


      // FIX ARRAY INGREDIENTES START
      for (let i = 0; i < ingredientes.length; i++) {
        const element = ingredientes[i];
        fixIngrediente="";
        for (let y = 0; y < element.length; y++) {
          const caracter = element[y];
          if (caracter == "[" || caracter == '"' || caracter == "]" || caracter == "," || caracter == ``) {
          }
          else {              
            fixIngrediente=fixIngrediente+caracter;
          }
        }
        arrayIngredientesFixed.push(fixIngrediente);
      }
        // FIX ARRAY INGREDIENTES END

        instrucciones = receta[1].Instrucciones;

        if (accion == "destacada" && modelo == "inicio" && receta[1].Destacada == 'TRUE') {
          crearRecetaDestacada(y, tipo, dificultad, titulo, subtitulo, arrayIngredientesFixed);
        }
        if (accion == "receta" && modelo == "completa") {
          rellenarRecetaCompleta(tipo, dificultad, titulo, subtitulo, arrayIngredientesFixed, instrucciones);
        }
    }
  } catch (error) {
    console.log(error)
  }

}