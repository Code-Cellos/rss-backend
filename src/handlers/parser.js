// currently not being used

'use strict';

let Parser = require('rss-parser');
let parser = new Parser();
const UserObject = require('../models/userModel');

const parseFeed = async () => {
  let feed = await parser.parseURL('https://www.reddit.com/r/news/.rss');
  // console.log('FEED', feed);

  return feed;
};

const addFeed = async (username) => {
  try {
    let account = await UserObject.findOne({ Username: username });
    // console.log('ACCOUNT', account);
    let newFeed = await parseFeed();

    await UserObject.findByIdAndUpdate(account._id, {
      $push: { feedsArray: newFeed }
    });
  } catch (e) {
    console.log(e.message);
  }
};

// module.exports = addFeed;
