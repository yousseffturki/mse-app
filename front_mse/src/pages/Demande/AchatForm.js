import React , { useState, useEffect } from "react"
import DemandesService from "../../service/DemandeSercice";


const AchatForm = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [data, setData] = useState({});
  




 

  const updateData = e => {
    setData({
        ...data,
        [e.target.name]: e.target.value,
        "isConfirmed":false,
    })

    console.log(data)
}

  const handleSubmit = async (event) => {
    event.preventDefault();
    setData({
      ...data
  });
  console.log(data);
  DemandesService.createDemande(data);
  alert("demande Crée");
  window.location.reload()
  };

  return (
    <div>
      <form>
      <div className="form-group">
        <label >Quantité</label>
        <input type="number" className="form-control" id="title" placeholder="quantite" name="quantite" onChange={(e) =>updateData(e)}/>
      </div>

  <div className="form-group">
    <label>Votre Demande</label>
    <textarea name="description" className="form-control" id="content" rows="3" onChange={(e) => updateData(e)}></textarea>
  </div>
  <button className=" mt-4 btn btn-primary" onClick={(e) => handleSubmit(e)}>Envoyer</button>
</form>
    </div>
  )
}

export default AchatForm
