const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    openingHours:{type:String,require:true},
    morningTables:{type:Array,require:true},
    afternoonTables:{type:Array,require:true},
    eveningTables:{type:Array,require:true}
})
const hoursModel = mongoose.model('horários',schema)
class CreateHours{
    static async createHours(){
        const hoursInDB = hoursModel.find({openingHours:'funcionamento'});
        if(hoursInDB.length >= 1) return
        await hoursModel.create({openingHours:'funcionamento',
            morningTables:['9:00','9:30','10:00','10:30','11:00','11:30','12:00'],
            afternoonTables:['15:00','15:30','16:00','16:30','17:00','17:30'],
            eveningTables:['18:00','18:30','19:00','19:30','20:00']
        })
    }
}
module.exports.hoursModel = hoursModel;
module.exports.CreateHours = CreateHours;