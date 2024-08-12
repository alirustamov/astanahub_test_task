// Use this file only as a guide for first steps using routes. Delete it when you have added your own route files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/usage/routes

// users data
const USERS = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
];

const ALL_USERS = [
  ...USERS,
  {
    id: 3,
    name: "Tommy",
  },
  {
    id: 4,
    name: "Timmy",
  },
];

let nextId = ALL_USERS.length + 1;

module.exports = [
  {
    id: "get-users", // route id
    url: "/api/users", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: USERS, // body to send
        },
      },
      {
        id: "all", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: ALL_USERS, // body to send
        },
      },
      {
        id: "error", // variant id
        type: "json", // variant handler id
        options: {
          status: 400, // status to send
          // body to send
          body: {
            message: "Error",
          },
        },
      },
    ],
  },
  {
    id: "get-user", // route id
    url: "/api/users/:id", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: USERS[0], // body to send
        },
      },
      {
        id: "id-3", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: ALL_USERS[2], // body to send
        },
      },
      {
        id: "real", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const userId = req.params.id;
            const user = ALL_USERS.find((userData) => userData.id === Number(userId));
            if (user) {
              res.status(200);
              res.send(user);
            } else {
              res.status(404);
              res.send({
                message: "User not found",
              });
            }
          },
        },
      },
    ],
  },
  {
    id: "create-user",
    url: "/api/users",
    method: "POST",
    variants: [
      {
        id: "single",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const newUser = { id: nextId++, ...req.body };
            ALL_USERS.push(newUser);
            res.status(201);
            res.send(newUser);
          },
        }
      }
    ]
  },
  {
    id: "update-user",
    url: "/api/users/:id",
    method: "PUT",
    variants: [
      {
        id: "single",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const userIndex = ALL_USERS.findIndex((u) => u.id === parseInt(req.params.id));
            if (userIndex !== -1) {
              ALL_USERS[userIndex] = { id: parseInt(req.params.id), ...req.body };
              res.status(200);
              res.send(ALL_USERS[userIndex]);
            } else {
              res.status(404);
              res.send({ error: "User not found" });
            }
          },
        }
      }
    ]
  },
  // {
  //   id: "update-user",
  //   url: "/api/users/:id",
  //   method: "PUT",
  //   response: (req, res) => {
  //     const index = ALL_USERS.findIndex((u) => u.id === parseInt(req.params.id));
  //     if (index !== -1) {
  //       ALL_USERS[index] = { id: parseInt(req.params.id), ...req.body };
  //       res.status(200);
  //       res.send(ALL_USERS[index]);
  //     } else {
  //       res.status(404);
  //       res.send({ error: "User not found" });
  //     }
  //   },
  // },

  {
    id: "delete-user",
    url: "/api/users/:id",
    method: "DELETE",
    response: (req, res) => {
      const index = ALL_USERS.findIndex((u) => u.id === parseInt(req.params.id));
      if (index !== -1) {
        const deletedUser = ALL_USERS.splice(index, 1);
        res.status(200);
        res.send(deletedUser[0]);
      } else {
        res.status(404);
        res.send({ error: "User not found" });
      }
    },
  },
];
