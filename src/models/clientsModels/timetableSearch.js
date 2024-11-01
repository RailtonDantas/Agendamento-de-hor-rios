
const hoursModel = require("../adminModels/createHoursModel").hoursModel;
const lazyDayModel = require("../adminModels/lazyDaysModel").lazyDayModel;
const clientsModel = require("./createClients").clientsModel;

class searchingAvailableTimes{
    constructor(date){
        this.date = date;
    }

    async lookingForClientsOnThatDate(){
        const allClientsInThatDate = await clientsModel.find({date:this.date});
        const timetables = await hoursModel.find({openingHours:'funcionamento'})
        const {morningTables,afternoonTables,eveningTables} = timetables[0];
        const unavailableTimes = [];
        allClientsInThatDate.forEach((currentClient) => {
            unavailableTimes.push(currentClient.hour)
        })
        const availableMorningTimes = this.filterTimes(morningTables,unavailableTimes);
        const availableAfternoonTimes = this.filterTimes(afternoonTables,unavailableTimes);
        const availableEveningTimes = this.filterTimes(eveningTables,unavailableTimes);

        return [availableMorningTimes,availableAfternoonTimes,availableEveningTimes]
    }

    formatDate(data){
        const dataSplit = data.split("-");
        return `${dataSplit[2]}/${dataSplit[1]}/${dataSplit[0]}`
    }

    filterTimes(timetables,unavailableTimes){
        const availableTimes = [];
        for(let index = 0; index < timetables.length; index++){
            const currentTimetable = timetables[index];
            if(unavailableTimes.indexOf(currentTimetable) !== -1){
                continue
            }
            availableTimes.push(currentTimetable)
        }
        return availableTimes
    }
    verifyData(){
        const dataNotFormatted = this.date;
        const timeStamp = Date.now();
        let today = new Date(timeStamp).toLocaleDateString('pt-br',{
            dataStyle:'short',
            timeZone:'UTC',
        });
        const dataReformated = this.reformatDate(today)
        today = new Date(dataReformated)
        const dataChosenByClient = new Date(dataNotFormatted);

        return dataChosenByClient < today

    }
    isSunday(){
        const date = new Date(this.date)
        const day = date.getDay();
        return day == 0
    }
    reformatDate(data){
        const dataSplit = data.split("/");
        return `${dataSplit[2]}-${dataSplit[1]}-${dataSplit[0]}`
     }
    isSaturday(){
        const date = new Date(this.date);
        const day = date.getDay();
        return day == 6
    }
    async isLazyDay(){
        const date = new Date(this.date)
        console.log(date)
        const verifyIfThatDateIsLazyDay = await lazyDayModel.find({lazyDay:date})
        if(verifyIfThatDateIsLazyDay.length > 0){
            console.log(verifyIfThatDateIsLazyDay)
            return true
        }
        return false
    }
}
module.exports.searchingAvailableTimes = searchingAvailableTimes;