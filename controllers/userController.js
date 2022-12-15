import { getUsersData, getUserData, addNewData, removeUserData, editUserData } from "../adapters/userAdapter.js"

// Encryption
import bcrypt from "bcrypt";
const saltRounds = 10;

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
        password: user.password,
        created_at: user.created_at,
        avatar: user.avatar,
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

export async function validateUser(req, res) {
  // Form input
  const email = req.query.email;
  const password = req.query.password;

  // Check if user exists
  const users = await getUsersData();
  let foundUser = []
  users.forEach(user => {
    if (email === user.email) {
      console.log('User found')
      foundUser = {
        id: user.id,
        email: user.email,
        password: user.password
      }
      if (bcrypt.compareSync(password, foundUser.password)) {
        console.log('Correct details')
        res.json({ id: foundUser.id });
      } else {
        console.log('Incorrect details')
        res.json({
          title: "User not found.",
          message: "The email or password is incorrect."
        })
      }
      console.log('The found user is ', foundUser);
    } else {
      console.log('No user')
    }
  });
}

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
  const before = await getUsersData();
  if (req.query.username && req.query.email && req.query.password) {
    user.username = req.query.username;
    user.email = req.query.email;
    user.password = bcrypt.hashSync(req.query.password, saltRounds);
    await addNewData(user)
    const rows = await getUsersData();
    if (rows.length >= before.length) {
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

export async function editUser(req, res) {
  const user = {};
  if (req.query.username && req.query.email && req.query.password) {
    user.username = req.query.username;
    user.email = req.query.email;
    user.password = req.query.password;
    await editUserData(req.params.id, user)
    res.json({
      title: 'user edited',
      message: `User ${user.username} has been added`,
    });
  }
}

export async function removeUser(req, res) {
  const id = req.params.id
  const before = await getUsersData();
  await removeUserData(req.params.id);
  const after = await getUsersData();
  if (before.length > after.length) {
    res.json({ message: `Removed ${id}` });
  } else {
    res.status(500).json({ message: 'Cannot remove user' });
  }
}

