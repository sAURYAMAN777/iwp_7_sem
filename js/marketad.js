var flag=0;
var i="";
var user= firebase.auth().currentUser;
console.log(user);
var hjcordiref= firebase.database().ref("marketplace/");


 hjcordiref.on("child_added", function(data){
   console.log(data.key);
   i=data.key;
      var pathe= firebase.database().ref("marketplace/"+data.key)
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

         <div class="entry-img" style="width:40%;height:55%;">
         <center><img src="${newVoke.url}" id="${newVoke.title}" alt="" class="img-fluid"></center>
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
             <div data-uid-id="${i}" data-key-id="${data.key}"  data-price-id="${newVoke.price}"  class="read-more" onclick="buy_item(this)">
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
    var db= firebase.database().ref("marketplace/"+did).child(Id).remove();
    window.location.href="marketadmin.html";
   }
 }

 function buy_item(self){
  var dtitle = self.getAttribute("data-key-id");
  var uid= self.getAttribute("data-uid-id");
  var money = self.getAttribute("data-price-id");
  firebase.database().ref("marketplace/"+`${uid}`).on("child_added", function(data){
    if(data.val().title == dtitle) {
      var newVoke = data.val();
      var data_set = {
      "name":newVoke.name,
      "email":newVoke.email,
      "title":newVoke.title,
      "address":newVoke.address,
      "quantity":newVoke.quantity,
      "phone":newVoke.phone,
      "remark":newVoke.remark,
      "time":newVoke.time,
      "item_to_be_sold":newVoke.item_to_be_sold,
      "description":newVoke.description,
      "how_old_is_item":newVoke.how_old_is_item,
      "defects":newVoke.defects,
      "price":newVoke.price,
      "status":"",
      "url":newVoke.url
    };
    var newref=firebase.database().ref("orders/"+`${localStorage.uids}/${data_set['title']}`);
    data_set['status']="active";
    newref.set(data_set); 
    }
  });
  sessionStorage.setItem('money',money);
  
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
