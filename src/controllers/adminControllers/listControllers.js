const clientModel = require("../../models/clientsModels/createClients").clientsModel;
const modelConfig = require('../../models/clientsModels/indexModel').modelConfig;
module.exports.renderListClientsPage = async (req,res,next) => {
    const allClients = await clientModel.find().sort({date:1})
    const [dates,formattedDates] = getAllDates(allClients);
    const clientsSeparatedPerDate = await filterClientsPerDate(formattedDates,allClients);
    res.render("listOfClients",{allClients:clientsSeparatedPerDate});
    next()
   
}
function getAllDates(clients){
    const dates = [];
    const formattedDates = [];
    for(let index = 0; index < clients.length; index++){
        const currentClient = clients[index];
        let currentDate = Object.assign({},currentClient)._doc.date
        
        currentDate = currentDate.toLocaleDateString('pt-br',{
            dateStyle:'short',
            timeZone:'UTC'
        })
        if(formattedDates.indexOf(currentDate) == -1){
            formattedDates.push(currentDate)
            dates.push(currentClient.date)
        }
    }
    
    return [dates,formattedDates]
}

async function filterClientsPerDate(dates,allClients){
    const prices = await getPrices()
    const clientsSeparatedPerDate = [];
    dates.forEach((currentDate) => {
        const filteredClients = allClients.filter((currentCliente,index,filteredClients) => {
            return currentDate === currentCliente.date.toLocaleDateString('pt-br',{
                dataStyle:'short',
                timeZone:'UTC'
            });
        });
        const turnover = calculateTurnover(filteredClients,prices)
        clientsSeparatedPerDate.push({
            date:currentDate,
            clients:filteredClients,
            totalClients:filteredClients.length,
            estimatedTurnover: turnover,
        })
    })
    return clientsSeparatedPerDate
}

function calculateTurnover(clientsToday,prices){
    let  turnover = 0;
    for(let index = 0 ; index < clientsToday.length; index++){
        const [currentClientServices] = Object.assign({},clientsToday[index])._doc.services;
        const revenueThatClientGenereted = returnTurnover(currentClientServices,prices);
        turnover += revenueThatClientGenereted;
    }
    return turnover
}

function returnTurnover(services,prices){
    let turnover = 0
    const {cabelo:priceHair,barba:priceBeard,sobrancelha:priceEyebrow} = prices;
    const servicesOfClient = Object.keys(services);
    if(servicesOfClient.indexOf('hair') !== -1){
        turnover += priceHair
    }
    if(servicesOfClient.indexOf('beard') !== -1){
        turnover += priceBeard
    }
    if(servicesOfClient.indexOf('eyebrow') !== -1){
        turnover += priceEyebrow
    }
 
    return turnover
}

async function  getPrices(){
    const prices = await modelConfig.find({searchKey:'Tabela de preços'})
    return prices[0]
}
// [
// {
// date:'dataFormatada',
// clientes:[
//    {nome,whatsapp,horario,serviços},
// ]
// }
// ]
