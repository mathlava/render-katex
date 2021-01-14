import katex from 'katex'
import express from 'express'
import html2im from 'node-html-to-image'
const app = express()
function source(markdown: string) {
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
<body><div>${
		katex.renderToString(markdown, {
			displayMode: true
		})
		}</div></body>
</html>
`
}
app.get('/tex/:source', async function (req, res) {
	const image = await html2im({
		html: source(req.params.source)
	})
	res.writeHead(200, {'Content-Type': 'image/png'})
	res.end(image, 'binary')
})
app.listen(3000)
