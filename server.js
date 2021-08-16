const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/config.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store); 

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

const cookieMonster = {
  secret: 'Cookie Cookie Cookie ',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(cookieMonster));
// console.log(session);
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars'); 

//app.render(views);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/')); 

const views = [
  path.join(__dirname, 'views'),
  path.join(__dirname, './views')
];

app.set('views', views);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});