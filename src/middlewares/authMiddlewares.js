const isLoggedIn = async (req, res, next) => {
    if (req.user) {
        return next()
    } else {
        res.redirect('/users/login')
    }
}


const notLoggedIn = async (req, res, next) => {
    if (!req.user) {
        return next()
    } else {
        res.redirect('back')
    }
}

module.exports = {
    isLoggedIn,
    notLoggedIn
}