const { User } = require('../models');

const userData = [{
        username: 'Rick Sanchez',
        password: '1234'

    },
    {
        username: 'Morty',
        password: '12345'
    },
    {
        username: 'Beth',
        password: '123456'
    },
    {
        username: 'Summer',
        password: '1234567'
    }
];

const userSeeds = () => User.bulkCreate(userData);

module.exports = userSeeds;