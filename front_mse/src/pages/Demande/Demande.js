import React, { useState, useEffect } from "react";
import DemandesService from "../../service/DemandeSercice";
import { Link } from "react-router-dom";
import "./demande.css"




const DemandeList = () => {

  const [demandes, setDemandes] = useState([]);
  const [currentDemande, setCurrentDemande] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    retrieveDemandes();
  }, []);

  const retrieveDemandes = async () => {
     DemandesService.getAll()
      .then(response => {
        console.log(response.data.data)
        setDemandes(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const setActiveDemande = (demande, index) => {
    setCurrentDemande(demande);
    console.log(demande.Technician_on_duty);
    console.log("Current Demande " + currentDemande);
    setCurrentIndex(index);
  };

  const refreshList = () => {
    retrieveDemandes();
    setCurrentDemande(null);
    setCurrentIndex(-1);
  };


    return (
      
      <div className="list row">
   
      <div className="col">
        <ul className="list-group">
          {demandes &&
            demandes.map((demande, index) => (
              <li onClick={() => setActiveDemande(demande, index)}
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                key={index}
              >
                <div className="left-div">{demande.createdAt.slice(0,demande.createdAt.indexOf('T'))}
                </div>
                <div className="right-div">{demande.quantite}</div>
              </li>
            ))}
        </ul>

      </div>
      <div className="col demande">
        {currentDemande ? (
          <div>
            
            <div className="demande-container bg-white p-4">
            <div className="demande-row m-1">
              <div className="couleur">Description : </div>
              <div>{currentDemande.description}</div>
            </div>
            <div className="demande-row m-1">
              <div className="couleur"> Quantite : </div>
              <div>{currentDemande.quantite}</div>
            </div>
           
            </div>
            <Link
              to={"/demandes/" + currentDemande._id}
              className="badge button badge-warning"
            >
             
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Demande...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default DemandeList
