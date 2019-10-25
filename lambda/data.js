module.exports = (request, response) => {
    response.setHeader('Cache-Control', 's-maxage=86400')
    response.send('Hello world!')
  }