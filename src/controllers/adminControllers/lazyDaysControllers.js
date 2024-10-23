const lazyDaysClass = require("../../models/adminModels/lazyDaysModel").lazyDaysClass;
const lazyDaysModel = require("../../models/adminModels/lazyDaysModel").lazyDayModel;
module.exports.saveDays = async (req,res,next) => {
    const lazyDays = new lazyDaysClass(req.body)
    await lazyDays.createLazyDayInDB()
    res.redirect("/admin/index")
    next()
}
module.exports.listLazyDays = async (req,res,next) => {
    let allLazyDays = [...await lazyDaysModel.find()];

    const formattedLazyDays = allLazyDays.map((element) => {
        const objectFormatted = {
            lazyDay:element.lazyDay.toLocaleDateString("pt-br", {
                dateStyle:'short',
                timeZone:'UTC'
            }),
            reasonOfLazyDay:element.reasonOfLazyDay,
            id:element._id
        }
        return objectFormatted
    })
  
    if(formattedLazyDays.length > 0){
        req.flash('allLazyDays',formattedLazyDays);
    }    
    req.session.save();
    res.redirect("/admin/index")
    next()
}
module.exports.deleteLazyDays = async (req,res,next) => {
    const id = req.params.id;
    await lazyDaysModel.deleteOne({_id:id})
    res.redirect("/admin/index");
    next()
}