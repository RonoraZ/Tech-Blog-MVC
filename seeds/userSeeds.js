const { User } = require('../models');

const userData = [{
        userName: 'Rick Sanchez',
        password: '1234'

    },
    {
        userName: 'Morty',
        password: '12345'
    },
    {
        userName: 'Beth',
        password: '123456'
    },
    {
        userName: 'Summer',
        password: '1234567'
    }
];

const UsersSeeds = () => User.bulkCreate(userData);

module.exports = UsersSeeds;