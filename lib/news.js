/* Suiza News: edit this file to add or update news.
   date: dd.mm.yyyy (past = published, future = upcoming event). img: file name in /public/news (jpg), credits in NEWS_IMG. */
export const NEWS_UPDATED=['6 de noviembre de 2026','6 novembre 2026'];
export const NCAT={salud:['Salud','Santé'],dinero:['Dinero','Argent'],trabajo:['Trabajo','Travail'],transporte:['Transporte','Transports'],politica:['Votaciones','Votations'],inmigracion:['Inmigración','Immigration'],vivienda:['Vivienda','Logement']};
export const NEWS=[
 {id:'alquiler',k:['Alquiler','Loyer'],img:'alquiler',cat:'vivienda',date:'03.11.2026',
  t:['Vaud: los alquileres podrán subir más después de una renovación','Vaud : les loyers pourront augmenter davantage après une rénovation'],
  s:['El Consejo de Estado vaudois cambió el método que calcula cuánto puede subir un alquiler después de obras de renovación. Desde el 1 de noviembre, los propietarios pueden pedir aumentos más altos que antes. La Asloca (asociación de inquilinos) critica la medida y se retiró de las instancias de concertación; el Partido Socialista prepara una iniciativa popular.','Le Conseil d\'État vaudois a changé la méthode qui calcule de combien un loyer peut augmenter après des travaux de rénovation. Depuis le 1er novembre, les propriétaires peuvent demander des hausses plus fortes qu\'avant. L\'Asloca critique la mesure et a quitté les instances de concertation ; le Parti socialiste prépare une initiative populaire.'],
  you:['Si recibes un aviso de aumento tras unas obras, no firmes nada enseguida: tienes 30 días para impugnarlo ante la comisión de conciliación, que es gratuita. La Asloca puede aconsejarte.','Si tu reçois un avis de hausse après des travaux, ne signe rien tout de suite : tu as 30 jours pour la contester devant la commission de conciliation, qui est gratuite. L\'Asloca peut te conseiller.'],
  src:[['20 minutes','https://www.20min.ch/fr/story/vaud-le-conseil-d-etat-debride-les-hausses-de-loyer-apres-travaux-103661968'],['Le Temps','https://www.letemps.ch/immobilier/dans-le-canton-de-vaud-la-fronde-des-locataires-contre-le-coup-de-force-du-conseil-d-etat']]},
 {id:'primas',k:['Primas 2027','Primes 2027'],img:'primas',cat:'salud',date:'29.09.2026',
  t:['Seguro médico 2027: las primas suben un 5 % de media','Assurance maladie 2027 : les primes augmentent de 5 % en moyenne'],
  s:['La prima mensual media pasará a 412 francos en 2027, unos 20 francos más que este año. En Vaud la subida media es menor, alrededor del 3,5 %.','La prime mensuelle moyenne passera à 412 francs en 2027, environ 20 francs de plus que cette année. Dans le canton de Vaud, la hausse moyenne est plus faible, autour de 3,5 %.'],
  you:['Todavía puedes cambiar de aseguradora o de modelo: tu carta debe llegar antes del 30 de noviembre.','Tu peux encore changer d\'assureur ou de modèle : ta lettre doit arriver avant le 30 novembre.'],go:'#instalados-seguro',
  src:[['admin.ch','https://www.admin.ch/fr/newnsb/BfuGvedj0OOX'],['La Télé','https://latele.ch/actualite/articles/primes-maladie-2027-une-hausse-de-5-a-l-echelle-nationale-3-5-pour-le-canton-de-vaud']]},
 {id:'votacion',k:['Votación','Votation'],img:'votacion',cat:'politica',date:'29.11.2026',
  t:['Votación federal del 29 de noviembre: 4 temas','Votation fédérale du 29 novembre : 4 objets'],
  s:['Se vota sobre la financiación adicional de la AVS con una subida del IVA, una iniciativa para limitar los fuegos artificiales, una iniciativa sobre los impuestos de las parejas casadas y una modificación de la ley sobre material de guerra. La 13.ª renta AVS se pagará por primera vez en diciembre, sea cual sea el resultado.','On vote sur le financement additionnel de l\'AVS par une hausse de la TVA, une initiative pour limiter les feux d\'artifice, une initiative sur l\'imposition des couples mariés et une modification de la loi sur le matériel de guerre. La 13e rente AVS sera versée pour la première fois en décembre, quel que soit le résultat.'],
  you:['Las votaciones federales son solo para ciudadanos suizos. En varios cantones romandos, las personas extranjeras con años de residencia pueden votar a nivel comunal: pregunta en tu comuna.','Les votations fédérales sont réservées aux citoyens suisses. Dans plusieurs cantons romands, les personnes étrangères avec plusieurs années de résidence peuvent voter au niveau communal : renseigne-toi auprès de ta commune.'],
  src:[['admin.ch','https://www.admin.ch/fr/votation-populaire-du-29-novembre-2026'],['RTS','https://www.rts.ch/info/dossiers/2026/votations-federales-du-29-novembre/']]},
 {id:'centrale',k:['Salud','Santé'],img:'centrale',cat:'salud',date:'02.11.2026',
  t:['Urgencias no vitales: nuevo número en Vaud y Neuchâtel','Urgences non vitales : nouveau numéro dans les cantons de Vaud et Neuchâtel'],
  s:['La central de médicos de guardia se llama ahora «Centrale santé» y responde al 058 6 116 116, las 24 horas. Los antiguos números se redirigen durante un tiempo.','La centrale des médecins de garde s\'appelle désormais « Centrale santé » et répond au 058 6 116 116, 24 h sur 24. Les anciens numéros sont redirigés pendant un certain temps.'],
  you:['Guarda los números de tu cantón: Vaud y Neuchâtel 058 6 116 116 · Valais 0848 200 300 · Ginebra 0800 116 117. Para una urgencia vital, siempre el 144.','Enregistre les numéros de ton canton : Vaud et Neuchâtel 058 6 116 116 · Valais 0848 200 300 · Genève 0800 116 117. Pour une urgence vitale, toujours le 144.'],
  src:[['vd.ch','https://www.vd.ch/actualites/communiques-de-presse-de-letat-de-vaud/detail/communique/la-centrale-telephonique-des-medecins-de-garde-ctmg-devient-la-centrale-sante-et-repond-au-058-6-116-116'],['vs.ch','https://www.vs.ch/web/communication/w/0848-200-300-le-num%C3%A9ro-unique-pour-les-urgences-m%C3%A9dicales-non-vitales']]},
 {id:'cff',k:['Transporte','Transports'],img:'cff',cat:'transporte',date:'13.12.2026',
  t:['Transporte público: nuevos precios desde el 13 de diciembre','Transports publics : nouveaux prix dès le 13 décembre'],
  s:['Con el cambio de horario, los precios del transporte público nacional suben un 3,6 % de media, tras un acuerdo con el Supervisor de precios. El abono medio precio adulto pasa de 190 a 195 francos.','Avec le changement d\'horaire, les prix des transports publics nationaux augmentent de 3,6 % en moyenne, après un accord avec le Surveillant des prix. Le demi-tarif adulte passe de 190 à 195 francs.'],
  you:['Pregunta en tu comuna si subvenciona tu abono y mira los billetes con descuento en la app CFF.','Demande à ta commune si elle subventionne ton abonnement et regarde les billets dégriffés dans l\'app CFF.'],go:'#instalados-transporte',
  src:[['Surveillant des prix','https://www.preisueberwacher.admin.ch/dam/pue/fr/dokumente/presse/Communiqu%C3%A9%20de%20presse%20concernant%20le%20r%C3%A8glement%20amiable%20avec%20Alliance%20SwissPass%20et%20les%20CFF.pdf.download.pdf/Communiqu%C3%A9%20de%20presse%20concernant%20le%20r%C3%A8glement%20amiable%20avec%20Alliance%20SwissPass%20et%20les%20CFF.pdf']]},
 {id:'paro',k:['Paro','Chômage'],img:'paro',cat:'trabajo',date:'05.11.2026',top:true,
  t:['El paro se mantiene en el 3 % en octubre','Le chômage reste stable à 3 % en octobre'],
  s:['Según el SECO, 141.015 personas estaban inscritas en una ORP a finales de octubre, un 0,4 % más que en septiembre. La tasa se mantiene en el 3,0 % (3,1 % corregida de variaciones estacionales). Las ofertas de empleo publicadas bajan un 8,5 %. En paralelo, Vaud y Neuchâtel recuerdan en una campaña que hay que buscar trabajo desde que se conoce el fin del contrato, antes de inscribirse en el paro.','Selon le SECO, 141 015 personnes étaient inscrites dans un ORP fin octobre, 0,4 % de plus qu\'en septembre. Le taux reste à 3,0 % (3,1 % corrigé des variations saisonnières). Les postes vacants annoncés reculent de 8,5 %. En parallèle, Vaud et Neuchâtel rappellent dans une campagne qu\'il faut chercher un emploi dès qu\'on connaît la fin du contrat, avant de s\'inscrire au chômage.'],
  you:['Sin pruebas de búsqueda antes de inscribirte, tu indemnización puede suspenderse unos días. Guarda cada candidatura desde hoy.','Sans preuves de recherches avant l\'inscription, tes indemnités peuvent être suspendues quelques jours. Garde chaque candidature dès aujourd\'hui.'],go:'#instalados-trabajo',
  src:[['SECO · arbeit.swiss','https://www.arbeit.swiss/en/information-centre/media-service'],['La Télé','https://latele.ch/articles/le-chomage-reste-stable-a-3-0-en-octobre'],['ne.ch','https://www.ne.ch/en/communiques-de-presse']]},
 {id:'integracion',k:['Integración','Intégration'],img:'integracion',cat:'inmigracion',date:'04.11.2026',
  t:['El Consejo federal abre una consulta sobre la integración','Le Conseil fédéral ouvre une consultation sur l\'intégration'],
  s:['El 4 de noviembre, el gobierno abrió una consulta sobre una reforma de la integración. En abril ya había propuesto que las personas llegadas por reagrupación familiar reciban orientación profesional para entrar en el mercado laboral.','Le 4 novembre, le gouvernement a ouvert une consultation sur une réforme de l\'intégration. En avril, il avait déjà proposé que les personnes arrivées par regroupement familial bénéficient d\'une orientation professionnelle pour entrer sur le marché du travail.'],
  you:['Una consulta es una etapa previa: por ahora nada cambia para tu permiso. Te avisaremos cuando haya cambios concretos.','Une consultation est une étape préalable : pour l\'instant rien ne change pour ton permis. On te préviendra quand il y aura des changements concrets.'],
  src:[['admin.ch · news','https://www.admin.ch/fr/newnsb'],['admin.ch · avril 2026','https://www.admin.ch/fr/newnsb/s4-Xcmav1h_NcUPTbhSP4']]},
 {id:'vacunas',k:['Vacunas','Vaccins'],img:'vacunas',cat:'salud',date:'02.11.2026',
  t:['Semanas nacionales de vacunación: 2–7 y 23–28 de noviembre','Semaines nationales de vaccination : 2–7 et 23–28 novembre'],
  s:['La Confederación organiza dos semanas para facilitar el acceso a las vacunas de temporada (gripe, Covid-19, VRS), sobre todo para las personas de riesgo. Algunos médicos reciben las vacunas más tarde, por eso hay una segunda semana.','La Confédération organise deux semaines pour faciliter l\'accès aux vaccins saisonniers (grippe, Covid-19, VRS), surtout pour les personnes à risque. Certains médecins sont livrés plus tard, d\'où une deuxième semaine.'],
  you:['Pregunta en tu farmacia: muchas vacunan sin cita.','Renseigne-toi à ta pharmacie : beaucoup vaccinent sans rendez-vous.'],
  src:[['RTS','https://www.rts.ch/info/sante/2026/article/vaccination-en-suisse-deux-semaines-prevues-en-novembre-2026-29402199.html']]},
 {id:'noviembre',k:['Noviembre','Novembre'],img:'noviembre',cat:'dinero',date:'01.11.2026',
  t:['Lo que cambia en noviembre','Ce qui change en novembre'],
  s:['Nuevas reglas sobre los datos de pasajeros aéreos y el sistema Schengen, y los bancos pueden identificar a sus clientes en línea con documentos con código QR.','Nouvelles règles sur les données des passagers aériens et le système Schengen, et les banques peuvent identifier leurs clients en ligne avec des documents munis d\'un code QR.'],
  you:['Si abres una cuenta en línea, tu banco puede ofrecerte nuevos métodos de verificación de identidad.','Si tu ouvres un compte en ligne, ta banque peut te proposer de nouveaux moyens de vérification d\'identité.'],
  src:[['20 minutes','https://www.20min.ch/fr/story/nouvelles-regles-novembre-apporte-son-lot-de-changements-en-suisse-103659231'],['Blick','https://www.blick.ch/fr/suisse/novembre-voici-ce-qui-va-changer-en-suisse/hftt131']]}
];

