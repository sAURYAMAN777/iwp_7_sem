var flag=0;
var i="";
var user= firebase.auth().currentUser;
console.log(user);
var hjcordiref= firebase.database().ref("marketplace/");

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
        <div style="background-color:transparent" class="col-lg-4  col-md-6 d-flex align-items-stretch" data-aos="fade-up">
         <div id="${encodeURI(data.key)+'wrap'}">
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
               <li class="d-flex align-items-center"><i class="icofont-user"></i><b>${newVoke.name}</b></li>
               <li class="d-flex align-items-center"><i class="icofont-wall-clock"></i><time>${newVoke.time}</time></a></li>
             </ul>
           </div>

           <div class="entry-content">
              <p style="font-weight:600;min-height:50px;">
               ${newVoke.description}
             </p>
             <p>
              <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#${data.key+'card'}" aria-expanded="false" aria-controls="${data.key+'card'}">
                See full description
              </button>
            </p>

            <div style="min-height: 0px;margin: 12px;">
              <div class="collapse collapse-horizontal" id="${data.key+'card'}">
                <div class="card card-body" style="width: 300px;">
                  <p><b>Description:&nbsp;</b> ${newVoke.description}</p>
                  <p><b>How old is item:&nbsp;</b> ${newVoke.how_old_is_item}</p>
                  <p><b>Any Damages:&nbsp;</b> ${newVoke.defects}</p>
                  <p><b>Seller's contact:&nbsp;</b> ${newVoke.phone}</p>
                  <p><b>Remarks:&nbsp;</b> ${newVoke.remark}</p>
                </div>
              </div>
            </div>

             <div data-uid-id="${i}" data-key-id="${data.key}"  class="read-more" onclick="buy_item(this)" style="margin: 8px;padding 8px;">
             <span id="" style="padding: 6px;background-color:#FF4500;cursor:pointer;">
               Buy Now
             </span>
             </div>
             <center><button style="display:none;" type="button" data-id="${i}" id="${data.key}" class="btn btn-danger"onclick="cancellation(this);">Delete</button></center>
           </div>

         </article><!-- End blog entry -->
       </div>
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
   }
 }
 function buy_item(self){
  var dtitle = self.getAttribute("data-key-id");
  var uid= self.getAttribute("data-uid-id");
  var tgref=firebase.database().ref("marketplace/"+localStorage.uids+"/"+dtitle);
 var newref=firebase.database().ref("orders/"+uid);

 newref.orderByChild("title").equalTo(dtitle).on("child_added", function(data){
  data.val().status="active";         
  newref.set(data.val());
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
