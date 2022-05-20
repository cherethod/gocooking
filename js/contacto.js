let nombre = new LiveValidation ('nombre');
nombre.add(Validate.Presence);
nombre.add(Validate.Format, {pattern:/^[a-z]+$/i})

let email = new LiveValidation ('email');
email.add(Validate.Presence);
email.add(Validate.Email);

let mensaje = new LiveValidation ('mensaje');
mensaje.add(Validate.Presence);
mensaje.add(Validate.Length, {minimum: 40});