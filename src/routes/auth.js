module.exports = {
  authorization: (request, response, next) => {
    if(request.isAuthenticated()) {
      return next()
    }
    response.redirect('/')
  }
}