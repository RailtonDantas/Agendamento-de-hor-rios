const {UpdatePrices} = require('../../models/adminModels/updatePrices');
module.exports.setNewPrices = async (req,res,next) => {
    const updatePrices = new UpdatePrices(req.body)
    await updatePrices.replacePrices()
    next()
}
module.exports.redirectAdminPage = (req,res,next) => {
    res.redirect("/admin/index")
    next()
}