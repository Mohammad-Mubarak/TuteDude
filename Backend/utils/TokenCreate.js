
const Tokencreate = async (user, res) => {

	const option = {
		expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
	}
	
	const Token = user.getJwtToken()
	res.setHeader('Authorization', `Bearer ${Token}`)

	user.password = undefined
	return res.status(200).cookie("token", Token, option).json({
		message:'Successfull',
		token:Token,
		user:user
	})
}

module.exports = Tokencreate