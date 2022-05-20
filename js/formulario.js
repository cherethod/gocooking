const formulario = document.getElementById('formulario-recetas');
let ingredientesArray = [];

const expresiones = {
    titulo: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras acentos y espacios 
    introducir_ingrediente: /^[a-zA-ZÀ-ÿ0-9\s\(\)\.\,\-\_]{1,40}$/
}

    const campos = {
    tipo: false,
    dificultad: false,
    titulo: false,
    subtitulo: false,
    ingrediente: false, // este campo no es necesario para la validación final antes de "enviar" el formulario.
    lista_ingredientes: false,
    instrucciones: false
}

const formularioRecetas = document.getElementById('formulario-recetas');
const inputs = document.querySelectorAll('#formulario-recetas input');

formularioRecetas.addEventListener('submit', async(e)=> {
    e.preventDefault();
    // <-- Comprueba que hayan al menos 3 ingredientes en la lista -->
    listItems=0;
    for (let y = 0; y < document.getElementById('listado-ingredientes').childNodes.length; y++) {
        const element = document.getElementById('listado-ingredientes').childNodes[y];
        if (element.tagName != undefined) {
            listItems++;
        }        
    }

    if (listItems>=3) {
        campos.lista_ingredientes = true;
    } else {
        campos.lista_ingredientes = false;
    }

    console.log(expresiones.titulo.test(document.querySelector('#grupo_titulo input').value))

    // <-- Fix campos tipo y dificultad en caso de refrescar pagina -->

    if (document.getElementById('id_tipo_receta').value != 'empty'){
        campos.tipo = true;
        document.querySelector(`#grupo_lista-ingredientes`).classList.remove('validacion-error'); 
    } 
    
    if (document.getElementById('id_dificultad_receta').value != 'empty'){
        campos.dificultad = true;
    }   
    
     if (expresiones.titulo.test(document.querySelector('#grupo_titulo input').value) && document.querySelector('#grupo_titulo input').value.length>=1){
        campos.titulo = true;
        
    }  
    if (expresiones.titulo.test(document.querySelector('#grupo_subtitulo input').value) && document.querySelector('#grupo_subtitulo input').value.length>=1){
        campos.subtitulo = true;
    } 
    if (document.getElementById('instrucciones-receta').value.length>100) {
        document.querySelector(`#grupo_instrucciones`).classList.remove('validacion-error');  
        campos.instrucciones = true;   
    } 

    for (let y = 0; y < document.getElementById('listado-ingredientes').childNodes.length; y++) {
        const element = document.getElementById('listado-ingredientes').childNodes[y];
            for (let z = 0; z < element.childNodes.length; z++) {
                const subelement = element.childNodes[z];              
                if (subelement.nodeName == 'LI') {
                    ingrediente = subelement.innerHTML;
                    ingredientesArray.push(ingrediente)
                }
            }
    } 

   // <-- Verifica que todos los campos esten completos -->
    if (campos.tipo && campos.dificultad && campos.titulo && campos.subtitulo && campos.lista_ingredientes && campos.instrucciones) {

        //<-- Enviamos los datos a la base de datos -->  documentación: https://docs.sheet.best/#quickstart         
        try {
            await fetch('https://sheet.best/api/sheets/39e4fe3f-ee12-4c87-b382-d2e1ca1010e0', {
                 method: 'POST',
                 mode:'cors',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({
                     'Tipo': formulario.id_tipo_receta.value,
                     'Dificultad': formulario.id_dificultad_receta.value,
                     'Titulo': formulario.id_titulo_receta.value,
                     'Subtitulo': formulario.id_subtitulo_receta.value,
                     'Ingredientes': String(ingredientesArray),
                     'Instrucciones': document.getElementById('instrucciones-receta').value
                 })
             });            
        } catch(error){
            console.log(error)
        }

        // document.querySelectorAll('.contenedor__input-formulario').classList.remove('.validacion-error')
    } else {
        if (campos.tipo == false) { 
            document.querySelector(`#grupo_tipo`).classList.add('validacion-error');    
        }
        if (campos.dificultad == false) { 
            document.querySelector(`#grupo_dificultad`).classList.add('validacion-error');    
        }
        if (campos.titulo == false) { 
            document.querySelector(`#grupo_titulo`).classList.add('validacion-error');    
        }
        if (campos.subtitulo == false) { 
            document.querySelector(`#grupo_subtitulo`).classList.add('validacion-error');  
            console.log('añadido validacion error en subtitulo')  
        }
        if (campos.lista_ingredientes == false) { 
            document.querySelector(`#grupo_lista-ingredientes`).classList.add('validacion-error');    
        }
        if (campos.instrucciones == false) { 
            document.querySelector(`#grupo_instrucciones`).classList.add('validacion-error');    
        }
        
    }
})

