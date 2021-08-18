const { Model } = require('sequelize');
const { Comment } = require('../models');

const commentData = [{
        commentText: "Wubba Lubba Dub Dub!",
        userID: 1,
        postID: 1
    },
    {
        commentText: "To live is to risk it all; otherwise you’re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you",
        userID: 2,
        postID: 2
    },
    {
        commentText: "Excuse me. Coming through. What are you here for? Just kidding, I don’t care.",
        userID: 3,
        postID: 3
    },
    {
        commentText: "Boom! Big reveal! I turned myself into a pickle!",
        userID: 4,
        postID: 4
    }
];


const CommentSeeds = () => Comment.bulkCreate(commentData); 

Model.exports = CommentSeeds