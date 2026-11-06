export default function NotFound() {
  return (
    <section className="article nf">
      <div className="eyebrow">404</div>
      <h1>Página no encontrada · Page introuvable</h1>
      <p className="lead">Esta página no existe o ha cambiado de dirección. Cette page n’existe pas ou a changé d’adresse.</p>
      <div className="ctas" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <a className="btn" href="/es">Ir al inicio</a>
        <a className="btn ghost" href="/fr">Aller à l’accueil</a>
        <a className="btn ghost" href="/es/vivir-en-suiza">Vivir en Suiza: la guía</a>
      </div>
    </section>
  );
}
