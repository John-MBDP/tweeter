$(document).ready(function () {
  //live counter for the text input area
  $(".tweet-text").on("input", function (input) {
    let charCount = $(this).val().length;
    let remainingChars = 140 - charCount;

    //traversing through the dom to target .counter value
    let counter = $(this).parent().next("div").children(".counter");
    counter.text(remainingChars);

    //conditional to show counter as red
    if (remainingChars < 0) {
      counter.addClass("redText");
    } else {
      counter.removeClass("redText");
    }
  });
});
