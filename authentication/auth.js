function authenticate(req, res, next) {
    if(req.session) {
        if(req.session.username) {
            next() // proceed to the original request 
        } else {
            res.redirect('/users/login')
        }
    } else {
        res.redirect('/users/login')
    }
}

module.exports = authenticate 