/* Photo credits (Wikimedia Commons, free licences). Files live in /public/news/<key>.jpg */
export const NEWS_IMG={
 "votacion": {
  "w": 1600,
  "h": 872,
  "by": "Axel Tschentscher",
  "lic": "CC BY-SA 4.0",
  "licUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "url": "https://commons.wikimedia.org/wiki/File:Bern_Parliament_Plaza_Flagged_Wide_2019-09-13_23-11.jpg"
 },
 "integracion": {
  "w": 1600,
  "h": 1244,
  "by": "Axel Tschentscher",
  "lic": "CC BY-SA 4.0",
  "licUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "url": "https://commons.wikimedia.org/wiki/File:Bern_Federal_Palace_Central_Dome_2019-10-16_18-43.jpg",
  "pos": "50% 35%"
 },
 "cff": {
  "w": 1600,
  "h": 1069,
  "by": "NAC",
  "lic": "CC BY-SA 4.0",
  "licUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "url": "https://commons.wikimedia.org/wiki/File:FFS_TGV4406_TGV9260_FFS_RABe_503014_EC35_Lausanne_300416.jpg"
 },
 "primas": {
  "w": 1600,
  "h": 1062,
  "by": "Traumrune",
  "lic": "CC BY-SA 3.0",
  "licUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "url": "https://commons.wikimedia.org/wiki/File:Bern_Rathausapotheke_01.jpg"
 },
 "noviembre": {
  "w": 1600,
  "h": 764,
  "by": "Tiia Monto",
  "lic": "CC BY-SA 3.0",
  "licUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "url": "https://commons.wikimedia.org/wiki/File:Departure_board_at_Geneva_Airport.jpg"
 },
 "vacunas": {
  "w": 1600,
  "h": 1352,
  "by": "Whispyhistory",
  "lic": "CC BY-SA 4.0",
  "licUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "url": "https://commons.wikimedia.org/wiki/File:Comirnaty_Omicron_XBB.1.5_vial_and_influenza_vaccine_2023.jpg"
 },
 "paro": {
  "w": 1600,
  "h": 1200,
  "by": "Remontees",
  "lic": "CC BY-SA 4.0",
  "licUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "url": "https://commons.wikimedia.org/wiki/File:Station-metro-m2-lausanne-flon.jpg"
 },
 "alquiler": {
  "w": 1600,
  "h": 1060,
  "by": "Gzzz",
  "lic": "CC BY-SA 4.0",
  "licUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "url": "https://commons.wikimedia.org/wiki/File:Lausanne_vue_du_L%C3%A9man.jpg"
 }
};
