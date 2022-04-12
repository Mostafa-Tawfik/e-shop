const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@sprints.com",
    password: bcrypt.hashSync("sprints@13", 10),
    isAdmin: true,
  },
];

module.exports = users;
