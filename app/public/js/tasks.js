//====================================================================================
//$( document ).ready()
//====================================================================================
$( document ).ready(function() {
  getAllTasks();
});

//====================================================================================
// getAllTasks()
//====================================================================================
function getAllTasks() {

   $.get("/api/all").done(function(data) {

/*
    $("#tasks").find('tbody').append($("<thead>").append($("<tr>"))
                             .append($("<th>Owner").attr("class", "avatar"))
                             .append($("<th>Name").attr("onclick","sortTable(1)"))
                             .append($("<th>Group").attr("onclick","sortTable(2)"))
                             .append($("<th>Email").attr("onclick","sortTable(3)"))
                             .append($("<th>Task"))
                             .append($("<th><em>"))
                             );
*/
        for (var i=0; i< data.length; i++)
        {
          var icon_type;
          var state_type;
            
          if (data[i].state === "new")
          {
            state_type = '<tr class="new"></tr>';
            icon_type = '<td align="center"><a href="#atask" class="btn btn-primary" id="edit" title="edit"  data-toggle="modal"><i class="fa fa-pencil fa-2x"></i></a> <a href="#" class="btn btn-warning" title="new"   ><i class="fa fa-list-alt fa-2x"   ></i></a> <a href="#" class="btn btn-danger" id="delete" title="delete"><i class="fa fa-trash fa-2x" ></i></a></td>'
          }
          else if (data[i].state === "progress")
          {
            state_type = '<tr class="progress"></tr>';
            icon_type = '<td align="center"><a href="#atask" class="btn btn-primary" id="edit" title="edit"  data-toggle="modal"><i class="fa fa-pencil fa-2x"></i></a> <a href="#" class="btn btn-info" title="progress"   ><i class="fa fa-spinner fa-pulse fa-2x fa-fw"   ></i></a> <a href="#" class="btn btn-danger" id="delete" title="delete"><i class="fa fa-trash fa-2x" ></i></a></td>'
          }
          else
          {
            state_type = '<tr class="done"></tr>';
            icon_type = '<td align="center"><a href="#atask" class="btn btn-primary" id="edit" title="edit"  data-toggle="modal"><i class="fa fa-pencil fa-2x"></i></a> <a href="#" class="btn btn-success" title="done"   ><i class="fa fa-check-square fa-2x"   ></i></a> <a href="#" class="btn btn-danger" id="delete" title="delete"><i class="fa fa-trash fa-2x" ></i></a></td>'
          }    

          var picture = getPicture(data[i].name.toLowerCase());

          $("#tasks").find('tbody').append($(state_type).attr("value", data[i].id)
            .append($('<td>').attr("class", "avatar").append($('<img>').attr('src', picture)))
            //.append($('<td class="avatar">').append($('<img>').attr('src', picture)))
            .append($('<td>').text(data[i].name))
            .append($('<td>').text(data[i].group))
            .append($('<td>').text(data[i].username))
            .append($('<td>').text(data[i].task))
            .append($(icon_type))
          );
        }
    });

}

//========================================================================
// getPicture() temp function
//========================================================================
function getPicture(name)
{
  var picture="";

  switch(name)
  {
    case "paul":
      picture = "../assets/images/paul.jpg"
      break;
    case "jesus":
      picture = "../assets/images/jesus.jpg"
      break;
    case "majid":
      picture = "../assets/images/majid.jpg"
      break;
    case "aram":
      picture = "../assets/images/aram.jpg"
      break;
    default:
      picture = "../assets/images/icon.jpg"
      break;
  }
  return picture;
}


//========================================================================
// Filter rows based on the icon selected by the user
//========================================================================
function filter(state)
{
          var x   = document.getElementsByClassName(state);
          var btn = document.getElementById(state);

          if (btn.className === "btn")
          {
            btn.className = btn.dataset.class;
            for (i = 0; i < x.length; i++) 
            {
                x[i].className = " animated fadeInLeft "+ state;
            }
          }
          else
          { 
              for (i = 0; i < x.length; i++) 
              {
                  x[i].className = " animated fadeOutRight "+ state;
              }
              btn.className = "btn";
          }
}


//===========================================================================
// Add new task
//===========================================================================
$(document).on('click', '#addnew', function(e){

    e.preventDefault();

    var assigner = localStorage.getItem("name");
    var assigner_email = localStorage.getItem("username");

    $("#assigner").val(assigner);
    $("#assigner_email").val(assigner_email);

    $.get("/api/allusers").done(function(data) {

        for (var i=0; i< data.length; i++)
        {
            $("#task_username").append($('<option>').text(data[i].username));
        }
      });
});


