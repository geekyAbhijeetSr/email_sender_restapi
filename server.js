const express = require('express')
const sendMailController = require('./controller/send-mail-controller')
const errorHandler = require('./error/error-handler')
const { sendMailValidation, validate } = require('./middleware/validation')
const cors = require('cors')
const helmet = require('helmet')

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet())
app.use(express.json())
app.use(
	cors({
		origin: (process.env.ORIGIN).split(','),
	})
)

app.post('/sendmail', sendMailValidation, validate, sendMailController)

app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`)
})
