const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


//Register
const authController = {
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);


            //New user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });

            //save
            const user = await newUser.save();
            res.status(200).json(user);

        } catch (error) {
            res.status(500).json(error);
        }
    },

    //login
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({
                username: req.body.username
            });
            if (!user) {
                res.status(404).json("Wrong username");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword) {
                res.status(404).json("Wrong password");

            }
            if (user && validPassword) {
                const accesssToken = jwt.sign({
                    id: user.id,
                    admin: user.admin,
                },
                    process.env.JWT_ACCESS_KEY,
                    { expiresIn: "1000s" }
                );
                //refreshToken
                const refreshToken = jwt.sign({
                    id: user.id,
                    admin: user.admin,
                },
                    process.env.JWT_REFESH_KEY,
                    {
                        expiresIn: "365d"

                    });


                const { password, ...others } = user._doc;

                res.status(200).json({ ...others, accesssToken, refreshToken });


            }
        } catch (error) {
            res.status(500).json(err)
        }
    }
};
module.exports = authController;