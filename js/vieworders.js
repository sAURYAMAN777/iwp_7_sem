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
  var i=0;
 
   var user= firebase.auth().currentUser;
   console.log(user);
   var hjcordiref1= firebase.database().ref("orders/"+`${localStorage.uids}`);
   
    hjcordiref1.on("child_added", function(data){
      console.log(data.key);
   
      var storageRef = firebase.storage().ref("images/"+`${localStorage.uids}`+'/'+`${document.querySelector('#title').value}`).getDownloadURL();
          var newVoke = data.val();
          var time=newVoke.time;
          if(!time)
          time= new Date();
          
          if(newVoke.item_to_be_sold)
           {
           var html = "";
           html +=`
            <div id="${encodeURI(data.key)+'wrap'}" class="col-lg-4  col-md-6 d-flex align-items-stretch" data-aos="fade-up" style="border: 2px solid black; border-radius: 6px; padding 8px;">
            <article class="entry">
   
              <div class="entry-img">
                <img src="${storageRef}" alt="" class="img-fluid">
              </div>
   
              <h1 style="font-size:3em;" class="entry-title">
                ${newVoke.item_to_be_sold}
              </h1>
              <h1 class="entry-title">
                 <span style="font-weight:500">Price:<span> Rs ***
              </h1>
   
              <div class="entry-meta">
                <ul>
                  <li class="d-flex align-items-center"><i class="icofont-user"></i>${newVoke.name}</li>
                  <li class="d-flex align-items-center"><i class="icofont-wall-clock"></i><time>${newVoke.time}</time></a></li>
                </ul>
              </div>
   
              <div class="entry-content">
                 <p style="font-weight:600;">
                  ${newVoke.description}
                </p>
                
                <center><button type="button" data-id="${i}" id="${data.key}" class="btn btn-danger"onclick="cancellation(this);">Cancel</button></center>
              </div>
   
            </article><!-- End blog entry -->
          </div>
   `
   
             document.getElementById("classe2").innerHTML += html;
           }
          
         });
         

    
    function cancellation(self) {
      var Id = self.getAttribute("id");
   
    
      var pr=confirm("Are you sure you want to cancel?");
      if(pr)
      {
       // delete message
       var db= firebase.database().ref("orders/"+localStorage.uids).child(Id).remove();
       window.location.href="vieworders.html";
      }
    }
    function buy_item(self){
     var dtitle = self.getAttribute("data-key-id");
     var uid= self.getAttribute("data-uid-id");
     var tgref=firebase.database().ref("marketplace/"+uid+"/"+dtitle);
    var newref=firebase.database().ref("orders/"+uid);
   
    newref.orderByChild("title").equalTo(dtitle).on("child_added", function(data){
              
     tgref.set(data.val());
    });
   
     
     
     window.location.href="payment.html";
    } 

    

document.getElementById("log").addEventListener("click",logo);
function logo(){
  
   firebase.auth().signOut();

}

firebase.auth().onAuthStateChanged(function(user) {

 if(!user){

     window.open('index1.html','_self');
 }     
});
