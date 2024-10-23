const mongoose = require('mongoose');
const validator = require('validator');
const schema = new mongoose.Schema({
    name:{type:String,require:true},
    whatsapp:{type:String,require:true},
    date:{type:Date,require:true},
    hour:{type:String,require:true},
    services:{type:Object,require:true}
})
const clientsModel = mongoose.model('clientes',schema);

class createClients{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.clearData()
    }
    
    clearData(){
        for(let key in this.body){
            const currentKey = this.body[key].trim();
            if(validator.isEmpty(currentKey)){
                this.errors.push('Todos os campos devem ser preenchidos!')
                return
            }
        }
        
    }
    separateServices(){
        const hair = this.body.checkHair || '';
        const beard = this.body.checkBeard || '';
        const eyebrow = this.body.checkEyeBrow || '';
        const services = {hair,beard,eyebrow};
        for(let key in services){
            if(services[key] == ''){
                delete services[key]
            }
        }
        return [services]
    }

    async createClientsInDB(){
        await clientsModel.create({
            name:this.body.inputScheduleName,
            whatsapp:this.body.inputScheduleWhatsapp,
            date:this.reformatDate(this.body.inputScheduleDate),
            hour:this.body.inputScheduleHour,
            services:this.separateServices()
        })
    }
    reformatDate(data){
       const dataSplit = data.split("/");
       return `${dataSplit[2]}-${dataSplit[1]}-${dataSplit[0]}`
    }

    // verifyData(data){
    //     const dataReformated = this.reformatDate(data);
    //     const timeStamp = Date.now();
    //     let today = new Date(timeStamp).toLocaleDateString('pt-br',{
    //         dataStyle:'short',
    //         timeZone:'UTC',
    //     });
    //     today = new Date(today);
    //     const dataChosenByClient = new Date(dataReformated);

    //     return dataChosenByClient < today

    // }
}

module.exports.clientsModel = clientsModel;
module.exports.createClients = createClients;
