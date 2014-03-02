/*
 * GET users listing.
 */

module.exports.list = function(req, res) {
  res.send("respond with a resource");
};

module.exports.posts = function(req, res){
  res.render('user', {
    title: 'a list of user\'s post',
    posts: [
      "Many of my friends and family are coal miners. I worked at one for a summer. There are fatalities, but the frequency with which they happen is so small that driving to the mine is more dangerous than the actual job.",
      "Being that they don’t entirely know what they’re looking for, they borrow text from the other requests in the hopes that the contractors that they find will hit the nail on the head."
    ]
  });
};
