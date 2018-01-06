$( document ).ready(function() {
   $("#login").fadeIn(100);
});


//==============================================================================
// Toggle between login and register modals
//==============================================================================

$('#login-form-link').click(function(e) {
              $("#login").delay(100).fadeIn(100);
              $("#register").fadeOut(100);
              $('#register-form-link').removeClass('active');
              $(this).addClass('active');
              e.preventDefault();
});

$('#register-form-link').click(function(e) {
              $("#register").delay(100).fadeIn(100);
              $("#login").fadeOut(100);
              //$('#login-form-link').removeClass('active');
              //$("#register").addClass('active');
              //$(this).addClass('active');
              e.preventDefault();
});


//==============================================================================
// ("#login-submit")
//==============================================================================
$("#login-submit").click(function(e){

          e.preventDefault();
          var username = $("#username").val().trim();
          username = username.toLowerCase();
          var password = $("#password").val().trim();

          // Send an AJAX POST-request with jQuery
          $.get("/api/" + username).done(function(data) {
            
              if (data.length)
              {
                if (data[0].password === password)
                {
                  localStorage.setItem("name", data[0].name);
                  localStorage.setItem("username", username);

                  $.get("/tasks", function(data) {
                    document.open('text/html');
                    document.write(data);
                    document.close();
                  });
                }
                else
                {
                  alert("Incorrect Username or Password");
                }
                $("#username").val("");
                $("#password").val("");
              }
              else
              {
                alert("Incorrect Username or Password");
                $("#username").val("");
                $("#password").val("");
              }
          });
});


//==============================================================================
// ("#register-submit")
//==============================================================================
$("#register-submit").click(function(e){

          e.preventDefault();

          var name = $("#name").val().trim();
          var username = $("#email").val().trim();
          username = username.toLowerCase();
          var password1 = $("#password1").val().trim();
          var password2 = $("#password2").val().trim();
          var group = $("#group").val().trim();

          // Send an AJAX POST-request with jQuery
          $.get("/api/" + username).done(function(data) {
              if (data.length === 0)
              {
                if (password1 === password2)
                {
                  var newUser = {
                                  username: username,
                                  password: password1,
                                  name: name,
                                  group: group,
                                  picture: "https://pbs.twimg.com/profile_images/746779035720683521/AyHWtpGY_400x400.jpg"
                                };


                    // Send an AJAX POST-request with jQuery
                    $.post("/api/user", newUser).done(function(data) {
                      // Log the data we found
                      //console.log(data);
                      $("#username").val(username);
                   });
                }
                else
                {
                   alert("Passwords are not the same");
                }
              }
              else
              {
                alert("Username already exists");
              }
         });

         $("#name").val("");
         $("#email").val("");
         $("#password1").val("");
         $("#password2").val("");
         $("#login-form-link").trigger("click");

});