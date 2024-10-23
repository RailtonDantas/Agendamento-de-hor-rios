const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    lazyDay:{type:Date,require:true},
    reasonOfLazyDay:{type:String}
})
const lazyDaysModel = mongoose.model('Folga',schema);

class lazyDaysClass{
    constructor(body){
        Object.defineProperties(this,{
           lazyDay:{
            value:body.notWorkInThatDay,
            writable:false,
            enumerable:false,
            configurable:false
           },
           reasonOfLazyDay:{
            value:body.reasonForNotWork,
            writable:false,
            enumerable:false,
            configurable:false
           },
        })
        // this.lazyDay = new Date(body.notWorkInThatDay);
        // this.reasonOfLazyDay = body.reasonForNotWork;
    }


    async createLazyDayInDB(){
       const criado = await lazyDaysModel.create({
            lazyDay:this.lazyDay,
            reasonOfLazyDay:this.reasonOfLazyDay
       })
       console.log(criado)
    }
}

module.exports.lazyDaysClass = lazyDaysClass;
module.exports.lazyDayModel = lazyDaysModel;



// Cadastrar dias
// apagar dias
// atualizar dias 