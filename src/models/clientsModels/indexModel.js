const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    searchKey:{type:String},
    cabelo:{type:Number},
    barba:{type:Number},
    sobrancelha:{type:Number}
  })
const modelConfig = mongoose.model('configuracoes',schema);

async function  getPrices(){
    const prices = await modelConfig.find({searchKey:'Tabela de preços'})
    return prices[0]
}


module.exports.modelConfig = modelConfig;
module.exports.getPrices = getPrices;