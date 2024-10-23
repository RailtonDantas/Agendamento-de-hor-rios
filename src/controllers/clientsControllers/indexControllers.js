const lazyDaysModel = require("../../models/adminModels/lazyDaysModel").lazyDayModel;
module.exports.renderIndexClient = async (req,res,next) => {
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
    const lazyDays = [...formattedLazyDays]
    const {getPrices} = require("../../models/clientsModels/indexModel");
    const prices = await getPrices();
    res.render('index',{prices,lazyDays})
}