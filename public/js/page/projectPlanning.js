// JQuery that keeps the teamate form up to date

//function that creates row from budget template:
function budgetTemplate(counter) {
  return `<tr id="brow${counter}">
  <td>
    <div class="field">
      <input id="budgetItem${counter}" type="text" name="budgetItem${counter}" placeholder="add Item">
    </div>
  </td>
  <td>
    <div class="field">
      <input id="budgetNotes${counter}" type="text" name="budgetNotes${counter}" placeholder="add Notes">
    </div>
  </td>
  <td>
    <div class="field">
      <input id="budgetCost${counter}" type="number" name="budgetCost${counter}" placeholder="add Price">
    </div>
  </td>
  <td class="right aligned">
    <button class="ui red button" type="button" onclick="deleteRow(brow${counter})"><i class="trash icon"></i> Delete</button>
  </td>
</tr>`;
}
//function that creates progress code

function progressTemplate(counter) {
  return `<tr id="prow${counter}">
  <td>
    <div class="field">
      <input id="progressGoal${counter}" type="text" name="progressGoal${counter}" placeholder="add Goal">
    </div>
  </td>
  <td>
    <div class="field">
      <input id="progressNotes${counter}" type="text" name="progressNotes${counter}" placeholder="add Notes">
    </div>
  </td>
  <td>
    <div class="field">
      <input id="progressDate${counter}" type="date" name="progressDate${counter}" placeholder="add Date">
    </div>
  </td>
  <td class="right aligned">
    <button class="ui red button" type="button" onclick="deleteRow(prow${counter})"><i class="trash icon"></i> Delete</button>
  </td>
</tr>`;
}


//function that 


let counterB = 0;
let counterP = 0;
function deleteRow(row) {
  $(row).remove();
}
function addRowB() {
  $(".budgetBody").append(budgetTemplate(counterB));
  $('.dropdown').dropdown();
  counterB++;
}
function addRowP() {
  $(".progressBody").append(progressTemplate(counterP));
  $('.dropdown').dropdown();
  counterP++;
}

function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// Intercept the form submission and parses the table
function parseProgress(errs) {

  let progress = [];
  let error = false;
  for (let i = 0; i < counterP; i++) {
    if ($('#prow' + i).is("tr") /*basically an existence check*/) {
      let Goal = $('[name="progressGoal' + i + '"]').val();
      let Notes = $('[name="progressNotes' + i + '"]').val();
      let pDate = $('[name="progressDate' + i + '"]').val();
      //data validation
      if (Goal === "") {
        $('#progressGoal' + i).parent().addClass('error');
        errs.push('Please finish adding an goal.');
        error = true;
      } else {
        $('#progressGoal' + i).parent().removeClass('error');
      }

      //consider notes to be optional

      if (pDate === "") {
        $('#progressDate' + i).parent().addClass('error');
        errs.push('Please finish adding a date.');
        error = true;
      } else {
        $('#progressDate' + i).parent().removeClass('error');
      }
      // add to teamates array
      progress.push({ goal: Goal, notes: Notes, date: pDate });
    }
  }
  if (error) {
    $("#planning").form('add errors', errs);
    return false;
  } else {
    return progress;
  }
}


function parseBudget(errs) {
  let budget = [];
  let error = false;
  for (let i = 0; i < counterB; i++) {
    if ($('#brow' + i).is("tr") /*basically an existence check*/) {
      let Item = $('[name="budgetItem' + i + '"]').val();
      let Notes = $('[name="budgetNotes' + i + '"]').val();
      let Cost = $('[name="budgetCost' + i + '"]').val();
      //data validation
      if (Item === "") {
        $('#budgetItem' + i).parent().addClass('error');
        errs.push('Please finish adding an item name.');
        error = true;
      } else {
        $('#budgetItem' + i).parent().removeClass('error');
      }

      //consider notes to be optional

      if (Cost === "") {
        $('#budgetCost' + i).parent().addClass('error');
        errs.push('Please finish adding a cost.');
        error = true;
      } else {
        $('#budgetCost' + i).parent().removeClass('error');
      }
      // add to teamates array
      budget.push({ item: Item, notes: Notes, cost: Cost });
    }
  }
  if (error) {
    $("#planning").form('add errors', errs);
    return false;
  } else {
    return budget;
  }
}
$(document).ready(function () {
  $('.dropdown').dropdown();

  let $form = $("#planning");
  $form.submit(function (e) {
    e.preventDefault();
  });
  $form.form({
    onSuccess: function (e, fields) {
      fields.budget = parseBudget([]);
      fields.milestones = parseProgress([]);

      console.log("parsing complete");
      if (fields.budget && fields.milestones) {
        //submit the form now that it has been properly sanitized using AJAX
        $.ajax({
          url: "/project/plan",
          method: "POST",
          data: fields
        });
      }
    },
    onFailure: function (formErrors, fields) {
      parseBudget(formErrors);
      parseProgress([]);
    }
  });
});