const validarFormularioReceta = (e)=> {
    console.log(campos)
    if (e.target.value.length>=2 ) {
        switch (e.target.name) {
            case "titulo": {
                // console.log(e.target.value.length)
                validarCampo(expresiones.titulo, e.target, e.target.name)
                // console.log(`comprobando ${e.target.name}`)            
            }
            case "subtitulo": {
                validarCampo(expresiones.titulo, e.target, e.target.name)
                // console.log(`comprobando ${e.target.name}`)
            }
            case "ingrediente": {
                validarCampo(expresiones.introducir_ingrediente, e.target, e.target.name)
                // console.log(`comprobando ${e.target.name}`)
            }
        }
    }
    else if (e.target.value.length <= 1) { 
        // var campo = e.target.name;
        // campos[campo]=  false
        document.getElementById(`grupo_${e.target.name}`).classList.remove('campo-incorrecto');      
        document.getElementById(`grupo_${e.target.name}`).classList.remove('campo-correcto');
		document.querySelector(`#grupo_${e.target.name} .icono-estado`).style.visibility="hidden";   
        if (e.target.name != 'ingrediente'){
            document.querySelector(`#grupo_${e.target.name} .texto__estado-error`).style.display="none"; 
            document.querySelector(`#grupo_${e.target.name} .texto__validacion-error`).style.display="none";  
            if (e.target.name == 'titulo') {
                campos.titulo=false;
            }  
            if (e.target.name == 'subtitulo') {
                campos.subtitulo=false;
            }       
        }
        if (e.target.name == 'ingrediente') {
            document.querySelector(`#grupo_${e.target.name} .icono-estado`).style.visibility="hidden"; 
            document.getElementById('btn-introducir-ingrediente').style.visibility="hidden";            
        }
        
        
    }
}

const validarCampo = (expresion, input, campo)=> {

    if (expresion.test(input.value)) {
        document.getElementById(`grupo_${campo}`).classList.remove('campo-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.add('campo-correcto');
		document.querySelector(`#grupo_${campo} .icono-estado`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo_${campo} .icono-estado`).classList.add('fa-check-circle');
		document.querySelector(`#grupo_${campo} .icono-estado`).style.visibility="visible";
        if (campo == 'ingrediente') {            
		    document.querySelector(`#grupo_${campo} #btn-introducir-ingrediente`).style.visibility="visible";            
        }
        if (campo != 'ingrediente') { 
            document.querySelector(`#grupo_${campo} .texto__estado-error`).style.display="none";           
		    document.querySelector(`#grupo_${campo} .texto__validacion-error`).style.display="none";
        }
        campos[campo] =true;
    }  
    else {
        document.getElementById(`grupo_${campo}`).classList.remove('campo-correcto');
        document.getElementById(`grupo_${campo}`).classList.add('campo-incorrecto');
		document.querySelector(`#grupo_${campo} .icono-estado`).classList.add('fa-times-circle');
		document.querySelector(`#grupo_${campo} .icono-estado`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo_${campo} .icono-estado`).style.visibility="visible";
		// document.querySelector(`#grupo_${campo} .texto__validacion-error`).style.display="block";
        
        if (campo == 'ingrediente') {
            document.querySelector(`#grupo_${campo} #btn-introducir-ingrediente`).style.visibility="hidden";            
        }
		document.querySelector(`#grupo_${campo} .texto__estado-error`).style.display="block";
        campos[campo] =false;
    }
}

const optionSelected = (campo, id)=> {
    if (document.getElementById(id).value != 'empty'){       
        campos[campo] = true;
		document.querySelector(`#grupo_${campo} .texto__validacion-error`).style.display="none";
    } else {
        campos[campo] = false;
    }
    console.log(campos)
}

const validarInstrucciones = (campo, id)=> {
    if (document.getElementById(id).value.length>100) {
        document.querySelector(`#grupo_instrucciones`).classList.remove('validacion-error');  
        campos[campo] = true;   
    } else {
        campos[campo] = false;
        // document.querySelector(`#grupo_instrucciones`).classList.add('validacion-error');  
    }
    console.log(campos)
}

inputs.forEach((inputs)=> {
    inputs.addEventListener('keyup', validarFormularioReceta);
    inputs.addEventListener('blur', validarFormularioReceta);
})


