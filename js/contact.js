document.querySelector('#sbt-btn').onclick = function(){
    var name = document.querySelector('#name').value;
    var address = document.querySelector('#address').value;
    var subject = document.querySelector('#subject').value;
    var usermsg = document.querySelector('#usermsg').value;

      if(usermsg!=null && usermsg!="" && usermsg!=" " && name!=null && subject!=null && address!=null){
      
      
vali();

          function vali(){
            var user = firebase.auth().currentUser;
       var tgref=firebase.database().ref('contact/');
  var data={
      "name":name,
      "address":address,
      "email":user.email,
      "subject":subject,
      "usermsg":usermsg
       }
   tgref.push(data).then(function(){
      document.getElementById("msg").style.display="block";
      document.querySelector('#name').value=null; 
      document.querySelector('#address').value=null;
      document.querySelector('#subject').value=null;
      document.querySelector('#usermsg').value=null;
  });

   }
      }
}