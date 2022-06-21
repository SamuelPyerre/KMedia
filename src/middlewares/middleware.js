exports.middlewareGlobal = (req, res, next) => { 
    console.log()
    console.log('Passei no middleware global')
    console.log()
    

    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user
    next()
}

