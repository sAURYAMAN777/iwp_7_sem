var user = firebase.auth().currentUser;

   console.log(user);
   var hjcordiref= firebase.database().ref("orders/"+`${localStorage.getItem("uids")}`);
    hjcordiref.orderByChild('title').on("child_added", function(data){
         var newVoke = data.val();
        console.log(data.val());
        if(newVoke.title){
        var uri=`https://sauryaman777.github.io/e-waste-management/studass.html?uid=${localStorage.getItem("uids")}&title=${newVoke.title}`;
        var res=encodeURI(uri);
        var time=newVoke.time;
        if(!time)
        time= new Date();
        
        var html = "";
         html +=`<div class="col-8 overlay">
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
                <button type="button" id="${data.key}" class="btn btn-danger"onclick="cancellation(this);">Cancel</button>
            </div>
          </div>
         
<br>
     </div>
    <div class="col-4">
    </div>
 
`

          document.getElementById("classe").innerHTML += html;
    
        }
    });
    function expand(self){
      console.log("hey");
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
    function cancellation(self) {
      var Id = self.getAttribute("id");
      // var c=document.getElementById(data.key+"fd").childNodes;
      var db= firebase.database().ref("orders/"+`${localStorage.getItem("uids")}`+"/"+Id).on("child_added",function(data){
        var newVoke=data.val().status;
        console.log(newVoke);
        if(newVoke=="active")
        {
          var pr=confirm("Are you sure you want to cancel?");
      if(pr)
      {  
        db= firebase.database().ref("orders/"+`${localStorage.getItem("uids")}`+"/"+Id+"/"+"status").set("cancelled");
        alert("Your order has been cancelled.\nAny payment made regarding this order will be refunded within 24 hours");  
      }
        }
        else
        alert("this order is no longer active");
      });
      
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