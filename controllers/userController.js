import { getUsersData } from "../adapters/userAdapter.js"

export async function getUsers(req, res) {
    // const users = {};
    const userData = await getUsersData();
    // if (userData.length > 0) {
    //     users.meta = {
    //       title: 'all users',
    //     };
    //     users.data = [];
    //     userData.map((user) => {
    //         users.data.push({
    //             name: user.username,
    //             email: user.email,
    //         });
    //       });
    res.json({
        name: userData.username,
        email: userData.email,
    });
};
// const getUser = ((req, res) => {
//     const id = Number(req.params.userID)
//     const user = users.find(user => user.id === id)

//     if (!user) {
//         return res.status(404).send('User not found!')
//     }
//     res.json(user)
// })

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