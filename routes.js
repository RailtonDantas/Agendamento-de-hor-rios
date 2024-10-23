const express = require('express');
const routes = express.Router();
const indexClientsControllers = require('./src/controllers/clientsControllers/indexControllers');
const clientSchedulingControllers = require("./src/controllers/clientsControllers/schedulingControllers");
const createClientsController = require("./src/controllers/clientsControllers/createClientsController");

const loginAdminControllers = require('./src/controllers/adminControllers/loginControllers');
const updateAdminControllers = require('./src/controllers/adminControllers/updatesControllers');
const listControllers = require("./src/controllers/adminControllers/listControllers");
const deleteControllers = require("./src/controllers/adminControllers/deleteController");
const lazyDaysControllers = require("./src/controllers/adminControllers/lazyDaysControllers");


routes.get('/', indexClientsControllers.renderIndexClient);
routes.get("/clientes/agendamento",clientSchedulingControllers.renderSchedulingPage);
routes.post("/clientes/clienteCriado",createClientsController.createClients);
routes.get('/clientes/clienteAgendado',createClientsController.renderPageScheduledClients)
routes.post("/clientes/consultandoHorarios",clientSchedulingControllers.validDate,clientSchedulingControllers.searchingAvailableTimes)


// rotas de admin
routes.get('/admin/login',loginAdminControllers.renderAdminLogin)
routes.post('/admin/index',loginAdminControllers.verifyAcessKey,loginAdminControllers.renderAdminIndex);
routes.get("/admin/index", loginAdminControllers.verifyAdmin ,(req,res,next) => {   
    res.render('indexAdmin')
    next()
}
);
routes.post('/admin/atualizarprecos',loginAdminControllers.verifyAdmin,updateAdminControllers.setNewPrices,updateAdminControllers.redirectAdminPage);
routes.get("/admin/listagemDeclientes",loginAdminControllers.verifyAdmin,listControllers.renderListClientsPage);
routes.get("/admin/deletarClientes/:id",deleteControllers.deleteClient);
routes.get("/admin/deletarTodos/:data",deleteControllers.deleteAllClientsInThatDay);
routes.post("/admin/diasDeFolga",lazyDaysControllers.saveDays)
routes.get('/admin/listarDias',lazyDaysControllers.listLazyDays)
routes.get("/admin/deletarDias/:id",lazyDaysControllers.deleteLazyDays)


module.exports.routes = routes;