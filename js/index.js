var apiurl =
  "https://crossorigin.me/https://www.reddit.com/r/FreeCodeCamp/top.json?t=week";

$.getJSON(apiurl, function (response) {
  $(".loading-div").remove();

  var posts = response.data.children;

  $.each(posts, function (index, post) {
    
    var username = post.data.author;
    var posturl = post.data.url;
    var redditurl = post.data.permalink;
    var likes = post.data.ups;

    var headline = post.data.title;
    var fullheadline = headline;
    var limitChar = 60;
    var headlinetruncated;
    
    if (headline.length >
      limitChar) {
      headline = headline.substring(0, limitChar - 1) + "...";
      headlinetruncated = true;
    }

    var dateArr =
      new Date(
      post.data.created_utc *
      1000).toString().split(" ");
    
    var postedOn =
      dateArr[0] + ", " +
      dateArr[2] + " " +
      dateArr[1] + " " +
      " at " + dateArr[4]
      .substring(0, 5);

    var avatarSetArr = [1, 3];
    var randomAvatarSet = avatarSetArr[Math.floor(
      Math.random() *
      avatarSetArr.length)];
    var avatarUrl =
      "https://robohash.org/" +
      username + ".png" +
      "?set=set" + randomAvatarSet;

    if (index < 25) {
      $(".posts-div").append(
        "<div class='post-div'>" + 
        
        "<img class='post-icon' alt='User avatar' width='74' height='74' src='" 
        + avatarUrl + "'>" + 
        
        "<a class='post-headline hint--top' data-hint='' target='_blank' href='" +
        posturl + "'>" + headline + "</a>" + 
        
        "<p class='post-info'>by " + username + " on " +
        postedOn + "</p>" + 
        
        "<a href='" + "https://www.reddit.com/" + 
        redditurl + "' target='_blank'>" + 
        "<span class='heart-symbol'><i class='fa fa-heart'></i>" +
        likes + "</span></a>" + 
        "</div>"
      );
          
      if (headlinetruncated) {
        $(
          ".posts-div .post-div:last-child .post-headline"
        ).attr("data-hint",
          fullheadline);
      }
    }
  });
  setPostsDivHeight();
});

$('.posts-div').scrollbar();

function setPostsDivHeight() {
  var newheight = $( window ).height() - 175;
  $(".posts-div").css("height", newheight + "px");  
};

$( window ).resize(function() {
  setPostsDivHeight();
});
