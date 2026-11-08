/* Blog + "Vivir en Suiza" pillar page.
   To add a post: copy one object in POSTS, give it a unique slug, a date (YYYY-MM-DD),
   a title (t), a meta description (d), the body in Spanish and French, and optional FAQ.
   Links: "#guia-xxx", "#pais-xx", "#instalados-xx", "#blog-slug", "#vivir-en-suiza" become real URLs. */

export const PILLAR = {
  t: ['Vivir en Suiza en 2026: la guía completa en español', 'Vivre en Suisse en 2026 : le guide complet'],
  d: ['Cómo vivir en Suiza siendo latinoamericano o español: permisos, primeros pasos, costo de vida, trabajo, seguro médico e impuestos en Suiza romanda, explicado paso a paso.', 'Comment vivre en Suisse quand on vient d\'Amérique latine ou d\'Espagne : permis, premières démarches, coût de la vie, travail, assurance maladie et impôts en Suisse romande.'],
  updated: '2026-11-06',
  body: [
`<p class="lead">Vivir en Suiza es posible, pero el camino depende sobre todo de <b>tu pasaporte</b> y de <b>por qué vienes</b>. Esta guía resume lo esencial para instalarte en la Suiza romanda (Vaud, Ginebra, Valais, Friburgo, Neuchâtel y Jura), con enlaces a cada trámite explicado en detalle.</p>
<nav class="toc" aria-label="Índice"><b>En esta guía</b><ol><li><a href="#pasaporte">¿Puedo vivir en Suiza? Depende de tu pasaporte</a></li><li><a href="#permisos">Los permisos de residencia</a></li><li><a href="#llegada">Los primeros pasos al llegar</a></li><li><a href="#costo">Cuánto cuesta vivir en Suiza</a></li><li><a href="#trabajo">Trabajar en Suiza</a></li><li><a href="#idioma">El idioma</a></li><li><a href="#impuestos">Impuestos</a></li><li><a href="#faq">Preguntas frecuentes</a></li></ol></nav>
<h2 id="pasaporte">¿Puedo vivir en Suiza? Depende de tu pasaporte</h2>
<p><b>Si tienes pasaporte español o de otro país de la UE/AELE</b> (también con doble nacionalidad), te beneficias de la libre circulación: puedes venir a trabajar o a buscar trabajo y pedir tu permiso en la comuna. Es, de lejos, el camino más sencillo.</p>
<p><b>Si solo tienes pasaporte latinoamericano</b>, el acceso al mercado laboral es limitado. Para un contrato de trabajo, el empleador debe demostrar que no encontró a nadie en Suiza ni en la UE, y los permisos para estados terceros tienen un cupo anual (para 2026, 8.500 permisos en total: 4.500 B y 4.000 L). En la práctica se conceden sobre todo a perfiles muy cualificados. Las otras vías habituales son la <a href="#blog-reagrupacion-familiar-suiza">reagrupación familiar</a>, los estudios y la pareja con residencia en Suiza. Mira el detalle en <a href="#guia-visa">Visa D: vivir en Suiza fuera de la UE</a>.</p>
<h2 id="permisos">Los permisos de residencia</h2>
<ul><li><b>L</b>: corta duración, normalmente menos de un año.</li><li><b>B</b>: residencia, renovable. Es el permiso más común al llegar.</li><li><b>C</b>: establecimiento, después de varios años de residencia.</li><li><b>G</b>: trabajadores fronterizos que viven fuera de Suiza.</li><li><b>F, N, S</b>: admisión provisional, asilo y protección temporal.</li></ul>
<p>Qué significa cada letra y qué derechos da: <a href="#guia-permisos">Los permisos suizos: L, B, C, F, G</a>. Todo sobre el más común: <a href="#blog-permiso-b-suiza">Permiso B en Suiza: requisitos y cómo obtenerlo</a>.</p>
<h2 id="llegada">Los primeros pasos al llegar</h2>
<ol class="steplist"><li><b>Anúnciate en tu comuna</b> en los 14 días siguientes a tu llegada y antes de empezar a trabajar. <a href="#guia-comuna">Qué llevar</a>.</li><li><b>Contrata un seguro médico (LAMal)</b>: es obligatorio y tienes 3 meses desde tu llegada. <a href="#guia-lamal">Cómo elegirlo</a> y <a href="#guia-subsidio">si tienes derecho a subsidio</a>.</li><li><b>Abre una cuenta bancaria</b> y guarda tu número AVS (seguridad social), que aparece en tu tarjeta de seguro.</li><li><b>Prepara tus documentos de origen</b> (nacimiento, antecedentes, estado civil) con <a href="#guia-apostilla">apostilla</a> y <a href="#guia-traduccion">traducción</a>. Lo que pide cada país: <a href="#paises">documentos por país</a>.</li></ol>
<p>Todo sobre el seguro obligatorio, sus precios 2027 y cómo elegir en <a href="#blog-seguro-medico-suiza">Seguro médico en Suiza (LAMal)</a>.</p>
<h2 id="costo">Cuánto cuesta vivir en Suiza</h2>
<p>Suiza es cara, pero los salarios también son altos. Algunos órdenes de magnitud orientativos en la Suiza romanda (varían mucho según la ciudad y tu situación):</p>
<div class="tbl"><table><thead><tr><th>Gasto</th><th>Orden de magnitud</th></tr></thead><tbody><tr><td>Alquiler de un piso de 3,5 piezas en Lausana o Ginebra</td><td>CHF 1.800 – 2.800 al mes</td></tr><tr><td>Seguro médico básico por adulto</td><td>CHF 350 – 550 al mes según cantón, aseguradora y franquicia</td></tr><tr><td>Transporte público (abono local)</td><td>CHF 60 – 90 al mes</td></tr><tr><td>Garantía de alquiler</td><td>Hasta 3 meses de alquiler, una sola vez</td></tr></tbody></table></div>
<p>Más detalle en nuestro artículo <a href="#blog-cuanto-cuesta-vivir-en-suiza">¿Cuánto cuesta vivir en Suiza?</a> y ayudas posibles en <a href="#instalados-subsidios">subsidios</a>.</p>
<p>El alquiler es el mayor gasto: te explicamos cómo conseguir piso en <a href="#blog-encontrar-piso-ginebra-lausana">Encontrar piso en Ginebra o Lausana</a>.</p>
<h2 id="trabajo">Trabajar en Suiza</h2>
<p>En la Suiza romanda, el francés es casi siempre necesario. Algunos cantones (como Ginebra, Neuchâtel y Jura) tienen un salario mínimo cantonal, de unos 20 a 25 francos por hora según el cantón. Si tu diploma es extranjero, puede que necesites hacerlo reconocer para ciertas profesiones. Lee <a href="#blog-trabajar-en-suiza-sin-hablar-frances">¿Se puede trabajar en Suiza sin hablar francés?</a> y, si pierdes tu empleo, <a href="#instalados-trabajo">qué hacer con el paro</a>.</p>
<h2 id="idioma">El idioma</h2>
<p>Suiza tiene cuatro idiomas nacionales. En la Suiza romanda se vive en francés: cartas oficiales, contratos, escuela. Aprenderlo es la mejor inversión para tu integración, para tu trabajo y, más adelante, para renovar o mejorar tu permiso.</p>
<h2 id="impuestos">Impuestos</h2>
<p>Con permiso B y un salario, normalmente pagas el <a href="#guia-impuestos">impuesto en la fuente</a>: tu empleador lo descuenta directamente de tu sueldo. Con permiso C, o por encima de cierto ingreso, haces una declaración ordinaria.</p>
<div class="callout ok"><b>¿Prefieres que te lo expliquemos para tu caso?</b> Calcula gratis <a href="#ruta">tu ruta</a>: tu país, tu motivo y tu cantón, con tus pasos y tus documentos.</div>`,
`<p class="lead">Vivre en Suisse est possible, mais le chemin dépend surtout de <b>ton passeport</b> et de <b>la raison de ta venue</b>. Ce guide résume l'essentiel pour t'installer en Suisse romande (Vaud, Genève, Valais, Fribourg, Neuchâtel et Jura), avec des liens vers chaque démarche expliquée en détail.</p>
<nav class="toc" aria-label="Sommaire"><b>Dans ce guide</b><ol><li><a href="#pasaporte">Puis-je vivre en Suisse ? Ça dépend de ton passeport</a></li><li><a href="#permisos">Les permis de séjour</a></li><li><a href="#llegada">Les premières démarches</a></li><li><a href="#costo">Combien coûte la vie en Suisse</a></li><li><a href="#trabajo">Travailler en Suisse</a></li><li><a href="#idioma">La langue</a></li><li><a href="#impuestos">Les impôts</a></li><li><a href="#faq">Questions fréquentes</a></li></ol></nav>
<h2 id="pasaporte">Puis-je vivre en Suisse ? Ça dépend de ton passeport</h2>
<p><b>Avec un passeport espagnol ou d'un autre pays UE/AELE</b> (aussi en double nationalité), tu bénéficies de la libre circulation : tu peux venir travailler ou chercher un emploi et demander ton permis à la commune. C'est de loin le chemin le plus simple.</p>
<p><b>Avec seulement un passeport latino-américain</b>, l'accès au marché du travail est limité. Pour un contrat de travail, l'employeur doit prouver qu'il n'a trouvé personne en Suisse ni dans l'UE, et les permis pour États tiers sont contingentés (pour 2026, 8 500 permis au total : 4 500 B et 4 000 L). En pratique, ils vont surtout à des profils très qualifiés. Les autres voies habituelles sont le <a href="#blog-reagrupacion-familiar-suiza">regroupement familial</a>, les études et un·e partenaire résidant en Suisse. Détails : <a href="#guia-visa">Visa D : vivre en Suisse hors UE</a>.</p>
<h2 id="permisos">Les permis de séjour</h2>
<ul><li><b>L</b> : courte durée, en général moins d'un an.</li><li><b>B</b> : séjour, renouvelable. Le permis le plus courant à l'arrivée.</li><li><b>C</b> : établissement, après plusieurs années de séjour.</li><li><b>G</b> : frontaliers qui vivent hors de Suisse.</li><li><b>F, N, S</b> : admission provisoire, asile et protection temporaire.</li></ul>
<p>Ce que signifie chaque lettre et les droits qu'elle donne : <a href="#guia-permisos">Les permis suisses : L, B, C, F, G</a>. Tout sur le plus courant : <a href="#blog-permiso-b-suiza">Permis B en Suisse : conditions et démarches</a>.</p>
<h2 id="llegada">Les premières démarches</h2>
<ol class="steplist"><li><b>Annonce-toi à ta commune</b> dans les 14 jours suivant ton arrivée et avant de commencer à travailler. <a href="#guia-comuna">Quoi apporter</a>.</li><li><b>Prends une assurance maladie (LAMal)</b> : elle est obligatoire et tu as 3 mois depuis ton arrivée. <a href="#guia-lamal">Comment la choisir</a> et <a href="#guia-subsidio">si tu as droit à un subside</a>.</li><li><b>Ouvre un compte bancaire</b> et garde ton numéro AVS, qui figure sur ta carte d'assurance.</li><li><b>Prépare tes documents d'origine</b> (naissance, casier, état civil) avec <a href="#guia-apostilla">apostille</a> et <a href="#guia-traduccion">traduction</a>. Ce que demande chaque pays : <a href="#paises">documents par pays</a>.</li></ol>
<p>Tout sur l'assurance obligatoire, ses prix 2027 et comment choisir dans <a href="#blog-seguro-medico-suiza">Assurance maladie en Suisse (LAMal)</a>.</p>
<h2 id="costo">Combien coûte la vie en Suisse</h2>
<p>La Suisse est chère, mais les salaires sont élevés aussi. Quelques ordres de grandeur indicatifs en Suisse romande (très variables selon la ville et ta situation) :</p>
<div class="tbl"><table><thead><tr><th>Dépense</th><th>Ordre de grandeur</th></tr></thead><tbody><tr><td>Loyer d'un 3,5 pièces à Lausanne ou Genève</td><td>CHF 1 800 – 2 800 par mois</td></tr><tr><td>Assurance maladie de base par adulte</td><td>CHF 350 – 550 par mois selon canton, caisse et franchise</td></tr><tr><td>Transports publics (abonnement local)</td><td>CHF 60 – 90 par mois</td></tr><tr><td>Garantie de loyer</td><td>Jusqu'à 3 mois de loyer, une seule fois</td></tr></tbody></table></div>
<p>Plus de détails dans <a href="#blog-cuanto-cuesta-vivir-en-suiza">Combien coûte la vie en Suisse ?</a> et les aides possibles dans <a href="#instalados-subsidios">subsides</a>.</p>
<p>Le loyer est la plus grosse dépense : voir comment décrocher un logement dans <a href="#blog-encontrar-piso-ginebra-lausana">Trouver un appartement à Genève ou Lausanne</a>.</p>
<h2 id="trabajo">Travailler en Suisse</h2>
<p>En Suisse romande, le français est presque toujours nécessaire. Certains cantons (comme Genève, Neuchâtel et le Jura) ont un salaire minimum cantonal, d'environ 20 à 25 francs de l'heure selon le canton. Si ton diplôme est étranger, il faudra peut-être le faire reconnaître pour certaines professions. Lis <a href="#blog-trabajar-en-suiza-sin-hablar-frances">Peut-on travailler en Suisse sans parler français ?</a> et, si tu perds ton emploi, <a href="#instalados-trabajo">que faire avec le chômage</a>.</p>
<h2 id="idioma">La langue</h2>
<p>La Suisse a quatre langues nationales. En Suisse romande, on vit en français : courriers officiels, contrats, école. L'apprendre est le meilleur investissement pour ton intégration, ton travail et, plus tard, pour renouveler ou améliorer ton permis.</p>
<h2 id="impuestos">Les impôts</h2>
<p>Avec un permis B et un salaire, tu paies en général l'<a href="#guia-impuestos">impôt à la source</a> : ton employeur le retient directement sur ton salaire. Avec un permis C, ou au-dessus d'un certain revenu, tu fais une déclaration ordinaire.</p>
<div class="callout ok"><b>Tu préfères qu'on t'explique pour ton cas ?</b> Calcule gratuitement <a href="#ruta">ton parcours</a> : ton pays, ton motif et ton canton, avec tes étapes et tes documents.</div>`],
  faq: [
    [['¿Puedo ir a Suiza a buscar trabajo con pasaporte latinoamericano?', 'Puis-je aller en Suisse chercher du travail avec un passeport latino-américain ?'],
     ['Muchos países latinoamericanos pueden entrar sin visado hasta 90 días como turistas, pero eso no permite trabajar. Para trabajar necesitas un permiso, que el empleador solicita antes de tu llegada y que está sujeto a cupos. Buscar trabajo in situ rara vez lleva a un permiso.', 'Beaucoup de pays latino-américains peuvent entrer sans visa jusqu\'à 90 jours comme touristes, mais cela ne permet pas de travailler. Il faut un permis, demandé par l\'employeur avant ton arrivée et soumis à des contingents. Chercher du travail sur place mène rarement à un permis.']],
    [['¿Necesito hablar francés para vivir en Suiza romanda?', 'Faut-il parler français pour vivre en Suisse romande ?'],
     ['Para la vida diaria y casi todos los trabajos, sí. Además, el nivel de idioma cuenta para renovar o mejorar tu permiso y para la naturalización.', 'Pour la vie quotidienne et presque tous les emplois, oui. Le niveau de langue compte aussi pour renouveler ou améliorer ton permis et pour la naturalisation.']],
    [['¿El seguro médico es obligatorio?', 'L\'assurance maladie est-elle obligatoire ?'],
     ['Sí. Toda persona que vive en Suiza debe tener un seguro de base (LAMal) en los 3 meses siguientes a su llegada. Según tus ingresos, el cantón puede pagar una parte de la prima.', 'Oui. Toute personne qui vit en Suisse doit avoir une assurance de base (LAMal) dans les 3 mois suivant son arrivée. Selon tes revenus, le canton peut payer une partie de la prime.']],
    [['¿Existe una regularización para personas sin papeles?', 'Existe-t-il une régularisation pour les personnes sans papiers ?'],
     ['No hay regularización automática. Existen los llamados «casos de rigor», examinados uno por uno con criterios estrictos (años de estancia, integración, independencia económica). Consulta a una asociación o a un abogado antes de iniciar cualquier trámite.', 'Il n\'y a pas de régularisation automatique. Il existe des « cas de rigueur », examinés un par un selon des critères stricts (années de séjour, intégration, autonomie financière). Consulte une association ou un avocat avant toute démarche.']],
  ],
};

