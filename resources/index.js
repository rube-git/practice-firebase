
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC8rXQBJpXSnOCNifXezT0r4A58vPuvpiA",
    authDomain: "login-bluuweb.firebaseapp.com",
    databaseURL: "https://login-bluuweb.firebaseio.com",
    projectId: "login-bluuweb",
    storageBucket: "login-bluuweb.appspot.com",
    messagingSenderId: "753078102646",
    appId: "1:753078102646:web:ca98f533bfa49758380d57"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Elementos del DOM
var checkLoginRegister = document.getElementById('checkLoginRegister');
var emailUser = document.getElementById('emailUser');
var pwdPassword = document.getElementById('pwdPassword');
var btnEnter = document.getElementById('btnEnter');
var btnSalir=document.getElementById('btnSalir');
var h1Mensaje=document.getElementById('h1Mensaje');

// Variable global que controla si se esta registrando o logueando
var loginStatus=true;


// Registrar/loguear
btnEnter.addEventListener('click' , e=>{
    e.preventDefault();
    if(!loginStatus){
        registrarse();
    }else{
        loguearse();
    }
});

    // Registrarse.
    function registrarse(){
        let email = emailUser.value;
        let password = pwdPassword.value;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(){
            mensajeConfirmacion('Se ha registrado correctamente');
            loginStatus=true;
            clearInputs();
            btnEnter.innerText='Enter';
        })
        
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            mensajeError(errorCode, 'registro');
        });
    }
    
    // Mensaje confirmación.
    function mensajeConfirmacion(mensaje){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
    }

    // Mensaje Error Registrar
    function mensajeError(error, tipo){
        if(tipo=='registro'){
            if(error=="auth/weak-password"){
                Swal.fire({
                    icon: 'error',
                    title: '¡oh, no!',
                    text: 'La contraseña debe tener al menos 6 caracteres.',
                    // footer: '<a href>Why do I have this issue?</a>'
                });
            }
        
            if(error=="auth/invalid-email"){
                Swal.fire({
                    icon: 'error',
                    title: '¡oh, no!',
                    text: 'La dirección de correo eléctronico es inválida',
                    // footer: '<a href>Why do I have this issue?</a>'
                });
            }
        
            if(error=="auth/email-already-in-use"){
                Swal.fire({
                    icon: 'error',
                    title: '¡oh, no!',
                    text: 'La dirección de correo eléctronico ya esta en uso por otra cuenta',
                    // footer: '<a href>Why do I have this issue?</a>'
                });
            }
        }else{
            if(tipo=='login'){
                if(error=="auth/wrong-password"){
                    Swal.fire({
                        icon: 'error',
                        title: '¡oh, no!',
                        text: 'La contraseña no es válida o el usuario no tiene una contraseña',
                        // footer: '<a href>Why do I have this issue?</a>'
                    });
                }
            
                if(error=="auth/invalid-email"){
                    Swal.fire({
                        icon: 'error',
                        title: '¡oh, no!',
                        text: 'La dirección de correo eléctronico es inválida',
                        // footer: '<a href>Why do I have this issue?</a>'
                    });
                }
            
                if(error=="auth/user-not-found"){
                    Swal.fire({
                        icon: 'error',
                        title: '¡oh, no!',
                        text: 'No hay registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado',
                        // footer: '<a href>Why do I have this issue?</a>'
                    });
                }
            }
        }
    }

    function clearInputs(){
        emailUser.value="";
        pwdPassword.value="";
    }

    // Loguearse.

    function loguearse(){
        let email = emailUser.value;
        let password = pwdPassword.value;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(){
            loginStatus=false;
            btnEnter.innerText = 'Register'
            clearInputs();
            mensajeConfirmacion('logueado correctamente');
            btnSalir.style.display='block';
            console.log('logueado correctamente');
        })

        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            mensajeError(errorCode, 'login');
            console.log(errorCode);
            // ...
        });
    }

// Controla el cambio del formulario de loguearse a registrarse
$("#checkLoginRegister").on('change', function(){
    if(this.checked){
        btnEnter.innerText ='Enter';
        loginStatus=true;
    }else{
        btnEnter.innerText = 'Register'
        loginStatus=false;
    }
});


window.addEventListener('DOMContentLoaded',e=>{
    console.log("el DOM SE ha cargado por completo");
    console.log(checkLoginRegister.dataset.on);
    btnSalir.style.display='none';
    observador();
});



var s=0;

var btnPrueba = document.getElementById('btnPrueba');
var checkPrueba=document.getElementById('checkPrueba');
btnPrueba.addEventListener('click', (event)=>{
    if(s==0){
        console.log('desactivar');
        checkPrueba.checked=false;
        s=1;
    }
    else{
        console.log('activar');
        checkPrueba.checked=true;
        s=0;
    }
});

btnSalir.addEventListener('click', (event)=>{
    event.preventDefault();
    Swal.fire({
        title: 'Confirme la acción?',
        text: 'Esta seguro de la operación',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, estoy seguro',
        cancelButtonText:'No, cancelar'
      })
      
      .then((result) => {
        if (result.value) {

            firebase.auth().signOut()
            .then(function() {
                // Sign-out successful.
                
            })
            .catch(function(error) {
                // An error happened.
                console.log(error);
            });

            Swal.fire(
                'Sesión cerrada correctamente'
            )
        }
    })
})

function observador(){
    var name, email, photoUrl, uid, emailVerified;
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            // User is signed in.
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            h1Mensaje.innerHTML='Logueado';
            console.log(email);
            btnSalir.style.display='block';
        } else {
            // No user is signed in.
            btnSalir.style.display='none';
            h1Mensaje.innerHTML='';
        }
    })
}






