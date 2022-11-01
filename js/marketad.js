var flag=0;
var i="";
var user= firebase.auth().currentUser;
console.log(user);
var hjcordiref= firebase.database().ref("orders/");

var userrole= firebase.database().ref("userdata/");
   userrole.orderByChild("email").equalTo(`${localStorage.getItem('emails')}`).on("child_added", function(data){
           
    var newVoke1=data.val();
    if(newVoke1.role=="admin")
    flag=1;
       
   });
   if(flag==1)
    {
      document.getElementsByClassName("home")[0].href="admin.html";
      document.getElementsByClassName("home")[1].href="admin.html";
      document.getElementsByClassName("home")[2].href="admin.html";
      // document.getElementById("add-item").style.display="block";
    } 
    else
    {
      document.getElementsByClassName("home")[0].href="customer.html";
      document.getElementsByClassName("home")[1].href="customer.html";
      document.getElementsByClassName("home")[2].href="customer.html";
    }


 hjcordiref.on("child_added", function(data){
   console.log(data.key);
   i=data.key;
      var pathe= firebase.database().ref("orders/"+data.key)
      pathe.on("child_added",function(data){


       var newVoke = data.val();
       var time=newVoke.time;
       if(!time)
       time= new Date();
       
       if(newVoke.item_to_be_sold)
        {
        var html = "";
        html +=`
         <div id="${encodeURI(data.key)+'wrap'}" class="col-lg-4  col-md-6 d-flex align-items-stretch" data-aos="fade-up">
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
             <div data-uid-id="${i}" data-key-id="${data.key}"  class="read-more" onclick="buy_item(this)">
             <span id="" style="padding: 6px;background-color:#FF4500;cursor:pointer;">
               Buy Now
             </span>
             </div>
             <center><button type="button" data-id="${i}" id="${data.key}" class="btn btn-danger"onclick="cancellation(this);">Delete</button></center>
           </div>

         </article><!-- End blog entry -->
       </div>
`

          document.getElementById("classe").innerHTML += html;
        }
       
      });
      
  });
 
 function cancellation(self) {
   var Id = self.getAttribute("id");
   var did= self.getAttribute("data-id");
 
   var pr=confirm("Are you sure you want to delete?");
   if(pr)
   {
    // delete message
    var db= firebase.database().ref("orders/"+did).child(Id).remove();
    window.location.href="marketadmin.html";
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
// var us=document.getElementById("user");

// document.getElementById("join").addEventListener("click",joinf);
// function joinf(){
 
//   window.open('marketplace.html','_self');

// }

document.getElementById("log").addEventListener("click",logo);
function logo(){
 
  firebase.auth().signOut();

}


firebase.auth().onAuthStateChanged(function(user) {


if(!user){

    window.open('index1.html','_self');
} 

 
});
