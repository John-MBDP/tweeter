/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

const tweetsData = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

$(document).ready(function () {
  //rendering all tweets on the page
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = $(createTweetElement(tweet));
      $("#tweets-container").prepend($tweet);
    }
  };

  //Add an Event Listener and Prevent the Default Behaviour
  $("#submit-tweet").on("submit", function (event) {
    event.preventDefault();
    let data = $(this).serialize();
    console.log(data);
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: data,
      success: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  });

  //creating tweet with user and content infor
  const createTweetElement = function (tweet) {
    let $tweet = `<article class="tweet">
  <header>
    <div class="user">
      <img src=${tweet.user.avatars} alt="">
      <h3>${tweet.user.name}</h3>
    </div>
    <h4>${tweet.user.handle}</h4>
  </header>
  <p>${tweet.content.text}</p>
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
  renderTweets(tweetsData);
});
