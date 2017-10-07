
// JQuery that keeps the teamate form up to date

let counter = 0;

function deleteRow(row) {
  $(row).remove();
  
}
function addRow() {
  $(".tableBody").append('<tr id="row' + counter + '"><td><div class="field"><input id="teamEmail' + counter +'" type="text" name="teamEmail' + counter +'"placeholder="Add Email"></div></td>'+
    '<td><div class="field"><input id="teamRole' + counter +'" type="text" name="teamRole' + counter + '" placeholder="Add Project Role"></div></td>' + 
    '<td><div class="field"><select id="teamPerm'+counter+'" class="ui dropdown" name="teamPerm'+ counter +'"><option value="">Set Permissions</option><option value="none">None</option><option value="edit">Can Edit</option><option value="admin">Can Admin</option></select></div></td>'+
    '<td class="right aligned"><button class="ui red button" type="button" onclick="deleteRow(row'+ counter +')"><i class="trash icon"></i> Delete</button></td></tr>');
  $('.dropdown').dropdown();
  counter++;
}

function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// Intercept the form submission and parses the table

function parseTable(errs) {
  let teammates = [];
  let error = false;
  for (let i = 0; i < counter; i++) {
    if ($('#row' + i).is("tr") /*basically an existence check*/) {
      let Email = $('[name="teamEmail' + i + '"]').val();
      let Role = $('[name="teamRole' + i + '"]').val();
      let Perm = $('[name="teamPerm' + i + '"]').val();
      //data validation
      if (Email === "") {
        $('#teamEmail' + i).parent().addClass('error');
        errs.push('Please finish adding an email for your teammate');
        error = true;
      } else {
        $('#teamEmail' + i).parent().removeClass('error');
        if (!validateEmail(Email)) {
          $('#teamEmail' + i).parent().addClass('error');
          errs.push('Please add a valid email to your teammate');
          error = true;
        } else {
          $('#teamEmail' + i).parent().removeClass('error');
        }
      }

      if (Role === "") {
        $('#teamRole' + i).parent().addClass('error');
        errs.push('Please finish adding a role for your teammate');
        error = true;
      } else {
        $('#teamRole' + i).parent().removeClass('error');
      }
      
      if (Perm === "") {
        $('#teamPerm' + i).parent().addClass('error');
        errs.push('Please finish adding a permission level for your teammate');
        error = true;
      } else {
        $('#teamPerm' + i).parent().removeClass('error');
      }
      // add to teamates array
      teammates.push({ email: Email, role: Role, perm: Perm });
    }
  }
  if (error) {
    $("#new_project").form('add errors', errs);
    return false;
  } else {
    return teammates;
  }
}
$(document).ready(function() {
  $('.dropdown').dropdown();

  let $form = $("#new_project");
  $form.submit(function (e) {
    e.preventDefault();
  });
  $form.form({
    fields: {
      title: {
        identifier: 'title',
        rules: [{ type: 'empty', prompt: "Please add a title" }]
      },
      short: {
        identifier: 'short',
        rules: [{ type: 'empty', prompt: "Please write a short synopsis of your project" },
        { type: 'maxLength[250]', prompt: "Synopsis Exceeds the maximum length of {ruleValue} characters" }]
      },
      description: {
        identifier: "description",
        rules: [{ type: "empty", prompt: "Please write a longer description" }]
      },
      type: {
        identifier: 'type',
        rules: [
          {
            type: 'empty',
            prompt: 'Please select a project type'
          }
        ]
      },
      teamEmail: {
        identifier: "teamEmail",
        rules: [{
          type: 'email',
          prompt: 'please enter the full email of the teammates you intend to add permissions to'
        }]
      },
      teamRole: {
        identifier: "teamRole",
        rules: [{ type: "empty", prompt: "Please give your teammate a role" }]
      },
      teamPerm: {
        identifier: "teamPerm",
        rules: [{ type: "empty", prompt: "Please select a permission level for your teammate" }]
      }
    },
    onSuccess: function (e, fields) {
      fields.team = parseTable([]);
      if (fields.team) {
        //submit the form now that it has been properly sanitized using AJAX
        $.ajax({
          url: "/project/new",
          method:"POST",
          data: fields
        });
      }
    },
    onFailure: function (formErrors, fields) {
      parseTable(formErrors);
    }
  });
});

