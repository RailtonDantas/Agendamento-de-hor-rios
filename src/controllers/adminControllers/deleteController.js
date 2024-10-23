const clientsModel = require("../../models/clientsModels/createClients").clientsModel;

module.exports.deleteClient = async (req,res,next) => {
    const id = req.params.id;
    await clientsModel.findByIdAndDelete({_id:id})
    res.redirect("/admin/listagemDeClientes")
    next()
}
module.exports.deleteAllClientsInThatDay = async (req,res,next) => {
    const data = req.params.data.split('-')
    let formattedData = `${data[2]}-${data[1]}-${data[0]}`
    const timeStamp = Date.parse(formattedData)
    const objData = new Date(timeStamp);
    await clientsModel.deleteMany({date:objData})
    res.redirect('/admin/listagemDeClientes')
    next()
}
