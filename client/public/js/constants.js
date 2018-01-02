// This is a file that should contain all the shared bits of code between Front end pages.
console.log("Loaded Website Constants");

// Store the color defaults
let ProjX_Color = "#6EBE45";
let Hack_Color = "#FF585D";
let Think_Color = "#FEF304";
let Make_Color = "#EDC459";
let Any_Color = "#0047AB";
// Change Colors depending on the page config.
function changeColor(text) {
  if (text == "projx") {
    $(".gallexy").css("color", ProjX_Color);
  } else if (text == "hack") {
    $(".gallexy").css("color", Hack_Color);
  } else if (text == "think") {
    $(".gallexy").css("color", Think_Color);
  } else if (text == "make") {
    $(".gallexy").css("color", Make_Color);
  } else if (text == "any") {
    $(".gallexy").css("color", Any_Color);
  }
}
 
/*  This function takes an object that is represented by a JSON, and creates a dynamic html table element.
*   Here are the following JSON things the dynamic table expects as arguments to the constructor:
{
  colHeads: [String],     // String array of html that will fill the headers of each column
  cols: Int,              // Integer specifying # of columns.
  rowGenerator: Function  // Function(id, counter) that generates an HTML String from the object id and counter
  id:   String,           // identifier of the table in the DOM
  inverted: Bool          // determines style: light or dark
}
*/
function createDynamicTable(ObjRep) {
  this.colHeads = ObjRep.colHeads;
  this.cols = ObjRep.cols;
  this.rowGenerator = ObjRep.rowGenerator;
  var id = ObjRep.id;

  var count = 0;
  var Table = $('#'+id);
  //Setup table on creation

  setup();

  //Methods
  this.deleteRow = function(row) {
    $(row).remove();
  }
  this.addRow = function() {
    Table.find('.tableBody').append(template(count));
    count++;
  }

  function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function template(counter) {
    //This function needs to construct a row based on the object data
    templateLiteral = `<tr id="${id}${counter}">`;
    for (var i = 0; i < this.cols.length; i++) {
      templateLiteral += `
      <td>` + this.rowGenerator(this.id, counter) + `</td>`;
    }

    templateLiteral += `<td class="right aligned"><button class="ui red button" type="button" onclick="deleteRow('#${id}${counter}')"><i class="trash icon"></i> Delete</button></td></tr >`;

    return templateLiteral
  }

  function setup() {
    //Set the table element to the appropriate innerHTML
    var header = "<table class='ui striped inverted table'><thead><tr>"
    for (var i = 0; i < this.colHeads.length; i++) {
      header += ("<th>" + this.colHeads[i] + "</th>");
    }

    header += "</tr></thead><tbody class='tableBody'></tbody><tfoot><td colspan='4'><button class='ui primary button' type='button' onclick='" + this +".addRow()'><i class='plus icon'></i> Add new teammate</button></td></tfoot></table>";
    Table.html(header);
  }

}

//old mehtods


// JQuery that keeps the teamate form up to date





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
$(document).ready(function () {
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
          method: "POST",
          data: fields
        });
      }
    },
    onFailure: function (formErrors, fields) {
      parseTable(formErrors);
    }
  });
});


//
