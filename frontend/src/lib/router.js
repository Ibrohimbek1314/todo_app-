const http = require('http')
const path = require('path')
const fs = require('fs/promises')
const url = require('url')
const handlers = {}
let viewPath = null
let publicPath = null

function Server (req, res) {
	const reqUrl = url.parse( req.url ).pathname
	const method = req.method.toUpperCase()

	res.render = async function (data) {
		res.writeHead(200, { 'Content-Type': 'text/html' })
		if(viewPath) {
			return res.end(
				await fs.readFile(path.join(viewPath, data || 'index.html'))
			)
		} else {
			return res.end(data)
		}
	}

	if(handlers[reqUrl]) {
		return handlers[reqUrl](req, res)
	} else {
		return publicPages(req, res, reqUrl, method)
	}
}


async function publicPages (req, res, reqUrl, method) {
	try {
		const extname = path.extname(reqUrl)

		const contentTypes = {
			'.js': 'application/js',
			'.json': 'application/json',
			'.css': 'text/css',
			'.html': 'text/html',
			'.png': 'image/png',
			'.jpg': 'image/jpg',
		}

		const contentType = { 'Content-Type': contentTypes[extname] }
		const file = await fs.readFile( path.join(publicPath, reqUrl) )

		res.writeHead(200, contentType)
		res.end(file)
	} catch(error) {
		if(error.message.startsWith('ENOENT')) {
			// res.writeHead(404, { 'Content-Type': 'text/plain' })
			return res.end('There is no such file directory: ' + path.join(publicPath, reqUrl))
		} else {
			return res.end(`Cannot ${method} ${reqUrl}`)
		}
	}
}


function Express () {
	this.server = http.createServer(Server)

	this.get = function(path, callbackHandler) {
		handlers[path] = handlers[path] || callbackHandler
	}

	this.views = function(path) {
		viewPath = path
	}

	this.public = function(path) {
		publicPath = path
	}

	this.listen = function (PORT, callback) {
		this.server.listen(PORT, callback)
	}
}

module.exports = Express