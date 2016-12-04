$("#registerBtn").click(function(e) {
  e.preventDefault();
  var email = $("#email").val();
  var password = $("#password").val();
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("error"+errorMessage);
  });
});

$("#loginBtn").click(function(e) {
  e.preventDefault();
  var email = $("#email-login").val();
  var password = $("#password-login").val();
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("error"+errorMessage);
  });
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("logged in: "+user);
    $("#login-register-form").hide();
    $("#admin-container").fadeIn();
  } else {
    console.log("not logged in");
    $("#admin-container").hide();
    $("#login-register-form").fadeIn();
  }
});

$("#addDiscountBtn").click(function(e) {
  e.preventDefault();
  $.post('http://localhost/api.php', $('form#addForm').serialize(), function(result) {
    if(result=="success"){
      location.reload();
    }else{
      alert(result);
    }
  },'text');
});

updateDiscounts();


function updateDiscounts() {
  $.get("http://localhost/api.php?action=get-discounts", function(data) {
  var data = JSON.parse(data);
  data.forEach(function(element) {
    str = "<div><b>"+element.title+", "+element.amount+", "+element.location+", "+element.image+"</div></b><br>";
    $("#discounts-container").append(str);
  });
  //$("#discounts-container").html(data);
});
}



// firebase.auth().signOut().then(function() {
//   // Sign-out successful.
// }, function(error) {
//   // An error happened.
// });
