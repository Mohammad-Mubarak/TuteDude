// user Model importing
const User = require("../models/user")
const FBook = require("../models/FavBook")


// import token creater
const Tokencreate = require("../utils/TokenCreate")


exports.signup = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        if (!email || !password || !name) {
            return res.send("Some fields are missing, please provide all the required information.");
        }

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
		
        if (existingUser) {
            return res.send("Email already exists. Please choose a different email.");
        }

        // Create a new user instance
        const newUser = new User({
            email,
            name,
            password
        });

        // Save the user to the database
        const user = await newUser.save();

		const FavBookUser = new FBook({
			userId : user._id,
			AllBooks:[]
		})

		await FavBookUser.save()

        // Generate and send the token
        Tokencreate(user, res);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred during signup.");
    }
};




exports.login = async (req, res) => {
	try {
		let { email, password} = req.body;

		console.log("🧜‍♂️🦴 ~> file: UserController.js:58 ~> exports.login= ~> req.bod:  :-> >", req.body)


		 password = password+""
		// check for presence of email and password
		if (!email || !password) {
			return res.json({
				message: "please fill all data",
			});
		}
		
		// checking match or not
		const existingUser = await User.findOne({ email }).select("+password");

		
		
		// not registered in database
		if (!existingUser) {
			return res.json({
				message: "You are not Registered",
			});
		}
		// trying to crpyt password
		const finaluser = await existingUser.isValidatedPassword(password);

		// if not match
		if (!finaluser) {
			return res.json({
				message: "wrong password",
			});
		}
        
		Tokencreate(existingUser, res);
	} catch (error) {
		res.status(500).send("Server Error");
	}
};


exports.logout = async (_, res) => {
	try {
		// setting token value null
		res.cookie("token", null, {
			expires: new Date(Date.now()),
			http: true,
		});
		return res.json({
			message:"logout successfully"
		})
	} catch (error) {
		res.status(500).send("Server Error");
	}
};


