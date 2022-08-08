import {auth} from "./firebase.js";
import {db} from "./firebase.js";




//logout
const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
    e.preventDefault();

    auth
        .signOut()
        .then(() =>{
            Swal.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: "Do you wanna logout of the page",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'update'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        window.location.replace("index.html")
                  )
                }
              })
        });
});




//show registers
//read data
/* db.on("value", (snapshot) => {
    const contacts = snapshot.val();
    console.log(contacts);
    for(contact in contacts){
        console.log(contacts[contacts])
    } 
}); */


const updatemodal = document.querySelector("#updatemodal");
const updateform = document.querySelector("#updateform");
var tablebody = document.querySelector("#trcontacts");

db.once("value", (snapshot) =>{

    const contacts = snapshot.val();

    for(var contact in contacts){

        let tr = `
        <tr data-id = ${contact}>
            <td>${contacts[contact].firstname}</td>
            <td>${contacts[contact].lastname}</td>
            <td>${contacts[contact].email}</td>
            <td>${contacts[contact].phone}</td>
            <td><button type="button" class="btn btn-warning text-light editcontacts"><i class="fa-solid fa-pen-to-square"></i></button></td>
            <td><button type="button" class="btn btn-danger deletecontact"><i class="fa-solid fa-trash"></i> </button></td> 
            <td><a href="mailto:${contacts[contact].email}" target="_blank" type="button" class="btn btn-primary sendmessage"><i class="fa-solid fa-square-envelope"></i> </a></td> 
            </tr>
            `
            
            
        tablebody.innerHTML += tr;

        
    }



    let editcontacts = document.querySelectorAll(".editcontacts");
        editcontacts.forEach(edit => {
            edit.addEventListener("click", () => {
                $("#updatemodal").modal("show");

                let userId = edit.parentElement.parentElement.dataset.id;
                /* console.log(contact); */
                /* console.log(userId); */
                firebase.database().ref(`contacts/${userId}`)
                .once("value")
                .then((contact) => {
                    const data = contact.val()
                    /* console.log(data); */
                    updateform["u-firstName"].value = data.firstname;
                    updateform["u-lastName"].value = data.lastname;
                    updateform["u-email"].value = data.email;
                    updateform["u-phoneNumber"].value = data.phone;

                });

               /*  const uid = e.target.dataset.id; */
                updateform.addEventListener("submit", (e) => {
                    e.preventDefault();

                    const firstname = updateform["u-firstName"].value;
                    const lastname = updateform["u-lastName"].value;
                    const email = updateform["u-email"].value;
                    const phone= updateform["u-phoneNumber"].value;

                    
                    function update(){
                        firebase.database().ref(`contacts/${userId}`).update({
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            phone: phone,
                        });
                        window.location.replace("addcontacts.html")
                    }

                    
                    $("#updatemodal").modal("hide");
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Are you sure?',
                        text: "Do you wanna update the contact informatión",
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'update'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire(
                                update()
                          )
                        }
                      })



                    /* alert("Contact Update saccessfully") */

                });

            });
        });

;
    let deletecontact = document.querySelectorAll(".deletecontact");
    deletecontact.forEach( deletebtn =>{
        deletebtn.addEventListener("click", () => {

            let userId = deletebtn.parentElement.parentElement.dataset.id;
    
            db.child(userId).remove()
    
            .then(() => {
                /* alert("Contact Deleted saccessfully") */                
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                        window.location.replace("addcontacts.html")
                      )
                    }
                  })

            });
        });
    });


    

});






//add
const addform = document.querySelector("#addform");

addform.addEventListener("submit", (e) => {
    /* e.preventDefault()*/

    const firstname = document.querySelector("#firstName").value;
    const lastname = document.querySelector("#lastName").value;
    const email = document.querySelector("#email").value;
    const phone= document.querySelector("#phoneNumber").value;

    const addcontact = db.push()
/*     console.log(addcontact);
    console.log(addcontact.path.pieces_[1]); */
    addcontact.set({
        uid: addcontact.path.pieces_[1],
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
    });

    
    $("#addform").modal("hide");

    /* alert("Contact save saccessfully") */
    

});