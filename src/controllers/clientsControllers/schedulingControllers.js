const timeTableSearchModel = require("../../models/clientsModels/timetableSearch").searchingAvailableTimes;
module.exports.renderSchedulingPage = (req,res,next) => {
    res.render('clientsScheduling');
    next()
}
module.exports.searchingAvailableTimes = async (req,res,next) => {
    const timetableSearch = new timeTableSearchModel(req.body.inputDate);    
    const allTimes = await timetableSearch.lookingForClientsOnThatDate();
    const [morningTimes,afternoonTimes,eveningTimes] = allTimes;
    if(timetableSearch.isSaturday()){
        req.flash('availableMorningTimes','Aos sábados só funcionamos pela tarde')
        req.flash('availableAfternoonTimes',returnIfLengthGreaterZero(afternoonTimes,'Acabaram os horários da tarde'))
        req.flash('availableEveningTimes','Aos sábados só funcionamos pela tarde')
    }else{
        req.flash('availableMorningTimes',returnIfLengthGreaterZero(morningTimes,'Acabaram os horários da manhã'))
        req.flash('availableAfternoonTimes',returnIfLengthGreaterZero(afternoonTimes,'Acabaram os horários da tarde'))
        req.flash('availableEveningTimes',returnIfLengthGreaterZero(eveningTimes,'Acabaram os horários da noite'))
    }
    req.flash('date',formatDate(req.body.inputDate))
    req.session.save();
    res.redirect("/clientes/agendamento")
    next()
}
module.exports.validDate = async (req,res,next) => {
    const timetableSearch = new timeTableSearchModel(req.body.inputDate);
    if(timetableSearch.verifyData()){
        req.flash('invalidDate','Não dá pra marcar um horário em <br> um dia que já passou')
        req.session.save(() => {
            res.redirect("/clientes/agendamento")
            return
        })
        return 
    }
    if(timetableSearch.isSunday()){
        req.flash('notWorkInSunday','Nossa barbearia não funciona aos domingos!')
        req.session.save(() => {
            res.redirect("/clientes/agendamento")
            return
        })
        return 
    }
    if(await timetableSearch.isLazyDay()){
        req.flash('isLazyDay','A barbearia estará fechada nesse dia!');
        req.session.save(() => {
            res.redirect('/clientes/agendamento')
            return
        })
        return
    }
    next()
}

function returnIfLengthGreaterZero(times,msg){
    if(times.length > 0) return times 
    return msg
}

function formatDate(data){
    const dataSplit = data.split("-");
    return `${dataSplit[2]}/${dataSplit[1]}/${dataSplit[0]}`
}
