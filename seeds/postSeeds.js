const { Post } = require('../models');

const postData = [{
        title: " Two brothers",
        fufilled: " vs tomato aliens , while driving a van",
        userID: 1

    },
    {
        title: "Mr Meeseeks",
        fufilled: "Im Mr Meeseeks look at me .Now that i have your attention what can i do for you!?",
        userID: 2
    },
    {
        title: "Universe",
        fufilled: "Lets take it for a ride",
        userID: 3
    },
    {
        title: "Parkour",
        fufilled: "I gotta get that parkour hahah ",
        userID: 4
    }
];

const PostsSeeds = () => Post.bulkCreate(postData);

module.exports = PostsSeeds;