//========================================================================
// Save new task
//========================================================================
$(document).on('click', '#save', function(e){

      e.preventDefault();

      var username = $("#task_username").val().trim();
      username = username.toLowerCase();
      var name = $("#task_name").val().trim();
      var group = "Group 1";
      var task = $("#task_content").val().trim();

      var assigner = $("#assigner").val().trim();
      var assigner_email = $("#assigner_email").val().trim();
      var notes = " ";
              
      var newTask = {
        username: username,
        name: name,
        group: group,
        task: task,
        state: "new",
        assigner: assigner,
        assigner_email: assigner_email,
        notes: notes
      };

      // Send an AJAX POST-request with jQuery
      $.post("/api/task", newTask).done(function(data) {
        
          var task = data.task.substring(0,42);
          if (task.length === 42)
            task += "...";

          var state_type = '<tr class="new"></tr>';
          var icon_type = '<td align="center"><a href="#atask" class="btn btn-primary" id="edit" title="edit"  data-toggle="modal"><i class="fa fa-pencil fa-2x"></i></a> <a href="#" class="btn btn-warning" title="new"   ><i class="fa fa-list-alt fa-2x"   ></i></a> <a href="#" class="btn btn-danger" id="delete" title="delete"><i class="fa fa-trash fa-2x" ></i></a></td>'
          

          //$("state_type").attr("value", data.id);
          //console.log(state_type.attr("value"));

          var picture = getPicture(data.name.toLowerCase());

          $("#tasks").find('tbody').append($(state_type).attr("value", data.id)
            .append($('<td>').attr("class", "avatar").append($('<img>').attr('src', picture)))
            //.attr("class", "avatar")
            //.append($('<img>').attr('src', "https://pbs.twimg.com/profile_images/746779035720683521/AyHWtpGY_400x400.jpg")))
            .append($('<td>').text(data.name))
            .append($('<td>').text(data.group))
            .append($('<td>').text(data.username))
            .append($('<td>').text(data.task))
            .append($(icon_type))
          );

          $("#task_username").val("");
          $("#task_name").val("");
          $("#task_content").val("");
          $("#assigner").val("");
          $("#assigner_email").val("");
          $("#task_username option").remove(); 
      });
});


//===========================================================================
// Edit task
//===========================================================================
$(document).on('click', '#edit', function(e){

    e.preventDefault();

    var i = $(this).parents('tr').index();
    console.log(i);
    var id = $(this).parents('tr').attr("value");
    console.log(id);

    var assigner = localStorage.getItem("name");
    var assigner_email = localStorage.getItem("username");
    localStorage.setItem("taskid", id);
    

    $.get("/api/tasks/" + id).done(function(data) {

        if (data.length) 
        {
          $("#tu_assigner").val("Name: " + assigner + "   Email: "+ assigner_email);
          $("#tu_task_name").val(data[0].name);
          $("#tu_task_username").val(data[0].username);
          $("#tu_state").val(data[0].state);
          $("#tu_task_content").val(data[0].task);
          $("#tu_notes").val(data[0].notes);
        }
    });
});

//========================================================================
// Update Task
//========================================================================
$(document).on('click', '#tu_save', function(e){

      e.preventDefault();

      var username = $("#tu_task_username").val().trim();
      username = username.toLowerCase();
      var name = $("#tu_task_name").val().trim();
      var group = "Group 1";
      var state = $("#tu_state").val().trim();
      var task = $("#tu_task_content").val().trim();
      var notes = $("#tu_notes").val().trim();

      id = localStorage.getItem("taskid");

      var updatedTask = {
                id: id,
                task: task,
                state: state,
                notes: notes
      };

      // Send an AJAX POST-request with jQuery
      $.post("/api/update/", updatedTask).done(function(data) {   

        var i = $('#tasks tr').length;

        while(i>1)   
        {
          document.getElementById("tasks").deleteRow(i-1);
          i--;
          //$("#tasks tr#"+i).remove(); 
        }  
        //$("#tasks tr").remove(); 
        getAllTasks();
      });
});


//===========================================================================
// Delete task
//===========================================================================
$(document).on('click', '#delete', function(e){

    e.preventDefault();

    var id = $(this).parents('tr').attr("value");
    console.log(id);
                  
    $.post("/api/delete/" +id).done(function(data) {
    });

    $(this).parents('tr').remove();
                      
});


//========================================================================
// Function to sort the columns of the table
//========================================================================
function sortTable(n) {
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("tasks");
      switching = true;
      // Set the sorting direction to ascending:
      dir = "asc"; 
      /* Make a loop that will continue until
      no switching has been done: */
      while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
          // Start by saying there should be no switching:
          shouldSwitch = false;
          /* Get the two elements you want to compare,
          one from current row and one from the next: */
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          /* Check if the two rows should switch place,
          based on the direction, asc or desc: */
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch= true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch= true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /* If a switch has been marked, make the switch
          and mark that a switch has been done: */
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          // Each time a switch is done, increase this count by 1:
          switchcount ++; 
        } else {
          /* If no switching has been done AND the direction is "asc",
          set the direction to "desc" and run the while loop again. */
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
}


//===========================================================================
// unused code 
//===========================================================================
/*
$("#delete").click(function(){
              console.log("delete");
              $(this).parents('tr').remove();
});

$(document).on('click', '#save', function(){
        console.log("save pressed");
});

$("#save").click(function(){
      alert("save");
}

$("#cancel").click(function(){
      alert("cancel");
}

$("#addnew").click(function(){

});
*/
