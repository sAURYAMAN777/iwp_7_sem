firebase.auth().onAuthStateChanged(function(user) {
   if(user){
       console.log(user);
      email=user.email; 
       uid=user.uid;
       localStorage.setItem("emails",email);
        localStorage.setItem("uids",uid);
       var cliref = firebase.database().ref('userdata/');
       cliref.orderByChild("email").equalTo(user.email).on("child_added", function(data){
           
        var newVoke=data.val()
        console.log(newVoke.role);
           window.open(`${newVoke.role}.html`,'_self');
       });
   } 
    else{
        
   
        window.open('index1.html','_self');
    }
    });



