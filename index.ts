import {renderToString} from 'katex'
import express from 'express'
const app = express()
function source(tex: string) {
	return `
<html>
<head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.12.0/katex.min.css" /></head>
<style>
body {
min-width: 5em;
min-height: 3em;
padding: 2em;
font-size: 50px;
display: flex;
justify-content: center;
align-items: center;
}
</style>
<body><div>${renderToString(tex, {
		displayMode: true
	})
		}</div></body>
</html>
`
}
app.get('/tex/:source', (req, res) => res.send(source(req.params.source)))
app.listen(8080)
