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

   var i="";
   var user= firebase.auth().currentUser;
   console.log(user);
   var hjcordiref= firebase.database().ref("orders/");
    hjcordiref.on("child_added", function(data){
      console.log(data.key);
      i=data.key;
         var pathe= firebase.database().ref("orders/"+data.key)
         pathe.on("child_added",function(data){


          var newVoke = data.val();
          var time=newVoke.time;
          if(!time)
          time= new Date();
          var html = "";
         html +=`
        
         <div class="col-lg-5 col-md-5 col-sm-10 overlay">
          <div class="row">
            <div class="col-6">
              <div class="info" style="display: flex; justify-content: center;align-items: center;flex-direction: column;padding: 9px;">
                <p class="ptitle">${newVoke.title}</p>
                <p class="ptime">${time}</p>
              </div>
            </div>
            <div class="col-6" style="display:flex;align-items: center; justify-content: center;">
            <img src="images/e-waste-management.jpg" class="img-fluid" style="postion:absolute;top:0%;right:0%;">
            </div>
          </div>
          <div class="row">
          <div class="col-9">
            <p>Details <i style="cursor:pointer;" id="${encodeURI(data.key)}" class="fa fa-angle-down" onclick="expand(this);"></i></p>
            <div id="${encodeURI(data.key)+'fd'}" class="fulldetails" style="display:none;background-color:#bababa;padding: 8px;">
              <div class="row">  
              <div class="col-6">
                <p id="one"><span style="font-weight:700;">Name: </span>${newVoke.name}</p>
                <p id="two"><span style="font-weight:700;">Title: </span>${newVoke.title}</p>
                <p id="three"><span style="font-weight:700;">Address: </span>${newVoke.address}</p>
                <p id="four"><span style="font-weight:700;">Quantity: </span>${newVoke.quantity}</p>
              </div>
              <div class="col-6">
                <p id="five"><span style="font-weight:700;">Phone: </span>${newVoke.phone}</p>
                <p id="six"><span style="font-weight:700;">Remark: </span>${newVoke.remark}</p>
                <p id="seven"><span style="font-weight:700;">Status: </span>${newVoke.status}</p>
                <p id="eight"><span style="font-weight:700;">Item to sell: </span>${newVoke.item_to_be_sold}</p>
              </div>
              </div>
            </div>
          </div>
          </div>
          <div class="row">
            <div class="col-6 d-flex align-items-center justify-content-center" style="flex-direction: column;">
            <p style="font-weight:700;">Current status of order</p>
            <p id="countdown" style="padding:3px 7px;background-color:gold;border-radius:2px;border: 2px solid #000;">${data.val().status}</p>
            </div>
            <div class="col-6 d-flex align-items-center justify-content-center">
                <button type="button" data-id="${i}" id="${data.key}" class="btn btn-outline-success"onclick="confirmation(this,i);">Confirm pickup</button>
            </div>
          </div>
         
<br>
     </div>
   
 
`
     
            document.getElementById("classe").innerHTML += html;
          
         });
         
     });


     var i="";
     var user= firebase.auth().currentUser;
     console.log(user);
     var hjcordiref1= firebase.database().ref("marketplace/");
     
     
      hjcordiref1.on("child_added", function(data){
        console.log(data.key);
        i=data.key;
           var pathe1= firebase.database().ref("marketplace/"+data.key)
           pathe1.on("child_added",function(data){
     
     
            var newVoke = data.val();
            var time=newVoke.time;
            if(!time)
            time= new Date();
            
            if(newVoke.item_to_be_sold)
             {
             var html = "";
             html +=`
              <div id="${encodeURI(data.key)+'wrap'}" style="background-color:aliceblue;padding: 8px;" class="col-lg-4  col-md-6 d-flex align-items-stretch" data-aos="fade-up">
              <article class="entry">
     
                <div class="entry-img">
                  <img src="images/e-waste-management.jpg" alt="" class="img-fluid">
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
                  <center><p>Status :</p>
                  <p style="padding: 4px;background-color:gold;">${newVoke.status}</p></center>
                  <center><button type="button" data-id="${i}" id="${data.key}" class="btn btn-outline-success"onclick="confirmation(this,i);">Confirm delivery</button></center>
                </div>
     
              </article><!-- End blog entry -->
            </div>
     `
     
               document.getElementById("classe2").innerHTML += html;
             }
            
           });
           
       });
       
   
   



     function expand(self){
      var Id = self.getAttribute("id");
      var fId=Id+"fd";
      if(document.getElementById(Id).className=="fa fa-angle-down")
      {
        document.getElementById(Id).className="fa fa-angle-up";
        document.getElementById(fId).style.display="block";
      }
      else if(document.getElementById(Id).className=="fa fa-angle-up")
      {
        document.getElementById(Id).className="fa fa-angle-down";
        document.getElementById(fId).style.display="none";
      }
    }
    function confirmation(self) {
      var Id = self.getAttribute("id");
      var did= self.getAttribute("data-id")
      // var c=document.getElementById(data.key+"fd").childNodes;
      console.log(Id);
      var pr=confirm("Are you sure the pickup is completed?");
      if(pr)
      {
        var db= firebase.database().ref("marketplace/"+did+"/"+Id+"/"+"status").set("successful");
          
        window.location.href="confirm.html";
      }
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
