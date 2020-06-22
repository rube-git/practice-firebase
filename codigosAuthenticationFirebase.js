// AUTENTICACION POR CORREO ELECTRÓNICO

// Permite registrar usuarios mediante un correo y una contraseña
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});

// Permite que un usuario acceda al sistema web con email y con contraseña
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});

// Salir de una sesión en firebase
firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
});

// Función observador

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
         
        } else {
            // No user is signed in.
       
        }
    })
}


