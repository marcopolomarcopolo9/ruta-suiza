// Letter templates in French, reserved to Club members (served by /api/member/me only).
// [Brackets] are filled in by the member. Server-only.
const HEAD = `[Prénom Nom]
[Rue et numéro]
[NPA Localité]

[Nom de l'organisme]
[Adresse de l'organisme]

[Localité], le [date]`;

export const TEMPLATES = [
  {
    k: 'resiliation-lamal',
    t: ['Dar de baja el seguro médico básico (cambio de caja)', 'Résilier l\'assurance maladie de base (changement de caisse)'],
    when: ['Para cambiar de caja el 1 de enero. Tu carta debe LLEGAR antes del 30 de noviembre: envíala certificada antes del 15. Firma primero con la nueva caja.', 'Pour changer de caisse au 1er janvier. Ta lettre doit ARRIVER avant le 30 novembre : envoie-la en recommandé avant le 15. Signe d\'abord avec la nouvelle caisse.'],
    body: `${HEAD}

Recommandé

Résiliation de l'assurance obligatoire des soins (LAMal)
N° d'assuré·e : [numéro]

Madame, Monsieur,

Par la présente, je résilie mon assurance obligatoire des soins (LAMal) pour le 31 décembre [année], conformément à l'art. 7 LAMal.

Je serai assuré·e auprès de [nom de la nouvelle caisse] dès le 1er janvier [année suivante]. Celle-ci vous transmettra la confirmation de ma nouvelle affiliation.

Je vous prie de me confirmer la bonne réception de cette résiliation.

Veuillez agréer, Madame, Monsieur, mes salutations distinguées.

[Signature]
[Prénom Nom]`,
  },
  {
    k: 'plan-paiement',
    t: ['Pedir un plan de pagos', 'Demander un plan de paiement'],
    when: ['Cuando no puedes pagar una factura de una vez. Envíala antes de la fecha límite, con una propuesta realista.', 'Quand tu ne peux pas payer une facture en une fois. Envoie-la avant l\'échéance, avec une proposition réaliste.'],
    body: `${HEAD}

Demande de plan de paiement
Facture n° [numéro] du [date] – montant : CHF [montant]

Madame, Monsieur,

En raison de [ma situation financière actuelle / une baisse de mes revenus], je ne suis pas en mesure de régler la facture mentionnée ci-dessus en une seule fois.

Je souhaite toutefois m'acquitter de ma dette et vous propose le plan de paiement suivant : CHF [montant] par mois, à partir du [date], jusqu'au paiement complet.

Je vous remercie de bien vouloir me confirmer votre accord par écrit et, le cas échéant, de suspendre toute procédure de recouvrement.

Veuillez agréer, Madame, Monsieur, mes salutations distinguées.

[Signature]
[Prénom Nom]`,
  },
  {
    k: 'delai-impots',
    t: ['Pedir un plazo o pagos a plazos para los impuestos', 'Demander un délai ou des acomptes pour les impôts'],
    when: ['Si no puedes pagar tus impuestos a tiempo. Escribe a la administración fiscal antes del vencimiento.', 'Si tu ne peux pas payer tes impôts à temps. Écris à l\'administration fiscale avant l\'échéance.'],
    body: `${HEAD}

Demande de facilités de paiement
N° de contribuable : [numéro] – Bordereau du [date] – montant : CHF [montant]

Madame, Monsieur,

Je ne suis pas en mesure de payer le montant ci-dessus à l'échéance du [date], en raison de [explication courte].

Je vous saurais gré de m'accorder [un délai de paiement jusqu'au [date] / un paiement échelonné de CHF [montant] par mois dès le [date]].

Je reste à votre disposition pour tout justificatif et vous remercie de votre compréhension.

Veuillez agréer, Madame, Monsieur, mes salutations distinguées.

[Signature]
[Prénom Nom]`,
  },
  {
    k: 'opposition-poursuite',
    t: ['Hacer oposición a un commandement de payer (por escrito)', 'Faire opposition à un commandement de payer (par écrit)'],
    when: ['Si no debes ese dinero, o no todo. Plazo: 10 días desde que lo recibes. Se envía a la oficina de cobros (office des poursuites), no al acreedor.', 'Si tu ne dois pas cet argent, ou pas tout. Délai : 10 jours dès la réception. À envoyer à l\'office des poursuites, pas au créancier.'],
    body: `${HEAD}

Recommandé

Opposition au commandement de payer
Poursuite n° [numéro] – notifié le [date]
Créancier : [nom du créancier]

Madame, Monsieur,

Je forme opposition [totale / partielle, à hauteur de CHF [montant]] au commandement de payer mentionné ci-dessus.

Je vous prie de bien vouloir me délivrer une attestation de cette opposition.

Veuillez agréer, Madame, Monsieur, mes salutations distinguées.

[Signature]
[Prénom Nom]`,
  },
  {
    k: 'reclamation-taxation',
    t: ['Reclamar contra una tasación de impuestos', 'Réclamer contre une décision de taxation'],
    when: ['Si tu tasación tiene un error. Plazo: 30 días desde que la recibes. Adjunta las pruebas.', 'Si ta taxation contient une erreur. Délai : 30 jours dès la réception. Joins les preuves.'],
    body: `${HEAD}

Réclamation contre la décision de taxation [année fiscale]
N° de contribuable : [numéro] – décision du [date], reçue le [date]

Madame, Monsieur,

Par la présente, je forme réclamation contre la décision de taxation mentionnée ci-dessus.

Motif : [expliquer l'erreur, par exemple : la déduction pour frais de garde de CHF [montant] n'a pas été prise en compte].

Je vous prie de bien vouloir corriger la taxation en conséquence. Vous trouverez en annexe [les justificatifs].

Veuillez agréer, Madame, Monsieur, mes salutations distinguées.

[Signature]
[Prénom Nom]

Annexes : [liste]`,
  },
  {
    k: 'contester-facture',
    t: ['Contestar una factura', 'Contester une facture'],
    when: ['Si una factura es incorrecta (importe, servicio no recibido, contrato ya cancelado). Escribe rápido y guarda una copia.', 'Si une facture est incorrecte (montant, prestation non reçue, contrat déjà résilié). Écris vite et garde une copie.'],
    body: `${HEAD}

Contestation de la facture n° [numéro] du [date]

Madame, Monsieur,

Je conteste la facture mentionnée ci-dessus pour le motif suivant : [expliquer : contrat résilié le [date] / prestation non reçue / montant erroné].

Je vous prie de bien vouloir l'annuler ou la corriger, et de suspendre tout rappel jusqu'à clarification. Vous trouverez en annexe [les justificatifs].

Veuillez agréer, Madame, Monsieur, mes salutations distinguées.

[Signature]
[Prénom Nom]`,
  },
  {
    k: 'defaut-logement',
    t: ['Avisar a la régie de un problema en el piso', 'Signaler un défaut à la régie'],
    when: ['Humedad, calefacción, una avería… Avisa siempre por escrito y guarda fotos con fecha.', 'Humidité, chauffage, une panne… Signale-le toujours par écrit et garde des photos datées.'],
    body: `${HEAD}

Avis de défaut – [adresse du logement], [étage / n° d'appartement]

Madame, Monsieur,

Je vous signale le défaut suivant dans mon logement : [description], constaté le [date]. Vous trouverez des photos en annexe.

Je vous prie de bien vouloir y remédier dans un délai raisonnable, au plus tard le [date], et de me contacter au [téléphone] pour convenir d'un rendez-vous.

Veuillez agréer, Madame, Monsieur, mes salutations distinguées.

[Signature]
[Prénom Nom]`,
  },
];
