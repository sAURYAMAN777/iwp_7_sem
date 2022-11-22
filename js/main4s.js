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
     var hjcordiref1= firebase.database().ref("orders/");
     
     
      hjcordiref1.on("child_added", function(data){
        i=data.key;
           var pathe1= firebase.database().ref("orders/"+data.key)
           pathe1.on("child_added",function(data){
     
     
            var newVoke = data.val();
            console.log(newVoke);
            var time=newVoke.time;
            if(!time)
            time= new Date();
            
            if(newVoke.item_to_be_sold)
             {
             var html = "";
             html +=`
              <div id="${encodeURI(data.key)+'wrap'}" style="background-color:aliceblue;padding: ;margin:4px;" class="col-lg-4  col-md-6 d-flex align-items-stretch" data-aos="fade-up">
              <article class="entry">

              <div class="entry-img" style="width:40%;height:55%;">
              <center><img src="${newVoke.url}" id="${newVoke.title}" alt="" class="img-fluid"></center>
              </div>
                <h3 style="font-size:3em;" class="entry-title">
                  ${newVoke.item_to_be_sold}
                </h3>
                <h4 class="entry-title">
                   <span style="font-weight:500">Price:<span> Rs ${newVoke.price}
                </h4>    
                <div class="entry-meta">
                  <ul>
                    <li class="d-flex align-items-center"><i class="icofont-user"></i><b style="font-size:0.8em">Seller&nbsp;</b> ${newVoke.name}</li>
                    <li class="d-flex align-items-center"><i class="icofont-wall-clock"></i><time>${newVoke.time}</time></a></li>
                  </ul>
                </div>  
                <div class="entry-content">
                   <p style="font-weight:600;">
                    ${newVoke.description}
                  </p>
                  <center></center>
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
