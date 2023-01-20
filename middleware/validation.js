const { body, validationResult } = require('express-validator')
const HttpError = require('../error/HttpError')

exports.sendMailValidation = [
	body('name').notEmpty().withMessage('Name is required'),
	body('email').isEmail().withMessage('Email is invalid'),
	body('message').notEmpty().withMessage('Message is required')
]

exports.validate = (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		const error = new HttpError(errors.array(), 422)
		next(error)
	}
	next()
}
