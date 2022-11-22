firebase.initializeApp(config);
  var i=0;
 
   var user= firebase.auth().currentUser;
   var hjcordiref1= firebase.database().ref("orders/"+`${localStorage.uids}`);
    hjcordiref1.on("child_added", function(data){
      console.log(data.key);
   
          var newVoke = data.val();
          var time=newVoke.time;
          if(!time)
          time= new Date();
          // var url="images/e-waste-management.jpg";
          if(newVoke.item_to_be_sold){
           var html = "";
           html +=`
            <div id="${encodeURI(data.key)+'wrap'}" class="col-lg-4  col-md-6 d-flex align-items-stretch" data-aos="fade-up" style="border: 2px solid black; border-radius: 6px; padding 8px;margin: 12px;">
            <article class="entry">
   
            <div class="entry-img" style="width:40%;height:55%;">
            <center><img src="${newVoke.url}" id="${newVoke.title}" alt="" class="img-fluid"></center>
            </div>
   
              <h1 style="font-size:3em;" class="entry-title">
                ${newVoke.item_to_be_sold}
              </h1>
              <h4 class="entry-title">
                 <span style="font-weight:500">Price:<span> Rs ${newVoke.price}
              </h4>
   
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
       var db= firebase.database().ref("orders/"+localStorage.uids).child(Id).remove();
       window.location.href="vieworders.html";
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