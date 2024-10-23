const createClients = require("../../models/clientsModels/createClients").createClients;
let dataClients;
module.exports.createClients = async (req,res,next) => {
    const {name,whatsapp,date,hour,services} = prepareDataOfClient(req.body)
    const createClient = new createClients(req.body);
    if(createClient.errors.legth > 0){
        req.flash("voidCamp",createClient.errors)
        res.session.save();
        return res.redirect('back')

    }
    await createClient.createClientsInDB()
    dataClients = [name,whatsapp,date,hour,services]
    res.redirect('/clientes/clienteAgendado')
    next()
}
module.exports.renderPageScheduledClients = (req,res,next) => {
    const [name,whatsapp,date,hour,services] = dataClients;
    res.render('scheduledClient',{name,whatsapp,date,hour,services}) 
    next()
}
function prepareDataOfClient(body){
    const {inputScheduleName:name,inputScheduleWhatsapp:whatsapp,inputScheduleDate:date,inputScheduleHour:hour} = body;
    const hair = body.checkHair || '';
    const beard = body.checkBeard || '';
    const eyebrow = body.checkEyeBrow || '';
    const services = {hair,beard,eyebrow};
    for(let key in services){
        if(services[key] == ''){
            delete services[key]
        }
    }
    return{
        name,whatsapp,date,hour,hair,beard,eyebrow,services
    }
}
