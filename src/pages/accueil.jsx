import { useState, useEffect } from "react";

export default function Accueil() {
  const [stats, setStats] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/api/stats_february.json")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  useEffect(() => {
    if (!stats) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1)%3);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats]);
  if (!stats) return <div className="accueil-page-container">Chargement...</div>;

 return (
    <div className="accueil-page-container">
  <div className="accueil-header">
    <h1>Bienvenue sur DofusHub</h1>
  </div>
  <div className="accueil-widgets-grid">
    <div className="accueil-card">
      <div className="carousel">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          <div className="carousel-slide">
            <h2 className="accueil-card-title">
              Classe la plus jouée en {stats.month}
            </h2>
            <div className="accueil-card-body">
              <img
                src={stats.mostPlayedClass.logo}
                alt={stats.mostPlayedClass.name}
                className="accueil-card-skin"
              />
            </div>
            <h3 className="accueil-class-name">
              {stats.mostPlayedClass.name}
            </h3>
            <p className="accueil-player-count">
              {stats.mostPlayedClass.played_last_month} joueurs
            </p>
          </div>
          <div className="carousel-slide">
            <h2 className="accueil-card-title">
              Répartition des rôles en {stats.month}
            </h2>
            <div className="accueil-card-body">
              <img
                src={stats.globalStats.roleDistribution.logo_damage}
                className="accueil-card-roles"
              />
            </div>
            <p>45% des joueurs</p>
            <div className="accueil-card-body">
              {stats.globalStats.roleDistribution.logo_support.map((logo_support, i) => (
                <img
                  key={i}
                  src={logo_support}
                  alt={`support-${i}`}
                  className="accueil-card-roles"
                />
              ))}
            </div>
            <p>30% des joueurs</p>
            <div className="accueil-card-body">
              <img
                src={stats.globalStats.roleDistribution.logo_tank}
                className="accueil-card-roles"
              />
            </div>
              <p>25% des joueurs</p>
          </div>
          <div className="carousel-slide"> 
          <h2 className="accueil-card-title">Statistiques PVP / PVM / PVE</h2> 

          <div className="accueil-card-body"> 
            <div className="accueil-extra-stat"> 

              <div className="accueil-extra-row"> 
                <span className="accueil-extra-label">Top PVP :&nbsp;</span>
                <span className="accueil-extra-value">
                  {stats.combatStats.pvp.topClass} – {stats.combatStats.pvp.winrate}% de winrate
                </span>
              </div> 

              <div className="accueil-extra-row"> 
                <span className="accueil-extra-label">Top PVM :&nbsp;</span>
                <span className="accueil-extra-value">
                  {stats.combatStats.pvm.topClass} – {stats.combatStats.pvm.usageRate}% d'utilisation
                </span>
              </div> 

              <div className="accueil-extra-row"> 
                <span className="accueil-extra-label">Top PVE :&nbsp;</span> 
                <span className="accueil-extra-value">
                  {stats.combatStats.pve.topClass} – {stats.combatStats.pve.role}
                </span> 
              </div> 

            </div> 
          </div> 
</div>
</div>
</div>
</div>
  </div>
</div>
);
}