import {renderToString} from 'katex'
import express from 'express'
const app = express()

function source(tex: string) {
	return `
<html>
<head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.12.0/katex.min.css" />
<style>
body {
font-size: 100px;
display: flex;
justify-content: center;
align-items: center;
}
</style>
</head>
<body><div>${renderToString(tex, {
		displayMode: true
	})
		}</div></body>
</html>
`
}

app.get('/tex/:source', (req, res) => {
	try {
		res.send(source(req.params.source))
	} catch (e) {
		res.status(400)
		res.send(e.message)
	}
})
app.listen(process.env.PORT || 5000)
