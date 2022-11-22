import { getUsersData, getUserData } from "../adapters/userAdapter.js"

export async function getUsers(req, res) {
    const users = {};
    const userData = await getUsersData();
    if (userData.length > 0) {
        users.meta = {
          title: 'all users',
          url: req.originalUrl,
        };
        users.data = [];
        userData.map((user) => {
            users.data.push({
                url_to_self: `${req.originalUrl}/${user.id}`,
                id: user.id,
                name: user.username,
                email: user.email,
                created_at: user.created_at,
            });
          });
    res.json(users);
    } else {
    res.status(500);
    res.json({
      title: 'no users found',
      message: `We did something wrong`,
    });
  }
};

export async function getUser(req, res) {
    const users = await getUserData(req.params.id);
    if (users.length > 0) {
      const response = {};
      response.meta = {
        title: 'individual user',
        url: `${req.originalUrl}`
      }
      response.data = users[0];
      res.json(response);
    } else {
      res.status(500).json({ message: 'i cannot find the user' });
    }
  }

  export async function addNewUser(req, res) {
    const user = {};
    if (req.body.username && req.body.email && req.body.password) {
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = req.body.password;
      const rows = await addUserData(user);
      if (rows.length >= 0) {
        res.json({
          title: 'user added',
          message: `User ${user.username} has been added`,
        });
      } else {
        res.status(500);
        res.json({
          title: 'cannot add user',
          message: `Unknown causes`,
        });
      }
    } else {
      res.status(422);
      res.json({
        title: 'cannot add user',
        message: `You need to give the name, email and password`,
      });
    }
  }

// const createUser = ((req, res) => {
//     const newUser = {
//         id: user.length + 1,
//         name: req.body.name,
//     }
//     user.push(newUser)
//     res.status(201).json(newUser)
// })

// const updateUser = ((req, res) => {
//     const id = Number(req.params.userID)
//     const index = user.findIndex(user => user.id === id)
//     const updateUser = {
//         id: user.length + 1,
//         name: req.body.name,
//     }
//     user[index] = updateUser
//     res.status(200).json('User updated')
// })

// const deleteUser = ((req, res) => {
//     const id = Number(req.params.userID)
//     const index = user.findIndex(user => user.id === id)
//     user.splice(index, 1)
//     res.status(200).json('User deleted')
// })

// module.exports = {
//     getUsers,
//     getUser,
//     createUser,
//     updateUser,
//     deleteUser
// }