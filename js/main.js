//  Fix para corregir la longitud del subtitulo de la tarjeta de recetas destacadas
// Tipo = (clase o id) , id = identificador, 
// valores = 1 (caracteres minimo), 
// 2 (valor limite del rango 1 (-1px fontSize ) e inicial del segundo rango),  
// 3 (valor máximo del segundo rango (-2px fontSize))

const subtitleFix = (id, valor1, valor2, valor3, margen)=> { // para destacadas ('subtitulo__receta-destacada', 21, 26, 29, 30)
    
    subtitulos = document.getElementsByClassName(id);
    

    fixedString = "";
    for (let y = 0; y < subtitulos.length; y++) {
        const element = subtitulos[y];
/**/
    size=window.getComputedStyle(element).fontSize;
    sizeFix=size.slice(0,-2);
    sizeFix=Number(sizeFix);
    sizeFix=Math.floor(sizeFix);
/**/
    elementChar= element.innerHTML.length; // ¿Es recomendable usar el let?
    characterString=element.innerHTML; 
        if (elementChar>valor1 && elementChar<valor2) {
            element.style.fontSize=`${sizeFix-1}px`;
        }
        if (elementChar>=valor2 && elementChar<=valor3){
            element.style.fontSize=`${sizeFix-2}px`;
            element.style.marginLeft=`${margen}%`;
        }
        if  (elementChar>=(valor3+1)) {
            for (let z = 0; z < (valor3 -1); z++) {
                const character = characterString[z];
                fixedString=fixedString+character;
            }
            element.innerHTML=`${fixedString}...`;
            element.style.fontSize=`${sizeFix-2}px`;
            element.style.marginLeft=`${margen}%`;
        }
    }
}
//  Fix para corregir la cantidad de ingredientes en la lista de la tarjeta de recetas destacadas
const ingredientsFix = ()=> {
    let listaIngredientes = document.getElementsByClassName('lista__ingredientes-receta');
    let count = 0;
    for (let y = 0; y < listaIngredientes.length; y++) {
        const lista = listaIngredientes[y];
        ingredientes = lista.childElementCount
        if (ingredientes>8) {
            for (let z = 0; z < lista.childNodes.length; z++) {
                const elemHijo = lista.childNodes[z];
                if (elemHijo.tagName != undefined) {             
                    count++;
                    if (count==9) {
                        elemHijo.innerHTML='Más ingredientes...'
                    }
                    else if (count>9){
                        lista.removeChild(lista.childNodes[z])
                    }
                }
            }
        }
    }
}

const urlToString = (titulo, subtitulo)=> {
    hrefEnlace="";
  
    for (let y=0; y<titulo.length; y++) {
      caracter=titulo[y]
      if (caracter==" "){
        hrefEnlace+='-';
      } else {
        hrefEnlace+=caracter;
      }
    }  
    hrefEnlace+='-';
    for (let y=0; y<subtitulo.length; y++) {
      caracter=subtitulo[y]
      if (caracter==" "){
        hrefEnlace+='-';
      } else {
        hrefEnlace+=caracter;
      }
    }
    return hrefEnlace.toLowerCase();
    
  }


// Animación del botón tipo -> "Fight"
const switchBtnFightAnimation = ()=> {
    document.addEventListener('mouseover', (e)=> {
    let targetBtn = e.target;
        if (targetBtn.className == "btn_fight switchAnimation") {
            targetBtn.classList.remove('switchAnimation');
        }        
        else if (targetBtn.className == "btn_fight") {
            targetBtn.classList.add('switchAnimation');
        }    
    });
}


// Script para agregar los ingredientes a la lista en el formulario para añadir recetas

const introducirIngrediente = ()=> {
    // let inputAgregarIngrediente = document.getElementById('btn-introducir-ingrediente'); // boton introducir
    let listaIngredientesInput = document.getElementById('listado-ingredientes'); // la ul de los ingredientes
    let nuevoIngrediente = document.getElementById('nuevo-ingrediente').value; // valor de la casilla ingrediente a introducir
  
    elementCount=0; // Valor inicial
   
    //comprueba la disponibilidad dela id antes de crear el "bloque"
    do {
        elementCount++;
    } while (document.getElementById(`contenedor_${elementCount}`)!= null);  //comprueba la disponibilidad dela id antes de crear el "bloque"

    // <--   CREA EL DIV CONTENEDOR  -->
        divContenedor = document.createElement('div');
        divContenedor.id = `contenedor_${elementCount}`;
        divContenedor.setAttribute('class', 'contenedor-lista');
        listaIngredientesInput.appendChild(divContenedor); 
        
    // <--   CREA EL LI   -->
        elem = document.createElement("li");
        elem.id = `item_${elementCount}`;
        elem.innerHTML = nuevoIngrediente;
        elem.style.textTransform='uppercase';
        let contenedorIngrediente = document.getElementById(`contenedor_${elementCount}`);
        contenedorIngrediente.appendChild(elem);

    // <--   CREA EL BOTON Y ASIGNA EL "ID" CORRESPONDIENTE PARA QUE BORRE SU CORRESPONDIENTE DIV  -->    
        btnBorrar = document.createElement("i");
        btnBorrar.id = `del-item-${elementCount}`;
        btnBorrar.setAttribute('class', 'fas fa-times-circle');
        btnBorrar.setAttribute('onclick', `borrarIngrediente(${elementCount})`);
        btnBorrar.setAttribute('title', 'borrar ingrediente');
        contenedorIngrediente.appendChild(btnBorrar);

        document.getElementById('nuevo-ingrediente').value = "";
        document.getElementById('grupo_ingrediente').classList.remove('campo-correcto');
        document.querySelector(`#grupo_ingrediente i`).style.visibility="hidden";
        document.getElementById('btn-introducir-ingrediente').style.visibility="hidden";

        // <-- Comprueba si hay al menos 3 ingredientes y elimina el estado de validacion erroneo -->
        listItems=0;
        for (let y = 0; y < document.getElementById('listado-ingredientes').childNodes.length; y++) {
            const element = document.getElementById('listado-ingredientes').childNodes[y];
            if (element.tagName != undefined) {
                listItems++;
            }        
        }
        if (listItems>=3) {
            document.querySelector(`#grupo_lista-ingredientes`).classList.remove('validacion-error'); 
        } 
}

const borrarIngrediente = (id)=> {
    // let listaIngredientesInput = document.getElementById('listado-ingredientes'); // la ul de los ingredientes
    let targetDiv = document.getElementById(`contenedor_${id}`)
    targetDiv.remove();
}
