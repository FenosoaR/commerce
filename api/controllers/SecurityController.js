const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password, confirmation, email } = req.body;

  try {
    const data = await User.findOne({ where: { email } });

    if (data)
      return res.status(500).json({ message: "Votre email est déja utilisé" });

    if(password.length  < 6 || password.length > 30 )
      return res.status(500).json({message : 'Votre mot de passe devrait entre 6 et 30 caractères'})

    if (confirmation != password)
      return res
        .status(500)
        .json({ message: "Confirmaton incorrecte" });

    const hashedPassword = bcrypt.hashSync(password, 12);

    const newUser = User.build({
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    return res.status(200).json({ message: "Created", newUser });
  } catch (error) {
   
    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(500).json({ message: "email invalide" });

    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid)
      return res.status(200).json({ message: "Mot de passe incorrecte" });

    const jwToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "secret"
    );

    return res.status(200).json({ message: "Connected", jwToken, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { register, login };
