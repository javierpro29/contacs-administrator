import {auth} from "./firebase.js"
const signupForm = document.querySelector("#signup-form");



//register user
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;

    auth   
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {

        //credencial del usuario
        const credencial = userCredential.user;
        
        Swal.fire("User save saccessfully");

        signupForm.reset();
        $("#signup").modal("hide");
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        /* Swal.fire("User already in Database, try to login"); */
        Swal.fire({ icon: 'warning', title: errorMessage, confirmButtonText: 'accept'});
    });
})

//
//
//Login user
const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {

    e.preventDefault();
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

            //credencial del usuario
            const credencial = userCredential.user;
        
            loginForm.reset();

            $("#login").modal("hide");


            window.location.replace("addcontacts.html");

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({icon: 'warning', title: errorMessage, confirmButtonText: 'accept'});
        });
});