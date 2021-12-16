/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

// const tweetsData = [
//   {
//     user: {
//       name: "Newton",
//       avatars: "https://i.imgur.com/73hZDYK.png",
//       handle: "@SirIsaac",
//     },
//     content: {
//       text: "If I have seen further it is by standing on the shoulders of giants",
//     },
//     created_at: 1461116232227,
//   },
//   {
//     user: {
//       name: "Descartes",
//       avatars: "https://i.imgur.com/nlhLi3I.png",
//       handle: "@rd",
//     },
//     content: {
//       text: "Je pense , donc je suis",
//     },
//     created_at: 1461113959088,
//   },
// ];

$(document).ready(function () {
  //rendering all tweets on the page  // fetching tweets from the http://localhost:8080/tweets page
  const loadTweets = function () {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        console.log(tweets);
        //render tweets
        renderTweets(tweets);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };
  loadTweets();
  //rendering all tweets on the page
  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $tweet = $(createTweetElement(tweet));
      //brings the tweet to the top
      $("#tweets-container").prepend($tweet);
    }
  };

  //Add an Event Listener and Prevent the Default Behaviour
  $("#submit-tweet").on("submit", function (event) {
    event.preventDefault();
    let data = $(this).serialize();

    $(".errorText").slideUp().text("");

    if (!$(this).children().find("textarea").val()) {
      return $(".errorText").text("Please enter a valid tweet").slideDown();
    }
    if ($(this).children().find("textarea").val().length > 140) {
      return $(".errorText").text("Your Tweet exceeds the maximum characters").slideDown();
    }
    //empty textArea
    $(this).children().find("textarea").val("");
    //refresh number of characters
    $(".counter").text(140);

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: data,
      success: (data) => {
        console.log(data);
        loadTweets();
      },
      error: (err) => {
        console.log(err);
      },
    });
  });

  //creating tweet with user and content infor
  const createTweetElement = function (tweet) {
    //Preventing XSS with Escaping(Attacks)
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    let $tweet = `<article class="tweet">
  <header>
    <div class="user">
      <img src=${escape(tweet.user.avatars)} alt="">
      <h3>${escape(tweet.user.name)}</h3>
    </div>
    <h4>${escape(tweet.user.handle)}</h4>
  </header>
  <p>${escape(tweet.content.text)}</p>
  <footer>
  <span>${timeago.format(tweet.created_at)}</span>
    <div class="flag">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>`;
    return $tweet;
  };
});
