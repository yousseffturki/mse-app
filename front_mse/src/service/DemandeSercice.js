import http from "../http-commons";

const getAll = () => {
  return http.get("/demandedachat");
};

const getDemandesByUser = () => {
    return http.get("/demandedachat/user");
}

const getDemandesById = id => {
    return http.get(`/demandedachat/${id}`);
}

const updateDemandes = (id, data) => {
    return http.put(`/demandedachat/${id}`, data);
  };

const deleteDemandes = id => {
    return http.delete(`/demandedachat/${id}`);
}

const createDemande = data => {
    return http.post("/demandedachat",data);
}

const modifStatus = (data,id) =>{
    
    return http.put(`/demandedachat/${id}`,data);
}
  


const DemandesService = {
    getAll,
    getDemandesById,
    getDemandesByUser,
    updateDemandes,
    deleteDemandes,
    createDemande,
    modifStatus
}


export default DemandesService;