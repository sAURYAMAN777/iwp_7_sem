var uploader = document.getElementById('uploader');
                var fileButton =         document.getElementById('imagee');
                fileButton.addEventListener('change', function(e){
                    var file = e.target.files[0];
                    var storageRef = firebase.storage().ref("images/"+`${localStorage.uids}`+'/'+`${document.querySelector('#title').value}`);
                    var task = storageRef.put(file);
                    task.on('state_changed', function progress(snapshot) {
                        var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                        uploader.value = percentage;
                    }, function error(err) {
                        },function complete() {
                            task.snapshot.ref.getDownloadURL().then(function(url){
                                document.getElementById("img-url").innerHTML = url;
                            });
                    }); 
                 });

document.querySelector("#createroom").onclick = function(){
    var d= new Date();
    var format=d.getDate()+" / "+(d.getMonth()+1)+" / "+d.getFullYear()+" "+(d.getHours())+" : "+(d.getMinutes()+1)+" : "+(d.getSeconds()+1)+" GMT +0530 (Indian Standard Time)";
let name1,title,address,quantity="",phone,remark="",status="active",item_sell="",description="",age="",defects="",price, url;    
vali();
            function vali(){
                
                       
                name1 = document.querySelector('#name').value;
                title = document.querySelector('#title').value;
                address = document.querySelector('#add').value;
                quantity = document.querySelector('#quantity').value;
                phone = document.querySelector('#phone').value;
                remark = document.querySelector('#remarks').value;
                item_sell= document.querySelector('#desci').value;
                description=document.querySelector('#describee').value;
                age=document.querySelector('#agee').value;
                defects=document.querySelector('#defectss').value;
                price=document.querySelector('#pricee').value;
                url=document.getElementById("img-url").innerHTML;
                if(name1!=null && title!=null && quantity!=null && address!=null && phone!=null){
                var user = firebase.auth().currentUser;
         var tgref=firebase.database().ref("marketplace/"+`${user.uid}/${document.getElementById("title").value}`);
    var data={
        "name":name1,
        "email":localStorage.emails,
        "title":title,
        "address":address,
        "quantity":quantity,
        "phone":phone,
        "remark":remark,
        "time":format,
        "item_to_be_sold":item_sell,
        "description":description,
        "how_old_is_item":age,
        "defects":defects,
        "price":price,
        "status":status,
        "url":url
        }
     tgref.set(data).then(function(){

        var cliref1 = firebase.database().ref('userdata/');
        window.location.href="customer.html#order";
             
    });
  
     }
    }
}
function check(){
    var ref = firebase.database().ref("orders/"+`${localStorage.uids}`);
    var hasName=0;
ref.on("child_added",function(data) {
    console.log(data.val());
    if(data)
    hasName=1;
  });
  console.log(hasName);
  return hasName;
}
firebase.auth().onAuthStateChanged(function(user) {
 
 
   if(!user){

       window.location.href="index.html";
   } 
    else{
         var user = firebase.auth().currentUser;
       console.log(user.email);
       localStorage.setItem("vemkey",user.email);
    }
    
});