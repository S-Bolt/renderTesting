const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require("path");
const routes = require("./controllers");
const helpers = require("./public/utils/helpers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
  helpers,
});

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`); // Log incoming requests
  next();
});

app.use(routes);

sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
});


// Okay so there are a couple of things you guys need to do to fix your database. 
// First do another git pull because there was a couple issues with the way our project was interacting with the database so i fixed those. 

// After that you need to ensure you have the correct tables in your database.

// To do this, you need connect to psql and run the following commands:

// -- Step 1: Drop existing problem and problems tables if they exist:

// DROP TABLE IF EXISTS problem;
// DROP TABLE IF EXISTS public.problem CASCADE;

// -- Step 2: Create a new problem table:

// CREATE TABLE public.problem (
//     id                    SERIAL PRIMARY KEY,
//     title                 VARCHAR(255) NOT NULL,
//     difficulty            VARCHAR(255) NOT NULL,
//     category              VARCHAR(255) NOT NULL,
//     problem_statement     TEXT NOT NULL,
//     examples              JSON NOT NULL,
//     constraints           TEXT NOT NULL,
//     starter_code          TEXT NOT NULL,
//     handler_function      TEXT NOT NULL,
//     "order"               INTEGER NOT NULL DEFAULT 0,
//     likes                 INTEGER DEFAULT 0,
//     dislikes              INTEGER DEFAULT 0,
//     user_id               INTEGER,
//     video_id              VARCHAR(255),
//     created_at            TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updated_at            TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     starter_function_name VARCHAR(255) NOT NULL,
//     CONSTRAINT problem_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE
// );

// -- Step 3: Add the necessary indexes and foreign key constraints

// ALTER TABLE ONLY public.problem
//     ADD CONSTRAINT problem_pkey PRIMARY KEY (id);

// ALTER TABLE ONLY public.comment
//     ADD CONSTRAINT comment_problem_id_fkey FOREIGN KEY (problem_id) REFERENCES public.problem(id) ON UPDATE CASCADE ON DELETE CASCADE;

// ALTER TABLE ONLY public.user_problem
//     ADD CONSTRAINT user_problem_problem_id_fkey FOREIGN KEY (problem_id) REFERENCES public.problem(id) ON UPDATE CASCADE ON DELETE CASCADE;


