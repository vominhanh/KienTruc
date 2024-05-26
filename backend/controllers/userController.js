const bcrypt = require("bcrypt");
const User = require("../models/User")

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(err)

        }
    },

    //Delete user
    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json("Delete Successfully")

        } catch (err) {
            res.status(500).json(err)
        }
    },

    forgotPasswordUser: async (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ message: USER_NOT_FOUND_ERR });
            }
            const hashedPwd = await bcrypt.hash(password, 12);
            user.password = hashedPwd;
            await user.save();

            res.status(200).json({ message: "Reset password success" });
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode === 500;
            }
            next(error);
        }

    }

}

module.exports = userController;