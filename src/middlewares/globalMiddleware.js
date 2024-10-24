module.exports.globalMiddleware = (req,res,next) => {
    res.locals.badKeyAcess = req.flash("badKeyAcess");
    res.locals.availableMorningTimes =  req.flash('availableMorningTimes');
    res.locals.availableAfternoonTimes = req.flash('availableAfternoonTimes') ;
    res.locals.availableEveningTimes = req.flash('availableEveningTimes') ;
    res.locals.date = req.flash('date');
    res.locals.invalidDate = req.flash('invalidDate');
    res.locals.notWorkInSunday =  req.flash('notWorkInSunday');
    res.locals.lazyDays = req.flash("allLazyDays");
    res.locals.isLazyDay = req.flash("isLazyDay");
    next()
}