
  import User from './models/User.js';
  import bcrypt from 'bcrypt';
  import connectToDatabase from './db/db.js';

  const userRegister = async () => {
      connectToDatabase()
    try {
      const hashPassword = await bcrypt.hash("akash", 10);
      const newUser = new User({
        name: "Akash",
        email: "akashnaidu101@gmail.com",
        password: hashPassword,
        role: "admin",
      });
      await newUser.save();
      console.log("User registered successfully!");
    } catch (error) {
      console.log(error);
    }
  };


  userRegister();