export const POSTS = [
  {
    slug: 'commandement-de-payer-que-hacer', date: '2026-11-08', cat: ['Trámites', 'Démarches'], img: 'integracion',
    st: ['Commandement de payer: qué hacer en 10 días', 'Commandement de payer : que faire en 10 jours'],
    t: ['Me llegó un «commandement de payer»: qué es y qué hacer en los 10 días', 'J\'ai reçu un commandement de payer : ce que c\'est et que faire dans les 10 jours'],
    d: ['Recibiste un commandement de payer en Suiza: qué significa, cómo hacer oposición gratis en 10 días, qué pasa si no haces nada y dónde pedir ayuda gratuita con tus deudas.', 'Tu as reçu un commandement de payer : ce que ça signifie, comment faire opposition gratuitement dans les 10 jours, ce qui se passe sinon et où trouver une aide gratuite.'],
    src: [
      [['Ginebra · Entender el procedimiento de cobro (poursuite)', 'Genève · Comprendre la procédure de poursuite'], 'https://www.ge.ch/node/33766'],
      [['Fedlex · Ley federal sobre la ejecución de deudas y la quiebra (LP)', 'Fedlex · Loi fédérale sur la poursuite pour dettes et la faillite (LP)'], 'https://www.fedlex.admin.ch/eli/cc/11/529_488_529/fr'],
      [['Oficina federal de justicia · Directiva sobre la no divulgación de una poursuite (PDF)', 'Office fédéral de la justice · Directive sur la non-divulgation d\'une poursuite (PDF)'], 'https://www.bj.admin.ch/dam/bj/fr/data/wirtschaft/schkg/weisungen/weisung-5-f.pdf.download.pdf/weisung-5-f.pdf'],
      [['CSP Ginebra · Vivir con deudas (PDF)', 'CSP Genève · Vivre avec ses dettes (PDF)'], 'https://csp.ch/wp-content/uploads/sites/5/2023/04/GE-Vivre-avec-ses-dettes.pdf'],
      [['Estado de Vaud · «Parlons cash»: ayuda en caso de deudas', 'État de Vaud · « Parlons cash » : aide en cas de dettes'], 'https://www.vd.ch/actualites/actualite/news/15006i-parlons-cash-le-besoin-de-conseils-en-cas-de-dettes-augmente-dans-le-canton-de-vaud'],
    ],
    body: [
`<div class="tldr"><b>En 30 segundos</b><ul><li>Un <b>commandement de payer</b> es la primera etapa de un cobro oficial (<i>poursuite</i>): alguien dice que le debes dinero y la oficina de cobros (<i>office des poursuites</i>) te lo notifica.</li><li>La oficina <b>no comprueba</b> si la deuda es real: cualquiera puede iniciar una poursuite.</li><li>Tienes <b>10 días</b> desde que lo recibes para hacer <b>oposición</b>, gratis y sin dar explicaciones, si no estás de acuerdo.</li><li>Si la deuda es justa: <b>paga o negocia un plan de pagos</b> cuanto antes, los gastos suben con cada etapa.</li><li>Si no haces nada, el acreedor puede pedir un <b>embargo</b> (<i>saisie</i>) sobre tu salario.</li></ul></div>
<h2>¿Qué es un commandement de payer?</h2>
<p>Es un documento oficial que te entrega la <b>oficina de cobros</b> de tu cantón (<i>office des poursuites</i>), a petición de alguien que dice que le debes dinero: tu seguro médico, un operador de teléfono, una tienda, tu antiguo arrendador, una empresa de cobros…</p>
<p>Lo recibes por correo certificado o te lo entrega un empleado de la oficina o de Correos. Indica <b>quién</b> te reclama (el acreedor), <b>cuánto</b> y <b>por qué</b>.</p>
<div class="callout"><b>Importante:</b> la oficina de cobros no verifica si la deuda existe. Un commandement de payer <b>no prueba</b> que debas ese dinero. Por eso existe la oposición.</div>
<h2>Tus 3 opciones</h2>
<div class="tbl"><table><thead><tr><th>Situación</th><th>Qué hacer</th></tr></thead><tbody>
<tr><td><b>La deuda es justa y puedes pagar</b></td><td>Paga el importe y los gastos (al acreedor o a la oficina de cobros) y guarda el justificante. Pide al acreedor que retire la poursuite.</td></tr>
<tr><td><b>La deuda es justa pero no puedes pagar todo</b></td><td>Llama o escribe al acreedor para proponer un <b>plan de pagos</b> por escrito. Pide ayuda gratuita (ver abajo).</td></tr>
<tr><td><b>No debes ese dinero, o no todo</b></td><td>Haz <b>oposición</b> en los <b>10 días</b>. Puedes oponerte a una parte del importe.</td></tr>
</tbody></table></div>
<h2>Cómo hacer oposición, paso a paso</h2>
<ol class="steplist">
<li><b>Mira la fecha en que lo recibiste.</b> Los 10 días empiezan a contar desde la notificación.</li>
<li><b>Declara tu oposición</b>: de palabra a la persona que te entrega el documento (que lo anota), o por escrito a la oficina de cobros que figura en el documento. Basta con escribir «Je fais opposition» con el número de poursuite, la fecha y tu firma.</li>
<li><b>No tienes que explicar por qué</b> y es <b>gratis</b>. Si te opones solo a una parte, indica el importe que reconoces.</li>
<li><b>Guarda una prueba</b>: carta certificada, copia sellada por la oficina o justificante de entrega.</li>
</ol>
<p>Con la oposición, el cobro <b>se detiene</b>. Si el acreedor quiere seguir, debe ir ante un juez para que levante tu oposición (<i>mainlevée</i>), y tiene para ello un año.</p>
<div class="callout"><b>Ojo:</b> si la deuda es justa, la oposición solo retrasa el problema y los gastos pueden aumentar (tribunal, intereses). En ese caso, negociar suele ser mejor.</div>
<h2>¿Qué pasa si no hago nada?</h2>
<p>Si no pagas y no haces oposición, el acreedor puede pedir que el cobro <b>continúe</b>. La oficina de cobros puede entonces hacer un <b>embargo</b> (<i>saisie</i>): normalmente una parte de tu salario se descuenta cada mes y se entrega al acreedor. La oficina te deja siempre el <b>mínimo vital</b> (lo necesario para vivir: alquiler, seguro médico, comida).</p>
<h2>El registro de deudas y tu búsqueda de piso</h2>
<p>Cada poursuite queda anotada en el <b>registro de deudas</b>, incluso si no debías nada. Y casi todas las agencias inmobiliarias piden un extracto de ese registro (ver <a href="#blog-encontrar-piso-ginebra-lausana">Encontrar piso en Ginebra o Lausana</a>).</p>
<p>Si hiciste oposición y el acreedor no hace nada, puedes pedir a la oficina, <b>al menos 3 meses</b> después de la notificación, que la poursuite <b>no aparezca</b> en los extractos. La oficina da entonces al acreedor <b>20 días</b> para demostrar que ha actuado contra tu oposición; si no lo hace, la poursuite deja de mostrarse a terceros.</p>
<h2>Ayuda gratuita si tienes deudas</h2>
<ul>
<li><b>Ginebra</b>: el Centre social protestant (<b>CSP</b>, 022 807 07 00) y <b>Caritas Ginebra</b> (022 708 04 44) ofrecen un acompañamiento gratuito por encargo del cantón: presupuesto, negociación con los acreedores, plan de desendeudamiento.</li>
<li><b>Vaud</b>: el <b>CSP Vaud</b> y <b>Caritas Vaud</b> responden gratis y de forma confidencial a tus preguntas sobre dinero y deudas, dentro del programa cantonal «Parlons cash».</li>
</ul>
<p>Y si no entiendes la carta o no sabes qué opción elegir, envíanosla: en el <a href="#club">Club</a>, una persona que trabaja en la administración suiza te la explica en español.</p>
<h2>Errores frecuentes</h2>
<ul><li><b>Dejar pasar los 10 días</b> esperando que el problema se arregle solo.</li><li><b>Hacer oposición por teléfono al acreedor</b>: la oposición se hace ante la oficina de cobros, no ante el acreedor.</li><li><b>Pagar al acreedor sin guardar el justificante</b> ni pedirle que retire la poursuite.</li><li><b>Ignorar los recordatorios anteriores</b>: un plan de pagos antes de la poursuite evita gastos y el registro.</li></ul>`,
`<div class="tldr"><b>En 30 secondes</b><ul><li>Un <b>commandement de payer</b> est la première étape d'un recouvrement officiel (<i>poursuite</i>) : quelqu'un affirme que tu lui dois de l'argent et l'office des poursuites te le notifie.</li><li>L'office <b>ne vérifie pas</b> si la dette existe : n'importe qui peut lancer une poursuite.</li><li>Tu as <b>10 jours</b> dès la réception pour faire <b>opposition</b>, gratuitement et sans motif, si tu n'es pas d'accord.</li><li>Si la dette est justifiée : <b>paie ou négocie un plan de paiement</b> au plus vite, les frais augmentent à chaque étape.</li><li>Si tu ne fais rien, le créancier peut demander une <b>saisie</b> sur ton salaire.</li></ul></div>
<h2>Qu'est-ce qu'un commandement de payer ?</h2>
<p>C'est un document officiel remis par l'<b>office des poursuites</b> de ton canton, à la demande de quelqu'un qui affirme que tu lui dois de l'argent : ton assurance maladie, un opérateur téléphonique, un magasin, ton ancien bailleur, une société de recouvrement…</p>
<p>Tu le reçois par courrier recommandé, ou il t'est remis par un employé de l'office ou de la Poste. Il indique <b>qui</b> te réclame (le créancier), <b>combien</b> et <b>pourquoi</b>.</p>
<div class="callout"><b>Important :</b> l'office des poursuites ne vérifie pas si la dette existe. Un commandement de payer <b>ne prouve pas</b> que tu dois cet argent. C'est pour ça que l'opposition existe.</div>
<h2>Tes 3 options</h2>
<div class="tbl"><table><thead><tr><th>Situation</th><th>Que faire</th></tr></thead><tbody>
<tr><td><b>La dette est justifiée et tu peux payer</b></td><td>Paie le montant et les frais (au créancier ou à l'office) et garde la preuve. Demande au créancier de retirer la poursuite.</td></tr>
<tr><td><b>La dette est justifiée mais tu ne peux pas tout payer</b></td><td>Appelle ou écris au créancier pour proposer un <b>plan de paiement</b> par écrit. Demande une aide gratuite (voir plus bas).</td></tr>
<tr><td><b>Tu ne dois pas cet argent, ou pas tout</b></td><td>Fais <b>opposition</b> dans les <b>10 jours</b>. Tu peux t'opposer à une partie du montant.</td></tr>
</tbody></table></div>
<h2>Faire opposition, étape par étape</h2>
<ol class="steplist">
<li><b>Regarde la date de réception.</b> Les 10 jours courent dès la notification.</li>
<li><b>Déclare ton opposition</b> : oralement à la personne qui te remet le document (elle l'inscrit), ou par écrit à l'office des poursuites indiqué sur le document. Il suffit d'écrire « Je fais opposition » avec le numéro de poursuite, la date et ta signature.</li>
<li><b>Tu n'as pas à te justifier</b> et c'est <b>gratuit</b>. Si tu t'opposes seulement à une partie, indique le montant que tu reconnais.</li>
<li><b>Garde une preuve</b> : lettre recommandée, copie timbrée par l'office ou accusé de remise.</li>
</ol>
<p>Avec l'opposition, la poursuite <b>s'arrête</b>. Si le créancier veut continuer, il doit demander à un juge de lever ton opposition (<i>mainlevée</i>), et il a un an pour le faire.</p>
<div class="callout"><b>Attention :</b> si la dette est justifiée, l'opposition ne fait que repousser le problème et les frais peuvent augmenter (tribunal, intérêts). Dans ce cas, négocier est souvent mieux.</div>
<h2>Que se passe-t-il si je ne fais rien ?</h2>
<p>Si tu ne paies pas et ne fais pas opposition, le créancier peut demander la <b>continuation</b> de la poursuite. L'office peut alors procéder à une <b>saisie</b> : en général, une partie de ton salaire est retenue chaque mois et versée au créancier. L'office te laisse toujours le <b>minimum vital</b> (le nécessaire pour vivre : loyer, assurance maladie, nourriture).</p>
<h2>Le registre des poursuites et ta recherche de logement</h2>
<p>Chaque poursuite est inscrite au <b>registre des poursuites</b>, même si tu ne devais rien. Et presque toutes les régies demandent un extrait de ce registre (voir <a href="#blog-encontrar-piso-ginebra-lausana">Trouver un appartement à Genève ou Lausanne</a>).</p>
<p>Si tu as fait opposition et que le créancier ne fait rien, tu peux demander à l'office, <b>au moins 3 mois</b> après la notification, que la poursuite <b>ne figure plus</b> sur les extraits. L'office donne alors <b>20 jours</b> au créancier pour prouver qu'il a agi contre ton opposition ; sinon, la poursuite n'est plus communiquée aux tiers.</p>
<h2>Aide gratuite en cas de dettes</h2>
<ul>
<li><b>Genève</b> : le Centre social protestant (<b>CSP</b>, 022 807 07 00) et <b>Caritas Genève</b> (022 708 04 44) proposent un accompagnement gratuit sur mandat du canton : budget, négociation avec les créanciers, plan de désendettement.</li>
<li><b>Vaud</b> : le <b>CSP Vaud</b> et <b>Caritas Vaud</b> répondent gratuitement et en toute confidentialité à tes questions d'argent et de dettes, dans le cadre du programme cantonal « Parlons cash ».</li>
</ul>
<p>Et si tu ne comprends pas le courrier ou ne sais pas quelle option choisir, envoie-le-nous : dans le <a href="#club">Club</a>, une personne qui travaille dans l'administration suisse te l'explique.</p>
<h2>Erreurs fréquentes</h2>
<ul><li><b>Laisser passer les 10 jours</b> en espérant que le problème se règle tout seul.</li><li><b>Faire opposition par téléphone au créancier</b> : l'opposition se fait auprès de l'office des poursuites, pas du créancier.</li><li><b>Payer le créancier sans garder de preuve</b> ni lui demander de retirer la poursuite.</li><li><b>Ignorer les rappels précédents</b> : un plan de paiement avant la poursuite évite des frais et l'inscription au registre.</li></ul>`],
    faq: [
      [['¿Cuánto tiempo tengo para hacer oposición a un commandement de payer?', 'Combien de temps ai-je pour faire opposition à un commandement de payer ?'], ['10 días desde que lo recibes. La oposición es gratuita, puede hacerse de palabra a quien te entrega el documento o por escrito a la oficina de cobros, y no tienes que dar explicaciones.', '10 jours dès la réception. L\'opposition est gratuite, peut se faire oralement à la personne qui remet le document ou par écrit à l\'office des poursuites, et tu n\'as pas à te justifier.']],
      [['¿La oficina de cobros comprueba que debo el dinero?', 'L\'office des poursuites vérifie-t-il que je dois l\'argent ?'], ['No. Cualquiera puede iniciar una poursuite. Por eso, si no debes ese dinero, debes hacer oposición en los 10 días.', 'Non. N\'importe qui peut lancer une poursuite. C\'est pourquoi, si tu ne dois pas cet argent, tu dois faire opposition dans les 10 jours.']],
      [['¿Qué pasa si no hago nada?', 'Que se passe-t-il si je ne fais rien ?'], ['El acreedor puede pedir que el cobro continúe y la oficina puede embargar una parte de tu salario, dejándote el mínimo vital.', 'Le créancier peut demander la continuation de la poursuite et l\'office peut saisir une partie de ton salaire, en te laissant le minimum vital.']],
      [['¿Una poursuite me impide alquilar un piso?', 'Une poursuite m\'empêche-t-elle de louer un appartement ?'], ['Puede complicarlo, porque aparece en el extracto del registro de deudas que piden las agencias. Si hiciste oposición y el acreedor no actúa, puedes pedir después de 3 meses que no se muestre más.', 'Elle peut compliquer les choses, car elle figure sur l\'extrait du registre des poursuites demandé par les régies. Si tu as fait opposition et que le créancier n\'agit pas, tu peux demander après 3 mois qu\'elle ne soit plus communiquée.']],
    ],
  },
  {
    slug: 'no-puedo-pagar-una-factura-suiza', date: '2026-11-08', cat: ['Trámites', 'Démarches'], img: 'primas',
    st: ['No puedo pagar una factura en Suiza: qué hacer', 'Je ne peux pas payer une facture en Suisse'],
    t: ['No puedo pagar una factura en Suiza: qué hacer antes de que llegue la poursuite', 'Je ne peux pas payer une facture en Suisse : que faire avant la poursuite'],
    d: ['Factura del seguro médico, de impuestos o del alquiler que no puedes pagar: cómo funcionan los recordatorios, cómo pedir un plan de pagos y dónde encontrar ayuda gratuita en Ginebra y Vaud.', 'Facture d\'assurance maladie, d\'impôts ou de loyer impossible à payer : comment fonctionnent les rappels, demander un plan de paiement et trouver une aide gratuite à Genève et Vaud.'],
    src: [
      [['Fedlex · Ley del seguro médico (LAMal), art. 64a: primas impagadas', 'Fedlex · Loi sur l\'assurance-maladie (LAMal), art. 64a : primes impayées'], 'https://www.fedlex.admin.ch/eli/cc/1995/1328_1328_1328/fr'],
      [['Helsana · Recordatorio y poursuite de las primas', 'Helsana · Sommation et poursuite des primes'], 'https://www.helsana.ch/fr/prives/service-clients/tout-sur-les-finances/procedure-dencaissement-des-primes'],
      [['Ginebra · Entender el procedimiento de cobro', 'Genève · Comprendre la procédure de poursuite'], 'https://www.ge.ch/node/33766'],
      [['CSP Ginebra · Vivir con deudas (PDF)', 'CSP Genève · Vivre avec ses dettes (PDF)'], 'https://csp.ch/wp-content/uploads/sites/5/2023/04/GE-Vivre-avec-ses-dettes.pdf'],
      [['Estado de Vaud · «Parlons cash»', 'État de Vaud · « Parlons cash »'], 'https://www.vd.ch/actualites/actualite/news/15006i-parlons-cash-le-besoin-de-conseils-en-cas-de-dettes-augmente-dans-le-canton-de-vaud'],
    ],
    body: [
`<div class="tldr"><b>En 30 segundos</b><ul><li><b>No ignores la factura</b>: en Suiza, el camino normal es factura, recordatorio (<i>rappel</i>), intimación (<i>sommation</i>) y después cobro oficial (<i>poursuite</i>), con gastos cada vez.</li><li><b>Escribe al acreedor antes de la fecha límite</b> y propón un <b>plan de pagos</b> realista. La mayoría acepta.</li><li><b>Paga primero lo esencial</b>: alquiler, seguro médico e impuestos.</li><li>Comprueba si tienes derecho a un <b>subsidio del seguro médico</b> o a otras ayudas.</li><li>En Ginebra y Vaud hay <b>ayuda gratuita</b> para ordenar tu presupuesto y negociar con los acreedores.</li></ul></div>
<h2>Cómo funciona el cobro en Suiza</h2>
<p>Cuando no pagas una factura a tiempo, casi siempre pasa esto:</p>
<ol class="steplist">
<li><b>Recordatorio</b> (<i>rappel</i>): un aviso amable, a veces ya con unos francos de gastos.</li>
<li><b>Intimación</b> (<i>sommation</i>, «dernier rappel»): un último plazo, a menudo con gastos más altos.</li>
<li><b>Poursuite</b>: el acreedor pide a la oficina de cobros que te envíe un <a href="#blog-commandement-de-payer-que-hacer">commandement de payer</a>. La deuda queda anotada en el registro de deudas.</li>
<li><b>Embargo</b> (<i>saisie</i>) sobre tu salario si no pagas ni haces oposición.</li>
</ol>
<p>Cuanto antes actúes, más barato y más fácil será. Lo ideal es hablar con el acreedor <b>antes</b> de la poursuite: así evitas los gastos y la anotación en el registro, que complica luego la búsqueda de piso.</p>
<h2>Paso a paso para pedir un plan de pagos</h2>
<ol class="steplist">
<li><b>Haz tu presupuesto</b>: lo que entra y lo que sale cada mes. Así sabrás cuánto puedes pagar de verdad.</li>
<li><b>Escribe al acreedor</b> (correo o carta) <b>antes de la fecha límite</b>: número de factura, explicación corta («he tenido una baja de ingresos») y tu propuesta, por ejemplo «100 CHF al mes a partir del 1 de diciembre».</li>
<li><b>Pide la confirmación por escrito</b> y guárdala.</li>
<li><b>Respeta el plan</b>. Si un mes no puedes, avisa antes, no después.</li>
</ol>
<div class="callout"><b>Consejo:</b> una propuesta pequeña pero regular vale más que una promesa grande que no podrás cumplir. Los acreedores prefieren cobrar poco a poco que iniciar una poursuite.</div>
<h2>Según el tipo de factura</h2>
<h3>Seguro médico (LAMal)</h3>
<p>Tu caja debe enviarte al menos un recordatorio por escrito y después una intimación; si sigues sin pagar, debe iniciar una poursuite. La deuda sigue siendo tuya aunque el cantón cubra después una parte de las pérdidas de la caja. Antes de llegar ahí:</p>
<ul><li>Pide a tu caja un <b>plan de pagos</b>.</li><li>Comprueba si tienes derecho al <b>subsidio</b>, que baja tu prima cada mes: <a href="#guia-subsidio">guía del subsidio</a>.</li><li>Para el año siguiente, compara las primas y cambia de caja antes del 30 de noviembre: <a href="#blog-seguro-medico-suiza">guía del seguro médico</a> y la herramienta <a href="#herramienta-franquicia">¿Qué franquicia me conviene?</a>.</li></ul>
<h3>Impuestos</h3>
<p>Si no puedes pagar a tiempo tus impuestos, escribe a la administración fiscal de tu cantón <b>antes del vencimiento</b> para pedir un <b>plazo o un pago a plazos</b>. En situaciones graves y duraderas existe también la posibilidad de pedir una reducción (<i>remise</i>). Más información en <a href="#blog-carta-de-impuestos-suiza">Entender una carta de impuestos</a>.</p>
<h3>Alquiler</h3>
<p>El alquiler es la factura <b>más urgente</b>: un retraso puede llevar a la rescisión del contrato. Habla de inmediato con tu agencia (<i>régie</i>) y pide ayuda al servicio social de tu comuna si no puedes pagarlo.</p>
<h3>Teléfono, compras, créditos</h3>
<p>Son las facturas que puedes <b>dejar para después</b> si tienes que elegir. Negocia un plan, anula los servicios que no necesitas y desconfía de los créditos para pagar otras deudas.</p>
<h2>Ayuda gratuita en Ginebra y Vaud</h2>
<ul>
<li><b>Ginebra</b>: el <b>CSP</b> (022 807 07 00) y <b>Caritas Ginebra</b> (022 708 04 44) te acompañan gratis por encargo del cantón: presupuesto, negociación con los acreedores, plan de desendeudamiento.</li>
<li><b>Vaud</b>: el <b>CSP Vaud</b> y <b>Caritas Vaud</b> responden gratis y con confidencialidad, dentro del programa cantonal «Parlons cash».</li>
<li><b>Tu comuna</b>: el servicio social puede ayudarte con las facturas urgentes, en particular el alquiler. Ver <a href="#instalados-social">Ayuda social y tu permiso</a>.</li>
</ul>
<h2>Errores frecuentes</h2>
<ul><li><b>Guardar las cartas sin abrirlas</b>: los plazos corren igual.</li><li><b>Prometer un plan imposible</b> y dejar de pagar al segundo mes.</li><li><b>Pagar primero las compras y dejar el alquiler</b> o el seguro médico.</li><li><b>Pedir un crédito</b> para pagar otras deudas sin ayuda profesional.</li></ul>`,
`<div class="tldr"><b>En 30 secondes</b><ul><li><b>N'ignore pas la facture</b> : en Suisse, le chemin habituel est facture, rappel, sommation, puis recouvrement officiel (<i>poursuite</i>), avec des frais à chaque fois.</li><li><b>Écris au créancier avant l'échéance</b> et propose un <b>plan de paiement</b> réaliste. La plupart acceptent.</li><li><b>Paie d'abord l'essentiel</b> : loyer, assurance maladie et impôts.</li><li>Vérifie si tu as droit à un <b>subside d'assurance maladie</b> ou à d'autres aides.</li><li>À Genève et dans le canton de Vaud, il existe une <b>aide gratuite</b> pour faire ton budget et négocier avec les créanciers.</li></ul></div>
<h2>Comment fonctionne le recouvrement en Suisse</h2>
<p>Quand tu ne paies pas une facture à temps, voici presque toujours ce qui se passe :</p>
<ol class="steplist">
<li><b>Rappel</b> : un avis aimable, parfois déjà avec quelques francs de frais.</li>
<li><b>Sommation</b> (« dernier rappel ») : un dernier délai, souvent avec des frais plus élevés.</li>
<li><b>Poursuite</b> : le créancier demande à l'office des poursuites de t'envoyer un <a href="#blog-commandement-de-payer-que-hacer">commandement de payer</a>. La dette est inscrite au registre des poursuites.</li>
<li><b>Saisie</b> sur ton salaire si tu ne paies pas et ne fais pas opposition.</li>
</ol>
<p>Plus tu agis tôt, moins c'est cher et plus c'est simple. L'idéal est de parler au créancier <b>avant</b> la poursuite : tu évites les frais et l'inscription au registre, qui complique ensuite la recherche de logement.</p>
<h2>Demander un plan de paiement, étape par étape</h2>
<ol class="steplist">
<li><b>Fais ton budget</b> : ce qui entre et ce qui sort chaque mois. Tu sauras ce que tu peux vraiment payer.</li>
<li><b>Écris au créancier</b> (e-mail ou lettre) <b>avant l'échéance</b> : numéro de facture, courte explication (« j'ai eu une baisse de revenus ») et ta proposition, par exemple « 100 CHF par mois dès le 1er décembre ».</li>
<li><b>Demande une confirmation écrite</b> et garde-la.</li>
<li><b>Respecte le plan</b>. Si un mois tu ne peux pas, préviens avant, pas après.</li>
</ol>
<div class="callout"><b>Conseil :</b> une petite proposition régulière vaut mieux qu'une grosse promesse impossible à tenir. Les créanciers préfèrent être payés petit à petit plutôt que de lancer une poursuite.</div>
<h2>Selon le type de facture</h2>
<h3>Assurance maladie (LAMal)</h3>
<p>Ta caisse doit t'envoyer au moins un rappel écrit puis une sommation ; si tu ne paies toujours pas, elle doit engager une poursuite. La dette reste la tienne même si le canton couvre ensuite une partie des pertes de la caisse. Avant d'en arriver là :</p>
<ul><li>Demande à ta caisse un <b>plan de paiement</b>.</li><li>Vérifie si tu as droit au <b>subside</b>, qui baisse ta prime chaque mois : <a href="#guia-subsidio">guide du subside</a>.</li><li>Pour l'année suivante, compare les primes et change de caisse avant le 30 novembre : <a href="#blog-seguro-medico-suiza">guide de l'assurance maladie</a> et l'outil <a href="#herramienta-franquicia">Quelle franchise choisir ?</a>.</li></ul>
<h3>Impôts</h3>
<p>Si tu ne peux pas payer tes impôts à temps, écris à l'administration fiscale de ton canton <b>avant l'échéance</b> pour demander un <b>délai ou un paiement échelonné</b>. En cas de difficultés graves et durables, il est aussi possible de demander une remise. Plus d'infos dans <a href="#blog-carta-de-impuestos-suiza">Comprendre un courrier des impôts</a>.</p>
<h3>Loyer</h3>
<p>Le loyer est la facture <b>la plus urgente</b> : un retard peut mener à la résiliation du bail. Parle tout de suite à ta régie et demande de l'aide au service social de ta commune si tu ne peux pas le payer.</p>
<h3>Téléphone, achats, crédits</h3>
<p>Ce sont les factures que tu peux <b>faire passer après</b> s'il faut choisir. Négocie un plan, résilie les services inutiles et méfie-toi des crédits pour payer d'autres dettes.</p>
<h2>Aide gratuite à Genève et dans le canton de Vaud</h2>
<ul>
<li><b>Genève</b> : le <b>CSP</b> (022 807 07 00) et <b>Caritas Genève</b> (022 708 04 44) t'accompagnent gratuitement sur mandat du canton : budget, négociation avec les créanciers, plan de désendettement.</li>
<li><b>Vaud</b> : le <b>CSP Vaud</b> et <b>Caritas Vaud</b> répondent gratuitement et en toute confidentialité, dans le cadre du programme cantonal « Parlons cash ».</li>
<li><b>Ta commune</b> : le service social peut t'aider pour les factures urgentes, notamment le loyer. Voir <a href="#instalados-social">Aide sociale et ton permis</a>.</li>
</ul>
<h2>Erreurs fréquentes</h2>
<ul><li><b>Garder les lettres sans les ouvrir</b> : les délais courent quand même.</li><li><b>Promettre un plan impossible</b> et arrêter de payer au deuxième mois.</li><li><b>Payer d'abord les achats et laisser le loyer</b> ou l'assurance maladie.</li><li><b>Prendre un crédit</b> pour payer d'autres dettes sans aide professionnelle.</li></ul>`],
    faq: [
      [['¿Qué pasa si no pago una factura en Suiza?', 'Que se passe-t-il si je ne paie pas une facture en Suisse ?'], ['Recibes un recordatorio, después una intimación con gastos, y el acreedor puede iniciar una poursuite: un commandement de payer que queda anotado en el registro de deudas.', 'Tu reçois un rappel, puis une sommation avec des frais, et le créancier peut lancer une poursuite : un commandement de payer inscrit au registre des poursuites.']],
      [['¿Puedo pagar mi seguro médico a plazos?', 'Puis-je payer mon assurance maladie en plusieurs fois ?'], ['Sí, pídelo por escrito a tu caja antes de que inicie la poursuite. Comprueba también si tienes derecho al subsidio, que reduce tu prima.', 'Oui, demande-le par écrit à ta caisse avant qu\'elle n\'engage une poursuite. Vérifie aussi si tu as droit au subside, qui réduit ta prime.']],
      [['¿Dónde encuentro ayuda gratuita con mis deudas?', 'Où trouver une aide gratuite pour mes dettes ?'], ['En Ginebra, en el CSP (022 807 07 00) y Caritas Ginebra (022 708 04 44). En Vaud, en el CSP Vaud y Caritas Vaud (programa «Parlons cash»). También en el servicio social de tu comuna.', 'À Genève, au CSP (022 807 07 00) et chez Caritas Genève (022 708 04 44). Dans le canton de Vaud, au CSP Vaud et chez Caritas Vaud (programme « Parlons cash »). Et au service social de ta commune.']],
      [['¿Qué factura pago primero si no me alcanza?', 'Quelle facture payer en premier si je n\'ai pas assez ?'], ['Primero el alquiler, el seguro médico y los impuestos. Después el teléfono, las compras y los créditos, para los que conviene negociar un plan.', 'D\'abord le loyer, l\'assurance maladie et les impôts. Ensuite le téléphone, les achats et les crédits, pour lesquels il vaut mieux négocier un plan.']],
    ],
  },
  {
    slug: 'carta-de-impuestos-suiza', date: '2026-11-08', cat: ['Trámites', 'Démarches'], img: 'votacion',
    st: ['Carta de impuestos en Suiza: cuál es y qué hacer', 'Courrier des impôts en Suisse : lequel et que faire'],
    t: ['Me llegó una carta de impuestos en Suiza: cómo saber qué es y qué hacer', 'J\'ai reçu un courrier des impôts en Suisse : comment savoir ce que c\'est et que faire'],
    d: ['Declaración, acomptes, taxation, sommation, impuesto en la fuente: aprende a reconocer cada carta de impuestos en Ginebra y Vaud, sus plazos (30 días, 31 de marzo) y qué hacer.', 'Déclaration, acomptes, taxation, sommation, impôt à la source : reconnais chaque courrier des impôts à Genève et Vaud, ses délais (30 jours, 31 mars) et que faire.'],
    src: [
      [['Ginebra · Rellenar mi declaración de impuestos', 'Genève · Remplir ma déclaration d\'impôt'], 'https://www.ge.ch/remplir-ma-declaration-impot'],
      [['Estado de Vaud · Impuestos de las personas', 'État de Vaud · Impôts pour les individus'], 'https://www.vd.ch/etat-droit-finances/impots/impots-pour-les-individus'],
      [['Ginebra · Rectificación o tributación ordinaria posterior (impuesto en la fuente)', 'Genève · Demande de rectification ou taxation ordinaire ultérieure'], 'https://www.ge.ch/node/22906'],
      [['Estado de Vaud · Personas que pagan el impuesto en la fuente', 'État de Vaud · Personnes imposées à la source'], 'https://www.vd.ch/etat-droit-finances/impots/pour-les-employeurs/impot-a-la-source/personnes-imposees-a-la-source-/-sourciers'],
      [['Fedlex · Ley del impuesto federal directo (LIFD), art. 132: reclamación', 'Fedlex · Loi sur l\'impôt fédéral direct (LIFD), art. 132 : réclamation'], 'https://www.fedlex.admin.ch/eli/cc/1991/1184_1184_1184/fr'],
    ],
    body: [
`<div class="tldr"><b>En 30 segundos</b><ul><li>Hay <b>5 cartas de impuestos</b> que debes saber reconocer: la declaración, los anticipos (<i>acomptes</i>), la tasación (<i>taxation</i>), la intimación (<i>sommation</i>) y las del impuesto en la fuente.</li><li>Busca siempre <b>la fecha límite</b> en la carta y la <b>fecha en que la recibiste</b>.</li><li>Si no estás de acuerdo con tu tasación, tienes <b>30 días</b> desde la notificación para hacer una <b>reclamación</b> por escrito.</li><li>Si pagas el impuesto en la fuente, puedes pedir una corrección o una tributación ordinaria hasta el <b>31 de marzo</b> del año siguiente.</li><li>Nunca ignores una <b>sommation</b>: si no respondes, el fisco calcula tu impuesto por su cuenta y puede ponerte una multa.</li></ul></div>
<h2>Las 5 cartas más frecuentes</h2>
<div class="tbl"><table><thead><tr><th>Lo que pone la carta</th><th>Qué es</th><th>Qué hacer</th></tr></thead><tbody>
<tr><td><b>Déclaration d'impôt</b></td><td>El formulario para declarar tus ingresos y tu patrimonio del año anterior.</td><td>Rellénala antes del plazo: Vaud, 15 de marzo; Ginebra, 31 de marzo. Se puede pedir una prórroga.</td></tr>
<tr><td><b>Acomptes / bordereau d'acomptes</b></td><td>Anticipos calculados sobre una estimación de tu impuesto.</td><td>Pagarlos en las fechas indicadas. Si tus ingresos cambiaron mucho, pide que los adapten.</td></tr>
<tr><td><b>Décision / bordereau de taxation</b></td><td>El cálculo definitivo de tu impuesto, hecho por el fisco.</td><td>Compáralo con tu declaración. Si hay un error, <b>reclamación en 30 días</b>.</td></tr>
<tr><td><b>Sommation</b></td><td>Una intimación: no enviaste tu declaración o un documento.</td><td>Responde enseguida. Si no, tasación de oficio y posible multa.</td></tr>
<tr><td><b>Impôt à la source</b></td><td>Tu impuesto se descuenta directamente de tu salario.</td><td>Revisa tu certificado. Corrección o tributación ordinaria hasta el 31 de marzo del año siguiente.</td></tr>
</tbody></table></div>
<h2>La declaración de impuestos</h2>
<p>Si no pagas el impuesto en la fuente, recibes cada año una declaración para los ingresos del año anterior. El plazo habitual es el <b>15 de marzo en Vaud</b> y el <b>31 de marzo en Ginebra</b>, y en ambos cantones se puede pedir una prórroga. Calcula tus fechas con la herramienta <a href="#herramienta-plazos">Mis plazos al llegar</a>.</p>
<p>Ten preparados: tu certificado de salario, la póliza y las facturas del seguro médico, los extractos bancarios al 31 de diciembre, los gastos de guardería y de transporte y, si tienes, los pagos del 3.er pilar. Más detalles en nuestra guía <a href="#guia-impuestos">Impuestos en Suiza</a>.</p>
<h2>La tasación: compruébala y reclama si hace falta</h2>
<p>Unos meses después de tu declaración recibes la <b>décision de taxation</b> (o <i>bordereau</i>): es el cálculo oficial. Compara los importes con tu declaración: ingresos, deducciones, número de hijos.</p>
<p>Si hay un error o no estás de acuerdo, tienes <b>30 días desde la notificación</b> para hacer una <b>reclamación</b> por escrito a la administración fiscal que la emitió. Explica qué está mal y adjunta las pruebas. Pasados los 30 días, solo se acepta en casos excepcionales (enfermedad grave, ausencia del país…).</p>
<div class="callout"><b>Ojo:</b> el plazo empieza cuando recibes la carta, no en la fecha impresa en ella. Guarda el sobre o anota el día de recepción.</div>
<h2>Si pagas el impuesto en la fuente</h2>
<p>Muchas personas con permiso B pagan el impuesto <b>directamente de su salario</b> (<i>impôt à la source</i>). En general no hacen declaración, pero:</p>
<ul><li>Si crees que te han descontado demasiado, o quieres hacer valer deducciones (3.er pilar, gastos), puedes pedir una <b>corrección</b> o una <b>tributación ordinaria posterior</b> (<i>TOU</i>) a más tardar el <b>31 de marzo</b> del año siguiente. Este plazo no se puede prorrogar.</li><li>La TOU es <b>irrevocable</b>: una vez pedida, se mantiene en los años siguientes, aunque resulte más cara. Calcula antes o pide consejo.</li><li>Por encima de cierto salario (por ejemplo, 120.000 CHF brutos al año en Ginebra), la tributación ordinaria es <b>obligatoria</b>.</li></ul>
<h2>La sommation: no la ignores</h2>
<p>Una sommation significa que el fisco espera algo de ti: tu declaración o un documento. Si no respondes en el plazo, te calcula el impuesto <b>de oficio</b>, a menudo más alto, y puede ponerte una <b>multa</b>. Si te falta tiempo, pide una prórroga por escrito antes del plazo.</p>
<h2>¿No puedes pagar tus impuestos?</h2>
<p>Escribe a la administración fiscal <b>antes del vencimiento</b> para pedir un plazo o un pago a plazos. Lo explicamos en <a href="#blog-no-puedo-pagar-una-factura-suiza">No puedo pagar una factura</a>.</p>
<h2>Errores frecuentes</h2>
<ul><li><b>Confundir los anticipos con el impuesto final</b> y no revisar la tasación.</li><li><b>Dejar pasar los 30 días</b> para reclamar.</li><li><b>Pedir la tributación ordinaria sin calcular</b>: es irrevocable.</li><li><b>Ignorar una sommation</b> porque «no tengo nada que declarar».</li></ul>`,
`<div class="tldr"><b>En 30 secondes</b><ul><li>Il y a <b>5 courriers des impôts</b> à savoir reconnaître : la déclaration, les acomptes, la taxation, la sommation et ceux de l'impôt à la source.</li><li>Cherche toujours <b>la date limite</b> sur le courrier et <b>la date à laquelle tu l'as reçu</b>.</li><li>Si tu n'es pas d'accord avec ta taxation, tu as <b>30 jours</b> dès la notification pour faire une <b>réclamation</b> écrite.</li><li>Si tu es imposé à la source, tu peux demander une rectification ou une taxation ordinaire jusqu'au <b>31 mars</b> de l'année suivante.</li><li>N'ignore jamais une <b>sommation</b> : sans réponse, le fisc calcule ton impôt lui-même et peut t'infliger une amende.</li></ul></div>
<h2>Les 5 courriers les plus fréquents</h2>
<div class="tbl"><table><thead><tr><th>Ce qui est écrit</th><th>Ce que c'est</th><th>Que faire</th></tr></thead><tbody>
<tr><td><b>Déclaration d'impôt</b></td><td>Le formulaire pour déclarer tes revenus et ta fortune de l'année précédente.</td><td>La remplir avant le délai : Vaud, 15 mars ; Genève, 31 mars. Une prolongation est possible.</td></tr>
<tr><td><b>Acomptes / bordereau d'acomptes</b></td><td>Des avances calculées sur une estimation de ton impôt.</td><td>Les payer aux dates indiquées. Si tes revenus ont beaucoup changé, demande à les adapter.</td></tr>
<tr><td><b>Décision / bordereau de taxation</b></td><td>Le calcul définitif de ton impôt, fait par le fisc.</td><td>Le comparer avec ta déclaration. En cas d'erreur, <b>réclamation dans les 30 jours</b>.</td></tr>
<tr><td><b>Sommation</b></td><td>Tu n'as pas envoyé ta déclaration ou un document.</td><td>Réponds tout de suite. Sinon, taxation d'office et amende possible.</td></tr>
<tr><td><b>Impôt à la source</b></td><td>Ton impôt est prélevé directement sur ton salaire.</td><td>Vérifie ton attestation. Rectification ou taxation ordinaire jusqu'au 31 mars de l'année suivante.</td></tr>
</tbody></table></div>
<h2>La déclaration d'impôt</h2>
<p>Si tu n'es pas imposé à la source, tu reçois chaque année une déclaration pour les revenus de l'année précédente. Le délai habituel est le <b>15 mars dans le canton de Vaud</b> et le <b>31 mars à Genève</b>, avec possibilité de prolongation dans les deux cantons. Calcule tes dates avec l'outil <a href="#herramienta-plazos">Mes délais à l'arrivée</a>.</p>
<p>Prépare : ton certificat de salaire, la police et les factures d'assurance maladie, les relevés bancaires au 31 décembre, les frais de garde et de transport et, le cas échéant, les versements au 3e pilier. Plus de détails dans notre guide <a href="#guia-impuestos">Les impôts en Suisse</a>.</p>
<h2>La taxation : vérifie-la et réclame si besoin</h2>
<p>Quelques mois après ta déclaration, tu reçois la <b>décision de taxation</b> (ou bordereau) : c'est le calcul officiel. Compare les montants avec ta déclaration : revenus, déductions, nombre d'enfants.</p>
<p>En cas d'erreur ou de désaccord, tu as <b>30 jours dès la notification</b> pour faire une <b>réclamation</b> écrite à l'administration fiscale qui l'a émise. Explique ce qui ne va pas et joins les preuves. Après 30 jours, elle n'est acceptée que dans des cas exceptionnels (maladie grave, absence du pays…).</p>
<div class="callout"><b>Attention :</b> le délai court dès la réception du courrier, pas dès la date imprimée. Garde l'enveloppe ou note le jour de réception.</div>
<h2>Si tu es imposé à la source</h2>
<p>Beaucoup de personnes avec un permis B paient l'impôt <b>directement sur leur salaire</b> (impôt à la source). En général, elles ne font pas de déclaration, mais :</p>
<ul><li>Si tu penses qu'on t'a trop prélevé, ou si tu veux faire valoir des déductions (3e pilier, frais), tu peux demander une <b>rectification</b> ou une <b>taxation ordinaire ultérieure</b> (TOU) au plus tard le <b>31 mars</b> de l'année suivante. Ce délai n'est pas prolongeable.</li><li>La TOU est <b>irrévocable</b> : une fois demandée, elle s'applique aussi les années suivantes, même si elle coûte plus cher. Calcule avant ou demande conseil.</li><li>Au-delà d'un certain salaire (par exemple 120 000 CHF bruts par an à Genève), la taxation ordinaire est <b>obligatoire</b>.</li></ul>
<h2>La sommation : ne l'ignore pas</h2>
<p>Une sommation signifie que le fisc attend quelque chose de toi : ta déclaration ou un document. Sans réponse dans le délai, il calcule ton impôt <b>d'office</b>, souvent plus haut, et peut t'infliger une <b>amende</b>. S'il te manque du temps, demande une prolongation par écrit avant le délai.</p>
<h2>Tu ne peux pas payer tes impôts ?</h2>
<p>Écris à l'administration fiscale <b>avant l'échéance</b> pour demander un délai ou un paiement échelonné. Nous l'expliquons dans <a href="#blog-no-puedo-pagar-una-factura-suiza">Je ne peux pas payer une facture</a>.</p>
<h2>Erreurs fréquentes</h2>
<ul><li><b>Confondre les acomptes avec l'impôt final</b> et ne pas vérifier la taxation.</li><li><b>Laisser passer les 30 jours</b> pour réclamer.</li><li><b>Demander la taxation ordinaire sans calculer</b> : elle est irrévocable.</li><li><b>Ignorer une sommation</b> parce que « je n'ai rien à déclarer ».</li></ul>`],
    faq: [
      [['¿Cuánto tiempo tengo para reclamar contra mi tasación de impuestos?', 'Combien de temps ai-je pour réclamer contre ma taxation ?'], ['30 días desde que recibes la decisión de tasación. La reclamación se hace por escrito a la administración fiscal que la emitió, explicando qué está mal y con pruebas.', '30 jours dès la réception de la décision de taxation. La réclamation se fait par écrit à l\'administration fiscale qui l\'a émise, en expliquant ce qui ne va pas, preuves à l\'appui.']],
      [['¿Cuándo hay que entregar la declaración de impuestos en Ginebra y Vaud?', 'Quand rendre la déclaration d\'impôt à Genève et Vaud ?'], ['En Vaud, en general el 15 de marzo; en Ginebra, el 31 de marzo del año siguiente. Se puede pedir una prórroga en ambos cantones.', 'Dans le canton de Vaud, en général le 15 mars ; à Genève, le 31 mars de l\'année suivante. Une prolongation est possible dans les deux cantons.']],
      [['Pago el impuesto en la fuente, ¿puedo recuperar dinero?', 'Je suis imposé à la source, puis-je récupérer de l\'argent ?'], ['Puedes pedir una corrección o una tributación ordinaria posterior hasta el 31 de marzo del año siguiente, por ejemplo para deducir el 3.er pilar. Ojo: la tributación ordinaria es irrevocable.', 'Tu peux demander une rectification ou une taxation ordinaire ultérieure jusqu\'au 31 mars de l\'année suivante, par exemple pour déduire le 3e pilier. Attention : la taxation ordinaire est irrévocable.']],
      [['¿Qué pasa si ignoro una sommation de impuestos?', 'Que se passe-t-il si j\'ignore une sommation des impôts ?'], ['El fisco calcula tu impuesto de oficio, a menudo más alto, y puede ponerte una multa. Responde o pide una prórroga antes del plazo.', 'Le fisc calcule ton impôt d\'office, souvent plus haut, et peut t\'infliger une amende. Réponds ou demande une prolongation avant le délai.']],
    ],
  },
  {
    slug: 'seguro-medico-suiza', date: '2026-11-07', cat: ['Salud', 'Santé'], img: 'primas', featured: true,
    st: ['Seguro médico en Suiza (LAMal): guía 2027', 'Assurance maladie en Suisse (LAMal) : guide 2027'],
    t: ['Seguro médico en Suiza (LAMal): cómo funciona, cuánto cuesta y cómo elegir (guía 2027)', 'Assurance maladie en Suisse (LAMal) : fonctionnement, prix et comment choisir (guide 2027)'],
    d: ['El seguro médico obligatorio en Suiza explicado en español: plazo de 3 meses, franquicia, primas 2027 en Ginebra y Vaud, cómo cambiar de caja antes del 30 de noviembre y cómo pedir ayuda para pagarlo.', 'L\'assurance maladie obligatoire en Suisse expliquée simplement : délai de 3 mois, franchise, primes 2027 à Genève et Vaud, changer de caisse avant le 30 novembre et demander un subside.'],
    src: [
      [['DFI / OFSP · Comunicado sobre las primas 2027 (PDF)', 'DFI / OFSP · Communiqué sur les primes 2027 (PDF)'], 'https://www.priminfo.admin.ch/downloads/medienmitteilung_2027_FR.pdf'],
      [['Priminfo · Comparador oficial de primas de la Confederación', 'Priminfo · Calculateur officiel des primes de la Confédération'], 'https://www.priminfo.admin.ch/fr/praemien'],
      [['OFSP · Cambiar de asegurador: plazos 2026 (PDF)', 'OFSP · Changer d\'assureur : délais 2026 (PDF)'], 'https://www.bag.admin.ch/dam/fr/sd-web/92VbSMPCd--v/PG27-FB-Versichererwechsel_FR.pdf'],
      [['ch.ch · Las primas del seguro médico', 'ch.ch · Les primes d\'assurance maladie'], 'https://www.ch.ch/fr/primes-assurance-maladie'],
      [['Estado de Vaud · Primas 2027: +3,5 % de media', 'État de Vaud · Primes 2027 : +3,5 % en moyenne'], 'https://www.vd.ch/actualites/actualite/news/26662-les-primes-dassurance-maladie-vont-augmenter-de-35-en-moyenne-en-2027'],
      [['Ginebra · Pedir un subsidio de seguro médico 2027', 'Genève · Demander un subside d\'assurance-maladie 2027'], 'https://www.ge.ch/node/45174'],
    ],
    body: [
`<div class="tldr"><b>En 30 segundos</b><ul><li>En Suiza el seguro médico básico (<b>LAMal</b>) es <b>obligatorio</b> para todas las personas que viven en el país, también para los niños.</li><li>Tienes <b>3 meses</b> desde tu llegada para contratarlo. Si lo haces a tiempo, te cubre desde el primer día.</li><li>La cobertura básica es <b>la misma en todas las cajas</b>: lo que cambia es el precio. Compara en <b>priminfo.ch</b>, el comparador oficial.</li><li>En 2027 la prima media sube un <b>5 %</b> en Suiza (412 CHF al mes). Para cambiar de caja, tu carta debe <b>llegar antes del 30 de noviembre</b>.</li><li>Si tus ingresos son bajos, puedes pedir un <b>subsidio</b> que paga una parte de la prima.</li></ul></div>
<h2>¿Qué es la LAMal?</h2>
<p>La LAMal (<i>Loi sur l'assurance-maladie</i>) es el seguro médico básico obligatorio. Cubre las consultas médicas, la hospitalización en la división común de tu cantón, los medicamentos de la lista oficial, la maternidad, muchos análisis y ciertos tratamientos de prevención.</p>
<p>No es un seguro del Estado: lo contratas tú, con una <b>caja de seguro médico privada</b> (<i>caisse maladie</i>) autorizada por la Confederación. Y no lo descuenta tu empleador del salario: lo pagas tú cada mes, para cada miembro de la familia.</p>
<div class="callout"><b>Lo que la LAMal no cubre:</b> en general, el <b>dentista</b> (salvo casos graves), las gafas para adultos y la habitación privada en el hospital. Para eso existen los seguros complementarios, que son <b>opcionales</b>.</div>
<h2>El plazo de 3 meses al llegar</h2>
<p>Desde el día en que te instalas en Suiza tienes <b>3 meses</b> para afiliarte. Si lo haces dentro de ese plazo, el seguro es <b>retroactivo</b>: te cubre desde tu fecha de llegada, aunque hayas ido al médico antes de firmar.</p>
<p>Si te afilias tarde, el seguro solo empieza el día de tu afiliación y la caja puede cobrarte un <b>recargo</b> (entre el 30 % y el 50 % de la prima, durante el doble del tiempo de retraso) si el retraso no tiene una buena justificación. Y si no te afilias, el cantón te asigna una caja de oficio.</p>
<p>Este trámite forma parte de los primeros pasos al llegar, junto con <a href="#guia-comuna">anunciarte en tu comuna</a>. Ver también nuestra guía rápida <a href="#guia-lamal">Seguro médico obligatorio (LAMal)</a>.</p>
<h2>Cuánto cuesta el seguro médico en 2027</h2>
<p>La prima depende de <b>tu cantón</b> (y a veces de la región dentro del cantón), de <b>tu edad</b> (niño, joven de 19 a 25 años, adulto), de la <b>franquicia</b> que eliges y del <b>modelo</b> de seguro. Por eso dos personas pueden pagar precios muy distintos por exactamente la misma cobertura.</p>
<div class="tbl"><table><thead><tr><th>Primas 2027</th><th>Prima media mensual</th><th>Cambio respecto a 2026</th></tr></thead><tbody>
<tr><td><b>Suiza</b> (media)</td><td>412 CHF</td><td>+5,0 %</td></tr>
<tr><td><b>Ginebra</b></td><td>508,60 CHF</td><td>+4,4 %</td></tr>
<tr><td><b>Vaud</b></td><td>según la región</td><td>+3,5 % de media</td></tr>
</tbody></table></div>
<p>Fuente: OFSP y Estado de Vaud, anuncio del 29 de septiembre de 2026. Son <b>medias</b> (todas las edades y franquicias juntas): un adulto con franquicia baja paga más; con franquicia alta y modelo médico de familia, a menudo bastante menos. Para tu precio exacto, usa <a href="https://www.priminfo.admin.ch/fr/praemien" target="_blank" rel="noopener">priminfo.ch</a> con tu código postal.</p>
<h2>Franquicia y copago: lo que pagas además de la prima</h2>
<p>Cuando vas al médico, no todo lo paga la caja. Hay tres cosas que debes conocer:</p>
<ul><li><b>La franquicia</b>: el importe que pagas tú cada año antes de que la caja empiece a reembolsar. Para adultos puedes elegir entre <b>300, 500, 1.000, 1.500, 2.000 o 2.500 CHF</b>. Para los niños, entre 0 y 600 CHF.</li><li><b>El copago</b> (<i>quote-part</i>): una vez superada la franquicia, pagas el <b>10 %</b> de los gastos, con un máximo de <b>700 CHF al año</b> para adultos (350 CHF para niños).</li><li><b>La contribución hospitalaria</b>: <b>15 CHF por día</b> de hospitalización para los adultos (no la pagan los niños ni los jóvenes en formación hasta 25 años).</li></ul>
<p>Ejemplo: con la franquicia de 300 CHF, lo máximo que pagas en un año (además de la prima) es 300 + 700 = <b>1.000 CHF</b>. Con la de 2.500 CHF, puede llegar a 2.500 + 700 = <b>3.200 CHF</b>, pero tu prima mensual es bastante más baja.</p>
<h3>¿Qué franquicia elegir?</h3>
<ul><li><b>Franquicia alta (2.500 CHF)</b>: si estás sano, vas poco al médico y puedes guardar el dinero de la franquicia por si acaso.</li><li><b>Franquicia baja (300 CHF)</b>: si tienes una enfermedad crónica, un embarazo previsto, tratamientos regulares o no podrías pagar una factura imprevista de varios miles de francos.</li></ul>
<h2>Los modelos de seguro para pagar menos</h2>
<p>Además del modelo estándar (vas al médico que quieras), las cajas ofrecen modelos más baratos a cambio de una condición:</p>
<div class="tbl"><table><thead><tr><th>Modelo</th><th>La condición</th></tr></thead><tbody>
<tr><td><b>Médico de familia</b></td><td>Siempre consultas primero a tu médico de cabecera, que te envía al especialista si hace falta.</td></tr>
<tr><td><b>HMO</b></td><td>Vas primero a un centro médico de la red de la caja.</td></tr>
<tr><td><b>Telmed</b></td><td>Llamas primero a una línea médica por teléfono o aplicación antes de ir a consulta.</td></tr>
</tbody></table></div>
<p>La cobertura es la misma; solo cambia el camino. En caso de <b>urgencia</b> (número 144) puedes ir directamente al hospital en todos los modelos.</p>
<h2>Cómo elegir tu caja paso a paso</h2>
<ol class="steplist">
<li><b>Entra en priminfo.ch</b>, el comparador oficial de la Confederación (gratuito, sin publicidad y sin pedirte tus datos).</li>
<li><b>Pon tu código postal y tu año de nacimiento</b>, y compara la misma franquicia en todas las cajas.</li>
<li><b>Elige el modelo</b> que te conviene (estándar, médico de familia, HMO o Telmed).</li>
<li><b>Pide la afiliación</b> en el sitio de la caja o por correo. La caja <b>no puede rechazarte</b> para el seguro básico, aunque estés enfermo.</li>
<li><b>Guarda tu póliza</b>: te la piden para el permiso, los impuestos o el subsidio.</li>
</ol>
<div class="callout"><b>Cuidado con los comparadores privados y las llamadas:</b> muchos sitios y vendedores por teléfono quieren venderte un seguro complementario junto al básico. El complementario es opcional, puede rechazarte por tu salud y es difícil de cancelar. No firmes nada por teléfono.</div>
<h3>Un consejo si trabajas</h3>
<p>Si trabajas <b>al menos 8 horas por semana</b> para el mismo empleador, ya estás asegurado contra los accidentes (también fuera del trabajo) por el seguro de accidentes de tu empleador (LAA). En ese caso puedes pedir a tu caja que <b>excluya la cobertura de accidentes</b> y tu prima baja un poco. Si dejas el trabajo o bajas de 8 horas, vuelve a activarla enseguida.</p>
<h2>Cambiar de caja para 2027: la fecha que no hay que pasar</h2>
<p>Cada otoño las cajas te envían tu nueva prima. Si quieres cambiar de caja para el 1 de enero de 2027, tu carta de baja debe <b>llegar a tu caja a más tardar el 30 de noviembre de 2026</b>. El sello de correos no cuenta: la OFSP aconseja enviarla <b>antes del 15 de noviembre</b>, por correo certificado o «Courrier A Plus».</p>
<ul><li><b>Bajar la franquicia o cambiar de modelo</b>: también antes del 30 de noviembre, por escrito.</li><li><b>Subir la franquicia</b>: puedes avisar hasta el 31 de diciembre.</li><li><b>Si se te pasó la fecha</b>: con franquicia de 300 CHF y modelo estándar, puedes cambiar para el 30 de junio, con una carta que debe llegar antes de finales de marzo.</li></ul>
<p>En priminfo.ch encontrarás modelos de carta oficiales. Firma primero con la nueva caja y envía después la baja a la antigua: así nunca te quedas sin seguro.</p>
<h2>Subsidios: ayuda para pagar la prima</h2>
<p>Si tus ingresos son modestos, el cantón puede pagar una parte de tu prima: es el <b>subsidio</b> (<i>subside d'assurance-maladie</i>). No es ayuda social y no afecta a tu permiso.</p>
<ul><li><b>Ginebra</b>: lo gestiona el Service de l'assurance-maladie (SAM). Las personas llegadas en 2026 o 2027 y las que pagan el impuesto en la fuente pueden presentar una solicitud. Para 2027, la solicitud completa debe llegar antes del 30 de noviembre de 2027.</li><li><b>Vaud</b>: se pide en la agencia de seguros sociales (AAS) de tu región, que calcula tu derecho según tus ingresos.</li></ul>
<p>Te lo explicamos paso a paso en nuestra guía <a href="#guia-subsidio">Subsidio para el seguro médico</a>.</p>
<h2>Errores frecuentes</h2>
<ul><li><b>Esperar más de 3 meses</b> para afiliarse: pierdes la cobertura retroactiva y te arriesgas a un recargo.</li><li><b>Firmar un complementario sin querer</b> al contratar el básico.</li><li><b>Olvidar a los niños</b>: cada hijo necesita su propio seguro, desde el nacimiento (afíliale en los 3 meses).</li><li><b>Elegir la franquicia de 2.500 CHF sin tener ahorros</b> para pagarla si te pasa algo.</li><li><b>Enviar la carta de cambio el 29 de noviembre</b>: lo que cuenta es la fecha de llegada, no la de envío.</li></ul>`,
`<div class="tldr"><b>En 30 secondes</b><ul><li>En Suisse, l'assurance maladie de base (<b>LAMal</b>) est <b>obligatoire</b> pour toutes les personnes domiciliées dans le pays, enfants compris.</li><li>Tu as <b>3 mois</b> après ton arrivée pour t'assurer. Dans ce délai, tu es couvert dès le premier jour.</li><li>La couverture de base est <b>la même dans toutes les caisses</b> : seul le prix change. Compare sur <b>priminfo.ch</b>, le comparateur officiel.</li><li>En 2027, la prime moyenne augmente de <b>5 %</b> en Suisse (412 CHF par mois). Pour changer de caisse, ta lettre doit <b>arriver avant le 30 novembre</b>.</li><li>Si tes revenus sont modestes, tu peux demander un <b>subside</b> qui paie une partie de la prime.</li></ul></div>
<h2>Qu'est-ce que la LAMal ?</h2>
<p>La LAMal (loi sur l'assurance-maladie) est l'assurance de base obligatoire. Elle couvre les consultations médicales, l'hospitalisation en division commune dans ton canton, les médicaments de la liste officielle, la maternité, de nombreuses analyses et certaines mesures de prévention.</p>
<p>Ce n'est pas une assurance de l'État : tu la conclus toi-même auprès d'une <b>caisse maladie privée</b> agréée par la Confédération. Et ton employeur ne la prélève pas sur ton salaire : tu la paies chaque mois, pour chaque membre de la famille.</p>
<div class="callout"><b>Ce que la LAMal ne couvre pas :</b> en général le <b>dentiste</b> (sauf cas graves), les lunettes pour adultes et la chambre privée à l'hôpital. Pour cela, il existe des assurances complémentaires, qui sont <b>facultatives</b>.</div>
<h2>Le délai de 3 mois à l'arrivée</h2>
<p>Dès ton installation en Suisse, tu as <b>3 mois</b> pour t'affilier. Dans ce délai, l'assurance est <b>rétroactive</b> : elle te couvre depuis ta date d'arrivée, même si tu es allé chez le médecin avant de signer.</p>
<p>En cas d'affiliation tardive, l'assurance ne commence que le jour de l'affiliation et la caisse peut facturer un <b>supplément de prime</b> (entre 30 % et 50 % de la prime, pendant le double de la durée du retard) si le retard n'est pas excusable. Et si tu ne t'assures pas, le canton t'affilie d'office.</p>
<p>Cette démarche fait partie des premières étapes à l'arrivée, avec l'<a href="#guia-comuna">annonce à ta commune</a>. Voir aussi notre guide rapide <a href="#guia-lamal">Assurance maladie obligatoire (LAMal)</a>.</p>
<h2>Combien coûte l'assurance maladie en 2027</h2>
<p>La prime dépend de <b>ton canton</b> (parfois de la région dans le canton), de <b>ton âge</b> (enfant, jeune de 19 à 25 ans, adulte), de la <b>franchise</b> choisie et du <b>modèle</b> d'assurance. Deux personnes peuvent donc payer des prix très différents pour exactement la même couverture.</p>
<div class="tbl"><table><thead><tr><th>Primes 2027</th><th>Prime moyenne mensuelle</th><th>Évolution par rapport à 2026</th></tr></thead><tbody>
<tr><td><b>Suisse</b> (moyenne)</td><td>412 CHF</td><td>+5,0 %</td></tr>
<tr><td><b>Genève</b></td><td>508,60 CHF</td><td>+4,4 %</td></tr>
<tr><td><b>Vaud</b></td><td>selon la région</td><td>+3,5 % en moyenne</td></tr>
</tbody></table></div>
<p>Source : OFSP et État de Vaud, annonce du 29 septembre 2026. Ce sont des <b>moyennes</b> (tous âges et franchises confondus) : un adulte avec une franchise basse paie plus ; avec une franchise haute et un modèle médecin de famille, souvent nettement moins. Pour ton prix exact, utilise <a href="https://www.priminfo.admin.ch/fr/praemien" target="_blank" rel="noopener">priminfo.ch</a> avec ton code postal.</p>
<h2>Franchise et quote-part : ce que tu paies en plus de la prime</h2>
<p>Quand tu vas chez le médecin, la caisse ne paie pas tout. Trois éléments à connaître :</p>
<ul><li><b>La franchise</b> : le montant que tu paies toi-même chaque année avant que la caisse rembourse. Pour les adultes, tu choisis entre <b>300, 500, 1000, 1500, 2000 ou 2500 CHF</b>. Pour les enfants, entre 0 et 600 CHF.</li><li><b>La quote-part</b> : une fois la franchise atteinte, tu paies <b>10 %</b> des frais, au maximum <b>700 CHF par an</b> pour les adultes (350 CHF pour les enfants).</li><li><b>La contribution hospitalière</b> : <b>15 CHF par jour</b> d'hospitalisation pour les adultes (les enfants et les jeunes en formation jusqu'à 25 ans ne la paient pas).</li></ul>
<p>Exemple : avec une franchise de 300 CHF, tu paies au maximum 300 + 700 = <b>1000 CHF</b> par an (en plus de la prime). Avec 2500 CHF, cela peut aller jusqu'à 2500 + 700 = <b>3200 CHF</b>, mais ta prime mensuelle est nettement plus basse.</p>
<h3>Quelle franchise choisir ?</h3>
<ul><li><b>Franchise haute (2500 CHF)</b> : si tu es en bonne santé, vas rarement chez le médecin et peux mettre de côté le montant de la franchise.</li><li><b>Franchise basse (300 CHF)</b> : si tu as une maladie chronique, une grossesse prévue, des traitements réguliers ou si tu ne pourrais pas payer une facture imprévue de plusieurs milliers de francs.</li></ul>
<h2>Les modèles d'assurance pour payer moins</h2>
<p>En plus du modèle standard (libre choix du médecin), les caisses proposent des modèles moins chers en échange d'une condition :</p>
<div class="tbl"><table><thead><tr><th>Modèle</th><th>La condition</th></tr></thead><tbody>
<tr><td><b>Médecin de famille</b></td><td>Tu consultes toujours d'abord ton médecin de famille, qui t'envoie chez un spécialiste si nécessaire.</td></tr>
<tr><td><b>HMO</b></td><td>Tu vas d'abord dans un centre médical du réseau de la caisse.</td></tr>
<tr><td><b>Telmed</b></td><td>Tu appelles d'abord une ligne médicale (téléphone ou application) avant de consulter.</td></tr>
</tbody></table></div>
<p>La couverture est la même, seul le parcours change. En cas d'<b>urgence</b> (144), tu peux aller directement à l'hôpital, quel que soit le modèle.</p>
<h2>Choisir sa caisse étape par étape</h2>
<ol class="steplist">
<li><b>Va sur priminfo.ch</b>, le comparateur officiel de la Confédération (gratuit, sans publicité, sans demander tes coordonnées).</li>
<li><b>Indique ton code postal et ton année de naissance</b>, et compare la même franchise dans toutes les caisses.</li>
<li><b>Choisis le modèle</b> qui te convient (standard, médecin de famille, HMO ou Telmed).</li>
<li><b>Demande l'affiliation</b> sur le site de la caisse ou par courrier. La caisse <b>ne peut pas te refuser</b> pour l'assurance de base, même si tu es malade.</li>
<li><b>Garde ta police</b> : on te la demande pour le permis, les impôts ou le subside.</li>
</ol>
<div class="callout"><b>Attention aux comparateurs privés et aux appels :</b> beaucoup de sites et de vendeurs au téléphone veulent te vendre une complémentaire avec la base. La complémentaire est facultative, peut te refuser selon ta santé et est difficile à résilier. Ne signe rien au téléphone.</div>
<h3>Une astuce si tu travailles</h3>
<p>Si tu travailles <b>au moins 8 heures par semaine</b> chez le même employeur, tu es déjà assuré contre les accidents (aussi hors du travail) par l'assurance accidents de ton employeur (LAA). Tu peux alors demander à ta caisse d'<b>exclure la couverture accidents</b> et ta prime baisse un peu. Si tu quittes ton emploi ou passes sous 8 heures, réactive-la tout de suite.</p>
<h2>Changer de caisse pour 2027 : la date à ne pas manquer</h2>
<p>Chaque automne, les caisses t'envoient ta nouvelle prime. Pour changer de caisse au 1er janvier 2027, ta lettre de résiliation doit <b>arriver chez ta caisse au plus tard le 30 novembre 2026</b>. Le cachet de la poste ne fait pas foi : l'OFSP conseille de l'envoyer <b>avant le 15 novembre</b>, en recommandé ou en « Courrier A Plus ».</p>
<ul><li><b>Baisser ta franchise ou changer de modèle</b> : aussi avant le 30 novembre, par écrit.</li><li><b>Augmenter ta franchise</b> : tu peux l'annoncer jusqu'au 31 décembre.</li><li><b>Si tu as raté la date</b> : avec une franchise de 300 CHF et le modèle standard, tu peux changer au 30 juin, avec une lettre qui doit arriver avant fin mars.</li></ul>
<p>Priminfo.ch propose des modèles de lettre officiels. Signe d'abord avec la nouvelle caisse, puis envoie la résiliation à l'ancienne : tu n'es ainsi jamais sans assurance.</p>
<h2>Subsides : une aide pour payer la prime</h2>
<p>Si tes revenus sont modestes, le canton peut payer une partie de ta prime : c'est le <b>subside d'assurance-maladie</b>. Ce n'est pas de l'aide sociale et cela n'a pas d'effet sur ton permis.</p>
<ul><li><b>Genève</b> : il est géré par le Service de l'assurance-maladie (SAM). Les personnes arrivées en 2026 ou 2027 et celles imposées à la source peuvent faire une demande. Pour 2027, la demande complète doit arriver avant le 30 novembre 2027.</li><li><b>Vaud</b> : il se demande à l'agence d'assurances sociales (AAS) de ta région, qui calcule ton droit selon tes revenus.</li></ul>
<p>Nous t'expliquons tout dans notre guide <a href="#guia-subsidio">Subside d'assurance maladie</a>.</p>
<h2>Erreurs fréquentes</h2>
<ul><li><b>Attendre plus de 3 mois</b> pour s'affilier : tu perds la couverture rétroactive et risques un supplément.</li><li><b>Signer une complémentaire sans le vouloir</b> en concluant la base.</li><li><b>Oublier les enfants</b> : chaque enfant a besoin de sa propre assurance dès la naissance (à conclure dans les 3 mois).</li><li><b>Choisir 2500 CHF de franchise sans épargne</b> pour la payer en cas de pépin.</li><li><b>Envoyer la lettre de changement le 29 novembre</b> : c'est la date d'arrivée qui compte, pas celle d'envoi.</li></ul>`],
    faq: [
      [['¿Es obligatorio el seguro médico en Suiza?', 'L\'assurance maladie est-elle obligatoire en Suisse ?'], ['Sí. Toda persona que vive en Suiza debe tener el seguro básico LAMal, sea cual sea su nacionalidad o su permiso, en los 3 meses siguientes a su llegada. Solo hay algunas excepciones (por ejemplo ciertos trabajadores fronterizos o personas aseguradas en un país de la UE), que se piden al cantón.', 'Oui. Toute personne domiciliée en Suisse doit avoir l\'assurance de base LAMal, quels que soient sa nationalité ou son permis, dans les 3 mois suivant son arrivée. Il existe quelques exceptions (par exemple certains frontaliers ou personnes assurées dans un pays de l\'UE), à demander au canton.']],
      [['¿Cuánto cuesta el seguro médico en Ginebra en 2027?', 'Combien coûte l\'assurance maladie à Genève en 2027 ?'], ['La prima media en Ginebra es de 508,60 CHF al mes en 2027 (+4,4 %), todas las edades y franquicias juntas. Tu precio real depende de tu edad, tu franquicia y tu modelo: calcúlalo en priminfo.ch.', 'La prime moyenne à Genève est de 508,60 CHF par mois en 2027 (+4,4 %), tous âges et franchises confondus. Ton prix réel dépend de ton âge, de ta franchise et de ton modèle : calcule-le sur priminfo.ch.']],
      [['¿Una caja puede rechazarme por estar enfermo?', 'Une caisse peut-elle me refuser parce que je suis malade ?'], ['No para el seguro básico: todas las cajas deben aceptarte, sin cuestionario de salud y con la misma cobertura. Sí pueden rechazarte para un seguro complementario.', 'Non pour l\'assurance de base : toutes les caisses doivent t\'accepter, sans questionnaire de santé et avec la même couverture. Elles peuvent en revanche te refuser pour une complémentaire.']],
      [['¿Hasta cuándo puedo cambiar de caja para 2027?', 'Jusqu\'à quand puis-je changer de caisse pour 2027 ?'], ['Tu carta de baja debe llegar a tu caja actual a más tardar el 30 de noviembre de 2026. Envíala antes del 15 de noviembre por correo certificado para estar tranquilo.', 'Ta lettre de résiliation doit arriver chez ta caisse actuelle au plus tard le 30 novembre 2026. Envoie-la avant le 15 novembre en recommandé pour être tranquille.']],
      [['¿El dentista está incluido?', 'Le dentiste est-il compris ?'], ['En general no. La LAMal solo paga el dentista en casos muy concretos (enfermedades graves o accidentes no cubiertos por otro seguro). Para los controles y tratamientos normales necesitas un seguro dental complementario o pagar tú.', 'En général non. La LAMal ne paie le dentiste que dans des cas très précis (maladies graves ou accidents non couverts par une autre assurance). Pour les contrôles et soins courants, il faut une complémentaire dentaire ou payer toi-même.']],
    ],
  },
  {
    slug: 'reagrupacion-familiar-suiza', date: '2026-11-07', cat: ['Familia', 'Famille'], img: 'noviembre',
    st: ['Reagrupación familiar en Suiza: requisitos y pasos (2026)', 'Regroupement familial en Suisse : conditions et étapes (2026)'],
    t: ['Reagrupación familiar en Suiza: cómo traer a tu pareja e hijos (guía 2026)', 'Regroupement familial en Suisse : faire venir ton conjoint et tes enfants (guide 2026)'],
    d: ['Cómo traer a tu familia a Suiza según tu nacionalidad y tu permiso (B, C, europeo o suizo): requisitos de vivienda, ingresos e idioma, plazos de 5 años y 12 meses, documentos y pasos.', 'Faire venir ta famille en Suisse selon ta nationalité et ton permis (B, C, européen ou suisse) : logement, revenus, langue, délais de 5 ans et 12 mois, documents et étapes.'],
    src: [
      [['SEM · Preguntas frecuentes sobre la estancia y la reagrupación familiar', 'SEM · FAQ séjour et critères d\'intégration'], 'https://www.sem.admin.ch/sem/fr/home/themen/aufenthalt/faq.html'],
      [['SEM · Directiva sobre el procedimiento de reagrupación familiar (PDF)', 'SEM · Directive sur la procédure de regroupement familial (PDF)'], 'https://www.sem.admin.ch/dam/sem/fr/data/rechtsgrundlagen/weisungen/auslaender/familie/251204-weisung-familiennachzug.pdf.download.pdf/251204-weisung-familiennachzug-f.pdf'],
      [['Fedlex · Ley federal sobre extranjeros y la integración (LEI), art. 42 a 47', 'Fedlex · Loi fédérale sur les étrangers et l\'intégration (LEI), art. 42 à 47'], 'https://www.fedlex.admin.ch/eli/cc/2007/758/fr'],
      [['Estado de Vaud · Reagrupación familiar con un permiso B, C o L', 'État de Vaud · Regroupement familial auprès d\'un titulaire de permis B, C ou L'], 'https://www.vd.ch/population/population-etrangere/entree-et-sejour/etats-tiers/regroupement-familial-du-conjoint-partenaire-et/ou-des-enfants-aupres-dun-etranger-titulaire-dun-permis-de-sejour-b-detablissement-c-ou-de-courte-duree-l'],
      [['Neuchâtel · Nivel de idioma exigido para la reagrupación familiar (PDF)', 'Neuchâtel · Niveau de langue exigé pour le regroupement familial (PDF)'], 'https://www.ne.ch/autorites/DEAS/SMIG/Documents/ExigencesNiveauDeLangueRegroupementFamilial.pdf'],
    ],
    body: [
`<div class="tldr"><b>En 30 segundos</b><ul><li>Las reglas dependen de <b>quién vive en Suiza</b>: una persona suiza, una persona europea (UE/AELE) o una persona de otro país con permiso <b>B</b>, <b>C</b> o <b>L</b>.</li><li>Con permiso <b>C</b> tienes en principio <b>derecho</b> a traer a tu pareja e hijos menores de 18 años. Con permiso <b>B</b> es <b>posible pero no automático</b>: el cantón decide.</li><li>Casi siempre piden: <b>vivir juntos</b> en una vivienda adecuada, <b>ingresos suficientes</b> sin ayuda social y, para la pareja, un nivel <b>A1 oral</b> del idioma del cantón (o estar inscrita en un curso).</li><li>Plazo: <b>5 años</b> para pedirlo, y solo <b>12 meses</b> para los hijos mayores de 12 años.</li><li>La solicitud la presenta <b>quien ya vive en Suiza</b>, ante el cantón. La familia pide después el visado D.</li></ul></div>
<h2>¿Qué es la reagrupación familiar?</h2>
<p>Es el procedimiento que permite a tu <b>cónyuge</b> (o pareja registrada) y a tus <b>hijos</b> venir a vivir contigo en Suiza y recibir un permiso de residencia. En la mayoría de los casos, el permiso de tu familia depende del tuyo y dura lo mismo.</p>
<p>Ojo: en general se trata de parejas <b>casadas o registradas</b>. Para una pareja de hecho (concubinato), es mucho más difícil y se estudia caso por caso. Si es tu situación, conviene prepararlo bien antes de mudarte.</p>
<h2>Las reglas según tu situación</h2>
<div class="tbl"><table><thead><tr><th>Quién vive en Suiza</th><th>Familia que puede venir</th><th>¿Es un derecho?</th></tr></thead><tbody>
<tr><td><b>Persona suiza</b></td><td>Cónyuge e hijos menores de 18 años</td><td>Sí, si viven juntos</td></tr>
<tr><td><b>Persona de la UE/AELE</b> (también España o doble nacionalidad)</td><td>Cónyuge, hijos y nietos menores de 21 años o a cargo, padres a cargo</td><td>Sí (libre circulación), con una vivienda adecuada</td></tr>
<tr><td><b>Permiso C</b> (otro país)</td><td>Cónyuge e hijos menores de 18 años</td><td>Sí, si cumples las condiciones</td></tr>
<tr><td><b>Permiso B</b> (otro país)</td><td>Cónyuge e hijos menores de 18 años</td><td>No: el cantón <b>puede</b> autorizarlo</td></tr>
<tr><td><b>Permiso L</b> (otro país)</td><td>Cónyuge e hijos menores de 18 años</td><td>No: el cantón <b>puede</b> autorizarlo</td></tr>
</tbody></table></div>
<p>Si tienes pasaporte europeo (por ejemplo español, italiano o portugués, también por doble nacionalidad), eres el caso más sencillo: la libre circulación te da un derecho claro, sin cupos y sin examen de idioma. Por eso vale la pena verificar si puedes obtener la nacionalidad de un país europeo antes de emigrar: lo explicamos en <a href="#blog-emigrar-a-suiza-desde-latinoamerica">Emigrar a Suiza desde Latinoamérica</a>.</p>
<h2>Las condiciones para un permiso B o C</h2>
<p>Si tú eres de un país fuera de Europa y tienes un permiso B o C, el cantón revisa en general estos puntos:</p>
<ul>
<li><b>Vivir juntos</b>: la familia debe vivir en la misma vivienda que tú.</li>
<li><b>Una vivienda adecuada</b>: lo bastante grande para todos. Cada cantón tiene sus propias normas (número de habitaciones según el número de personas). Tu contrato de alquiler sirve de prueba.</li>
<li><b>Ingresos suficientes</b>: no depender de la <b>ayuda social</b>. Presentas tus nóminas, tu contrato de trabajo y a veces los ingresos de tu pareja si ya tiene una oferta de trabajo en Suiza.</li>
<li><b>No recibir prestaciones complementarias</b> (PC) a la AVS/AI, ni tú ni tu familia.</li>
<li><b>El idioma</b>: tu pareja debe poder comunicarse en el idioma del lugar donde vivís (el <b>francés</b> en la Suiza romanda), con un nivel <b>A1 oral</b> como mínimo, demostrado con un certificado reconocido (pasaporte de idiomas fide, DELF, TCF…). Si todavía no lo tiene, basta en general con una <b>inscripción pagada en un curso</b> de francés que lleve a ese nivel.</li>
</ul>
<div class="callout"><b>Con permiso B, prepara un expediente impecable:</b> como no es un derecho automático, el cantón tiene margen para decidir. Un buen contrato, una vivienda del tamaño correcto y unas finanzas claras marcan la diferencia.</div>
<h2>Los plazos: 5 años y 12 meses</h2>
<p>Para las personas con permiso B o C (y para las personas suizas cuya familia viene de fuera de Europa) hay plazos que conviene no pasar:</p>
<ul><li><b>5 años</b> para pedir la reagrupación de la pareja y de los hijos menores de 12 años.</li><li><b>12 meses</b> para los hijos <b>mayores de 12 años</b>.</li></ul>
<p>El plazo empieza a contar desde que obtienes tu permiso o desde que nace el vínculo familiar (por ejemplo, la boda). Pasado ese plazo, la reagrupación solo se acepta por <b>razones familiares importantes</b>, y es mucho más difícil. Para las personas de la UE/AELE no hay plazo.</p>
<h2>Cómo hacer la solicitud paso a paso</h2>
<ol class="steplist">
<li><b>Comprueba que cumples las condiciones</b>: vivienda, ingresos, idioma de tu pareja.</li>
<li><b>Reúne los documentos</b> (lista más abajo) y haz <a href="#guia-apostilla">apostillar</a> y <a href="#guia-traduccion">traducir</a> los documentos de estado civil de tu país.</li>
<li><b>Presenta la solicitud en Suiza</b>: la hace la persona que ya vive aquí, ante el servicio de migración de su cantón (en Ginebra, la Oficina cantonal de población y migración, OCPM; en Vaud, a través del control de habitantes de tu comuna, que la transmite al servicio de población, SPOP).</li>
<li><b>Espera la decisión</b>: el plazo varía mucho según el cantón y el caso, de varias semanas a varios meses.</li>
<li><b>Tu familia pide el visado D</b> en la representación suiza de su país, si viene de un país que lo necesita. Ver <a href="#guia-visa">el visado nacional D</a>.</li>
<li><b>A su llegada</b>: anúnciales en la comuna en 14 días y contrata su <a href="#blog-seguro-medico-suiza">seguro médico</a> en los 3 meses.</li>
</ol>
<h2>Documentos que suelen pedir</h2>
<ul>
<li>Formulario de solicitud del cantón, firmado.</li>
<li>Pasaportes válidos de todos los miembros de la familia.</li>
<li>Acta de matrimonio (o de pareja registrada) y actas de nacimiento de los hijos, <b>apostilladas y traducidas</b>.</li>
<li>Tu permiso B o C.</li>
<li>Contrato de alquiler (con el número de habitaciones) o atestado del propietario.</li>
<li>Contrato de trabajo y últimas nóminas; a veces la última declaración de impuestos.</li>
<li>Atestado de que no recibes ayuda social (lo da tu comuna o el servicio social).</li>
<li>Certificado de francés A1 oral de tu pareja o inscripción pagada en un curso.</li>
<li>Para un hijo que viene sin el otro progenitor: su <b>consentimiento escrito</b> o la decisión de custodia.</li>
</ul>
<p>Cada cantón publica su propia lista: pídela antes para no perder tiempo con documentos incompletos.</p>
<h2>¿Puede trabajar mi familia?</h2>
<p>Sí. La pareja y los hijos de una persona con permiso B o C pueden <b>trabajar en toda Suiza</b> una vez obtenido su permiso. Los hijos van a la escuela pública gratuita, y a veces tienen derecho a las <a href="#guia-asignaciones">asignaciones familiares</a>.</p>
<h2>Errores frecuentes</h2>
<ul><li><b>Dejar pasar el plazo de 12 meses</b> para un hijo mayor de 12 años.</li><li><b>Alquilar un piso demasiado pequeño</b> antes de pedir la reagrupación.</li><li><b>Pedir ayuda social</b> mientras el expediente está en curso: puede llevar al rechazo.</li><li><b>Hacer venir a la familia como turista</b> esperando cambiar de estatus en Suiza: en general hay que esperar la decisión desde el extranjero.</li><li><b>Presentar documentos sin apostilla o sin traducción</b>: es la primera causa de retraso.</li></ul>`,
`<div class="tldr"><b>En 30 secondes</b><ul><li>Les règles dépendent de <b>qui vit en Suisse</b> : une personne suisse, une personne européenne (UE/AELE) ou une personne d'un autre pays avec un permis <b>B</b>, <b>C</b> ou <b>L</b>.</li><li>Avec un permis <b>C</b>, tu as en principe <b>droit</b> à faire venir ton conjoint et tes enfants de moins de 18 ans. Avec un permis <b>B</b>, c'est <b>possible mais pas automatique</b> : le canton décide.</li><li>On demande presque toujours : <b>vivre ensemble</b> dans un logement approprié, des <b>revenus suffisants</b> sans aide sociale et, pour le conjoint, un niveau <b>A1 oral</b> de la langue du canton (ou une inscription à un cours).</li><li>Délai : <b>5 ans</b> pour faire la demande, et seulement <b>12 mois</b> pour les enfants de plus de 12 ans.</li><li>La demande est déposée par <b>la personne qui vit déjà en Suisse</b>, auprès du canton. La famille demande ensuite le visa D.</li></ul></div>
<h2>Qu'est-ce que le regroupement familial ?</h2>
<p>C'est la procédure qui permet à ton <b>conjoint</b> (ou partenaire enregistré) et à tes <b>enfants</b> de venir vivre avec toi en Suisse et d'obtenir une autorisation de séjour. Dans la plupart des cas, le permis de ta famille dépend du tien et a la même durée.</p>
<p>Attention : il s'agit en général de couples <b>mariés ou en partenariat enregistré</b>. Pour un concubinage, c'est beaucoup plus difficile et examiné au cas par cas. Si c'est ta situation, prépare-le bien avant de déménager.</p>
<h2>Les règles selon ta situation</h2>
<div class="tbl"><table><thead><tr><th>Qui vit en Suisse</th><th>Famille qui peut venir</th><th>Est-ce un droit ?</th></tr></thead><tbody>
<tr><td><b>Personne suisse</b></td><td>Conjoint et enfants de moins de 18 ans</td><td>Oui, s'ils vivent ensemble</td></tr>
<tr><td><b>Personne UE/AELE</b> (aussi Espagne ou double nationalité)</td><td>Conjoint, enfants et petits-enfants de moins de 21 ans ou à charge, parents à charge</td><td>Oui (libre circulation), avec un logement approprié</td></tr>
<tr><td><b>Permis C</b> (autre pays)</td><td>Conjoint et enfants de moins de 18 ans</td><td>Oui, si les conditions sont remplies</td></tr>
<tr><td><b>Permis B</b> (autre pays)</td><td>Conjoint et enfants de moins de 18 ans</td><td>Non : le canton <b>peut</b> l'autoriser</td></tr>
<tr><td><b>Permis L</b> (autre pays)</td><td>Conjoint et enfants de moins de 18 ans</td><td>Non : le canton <b>peut</b> l'autoriser</td></tr>
</tbody></table></div>
<p>Avec un passeport européen (espagnol, italien ou portugais par exemple, y compris par double nationalité), c'est le cas le plus simple : la libre circulation donne un droit clair, sans contingent ni examen de langue. D'où l'intérêt de vérifier si tu peux obtenir une nationalité européenne avant d'émigrer : nous l'expliquons dans <a href="#blog-emigrar-a-suiza-desde-latinoamerica">Émigrer en Suisse depuis l'Amérique latine</a>.</p>
<h2>Les conditions avec un permis B ou C</h2>
<p>Si tu viens d'un pays hors d'Europe et as un permis B ou C, le canton examine en général ces points :</p>
<ul>
<li><b>Vivre ensemble</b> : la famille doit habiter le même logement que toi.</li>
<li><b>Un logement approprié</b> : assez grand pour tous. Chaque canton a ses propres normes (nombre de pièces selon le nombre de personnes). Ton bail sert de preuve.</li>
<li><b>Des revenus suffisants</b> : ne pas dépendre de l'<b>aide sociale</b>. Tu fournis tes fiches de salaire, ton contrat de travail et parfois les revenus de ton conjoint s'il a déjà une offre d'emploi en Suisse.</li>
<li><b>Pas de prestations complémentaires</b> (PC) à l'AVS/AI, ni pour toi ni pour ta famille.</li>
<li><b>La langue</b> : ton conjoint doit pouvoir communiquer dans la langue du lieu de domicile (le <b>français</b> en Suisse romande), au moins au niveau <b>A1 oral</b>, prouvé par un certificat reconnu (passeport des langues fide, DELF, TCF…). S'il ne l'a pas encore, une <b>inscription payée à un cours</b> de français menant à ce niveau suffit en général.</li>
</ul>
<div class="callout"><b>Avec un permis B, prépare un dossier impeccable :</b> comme ce n'est pas un droit automatique, le canton a une marge d'appréciation. Un bon contrat, un logement de la bonne taille et des finances claires font la différence.</div>
<h2>Les délais : 5 ans et 12 mois</h2>
<p>Pour les titulaires d'un permis B ou C (et pour les Suisses dont la famille vient de hors d'Europe), il y a des délais à ne pas dépasser :</p>
<ul><li><b>5 ans</b> pour demander le regroupement du conjoint et des enfants de moins de 12 ans.</li><li><b>12 mois</b> pour les enfants <b>de plus de 12 ans</b>.</li></ul>
<p>Le délai court dès l'octroi de ton permis ou dès la naissance du lien familial (par exemple le mariage). Ensuite, le regroupement n'est accepté que pour des <b>raisons familiales majeures</b>, ce qui est beaucoup plus difficile. Pour les personnes UE/AELE, il n'y a pas de délai.</p>
<h2>Faire la demande étape par étape</h2>
<ol class="steplist">
<li><b>Vérifie que tu remplis les conditions</b> : logement, revenus, langue de ton conjoint.</li>
<li><b>Rassemble les documents</b> (liste ci-dessous) et fais <a href="#guia-apostilla">apostiller</a> et <a href="#guia-traduccion">traduire</a> les actes d'état civil de ton pays.</li>
<li><b>Dépose la demande en Suisse</b> : c'est la personne qui vit déjà ici qui la fait, auprès du service des migrations de son canton (à Genève, l'Office cantonal de la population et des migrations, OCPM ; dans le canton de Vaud, via le contrôle des habitants de ta commune, qui la transmet au Service de la population, SPOP).</li>
<li><b>Attends la décision</b> : le délai varie beaucoup selon le canton et le dossier, de quelques semaines à plusieurs mois.</li>
<li><b>Ta famille demande le visa D</b> à la représentation suisse de son pays, si elle vient d'un pays soumis au visa. Voir <a href="#guia-visa">le visa national D</a>.</li>
<li><b>À l'arrivée</b> : annonce-les à la commune dans les 14 jours et conclus leur <a href="#blog-seguro-medico-suiza">assurance maladie</a> dans les 3 mois.</li>
</ol>
<h2>Documents généralement demandés</h2>
<ul>
<li>Formulaire de demande du canton, signé.</li>
<li>Passeports valables de tous les membres de la famille.</li>
<li>Acte de mariage (ou de partenariat) et actes de naissance des enfants, <b>apostillés et traduits</b>.</li>
<li>Ton permis B ou C.</li>
<li>Bail à loyer (avec le nombre de pièces) ou attestation du propriétaire.</li>
<li>Contrat de travail et dernières fiches de salaire ; parfois la dernière déclaration d'impôts.</li>
<li>Attestation de non-dépendance à l'aide sociale (commune ou service social).</li>
<li>Certificat de français A1 oral du conjoint ou inscription payée à un cours.</li>
<li>Pour un enfant qui vient sans l'autre parent : son <b>consentement écrit</b> ou la décision de garde.</li>
</ul>
<p>Chaque canton publie sa propre liste : demande-la d'abord pour ne pas perdre de temps avec un dossier incomplet.</p>
<h2>Ma famille pourra-t-elle travailler ?</h2>
<p>Oui. Le conjoint et les enfants d'une personne titulaire d'un permis B ou C peuvent <b>travailler dans toute la Suisse</b> une fois leur permis obtenu. Les enfants vont à l'école publique gratuite, et tu as parfois droit aux <a href="#guia-asignaciones">allocations familiales</a>.</p>
<h2>Erreurs fréquentes</h2>
<ul><li><b>Laisser passer le délai de 12 mois</b> pour un enfant de plus de 12 ans.</li><li><b>Louer un logement trop petit</b> avant de demander le regroupement.</li><li><b>Demander l'aide sociale</b> pendant la procédure : cela peut mener à un refus.</li><li><b>Faire venir la famille comme touristes</b> en espérant changer de statut en Suisse : en général, il faut attendre la décision depuis l'étranger.</li><li><b>Fournir des actes sans apostille ou sans traduction</b> : c'est la première cause de retard.</li></ul>`],
    faq: [
      [['¿Puedo traer a mi familia con un permiso B?', 'Puis-je faire venir ma famille avec un permis B ?'], ['Sí, es posible, pero no es un derecho automático si eres de un país fuera de Europa: el cantón decide. Debes vivir con ellos en una vivienda adecuada, tener ingresos suficientes sin ayuda social, y tu pareja debe tener un nivel A1 oral de francés o estar inscrita en un curso.', 'Oui, c\'est possible, mais ce n\'est pas un droit automatique si tu viens d\'un pays hors d\'Europe : le canton décide. Tu dois vivre avec eux dans un logement approprié, avoir des revenus suffisants sans aide sociale, et ton conjoint doit avoir un niveau A1 oral de français ou être inscrit à un cours.']],
      [['¿Cuánto tiempo tengo para pedir la reagrupación familiar?', 'Combien de temps ai-je pour demander le regroupement familial ?'], ['5 años para la pareja y los hijos menores de 12 años, y 12 meses para los hijos mayores de 12 años, a partir de la obtención de tu permiso o del vínculo familiar. Para las personas de la UE/AELE no hay plazo.', '5 ans pour le conjoint et les enfants de moins de 12 ans, et 12 mois pour les enfants de plus de 12 ans, à partir de l\'octroi de ton permis ou de la naissance du lien familial. Pour les personnes UE/AELE, il n\'y a pas de délai.']],
      [['¿Mi pareja necesita hablar francés?', 'Mon conjoint doit-il parler français ?'], ['Si eres de un país fuera de Europa con permiso B o C, sí: un nivel A1 oral como mínimo (el más básico), o una inscripción en un curso que lleve a ese nivel. Para las familias de personas europeas no se pide.', 'Si tu viens d\'un pays hors d\'Europe avec un permis B ou C, oui : au moins un niveau A1 oral (le plus basique), ou une inscription à un cours menant à ce niveau. Ce n\'est pas demandé aux familles de personnes européennes.']],
      [['¿Puedo traer a mis padres a Suiza?', 'Puis-je faire venir mes parents en Suisse ?'], ['Solo en casos limitados. Las personas de la UE/AELE pueden traer a sus padres si están a su cargo económicamente. Para los demás, la reagrupación de los padres es muy excepcional.', 'Seulement dans des cas limités. Les personnes UE/AELE peuvent faire venir leurs parents s\'ils sont à leur charge financièrement. Pour les autres, le regroupement des parents est très exceptionnel.']],
      [['¿Quién presenta la solicitud?', 'Qui dépose la demande ?'], ['La persona que ya vive en Suiza, ante el servicio de migración de su cantón. Cuando el cantón lo aprueba, la familia pide el visado D (si lo necesita) en la representación suiza de su país.', 'La personne qui vit déjà en Suisse, auprès du service des migrations de son canton. Une fois la demande approuvée, la famille demande le visa D (si nécessaire) à la représentation suisse de son pays.']],
    ],
  },
  {
    slug: 'encontrar-piso-ginebra-lausana', date: '2026-11-07', cat: ['Vivienda', 'Logement'], img: 'alquiler',
    st: ['Encontrar piso en Ginebra o Lausana (2026)', 'Trouver un appartement à Genève ou Lausanne (2026)'],
    t: ['Cómo encontrar piso en Ginebra o Lausana: dosier, precios y trampas (guía 2026)', 'Trouver un appartement à Genève ou Lausanne : dossier, prix et pièges (guide 2026)'],
    d: ['Guía práctica para alquilar en la Suiza romanda: escasez de viviendas en 2026, precios orientativos, dosier de candidatura, garantía de alquiler, fórmula oficial, estafas y dónde buscar.', 'Guide pratique pour louer en Suisse romande : pénurie de logements en 2026, prix indicatifs, dossier de candidature, garantie de loyer, formule officielle, arnaques et où chercher.'],
    src: [
      [['Estado de Vaud · 3.900 viviendas vacías al 1 de junio de 2026', 'État de Vaud · 3900 logements vacants au 1er juin 2026'], 'https://www.vd.ch/actualites/communiques-de-presse-de-letat-de-vaud/detail/communique/3900-logements-vacants-dans-le-canton-de-vaud-au-1er-juin-2026'],
      [['Tribune de Genève · Ginebra cuenta con menos de 800 viviendas vacías', 'Tribune de Genève · Genève compte moins de 800 logements vacants'], 'https://www.tdg.ch/geneve-le-taux-de-vacance-des-logements-au-plus-bas-depuis-2011-373995133170'],
      [['Ciudad de Lausana · El contrato de alquiler (información para inquilinos)', 'Ville de Lausanne · Le contrat de bail (informations aux locataires)'], 'https://www.lausanne.ch/vie-pratique/logement/Informations-aux-locataires/contrat-bail.html'],
      [['Estado de Vaud · Pedir un extracto del registro de deudas (poursuites)', 'État de Vaud · Demander un extrait du registre des poursuites'], 'https://www.vd.ch/prestation-detail/prestation/demander-un-extrait-du-registre-des-poursuites-pour-soi-meme/'],
      [['Ginebra · Pedir un extracto del registro de deudas (poursuites)', 'Genève · Demander un extrait du registre des poursuites'], 'https://www.ge.ch/poursuites/demander-extrait-du-registre-poursuites'],
      [['Fedlex · Código de obligaciones (alquiler: art. 253 y siguientes)', 'Fedlex · Code des obligations (bail : art. 253 ss)'], 'https://www.fedlex.admin.ch/eli/cc/27/317_321_377/fr'],
    ],
    body: [
`<div class="tldr"><b>En 30 segundos</b><ul><li>Encontrar piso es <b>el mayor reto</b> al llegar: el 1 de junio de 2026 solo el <b>0,31 %</b> de las viviendas estaba libre en Ginebra y el <b>0,87 %</b> en Vaud.</li><li>Prepara un <b>dosier completo</b> antes de visitar: permiso o contrato de trabajo, nóminas, extracto del registro de deudas y seguro de responsabilidad civil.</li><li>La <b>garantía</b> es de <b>3 meses de alquiler como máximo</b>, en una cuenta bloqueada a tu nombre, nunca en la cuenta del propietario.</li><li><b>Nunca pagues nada antes de visitar</b> el piso y firmar el contrato: es la estafa más común.</li><li>En Ginebra la <b>cocina cuenta como una pieza</b>: un «3 pièces» ginebrino es más pequeño que uno en Lausana.</li></ul></div>
<h2>La situación en 2026: muy pocos pisos libres</h2>
<p>La Suiza romanda vive una fuerte <b>escasez de vivienda</b>. Se considera que el mercado está equilibrado cuando alrededor del 1,5 % de las viviendas están vacías. Estamos muy lejos:</p>
<div class="tbl"><table><thead><tr><th>Cantón</th><th>Viviendas vacías (1 de junio de 2026)</th><th>Tasa</th></tr></thead><tbody>
<tr><td><b>Ginebra</b></td><td>793</td><td>0,31 %, la más baja de Suiza</td></tr>
<tr><td><b>Vaud</b></td><td>unas 3.900</td><td>0,87 % (cifra provisional)</td></tr>
</tbody></table></div>
<p>En la práctica, para un piso bien situado y a buen precio puede haber decenas de candidaturas. No es imposible, pero hay que <b>ser rápido, organizado y tener el dosier listo</b>.</p>
<h2>Cuánto cuesta alquilar en Ginebra y Lausana</h2>
<p>Los precios de los anuncios en 2026 son orientativos, pero dan una idea para un piso de 3 piezas (salón y 2 habitaciones, según la cuenta vaudense):</p>
<ul><li><b>Ginebra</b>: a menudo entre <b>2.200 y 3.000 CHF</b> al mes, y más en el centro.</li><li><b>Lausana</b>: a menudo entre <b>1.800 y 2.600 CHF</b> al mes.</li></ul>
<p>Los pisos más antiguos o alquilados desde hace años son más baratos, pero casi nunca llegan a los portales. A menudo el precio se indica como <b>alquiler neto + gastos</b> (calefacción, agua caliente, mantenimiento): compara siempre el total. Para un presupuesto completo, mira <a href="#blog-cuanto-cuesta-vivir-en-suiza">Cuánto cuesta vivir en Suiza</a>.</p>
<h3>Cómo se cuentan las «pièces»</h3>
<p>En Suiza los pisos se describen por número de <b>piezas</b> (<i>pièces</i>): el salón y las habitaciones. El baño no cuenta. En <b>Vaud</b> la cocina tampoco cuenta: un 3 pièces tiene salón y 2 habitaciones. En <b>Ginebra</b>, en cambio, la <b>cocina sí cuenta</b> como una pieza: un 4 pièces ginebrino tiene a menudo cocina, salón y 2 habitaciones. Las «medias piezas» (3,5 pièces) suelen ser un salón más grande o un rincón comedor.</p>
<h2>El dosier de candidatura</h2>
<p>La agencia inmobiliaria (<i>régie</i>) elige entre varias candidaturas. Un dosier completo y limpio, entregado el mismo día de la visita, te pone por delante. Prepara en PDF:</p>
<ul>
<li><b>Formulario de inscripción</b> de la agencia, completo y firmado.</li>
<li><b>Documento de identidad y permiso</b> de residencia (o, si aún no lo tienes, tu contrato de trabajo y la confirmación de tu solicitud de permiso).</li>
<li><b>Tus 3 últimas nóminas</b> o tu contrato de trabajo con el salario. Muchas agencias piden que el alquiler no supere un tercio de tus ingresos.</li>
<li><b>Extracto del registro de deudas</b> (<i>extrait du registre des poursuites</i>) de menos de 3 meses. En Vaud se pide en línea por 18 CHF; en Ginebra, en la Oficina cantonal de deudas. Si acabas de llegar, pide un atestado que diga que no estás registrado.</li>
<li><b>Seguro de responsabilidad civil</b> (RC privada): muchas agencias lo exigen. Cuesta en general menos de 10 CHF al mes.</li>
<li><b>Una carta corta de presentación</b> en francés: quién eres, tu trabajo, por qué este piso, que no fumas o que no tienes animales si es el caso.</li>
</ul>
<div class="callout"><b>Si acabas de llegar a Suiza</b> y no tienes historial: añade una carta de tu empleador, una prueba de ahorros o un garante que viva en Suiza. Todo lo que demuestre que pagarás cada mes cuenta.</div>
<h2>Dónde buscar</h2>
<ul>
<li><b>Portales</b>: homegate.ch, immoscout24.ch, flatfox.ch, comparis.ch e immobilier.ch. Activa las alertas para recibir los anuncios en cuanto salen.</li>
<li><b>Las agencias (régies)</b>: inscríbete directamente en su web; algunas publican primero en su propio sitio.</li>
<li><b>El boca a boca</b>: compañeros de trabajo, comunidad latina, grupos de Facebook. Muchos pisos se alquilan cuando un inquilino busca a alguien que le <b>sustituya</b> (<i>reprise de bail</i>).</li>
<li><b>Cooperativas de vivienda</b>: alquileres más bajos a largo plazo, pero listas de espera y a menudo una participación inicial.</li>
<li><b>Para empezar</b>: un piso compartido (<i>colocation</i>), un subarriendo autorizado por el propietario o un piso amueblado de algunos meses, el tiempo de buscar con calma.</li>
</ul>
<p>Las viviendas subvencionadas existen en ambos cantones, pero suelen exigir varios años de residencia en el cantón: no son una solución para los primeros meses.</p>
<h2>Firmar el contrato: garantía, fórmula oficial y estado del piso</h2>
<h3>La garantía de alquiler</h3>
<p>La ley la limita a <b>3 meses de alquiler</b> como máximo. Se deposita en una <b>cuenta bancaria bloqueada a tu nombre</b> (cuenta de garantía), no en la cuenta del propietario, y te la devuelven al final del contrato si no hay daños. Si no tienes ese dinero, existen empresas de garantía (por ejemplo SwissCaution o FirstCaution): pagas una prima cada año, que <b>no se devuelve</b>.</p>
<h3>La fórmula oficial y tu derecho a impugnar</h3>
<p>En Ginebra y en una gran parte del cantón de Vaud, el propietario debe entregarte una <b>fórmula oficial</b> con el alquiler que pagaba el inquilino anterior. Si el aumento te parece abusivo, puedes <b>impugnar el alquiler inicial en los 30 días</b> siguientes a la entrega de las llaves, ante la comisión de conciliación (en Ginebra, la comisión cantonal; en Vaud, la prefectura de tu distrito). El procedimiento es gratuito. La asociación de inquilinos <b>ASLOCA</b> puede asesorarte.</p>
<h3>El estado del piso a la entrada</h3>
<p>El día de la entrega de llaves se hace el <b>estado de lugar</b> (<i>état des lieux</i>). Anota cada mancha, rayón o desperfecto y haz fotos con fecha. Si descubres algo más en los días siguientes, avísalo <b>por escrito</b> a la agencia. Es lo que protege tu garantía al irte.</p>
<h2>Cómo evitar las estafas</h2>
<ul>
<li><b>El propietario «está en el extranjero»</b> y te propone enviarte las llaves por correo después de un pago: es una estafa.</li>
<li><b>Te piden pagar la garantía o un primer alquiler antes de visitar</b> o por Western Union, criptomonedas o transferencia a otro país: no lo hagas.</li>
<li><b>El precio es muy inferior</b> al de pisos similares del barrio: desconfía.</li>
<li><b>Te piden tu pasaporte escaneado</b> antes de cualquier visita: puede servir para un robo de identidad.</li>
</ul>
<p>Regla de oro: <b>visita, recibe un contrato a nombre de una agencia o de un propietario verificable, y solo entonces paga</b> la garantía en una cuenta de garantía.</p>
<h2>Una vez instalado</h2>
<ul><li><b>Anúnciate en tu comuna</b> en los 14 días: lo explicamos en <a href="#guia-comuna">Anunciarte en tu comuna</a>.</li><li><b>Contrata tu seguro médico</b> en los 3 meses: <a href="#blog-seguro-medico-suiza">guía del seguro médico</a>.</li><li><b>Para irte</b>, el preaviso de un piso es en general de <b>3 meses</b>, para las fechas que fija tu contrato. Si te vas antes, puedes proponer a un inquilino de sustitución solvente.</li></ul>
<h2>Errores frecuentes</h2>
<ul><li><b>Ir a las visitas sin el dosier</b>: el piso suele adjudicarse a quien lo entrega primero y completo.</li><li><b>Comparar solo el alquiler neto</b> sin los gastos.</li><li><b>Pagar la garantía en la cuenta del propietario</b> en lugar de una cuenta bloqueada.</li><li><b>Firmar sin leer la fórmula oficial</b> y dejar pasar los 30 días para impugnar.</li><li><b>Olvidar el estado de lugar</b> detallado a la entrada.</li></ul>`,
`<div class="tldr"><b>En 30 secondes</b><ul><li>Trouver un logement est <b>le plus grand défi</b> à l'arrivée : au 1er juin 2026, seuls <b>0,31 %</b> des logements étaient vacants à Genève et <b>0,87 %</b> dans le canton de Vaud.</li><li>Prépare un <b>dossier complet</b> avant les visites : permis ou contrat de travail, fiches de salaire, extrait du registre des poursuites et assurance responsabilité civile.</li><li>La <b>garantie</b> est de <b>3 mois de loyer au maximum</b>, sur un compte bloqué à ton nom, jamais sur le compte du bailleur.</li><li><b>Ne paie jamais rien avant d'avoir visité</b> et signé le bail : c'est l'arnaque la plus courante.</li><li>À Genève, <b>la cuisine compte comme une pièce</b> : un « 3 pièces » genevois est plus petit qu'un 3 pièces lausannois.</li></ul></div>
<h2>La situation en 2026 : très peu de logements libres</h2>
<p>La Suisse romande connaît une forte <b>pénurie de logements</b>. On considère que le marché est équilibré lorsqu'environ 1,5 % des logements sont vacants. On en est loin :</p>
<div class="tbl"><table><thead><tr><th>Canton</th><th>Logements vacants (1er juin 2026)</th><th>Taux</th></tr></thead><tbody>
<tr><td><b>Genève</b></td><td>793</td><td>0,31 %, le plus bas de Suisse</td></tr>
<tr><td><b>Vaud</b></td><td>environ 3900</td><td>0,87 % (chiffre provisoire)</td></tr>
</tbody></table></div>
<p>En pratique, un appartement bien situé et à bon prix peut recevoir des dizaines de candidatures. Ce n'est pas impossible, mais il faut <b>être rapide, organisé et avoir son dossier prêt</b>.</p>
<h2>Combien coûte un loyer à Genève et Lausanne</h2>
<p>Les prix des annonces en 2026 sont indicatifs, mais donnent une idée pour un 3 pièces (séjour et 2 chambres, selon le décompte vaudois) :</p>
<ul><li><b>Genève</b> : souvent entre <b>2200 et 3000 CHF</b> par mois, davantage au centre.</li><li><b>Lausanne</b> : souvent entre <b>1800 et 2600 CHF</b> par mois.</li></ul>
<p>Les logements anciens ou loués depuis longtemps sont moins chers, mais arrivent rarement sur les portails. Le prix est souvent indiqué en <b>loyer net + charges</b> (chauffage, eau chaude, entretien) : compare toujours le total. Pour un budget complet, voir <a href="#blog-cuanto-cuesta-vivir-en-suiza">Combien coûte la vie en Suisse</a>.</p>
<h3>Comment compter les pièces</h3>
<p>En Suisse, un logement se décrit par son nombre de <b>pièces</b> : le séjour et les chambres. La salle de bain ne compte pas. Dans le <b>canton de Vaud</b>, la cuisine ne compte pas non plus : un 3 pièces a un séjour et 2 chambres. À <b>Genève</b>, en revanche, <b>la cuisine compte</b> comme une pièce : un 4 pièces genevois a souvent une cuisine, un séjour et 2 chambres. Les « demi-pièces » (3,5 pièces) correspondent en général à un séjour plus grand ou à un coin à manger.</p>
<h2>Le dossier de candidature</h2>
<p>La régie choisit parmi plusieurs candidatures. Un dossier complet et propre, remis le jour même de la visite, te place devant. Prépare en PDF :</p>
<ul>
<li><b>Formulaire d'inscription</b> de la régie, complet et signé.</li>
<li><b>Pièce d'identité et permis</b> de séjour (ou, si tu ne l'as pas encore, ton contrat de travail et la confirmation de ta demande de permis).</li>
<li><b>Tes 3 dernières fiches de salaire</b> ou ton contrat de travail avec le salaire. Beaucoup de régies demandent que le loyer ne dépasse pas un tiers de tes revenus.</li>
<li><b>Extrait du registre des poursuites</b> de moins de 3 mois. Dans le canton de Vaud, il se commande en ligne pour 18 CHF ; à Genève, auprès de l'Office cantonal des poursuites. Si tu viens d'arriver, demande une attestation indiquant que tu n'es pas inscrit.</li>
<li><b>Assurance responsabilité civile</b> (RC privée) : beaucoup de régies l'exigent. Elle coûte en général moins de 10 CHF par mois.</li>
<li><b>Une courte lettre de motivation</b> en français : qui tu es, ton travail, pourquoi ce logement, non-fumeur ou sans animaux si c'est le cas.</li>
</ul>
<div class="callout"><b>Si tu viens d'arriver en Suisse</b> sans historique : ajoute une lettre de ton employeur, une preuve d'épargne ou un garant domicilié en Suisse. Tout ce qui montre que tu paieras chaque mois compte.</div>
<h2>Où chercher</h2>
<ul>
<li><b>Portails</b> : homegate.ch, immoscout24.ch, flatfox.ch, comparis.ch et immobilier.ch. Active les alertes pour recevoir les annonces dès leur parution.</li>
<li><b>Les régies</b> : inscris-toi directement sur leur site ; certaines publient d'abord chez elles.</li>
<li><b>Le bouche-à-oreille</b> : collègues, communauté latino, groupes Facebook. Beaucoup de logements se louent quand un locataire cherche un <b>repreneur</b> (reprise de bail).</li>
<li><b>Coopératives d'habitation</b> : loyers plus bas sur la durée, mais listes d'attente et souvent des parts sociales à acheter.</li>
<li><b>Pour commencer</b> : une colocation, une sous-location autorisée par le bailleur ou un meublé de quelques mois, le temps de chercher sereinement.</li>
</ul>
<p>Des logements subventionnés existent dans les deux cantons, mais ils exigent souvent plusieurs années de résidence dans le canton : ce n'est pas une solution pour les premiers mois.</p>
<h2>Signer le bail : garantie, formule officielle et état des lieux</h2>
<h3>La garantie de loyer</h3>
<p>La loi la limite à <b>3 mois de loyer</b> au maximum. Elle est versée sur un <b>compte bancaire bloqué à ton nom</b> (compte de garantie), pas sur le compte du bailleur, et te revient en fin de bail s'il n'y a pas de dégâts. Si tu n'as pas cette somme, des sociétés de cautionnement existent (par exemple SwissCaution ou FirstCaution) : tu paies une prime chaque année, qui <b>n'est pas remboursée</b>.</p>
<h3>La formule officielle et ton droit de contester</h3>
<p>À Genève et dans une grande partie du canton de Vaud, le bailleur doit te remettre une <b>formule officielle</b> indiquant le loyer du locataire précédent. Si la hausse te semble abusive, tu peux <b>contester le loyer initial dans les 30 jours</b> suivant la remise des clés, devant la commission de conciliation (à Genève, la commission cantonale ; dans le canton de Vaud, la préfecture de ton district). La procédure est gratuite. L'<b>ASLOCA</b> peut te conseiller.</p>
<h3>L'état des lieux d'entrée</h3>
<p>Le jour de la remise des clés, on fait l'<b>état des lieux</b>. Note chaque tache, rayure ou défaut et prends des photos datées. Si tu découvres autre chose dans les jours suivants, signale-le <b>par écrit</b> à la régie. C'est ce qui protège ta garantie au départ.</p>
<h2>Éviter les arnaques</h2>
<ul>
<li><b>Le propriétaire « est à l'étranger »</b> et propose de t'envoyer les clés par la poste après un paiement : c'est une arnaque.</li>
<li><b>On te demande de payer la garantie ou un premier loyer avant la visite</b>, ou par Western Union, cryptomonnaie ou virement vers l'étranger : refuse.</li>
<li><b>Le prix est bien plus bas</b> que pour des logements similaires du quartier : méfiance.</li>
<li><b>On te demande ton passeport scanné</b> avant toute visite : risque d'usurpation d'identité.</li>
</ul>
<p>Règle d'or : <b>visite, reçois un bail au nom d'une régie ou d'un propriétaire vérifiable, et seulement ensuite paie</b> la garantie sur un compte de garantie.</p>
<h2>Une fois installé</h2>
<ul><li><b>Annonce-toi à ta commune</b> dans les 14 jours : voir <a href="#guia-comuna">S'annoncer à la commune</a>.</li><li><b>Conclus ton assurance maladie</b> dans les 3 mois : <a href="#blog-seguro-medico-suiza">guide de l'assurance maladie</a>.</li><li><b>Pour partir</b>, le préavis d'un appartement est en général de <b>3 mois</b>, pour les échéances prévues par ton bail. Si tu pars plus tôt, tu peux proposer un locataire de remplacement solvable.</li></ul>
<h2>Erreurs fréquentes</h2>
<ul><li><b>Aller aux visites sans dossier</b> : le logement va souvent au premier dossier complet.</li><li><b>Comparer seulement le loyer net</b> sans les charges.</li><li><b>Verser la garantie sur le compte du bailleur</b> au lieu d'un compte bloqué.</li><li><b>Signer sans lire la formule officielle</b> et laisser passer les 30 jours pour contester.</li><li><b>Oublier l'état des lieux</b> détaillé à l'entrée.</li></ul>`],
    faq: [
      [['¿Cuánto cuesta alquilar un piso en Ginebra?', 'Combien coûte un appartement à Genève ?'], ['Según los anuncios de 2026, un piso de 3 piezas cuesta a menudo entre 2.200 y 3.000 CHF al mes, y más en el centro. Recuerda que en Ginebra la cocina cuenta como una pieza.', 'Selon les annonces de 2026, un 3 pièces coûte souvent entre 2200 et 3000 CHF par mois, davantage au centre. À Genève, la cuisine compte comme une pièce.']],
      [['¿Puedo alquilar un piso sin permiso de residencia?', 'Puis-je louer un appartement sans permis de séjour ?'], ['Sí, a menudo con tu contrato de trabajo y la prueba de tu solicitud de permiso. Algunas agencias piden además un garante o una garantía más sólida. Una vez que tengas el piso, debes anunciarte en la comuna en los 14 días.', 'Oui, souvent avec ton contrat de travail et la preuve de ta demande de permis. Certaines régies demandent en plus un garant. Une fois le logement trouvé, tu dois t\'annoncer à la commune dans les 14 jours.']],
      [['¿Cuánto es la garantía de alquiler en Suiza?', 'À combien s\'élève la garantie de loyer en Suisse ?'], ['Como máximo 3 meses de alquiler, en una cuenta bloqueada a tu nombre. También puedes usar una empresa de garantía, pagando una prima anual que no se devuelve.', 'Au maximum 3 mois de loyer, sur un compte bloqué à ton nom. Tu peux aussi passer par une société de cautionnement, avec une prime annuelle non remboursée.']],
      [['¿Qué es el extracto del registro de deudas?', 'Qu\'est-ce que l\'extrait du registre des poursuites ?'], ['Un documento oficial que indica si tienes deudas reclamadas en Suiza. Casi todas las agencias lo piden. En Vaud se pide en línea por 18 CHF; en Ginebra, en la Oficina cantonal de deudas (Office des poursuites).', 'Un document officiel qui indique si tu as des dettes en poursuite en Suisse. Presque toutes les régies le demandent. Dans le canton de Vaud, il se commande en ligne pour 18 CHF ; à Genève, auprès de l\'Office cantonal des poursuites.']],
      [['¿Cómo sé si un anuncio es una estafa?', 'Comment savoir si une annonce est une arnaque ?'], ['Desconfía si el precio es muy bajo, si el propietario dice estar en el extranjero, si te piden pagar antes de visitar o enviar tu pasaporte. Nunca pagues antes de visitar y firmar un contrato.', 'Méfie-toi si le prix est très bas, si le propriétaire dit être à l\'étranger, si on te demande de payer avant la visite ou d\'envoyer ton passeport. Ne paie jamais avant d\'avoir visité et signé un bail.']],
    ],
  },
  {
    slug: 'permiso-b-suiza', date: '2026-11-06', cat: ['Permisos', 'Permis'], img: 'integracion', featured: true,
    st: ['Permiso B en Suiza: requisitos y cómo obtenerlo (2026)', 'Permis B en Suisse : conditions et démarches (2026)'],
    t: ['Permiso B en Suiza: qué es, requisitos y cómo obtenerlo (guía 2026)', 'Permis B en Suisse : ce que c\'est, conditions et démarches (guide 2026)'],
    d: ['Todo sobre el permiso B en Suiza: quién puede obtenerlo con pasaporte europeo o latinoamericano, documentos, pasos, renovación, cambio de cantón y paso al permiso C.', 'Tout sur le permis B en Suisse : qui peut l\'obtenir avec un passeport européen ou latino-américain, documents, étapes, renouvellement, changement de canton et passage au permis C.'],
    body: [
`<div class="tldr"><b>En 30 segundos</b><ul><li>El <b>permiso B</b> es el permiso de <b>residencia</b> en Suiza: te permite vivir en el país durante un periodo determinado.</li><li>Con <b>pasaporte europeo</b> (también español o con doble nacionalidad) y un contrato de al menos un año, se obtiene casi siempre y suele valer <b>5 años</b>.</li><li>Con <b>pasaporte latinoamericano</b> solamente, es mucho más difícil: depende de un empleador, de cupos anuales y suele renovarse <b>cada año</b>.</li><li>Lo pides en tu <b>comuna</b> al llegar y, después de varios años, puedes pasar al <b>permiso C</b>.</li></ul></div>
<nav class="toc" aria-label="Índice"><b>En este artículo</b><ol><li><a href="#que-es">¿Qué es el permiso B?</a></li><li><a href="#comparar">Permisos L, B y C: diferencias</a></li><li><a href="#quien">¿Quién puede obtenerlo?</a></li><li><a href="#pasos">Cómo obtenerlo paso a paso</a></li><li><a href="#documentos">Documentos que suelen pedir</a></li><li><a href="#renovar">Renovación y cambio de cantón</a></li><li><a href="#permiso-c">Del permiso B al permiso C</a></li><li><a href="#errores">Errores frecuentes</a></li><li><a href="#faq">Preguntas frecuentes</a></li></ol></nav>
<h2 id="que-es">¿Qué es el permiso B?</h2>
<p>El permiso B (<i>autorisation de séjour</i>) es la tarjeta que demuestra que <b>vives legalmente en Suiza</b> por un periodo determinado. Es el permiso más común de las personas que se instalan en el país, sobre todo durante los primeros años. Te lo entrega el cantón donde vives, después de anunciarte en tu comuna.</p>
<p>No es lo mismo que el permiso de corta duración (L) ni que el permiso de establecimiento (C), que es indefinido. Puedes ver todas las letras en nuestra guía <a href="#guia-permisos">Los permisos suizos: L, B, C, F, G</a>.</p>
<h2 id="comparar">Permisos L, B y C: diferencias</h2>
<div class="tbl"><table><thead><tr><th>Permiso</th><th>Para qué</th><th>Duración habitual</th></tr></thead><tbody>
<tr><td><b>L</b> · corta duración</td><td>Contratos cortos o estancias temporales</td><td>Menos de un año, a veces prorrogable</td></tr>
<tr><td><b>B</b> · residencia</td><td>Vivir en Suiza con un trabajo, estudios, familia o medios propios</td><td>UE/AELE: hasta 5 años · otros países: en general 1 año, renovable</td></tr>
<tr><td><b>C</b> · establecimiento</td><td>Residencia indefinida después de varios años</td><td>Sin límite (la tarjeta se renueva)</td></tr>
</tbody></table></div>
<h2 id="quien">¿Quién puede obtener el permiso B?</h2>
<h3>Si tienes pasaporte europeo (UE/AELE)</h3>
<p>Gracias a la libre circulación, es el caso más sencillo. Con un <b>contrato de trabajo de al menos 12 meses</b> (o indefinido), recibes en general un permiso B válido <b>5 años</b>. Con un contrato más corto, normalmente recibes un permiso L. También puedes obtenerlo sin trabajar si demuestras <b>medios económicos suficientes</b> y un seguro médico, por ejemplo como estudiante o jubilado.</p>
<h3>Si solo tienes pasaporte latinoamericano</h3>
<p>Aquí el acceso es limitado. Los permisos para trabajar se conceden sobre todo a <b>perfiles cualificados</b>, dentro de <b>cupos anuales</b> (para 2026, 4.500 permisos B para personas de estados terceros). El empleador debe demostrar que no encontró a nadie en Suiza ni en Europa. Las otras vías habituales son:</p>
<ul><li><b>Reagrupación familiar</b>: si tu pareja o uno de tus padres vive legalmente en Suiza. Ver <a href="#guia-familia">reagrupación familiar</a>.</li><li><b>Estudios</b>: un permiso B para estudiantes, renovado cada año mientras sigues tu formación.</li><li><b>Matrimonio o pareja registrada</b> con una persona suiza o con permiso B o C.</li></ul>
<p>Antes de viajar, normalmente necesitas un <a href="#guia-visa">visado nacional D</a>, que solo se emite cuando el cantón ha aprobado tu permiso.</p>
<div class="callout"><b>Importante:</b> venir como turista y buscar trabajo allí rara vez lleva a un permiso B. La estancia sin visado (hasta 90 días) no permite trabajar.</div>
<h2 id="pasos">Cómo obtener el permiso B paso a paso</h2>
<ol class="steplist">
<li><b>Consigue tu base legal</b>: contrato de trabajo, admisión en una escuela, decisión de reagrupación familiar o, si eres europeo sin trabajo, prueba de medios suficientes.</li>
<li><b>Si vienes de fuera de la UE</b>: espera la autorización del cantón y pide el visado D en la representación suiza de tu país.</li>
<li><b>Anúnciate en tu comuna</b> en los 14 días siguientes a tu llegada y antes de empezar a trabajar. Te explicamos qué llevar en <a href="#guia-comuna">Anunciarte en tu comuna</a>.</li>
<li><b>Datos biométricos</b> (personas de fuera de la UE): el cantón te convoca para la foto y las huellas.</li>
<li><b>Recibes tu tarjeta</b> por correo, normalmente en unas semanas. Mientras tanto, guarda el justificante de tu anuncio.</li>
<li><b>Contrata tu seguro médico</b> en los 3 meses siguientes a tu llegada: es obligatorio. Ver <a href="#guia-lamal">seguro médico (LAMal)</a>.</li>
</ol>
<h2 id="documentos">Documentos que suelen pedir</h2>
<ul><li>Pasaporte o documento de identidad válido.</li><li>Fotos de pasaporte (según el cantón).</li><li>Contrato de trabajo, certificado de estudios o la base de tu estancia.</li><li>Contrato de alquiler o prueba de alojamiento.</li><li>Para la familia: actas de nacimiento y de matrimonio, a menudo <a href="#guia-apostilla">apostilladas</a> y <a href="#guia-traduccion">traducidas</a>.</li></ul>
<p>Cada país emite sus documentos de forma distinta: mira lo que pide el tuyo en <a href="#paises">documentos por país</a>. La lista exacta y las tasas varían según el cantón.</p>
<h2 id="renovar">Renovación y cambio de cantón</h2>
<p>Antes del vencimiento, el cantón suele enviarte un formulario de renovación. Si no lo recibes, <b>pide tú la renovación antes de que caduque</b> tu permiso. Para las personas de fuera de la UE, el cantón revisa sobre todo la integración: respeto de la ley, participación en la vida económica o en una formación y, según el caso, el nivel de idioma. Depender de la ayuda social de forma prolongada puede complicar la renovación: lee <a href="#guia-ayudasocial">RI y ayuda social</a>.</p>
<p>Si te mudas a <b>otro cantón</b>, no basta con cambiar de comuna: debes anunciarte en el nuevo cantón y, con un permiso de estado tercero, a menudo pedir una autorización.</p>
<h2 id="permiso-c">Del permiso B al permiso C</h2>
<p>Después de varios años con permiso B, puedes pedir el <b>permiso C</b> (establecimiento), indefinido. En general se exigen <b>10 años</b> de residencia; para personas de algunos países europeos o en caso de buena integración, puede ser antes. Hace falta un nivel de idioma (a menudo <b>A2 oral y A1 escrito</b> en el idioma del cantón), no tener deudas importantes ni depender de la ayuda social, y respetar la ley.</p>
<h2 id="errores">Errores frecuentes</h2>
<ul><li><b>Empezar a trabajar antes de anunciarte</b> en la comuna.</li><li><b>Olvidar el seguro médico</b>: después de 3 meses, el cantón te asigna uno de oficio, a veces con recargo.</li><li><b>Dejar caducar el permiso</b> sin pedir la renovación.</li><li><b>Mudarte de cantón sin avisar</b>.</li><li><b>Pagar a intermediarios</b> que prometen un permiso: nadie puede garantizarlo.</li></ul>
<div class="callout ok"><b>¿Quieres saber qué te toca a ti?</b> Calcula gratis <a href="#ruta">tu ruta</a>: según tu país, tu motivo y tu cantón, ves tus pasos y tus documentos.</div>`,
`<div class="tldr"><b>En 30 secondes</b><ul><li>Le <b>permis B</b> est le permis de <b>séjour</b> en Suisse : il te permet de vivre dans le pays pendant une durée déterminée.</li><li>Avec un <b>passeport européen</b> (aussi espagnol ou en double nationalité) et un contrat d'au moins un an, on l'obtient presque toujours, en général pour <b>5 ans</b>.</li><li>Avec seulement un <b>passeport latino-américain</b>, c'est beaucoup plus difficile : il dépend d'un employeur, de contingents annuels et se renouvelle en général <b>chaque année</b>.</li><li>On le demande à sa <b>commune</b> à l'arrivée et, après plusieurs années, on peut passer au <b>permis C</b>.</li></ul></div>
<nav class="toc" aria-label="Sommaire"><b>Dans cet article</b><ol><li><a href="#que-es">Qu'est-ce que le permis B ?</a></li><li><a href="#comparar">Permis L, B et C : différences</a></li><li><a href="#quien">Qui peut l'obtenir ?</a></li><li><a href="#pasos">Les démarches étape par étape</a></li><li><a href="#documentos">Documents souvent demandés</a></li><li><a href="#renovar">Renouvellement et changement de canton</a></li><li><a href="#permiso-c">Du permis B au permis C</a></li><li><a href="#errores">Erreurs fréquentes</a></li><li><a href="#faq">Questions fréquentes</a></li></ol></nav>
<h2 id="que-es">Qu'est-ce que le permis B ?</h2>
<p>Le permis B (<i>autorisation de séjour</i>) est la carte qui prouve que <b>tu vis légalement en Suisse</b> pour une durée déterminée. C'est le permis le plus courant des personnes qui s'installent, surtout les premières années. Il est délivré par le canton où tu vis, après ton annonce à la commune.</p>
<p>Ce n'est ni le permis de courte durée (L) ni le permis d'établissement (C), qui est illimité. Toutes les lettres sont expliquées dans notre guide <a href="#guia-permisos">Les permis suisses : L, B, C, F, G</a>.</p>
<h2 id="comparar">Permis L, B et C : différences</h2>
<div class="tbl"><table><thead><tr><th>Permis</th><th>Pour quoi</th><th>Durée habituelle</th></tr></thead><tbody>
<tr><td><b>L</b> · courte durée</td><td>Contrats courts ou séjours temporaires</td><td>Moins d'un an, parfois prolongeable</td></tr>
<tr><td><b>B</b> · séjour</td><td>Vivre en Suisse avec un travail, des études, la famille ou des moyens propres</td><td>UE/AELE : jusqu'à 5 ans · autres pays : en général 1 an, renouvelable</td></tr>
<tr><td><b>C</b> · établissement</td><td>Séjour illimité après plusieurs années</td><td>Illimité (la carte se renouvelle)</td></tr>
</tbody></table></div>
<h2 id="quien">Qui peut obtenir le permis B ?</h2>
<h3>Avec un passeport européen (UE/AELE)</h3>
<p>Grâce à la libre circulation, c'est le cas le plus simple. Avec un <b>contrat de travail d'au moins 12 mois</b> (ou à durée indéterminée), tu reçois en général un permis B valable <b>5 ans</b>. Avec un contrat plus court, c'est en principe un permis L. Tu peux aussi l'obtenir sans travailler si tu prouves des <b>moyens financiers suffisants</b> et une assurance maladie, par exemple comme étudiant ou retraité.</p>
<h3>Avec seulement un passeport latino-américain</h3>
<p>L'accès est limité. Les permis de travail vont surtout à des <b>profils qualifiés</b>, dans le cadre de <b>contingents annuels</b> (pour 2026, 4 500 permis B pour les ressortissants d'États tiers). L'employeur doit prouver qu'il n'a trouvé personne en Suisse ni en Europe. Les autres voies habituelles :</p>
<ul><li><b>Regroupement familial</b> : si ton ou ta partenaire ou l'un de tes parents vit légalement en Suisse. Voir <a href="#guia-familia">regroupement familial</a>.</li><li><b>Études</b> : un permis B pour étudiants, renouvelé chaque année pendant la formation.</li><li><b>Mariage ou partenariat enregistré</b> avec une personne suisse ou titulaire d'un permis B ou C.</li></ul>
<p>Avant le voyage, il faut en général un <a href="#guia-visa">visa national D</a>, délivré seulement quand le canton a approuvé ton permis.</p>
<div class="callout"><b>Important :</b> venir comme touriste et chercher du travail sur place mène rarement à un permis B. Le séjour sans visa (jusqu'à 90 jours) ne permet pas de travailler.</div>
<h2 id="pasos">Les démarches étape par étape</h2>
<ol class="steplist">
<li><b>Obtiens ta base légale</b> : contrat de travail, admission dans une école, décision de regroupement familial ou, pour un Européen sans emploi, preuve de moyens suffisants.</li>
<li><b>Si tu viens d'un pays hors UE</b> : attends l'autorisation du canton et demande le visa D à la représentation suisse de ton pays.</li>
<li><b>Annonce-toi à ta commune</b> dans les 14 jours suivant ton arrivée et avant de commencer à travailler. Quoi apporter : <a href="#guia-comuna">s'annoncer à la commune</a>.</li>
<li><b>Données biométriques</b> (personnes hors UE) : le canton te convoque pour la photo et les empreintes.</li>
<li><b>Tu reçois ta carte</b> par la poste, en général en quelques semaines. En attendant, garde l'attestation de ton annonce.</li>
<li><b>Prends ton assurance maladie</b> dans les 3 mois suivant ton arrivée : elle est obligatoire. Voir <a href="#guia-lamal">assurance maladie (LAMal)</a>.</li>
</ol>
<h2 id="documentos">Documents souvent demandés</h2>
<ul><li>Passeport ou pièce d'identité valable.</li><li>Photos d'identité (selon le canton).</li><li>Contrat de travail, attestation d'études ou base de ton séjour.</li><li>Bail ou preuve de logement.</li><li>Pour la famille : actes de naissance et de mariage, souvent <a href="#guia-apostilla">apostillés</a> et <a href="#guia-traduccion">traduits</a>.</li></ul>
<p>Chaque pays délivre ses documents différemment : vois ce que demande le tien dans <a href="#paises">documents par pays</a>. La liste exacte et les émoluments varient selon le canton.</p>
<h2 id="renovar">Renouvellement et changement de canton</h2>
<p>Avant l'échéance, le canton t'envoie en général un formulaire de renouvellement. Si tu ne le reçois pas, <b>demande toi-même le renouvellement avant l'expiration</b>. Pour les personnes hors UE, le canton examine surtout l'intégration : respect de la loi, participation à la vie économique ou à une formation et, selon les cas, le niveau de langue. Dépendre durablement de l'aide sociale peut compliquer le renouvellement : lis <a href="#guia-ayudasocial">RI et aide sociale</a>.</p>
<p>Si tu déménages dans un <b>autre canton</b>, changer de commune ne suffit pas : il faut s'annoncer au nouveau canton et, avec un permis d'État tiers, souvent demander une autorisation.</p>
<h2 id="permiso-c">Du permis B au permis C</h2>
<p>Après plusieurs années avec un permis B, tu peux demander le <b>permis C</b> (établissement), illimité. On demande en général <b>10 ans</b> de séjour ; pour les ressortissants de certains pays européens ou en cas de bonne intégration, cela peut être plus tôt. Il faut un niveau de langue (souvent <b>A2 à l'oral et A1 à l'écrit</b> dans la langue du canton), ne pas avoir de dettes importantes ni dépendre de l'aide sociale, et respecter la loi.</p>
<h2 id="errores">Erreurs fréquentes</h2>
<ul><li><b>Commencer à travailler avant de s'annoncer</b> à la commune.</li><li><b>Oublier l'assurance maladie</b> : après 3 mois, le canton t'affilie d'office, parfois avec une surprime.</li><li><b>Laisser expirer le permis</b> sans demander le renouvellement.</li><li><b>Changer de canton sans l'annoncer</b>.</li><li><b>Payer des intermédiaires</b> qui promettent un permis : personne ne peut le garantir.</li></ul>
<div class="callout ok"><b>Tu veux savoir ce qui te concerne ?</b> Calcule gratuitement <a href="#ruta">ton parcours</a> : selon ton pays, ton motif et ton canton, tu vois tes étapes et tes documents.</div>`],
    faq: [
      [['¿Cuánto tiempo vale el permiso B?', 'Combien de temps le permis B est-il valable ?'], ['Para personas de la UE/AELE con un contrato de al menos un año, en general 5 años. Para personas de otros países, en general 1 año, y se renueva cada año.', 'Pour les ressortissants UE/AELE avec un contrat d\'au moins un an, en général 5 ans. Pour les autres pays, en général 1 an, renouvelé chaque année.']],
      [['¿Puedo obtener el permiso B con pasaporte colombiano, peruano o mexicano?', 'Puis-je obtenir le permis B avec un passeport colombien, péruvien ou mexicain ?'], ['Sí, pero las vías son limitadas: un empleador que te contrata dentro de los cupos (perfiles cualificados), la reagrupación familiar, los estudios o el matrimonio con una persona residente en Suiza.', 'Oui, mais les voies sont limitées : un employeur qui t\'engage dans le cadre des contingents (profils qualifiés), le regroupement familial, les études ou le mariage avec une personne résidant en Suisse.']],
      [['¿Dónde se pide el permiso B?', 'Où demande-t-on le permis B ?'], ['Te anuncias en la comuna donde vives en los 14 días siguientes a tu llegada; el cantón emite el permiso. Si vienes de fuera de la UE, el cantón debe aprobarlo antes de tu llegada y necesitas un visado D.', 'Tu t\'annonces à la commune où tu vis dans les 14 jours suivant ton arrivée ; le canton délivre le permis. Si tu viens d\'un pays hors UE, le canton doit l\'approuver avant ton arrivée et il te faut un visa D.']],
      [['¿Cuándo puedo pasar del permiso B al C?', 'Quand puis-je passer du permis B au permis C ?'], ['En general después de 10 años de residencia, a veces antes según tu nacionalidad o tu integración, con un nivel de idioma suficiente y sin depender de la ayuda social.', 'En général après 10 ans de séjour, parfois plus tôt selon ta nationalité ou ton intégration, avec un niveau de langue suffisant et sans dépendre de l\'aide sociale.']],
      [['¿Puedo trabajar con un permiso B de estudiante?', 'Puis-je travailler avec un permis B étudiant ?'], ['En general sí, de forma limitada (unas horas por semana durante el semestre) y a veces después de unos meses de estudios. Las reglas exactas dependen del cantón y de tu nacionalidad.', 'En général oui, de façon limitée (quelques heures par semaine pendant le semestre) et parfois après quelques mois d\'études. Les règles exactes dépendent du canton et de ta nationalité.']],
    ],
  },
  {
    slug: 'cuanto-cuesta-vivir-en-suiza', date: '2026-11-06', cat: ['Dinero', 'Argent'], img: 'alquiler',
    st: ['¿Cuánto cuesta vivir en Suiza? Presupuesto 2026', 'Combien coûte la vie en Suisse ? Budget 2026'],
    t: ['¿Cuánto cuesta vivir en Suiza? Presupuesto real en la Suiza romanda', 'Combien coûte la vie en Suisse ? Budget réel en Suisse romande'],
    d: ['Alquiler, seguro médico, transporte, comida e impuestos: cuánto cuesta vivir en Lausana, Ginebra y el resto de la Suiza romanda, con un presupuesto de ejemplo.', 'Loyer, assurance maladie, transports, nourriture et impôts : combien coûte la vie à Lausanne, Genève et dans le reste de la Suisse romande, avec un budget type.'],
    body: [
`<p class="lead">Suiza tiene fama de ser uno de los países más caros del mundo, y es verdad. Pero los salarios también son altos, y hay ayudas que mucha gente no pide. Aquí tienes los gastos principales para preparar tu presupuesto.</p>
<h2>1. La vivienda, el gasto más grande</h2><p>En Lausana o Ginebra, un piso de 3,5 piezas (dos dormitorios) cuesta a menudo entre CHF 1.800 y 2.800 al mes, gastos aparte. En ciudades más pequeñas de Vaud, Valais, Friburgo, Neuchâtel o Jura suele ser más barato. Al firmar pagas una <b>garantía de alquiler</b> de hasta 3 meses, que recuperas al irte.</p>
<h2>2. El seguro médico obligatorio</h2><p>Cada persona paga su propia prima: para un adulto, a menudo entre CHF 350 y 550 al mes según el cantón, la aseguradora y la franquicia. Para 2027 las primas suben de media un 5 %. Si tus ingresos son modestos, revisa si tienes derecho al <a href="#guia-subsidio">subsidio del seguro</a>, y recuerda que puedes <a href="#guia-cambiar">cambiar de aseguradora</a> cada año.</p>
<h2>3. Transporte</h2><p>Un abono de transporte local cuesta unos CHF 60 a 90 al mes. El <b>medio billete</b> (demi-tarif) reduce a la mitad el precio de los trenes. Algunas comunas subvencionan el abono: pregunta en la tuya.</p>
<h2>4. Comida y día a día</h2><p>Hacer la compra en supermercados de descuento y cocinar en casa cambia mucho el presupuesto. Comer fuera es caro: un menú del día en un restaurante sencillo suele rondar los CHF 20 a 25.</p>
<h2>5. Impuestos</h2><p>Con permiso B y un salario, el <a href="#guia-impuestos">impuesto en la fuente</a> se descuenta directamente de tu sueldo, así que ya está incluido en tu salario neto.</p>
<h2>Ejemplo de presupuesto mensual (persona sola, Lausana)</h2>
<div class="tbl"><table><thead><tr><th>Gasto</th><th>Aproximado</th></tr></thead><tbody><tr><td>Alquiler (estudio o 2 piezas)</td><td>CHF 1.300 – 1.700</td></tr><tr><td>Seguro médico</td><td>CHF 400 – 500</td></tr><tr><td>Transporte</td><td>CHF 70</td></tr><tr><td>Comida</td><td>CHF 500 – 700</td></tr><tr><td>Teléfono e internet</td><td>CHF 60 – 100</td></tr><tr><td>Total aproximado</td><td>CHF 2.300 – 3.100</td></tr></tbody></table></div>
<p class="muted">Cifras orientativas, para ayudarte a planificar. Varían según tu situación y cambian cada año.</p>
<div class="callout ok"><b>Consejo</b>: antes de mudarte, calcula tu presupuesto con un salario realista para tu sector y tu nivel de francés. Y no olvides las ayudas: <a href="#instalados-subsidios">subsidios</a>, <a href="#guia-asignaciones">asignaciones familiares</a>.</div>`,
`<p class="lead">La Suisse a la réputation d'être l'un des pays les plus chers du monde, et c'est vrai. Mais les salaires sont élevés aussi, et il existe des aides que beaucoup de gens ne demandent pas. Voici les principales dépenses pour préparer ton budget.</p>
<h2>1. Le logement, la plus grosse dépense</h2><p>À Lausanne ou Genève, un 3,5 pièces coûte souvent entre CHF 1 800 et 2 800 par mois, charges en plus. Dans les villes plus petites de Vaud, du Valais, de Fribourg, Neuchâtel ou du Jura, c'est généralement moins cher. À la signature, tu paies une <b>garantie de loyer</b> de jusqu'à 3 mois, que tu récupères en partant.</p>
<h2>2. L'assurance maladie obligatoire</h2><p>Chaque personne paie sa propre prime : pour un adulte, souvent entre CHF 350 et 550 par mois selon le canton, la caisse et la franchise. Pour 2027, les primes augmentent de 5 % en moyenne. Si tes revenus sont modestes, vérifie si tu as droit au <a href="#guia-subsidio">subside</a>, et rappelle-toi que tu peux <a href="#guia-cambiar">changer de caisse</a> chaque année.</p>
<h2>3. Les transports</h2><p>Un abonnement local coûte environ CHF 60 à 90 par mois. Le <b>demi-tarif</b> divise par deux le prix des trains. Certaines communes subventionnent l'abonnement : renseigne-toi dans la tienne.</p>
<h2>4. Nourriture et quotidien</h2><p>Faire ses courses dans les supermarchés discount et cuisiner à la maison change beaucoup le budget. Manger dehors coûte cher : un menu du jour dans un restaurant simple tourne souvent autour de CHF 20 à 25.</p>
<h2>5. Les impôts</h2><p>Avec un permis B et un salaire, l'<a href="#guia-impuestos">impôt à la source</a> est retenu directement sur ton salaire : il est donc déjà déduit de ton salaire net.</p>
<h2>Exemple de budget mensuel (personne seule, Lausanne)</h2>
<div class="tbl"><table><thead><tr><th>Dépense</th><th>Environ</th></tr></thead><tbody><tr><td>Loyer (studio ou 2 pièces)</td><td>CHF 1 300 – 1 700</td></tr><tr><td>Assurance maladie</td><td>CHF 400 – 500</td></tr><tr><td>Transports</td><td>CHF 70</td></tr><tr><td>Nourriture</td><td>CHF 500 – 700</td></tr><tr><td>Téléphone et internet</td><td>CHF 60 – 100</td></tr><tr><td>Total approximatif</td><td>CHF 2 300 – 3 100</td></tr></tbody></table></div>
<p class="muted">Chiffres indicatifs, pour t'aider à planifier. Ils varient selon ta situation et changent chaque année.</p>
<div class="callout ok"><b>Conseil</b> : avant de déménager, calcule ton budget avec un salaire réaliste pour ton secteur et ton niveau de français. Et n'oublie pas les aides : <a href="#instalados-subsidios">subsides</a>, <a href="#guia-asignaciones">allocations familiales</a>.</div>`],
  },
  {
    slug: 'emigrar-a-suiza-desde-latinoamerica', date: '2026-11-05', cat: ['Inmigración', 'Immigration'], img: 'noviembre',
    st: ['Emigrar a Suiza desde Latinoamérica: las vías reales', 'Émigrer en Suisse depuis l\'Amérique latine'],
    t: ['Cómo emigrar a Suiza desde Latinoamérica: las vías reales', 'Émigrer en Suisse depuis l\'Amérique latine : les vraies voies'],
    d: ['Trabajo, estudios, familia, pasaporte europeo: las vías reales para emigrar a Suiza desde Colombia, Perú, Ecuador, Venezuela, México y el resto de Latinoamérica.', 'Travail, études, famille, passeport européen : les vraies voies pour émigrer en Suisse depuis la Colombie, le Pérou, l\'Équateur, le Venezuela, le Mexique et le reste de l\'Amérique latine.'],
    body: [
`<p class="lead">Mucha información en internet promete que emigrar a Suiza es fácil. No lo es, pero tampoco es imposible. Estas son las vías reales, de la más sencilla a la más difícil.</p>
<h2>1. Tener un pasaporte europeo</h2><p>Si tienes (o puedes obtener) la nacionalidad española, italiana, portuguesa u otra de la UE, todo cambia: entras en el régimen de libre circulación y puedes venir a trabajar o a buscar trabajo. Si tus padres o abuelos son europeos, vale la pena revisar si tienes derecho a la nacionalidad.</p>
<h2>2. La reagrupación familiar</h2><p>Si tu pareja (casada o registrada) o uno de tus padres vive legalmente en Suiza, puede pedir que te reúnas con él o ella. Las condiciones dependen de su permiso: vivienda adecuada, recursos suficientes y, a veces, idioma. Detalles en <a href="#guia-familia">reagrupación familiar</a>.</p>
<h2>3. Estudiar en Suiza</h2><p>Puedes obtener un permiso de estudiante para una formación en una universidad o escuela reconocida. Debes demostrar que tienes los medios para vivir y que volverás después, aunque tras un título suizo existen posibilidades de quedarse a trabajar en ciertos casos.</p>
<h2>4. Un contrato de trabajo</h2><p>Para personas de fuera de la UE, el empleador debe demostrar que no encontró a nadie en Suiza ni en Europa, y los permisos tienen un cupo anual (8.500 en 2026). En la práctica, se conceden a perfiles muy cualificados y especializados. Lee <a href="#guia-visa">Visa D: vivir en Suiza fuera de la UE</a>.</p>
<h2>Lo que no funciona</h2><ul><li><b>Venir como turista y buscar trabajo</b>: la estancia sin visado de hasta 90 días no permite trabajar, y rara vez lleva a un permiso.</li><li><b>Trabajar sin permiso</b>: te expone a la explotación, a multas y a la expulsión, y complica cualquier trámite futuro.</li><li><b>Pagar a intermediarios que prometen un permiso</b>: nadie puede garantizarlo. Desconfía.</li></ul>
<h2>Prepara tus documentos desde ya</h2><p>Sea cual sea la vía, necesitarás actas de nacimiento, antecedentes penales y documentos de estado civil apostillados y a veces traducidos. Mira lo que pide tu país en <a href="#paises">documentos por país</a>.</p>
<div class="callout ok"><b>¿No sabes cuál es tu vía?</b> Calcula gratis <a href="#ruta">tu ruta</a> según tu país, tu motivo y tu cantón.</div>`,
`<p class="lead">Beaucoup d'informations sur internet promettent qu'émigrer en Suisse est facile. Ce n'est pas le cas, mais ce n'est pas impossible non plus. Voici les vraies voies, de la plus simple à la plus difficile.</p>
<h2>1. Avoir un passeport européen</h2><p>Si tu as (ou peux obtenir) la nationalité espagnole, italienne, portugaise ou d'un autre pays de l'UE, tout change : tu entres dans le régime de libre circulation et tu peux venir travailler ou chercher un emploi. Si tes parents ou grands-parents sont européens, vérifie si tu as droit à la nationalité.</p>
<h2>2. Le regroupement familial</h2><p>Si ton ou ta partenaire (marié·e ou en partenariat enregistré) ou l'un de tes parents vit légalement en Suisse, il ou elle peut demander à ce que tu le rejoignes. Les conditions dépendent de son permis : logement adapté, ressources suffisantes et parfois langue. Détails : <a href="#guia-familia">regroupement familial</a>.</p>
<h2>3. Étudier en Suisse</h2><p>Tu peux obtenir un permis d'étudiant pour une formation dans une université ou une école reconnue. Tu dois prouver que tu as les moyens de vivre et que tu repartiras ensuite, même si un diplôme suisse ouvre dans certains cas la possibilité de rester travailler.</p>
<h2>4. Un contrat de travail</h2><p>Pour les personnes hors UE, l'employeur doit prouver qu'il n'a trouvé personne en Suisse ni en Europe, et les permis sont contingentés (8 500 en 2026). En pratique, ils vont à des profils très qualifiés et spécialisés. Lis <a href="#guia-visa">Visa D : vivre en Suisse hors UE</a>.</p>
<h2>Ce qui ne marche pas</h2><ul><li><b>Venir comme touriste et chercher du travail</b> : le séjour sans visa de 90 jours ne permet pas de travailler et mène rarement à un permis.</li><li><b>Travailler sans permis</b> : tu t'exposes à l'exploitation, à des amendes et au renvoi, et tu compliques toute démarche future.</li><li><b>Payer des intermédiaires qui promettent un permis</b> : personne ne peut le garantir. Méfie-toi.</li></ul>
<h2>Prépare tes documents dès maintenant</h2><p>Quelle que soit la voie, il te faudra des actes de naissance, un casier judiciaire et des documents d'état civil apostillés et parfois traduits. Vois ce que demande ton pays dans <a href="#paises">documents par pays</a>.</p>
<div class="callout ok"><b>Tu ne sais pas quelle est ta voie ?</b> Calcule gratuitement <a href="#ruta">ton parcours</a> selon ton pays, ton motif et ton canton.</div>`],
  },
  {
    slug: 'trabajar-en-suiza-sin-hablar-frances', date: '2026-11-04', cat: ['Trabajo', 'Travail'], img: 'paro',
    t: ['¿Se puede trabajar en Suiza sin hablar francés?', 'Peut-on travailler en Suisse sans parler français ?'],
    d: ['Qué trabajos son posibles sin francés en Suiza romanda, cómo aprenderlo rápido y por qué el idioma cuenta también para tu permiso.', 'Quels emplois sont possibles sans français en Suisse romande, comment l\'apprendre vite et pourquoi la langue compte aussi pour ton permis.'],
    body: [
`<p class="lead">Respuesta corta: es posible, pero difícil y limitado. En la Suiza romanda casi todo pasa en francés. Esto es lo que conviene saber.</p>
<h2>Dónde se puede empezar sin francés</h2><ul><li><b>Empresas internacionales</b> y organizaciones en Ginebra o Lausana, donde se trabaja en inglés. Suelen pedir perfiles muy cualificados.</li><li><b>Algunos trabajos manuales</b> (limpieza, construcción, hostelería en cocina), a menudo con compañeros hispanohablantes o portugueses. Pero incluso ahí, el francés te abre mejores puestos y protege tus derechos.</li><li><b>Trabajos dentro de la comunidad</b> latina o española, con oportunidades más limitadas.</li></ul>
<h2>Por qué el francés cambia todo</h2><p>Con francés entiendes tu contrato, tus cartas oficiales y tus derechos, accedes a muchos más empleos y salarios, y te integras. Además, el nivel de idioma se tiene en cuenta para renovar o mejorar tu permiso y para la naturalización.</p>
<h2>Cómo aprender rápido</h2><ul><li>Cursos subvencionados: muchas comunas y cantones ofrecen cursos de francés a precio reducido para personas recién llegadas.</li><li>Asociaciones y bibliotecas con grupos de conversación gratuitos.</li><li>Si estás en el paro, la ORP puede financiar un curso como medida de reinserción.</li></ul>
<h2>Si pierdes tu trabajo</h2><p>Inscríbete en el paro a tiempo y guarda las pruebas de tus búsquedas. Te lo explicamos en <a href="#instalados-trabajo">trabajo y paro</a> y en <a href="#noticia-paro">las últimas cifras del paro</a>.</p>
<div class="callout ok"><b>¿Necesitas ayuda con una carta o un contrato en francés?</b> <a href="#club">El Club Ruta Suiza</a> te los explica en español.</div>`,
`<p class="lead">Réponse courte : c'est possible, mais difficile et limité. En Suisse romande, presque tout se passe en français. Voici ce qu'il faut savoir.</p>
<h2>Où commencer sans français</h2><ul><li><b>Entreprises internationales</b> et organisations à Genève ou Lausanne, où l'on travaille en anglais. Elles cherchent souvent des profils très qualifiés.</li><li><b>Certains métiers manuels</b> (nettoyage, construction, cuisine en restauration), souvent avec des collègues hispanophones ou lusophones. Mais même là, le français ouvre de meilleurs postes et protège tes droits.</li><li><b>Des emplois au sein de la communauté</b> latino ou espagnole, avec des opportunités plus limitées.</li></ul>
<h2>Pourquoi le français change tout</h2><p>Avec le français, tu comprends ton contrat, tes courriers officiels et tes droits, tu accèdes à beaucoup plus d'emplois et de salaires, et tu t'intègres. Le niveau de langue compte aussi pour renouveler ou améliorer ton permis et pour la naturalisation.</p>
<h2>Comment apprendre vite</h2><ul><li>Cours subventionnés : beaucoup de communes et de cantons proposent des cours de français à prix réduit pour les nouveaux arrivants.</li><li>Associations et bibliothèques avec des groupes de conversation gratuits.</li><li>Si tu es au chômage, l'ORP peut financer un cours comme mesure de réinsertion.</li></ul>
<h2>Si tu perds ton emploi</h2><p>Inscris-toi au chômage à temps et garde les preuves de tes recherches. On t'explique tout dans <a href="#instalados-trabajo">travail et chômage</a> et dans <a href="#noticia-paro">les derniers chiffres du chômage</a>.</p>
<div class="callout ok"><b>Besoin d'aide avec un courrier ou un contrat en français ?</b> <a href="#club">Le Club Ruta Suiza</a> te l'explique en espagnol.</div>`],
  },
];
