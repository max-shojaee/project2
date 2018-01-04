//==============================================================================
// Toggle between login and register modals
//==============================================================================

      $(function() {
          $('#login-form-link').click(function(e) {
          $("#login").delay(100).fadeIn(100);
          $("#register").fadeOut(100);
          $('#register-form-link').removeClass('active');
          e.preventDefault();
        });

        $('#register-form-link').click(function(e) {
          $("#register").delay(100).fadeIn(100);
          $("#login").fadeOut(100);
          $('#login-form-link').removeClass('active');
          $("#register").addClass('active');
          //$(this).addClass('active');
          e.preventDefault();
        });

//==============================================================================
// ("#login-submit")
//==============================================================================

        $("#login-submit").click(function(){
          var username = $("#username").val().trim();
          var password = $("#password").val().trim();

          // Send an AJAX POST-request with jQuery
          $.get("/api/" + username, function(data) {
              // Log the data we found
              console.log(data);
          });

          $.get("/tasks", function(data) {
            document.open('text/html');
            document.write(data);
            document.close();
            });

        });


//==============================================================================
// ("#register-submit")
//==============================================================================

        $("#register-submit").click(function(){
          var username = $("#username").val().trim();
          var name = $("#name").val().trim();
          var email = $("#email").val().trim();
          var password1 = $("#password").val().trim();
          var password2 = $("#confirm-password").val().trim();
          var group = $("#group").val().trim();
          var password = $("#password").val().trim();
          alert(name);
        });
    });