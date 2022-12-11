const nodemailer = require('nodemailer')
const HttpError = require('../error/HttpError')

const mailTransporter = nodemailer.createTransport({
	host: process.env.HOST,
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
})

const sendMailController = async (req, res, next) => {
	try {
		const { name, email, message } = req.body

		const mailDetails = {
			from: process.env.EMAIL,
			to: process.env.TO,
			subject: 'Message from Portfolio Site',
			text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
		}

		await mailTransporter.sendMail(mailDetails)

		res.status(200).json({
			message: 'Message sent!',
		})
	} catch (error) {
		console.error(error)
		const httpError = new HttpError('Failed to send!')
		next(httpError)
	}
}

module.exports = sendMailController
