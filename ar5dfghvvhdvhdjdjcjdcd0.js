var config = {
    apiKey: "AIzaSyBtn3Eu1MmO1pY27Z9H5EiImSyT4vELbbY",
    authDomain: "e-waste-management-6448e.firebaseapp.com",
    databaseURL: "https://e-waste-management-6448e-default-rtdb.firebaseio.com",
    projectId: "e-waste-management-6448e",
    storageBucket: "e-waste-management-6448e.appspot.com",
    messagingSenderId: "295588160955",
    appId: "1:295588160955:web:bc68fb68715a999abe109e"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
    console.log(firebase);
firebase.auth().onAuthStateChanged(function(user) {
 
 
   if(user){
       var user = firebase.auth().currentUser;
       console.log(user);
       if(user.emailVerified!=true)
           {
       user.sendEmailVerification().then(function() {
            
   var emailVerified = user.emailVerified;

        
        window.open('verify-email.html','_self');
           
    
}).catch(function(error) {
  // An error happened.
});
           }
           var cliref = firebase.database().ref('userdata/');
           console.log("here3");
       cliref.orderByChild("email").equalTo(user.email).on("value", function(data){
        console.log("here2");
           if(data.val()){
               window.open('choose.html','_self');
               console.log("here1");
}
           else{
               window.open('database.html','_self');
           }

   } );
   console.log("here");
   }
    else{
    window.open('index1.html','_self');
    console.log("here");
    }
});