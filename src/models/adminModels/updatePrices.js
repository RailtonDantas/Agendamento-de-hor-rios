const mongoose = require('mongoose');
const validator = require('validator');
const {modelConfig} = require('../clientsModels/indexModel')

class UpdatePrices{
    constructor(body){
        this.body = body;
        this.clearData()
    }

    clearData(){
        for(let key in this.body){
            const valueCurrentKey = this.body[key].trim();
            if(validator.isEmpty(valueCurrentKey) || this.body[key] == 'on'){
                delete this.body[key]
            }
        }
    }
    async replacePrices(){
        const currentPrices = await modelConfig.findOne({searchKey:'Tabela de preços'});
        const id = currentPrices._id;
        await modelConfig.findByIdAndUpdate({_id:id},{
            cabelo:this.body.newPriceHair || currentPrices.cabelo,
            barba:this.body.newPriceBeard || currentPrices.barba,
            sobrancelha:this.body.newPriceEyeBrow || currentPrices.sobrancelha,
        })
    }
}

module.exports.UpdatePrices = UpdatePrices;