require('dotenv').config()
const CreateHours = require('../../models/adminModels/createHoursModel').CreateHours;

module.exports.renderAdminLogin = (req,res,next) => {
    res.render('loginAdmin')
    next()
}
module.exports.verifyAcessKey = (req,res,next) => {
    console.log(req.body.keyAcess,'body da requisição')
    if(req.body.keyAcess !== process.env.keyAcess){
        req.session.adminExist = false;
        req.flash('badKeyAcess','Seu acesso foi negado!');
        req.session.save(() => {
            res.redirect("back");
        })
        return
    }
    req.session.adminExist = true;
    next()
}
module.exports.renderAdminIndex = async (req,res,next) => {
    CreateHours.createHours()
    res.render('indexAdmin')
}
module.exports.verifyAdmin = (req,res,next) => {
    if(!req.session.adminExist){
        res.redirect('/')
        return
    }
    next()
}