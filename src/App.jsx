import { useState } from "react";
import "./App.css";
import classData from "./data/classes.json";

function App() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [openSort, setOpenSort] = useState(null);
  const closeModal = () => {
    setOpenSort(null);
    setSelectedClass(null);
  };
  const changeClass = (direction) => {
    const currentIndex = classData.findIndex((c) => c.id === selectedClass.id);
    const newIndex =
      (currentIndex + direction + classData.length) % classData.length;

    setOpenSort(null);
    setSelectedClass(classData[newIndex]);
  };
  const renderStars = (value) =>
    Array.from({ length: value }, (_, i) => (
      <img
        key={i}
        src="/assets/stars/star.png"
        alt="star"
        className="star-icon"
      />
    ));

  return (
    <div>
      <h1>Encyclopédie des classes</h1>
      <div className="grid">
        {classData.map((race) => (
          <div key={race.id} className="card">
            <div className="card-header">
              <img src={race.logo_url} alt={race.nom} className="class-logo" />
              <h2>{race.nom}</h2>
              <span className="subtitle">{race.titre}</span>
            </div>
            <div className="card-body">
              <p className="description">{race.description}</p>
              <div className="info-row">
                <div className="roles-with-icons">
                  {race.roles.map((role, index) => (
                    <div key={role} className="role-item">
                      <img src={race.roles_url[index]} alt={role} className="role-icon"/>
                      <span className="tag">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button className="btn-details" 
              onClick={() => {
                setOpenSort(null);
                setSelectedClass(race);
              }}
            >
              Détails
            </button>
          </div>
        ))}
      </div>
      {selectedClass && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="nav-arrows" onClick={(e) => e.stopPropagation()}>
            <img src="/assets/fleche/fleche_gauche.png" alt="Précédent" className="arrow-btn left"
              onClick={() => changeClass(-1)}
            />
            <img src="/assets/fleche/fleche_droite.png" alt="Suivant" className="arrow-btn right"
              onClick={() => changeClass(1)}
            />
          </div>
          <div className="details-panel" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close" onClick={closeModal}>✖</button>
            <h2>{selectedClass.nom} - Sorts Principaux</h2>
            <div className="details-difficulty">
              Difficulté : {renderStars(selectedClass.difficulte)}
            </div>
            <div className="details-layout">
              <div className="left-column">
                {selectedClass.sorts_principaux?.map((sort, index) => (
                  <div
                    key={index}
                    className={`sort-item ${openSort === index ? "open" : ""}`}
                    onClick={() =>
                      setOpenSort(openSort === index ? null : index)
                    }
                  >
                    <div className="sort-header">
                      <img src={sort.logo_sort} alt={sort.nom}className="spell-logo"/>
                      <span>{sort.nom}</span>
                    </div>
                    <div className="sort-details">
                      <p><strong>Coût PA : </strong>{sort.cout_pa}</p>
                      <p><strong>Portée : </strong>{sort.portee}</p>
                      <p><strong>Critique : </strong>{sort.critique}</p>
                      <p><strong>Effets : </strong>{sort.effets}</p>
                      <div className="stats">
                        {Object.entries(sort.stats).map(([key, value]) => (
                          <p key={key}>
                            <strong>{key.replace("_", " ")} : </strong>
                            {value}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="right-column">
                <h3>Skins</h3>
                {selectedClass.skins?.length > 0 ? (
                  <div className="skins-grid">
                    {selectedClass.skins.map((skin, index) => (
                      <img key={index} src={skin} alt="skin" className="skin-img"/>
                    ))}
                  </div>
                ) : (
                  <p>Aucun skin disponible pour le moment</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
