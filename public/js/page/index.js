console.log("Welcome to GalleXy!");

// TODO: implement sort dropdown
$('.ui.dropdown').dropdown({
  on: 'hover',
  transition: 'drop',
  action: 'activate',
  onChange: function(text, value) {  // bind actions here
    console.log('hello');
    if (text == "projx") { // projX green: #6EBE45
      $(".gallexy").css("color","#6EBE45");
    } else if (text == "hack") { // hack red: #FF585D
      $(".gallexy").css("color","#FF585D");
    } else if (text == "think") { // think yellow: #FEF304
      $(".gallexy").css("color","#FEF304");
    } else if (text == "make") { // make yellow: #EDC459
      $(".gallexy").css("color","#EDC459");
    }
  }
});
