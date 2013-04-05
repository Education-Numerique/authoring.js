// jsBoot.use('LxxlLib.model.Activity');
jsBoot.pack('LxxlLib.model.defines', function() {
  /* Unfortunately, non camel case identifiers are used */
  /*jshint camelcase:false*/
  'use strict';

  this.lengths = {
    10: '10 minutes',
    15: '15 minutes',
    20: '20 minutes',
    30: '30 minutes',
    45: '45 minutes',
    60: '60 minutes'
  };
  /*
  this.minutes = {
    0: '0 minute',
    1: '1 minute',
    2: '2 minutes',
    3: '3 minutes',
    4: '4 minutes',
    5: '5 minutes',
    10: '10 minutes',
    15: '15 minutes',
    30: '30 minutes',
    45: '45 minutes',
    60: '60 minutes',
    90: '90 minutes'
  };

 0, 1 , 2, 3, 4, 5, 10, 15, 20, 30, 45, 60, 90 / secondes : 0, 10, 20, 30, 45

      content: [0, 10, 20, 30, 45].map(function(key){
          return {id: key, title: key + (key > 1 ? ' minutes' : ' minute')};
        }),
      selected: {id: 0, title: '0 minute'}
    }),

    seconds: Em.Object.create({
      content: [0, 10, 20, 30, 45].map(function(key){
          return {id: key, title: key + (key > 1 ? ' secondes' : ' seconde')};
        }),
      selected: {id: 0, title: '0 seconde'}
  */


  this.difficulties = {
    easy: 'Facile',
    normal: 'Normal',
    hard: 'Difficile'
  };

  this.flavors = {
    simple: 'Page simple',
    quizz: 'Page quizz',
    tat: 'Page texte à trous',
    jmt: 'Page glisser-déposer'
  };

  // You can add new matters here - but DONT RENAME existing keys!!!! - you can still change the value obviously
  this.discipline = {
    fra: 'Français',
    lit: 'Littérature',
    mat: 'Maths',
    mate: 'Maths éco',
    sciec: 'Sciences éco',
    sci: 'Sciences',
    phys: 'Physique',
    chim: 'Chimie',
    svt: 'SVT',
    his: 'Histoire',
    geo: 'Géographie',
    phi: 'Philosophie',
    all: 'Allemand',
    eng: 'Anglais',
    esp: 'Espagnol',
    ita: 'Italien',
    lat: 'Latin',
    gre: 'Grec',
    mus: 'Musique',
    eps: 'EPS',
    tpe: 'TPE',
    inf: 'Informatique',
    other: 'Autre' };

  this.matters = {
    fra: 'Français',
    lit: 'Littérature',
    mat: 'Maths',
    mate: 'Maths éco',
    sciec: 'Sciences éco',
    sci: 'Sciences',
    phys: 'Physique',
    chim: 'Chimie',
    svt: 'SVT',
    his: 'Histoire',
    geo: 'Géographie',
    phi: 'Philosophie',
    all: 'Allemand',
    eng: 'Anglais',
    esp: 'Espagnol',
    ita: 'Italien',
    lat: 'Latin',
    gre: 'Grec',
    mus: 'Musique',
    eps: 'EPS',
    tpe: 'TPE',
    inf: 'Informatique',
    other: 'Autre'
  };

  // You can add new levels here - but DONT RENAME existing keys!!!! - you can still change the value obviously
  this.levels = {
    tt_lycee: 'Tout le lycée',
    tt_tles: 'Toutes terminales',
    ts: 'Terminale S',
    tes: 'Terminale ES',
    tl: 'Terminale L',
    tt_prem: 'Toutes premières',
    ps: '1 S',
    pes: '1 ES',
    pl: '1 L',
    two: '2',
    tt_colg: 'Tout le collège',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    prim: 'primaire',
    other: 'Autre'
  };

  this.categories = [
    // categories[0] : Anglais, tout le lycée ...
    { id: 'eng_tt_lycee', title: 'Anglais', matter: {id: 'eng'}, level: {id: 'tt_lycee'}, content: [
      {id: 'eng_tt_lycee_1', title: 'COMPRÉHENSION ÉCRITE', content: [
        {id: 'eng_tt_lycee_1_1', title: 'Comprendre l\'essentiel d\'un texte écrit'},
        {id: 'eng_tt_lycee_1_2', title: 'De l\'explicite à l\'implicite'},
        {id: 'eng_tt_lycee_1_3', title: 'Répondre aux questions'},
        {id: 'eng_tt_lycee_1_4', title: 'Traduire'},
        {id: 'eng_tt_lycee_1_5', title: 'Annales du Bac'}
      ]},
      {id: 'eng_tt_lycee_2', title: 'PRODUCTION ÉCRITE', content: [
        {id: 'eng_tt_lycee_2_1', title: 'Rédiger un dialogue'},
        {id: 'eng_tt_lycee_2_2', title: 'Rédiger une lettre'},
        {id: 'eng_tt_lycee_2_3', title: 'Rédiger un récit'},
        {id: 'eng_tt_lycee_2_4', title: 'Rédiger une argumentation'},
        {id: 'eng_tt_lycee_2_5', title: 'Rédiger un essai organisé'}
      ]},
      {id: 'eng_tt_lycee_3', title: 'COMPRÉHENSION ORALE', content: [
        {id: 'eng_tt_lycee_3_1', title: 'Se préparer à l\'écoute'},
        {id: 'eng_tt_lycee_3_2', title: 'Relever des indices'}
      ]},
      {id: 'eng_tt_lycee_4', title: 'PRODUCTION ORALE', content: [
      ]},
      {id: 'eng_tt_lycee_5', title: 'MONDE ANGLOPHONE', content: [
        {id: 'eng_tt_lycee_5_1', title: 'Culture'},
        {id: 'eng_tt_lycee_5_2', title: 'Civilisation'}
      ]},
      {id: 'eng_tt_lycee_6', title: 'LANGUE ANGLAISE', content: [
        {id: 'eng_tt_lycee_6_1', title: 'Le lexique'},
        {id: 'eng_tt_lycee_6_2', title: 'La syntaxe'},
        {id: 'eng_tt_lycee_6_3', title: 'Les formes verbales'},
        {id: 'eng_tt_lycee_6_4', title: 'Traduire'},
        {id: 'eng_tt_lycee_6_5', title: 'Annales du Bac'}
      ]}
    ]},
    // categories[1] : Histoire, premières multiples ...
    {id: 'his_tt_prem', title: 'Histoire', matter: {id: 'his'}, level: {id: 'tt_prem'}, long_title:
          'Questions pour comprendre le 20e siècle', content: [
            {id: 'his_tt_prem_1', title: 'LE 19e SIÈCLE', content: [
              {id: 'his_tt_prem_1_1', title: 'Croissance et mondialisation'},
              {id: 'his_tt_prem_1_2', title: 'Mutation des sociétés'}
            ]},
            {id: 'his_tt_prem_2', title: 'LA GUERRE AU 20e SIÈCLE', content: [
              {id: 'his_tt_prem_2_1', title: 'Guerres mondiales et paix'},
              {id: 'his_tt_prem_2_2', title: 'Guerre froide et nouveaux conflits'}
            ]},
            {id: 'his_tt_prem_3', title: 'LES TOTALITARISMES', content: [
              {id: 'his_tt_prem_3_1', title: 'Développement des totalitarismes'},
              {id: 'his_tt_prem_3_2', title: 'Fin des totalitarismes'}
            ]},
            {id: 'his_tt_prem_4', title: 'LA COLONISATION ET SA FIN', content: [
              {id: 'his_tt_prem_4_1', title: 'Le temps des dominations coloniales'},
              {id: 'his_tt_prem_4_2', title: 'La décolonisation'}
            ]},
            {id: 'his_tt_prem_5', title: 'LES FRANÇAIS ET LEUR RÈPUBLIQUE', content: [
              {id: 'his_tt_prem_5_1', title: 'La République, trois républiques'},
              {id: 'his_tt_prem_5_2', title: 'La République et la société française'}
            ]},
            {id: 'his_tt_prem_6', title: 'MÈTHODOLOGIE', content: [
              {id: 'his_tt_prem_6_1', title: 'La composition'},
              {id: 'his_tt_prem_6_2', title: 'L\'étude d\'un document'},
              {id: 'his_tt_prem_6_3', title: 'L\'étude de deux documents'}
            ]}
          ]},
    // categories[2] : Géo, premières multiples ...
    {id: 'geo_tt_prem', title: 'Géographie', matter: {id: 'geo'}, level: {id: 'tt_prem'}, long_title:
          'France et Europe : dynamiques des territoires dans la mondialisation', content: [
            {id: 'geo_tt_prem_1', title: 'Territoires de proximité', content: [
              {id: 'geo_tt_prem_2_1', title: 'Territoires du quotidien'},
              {id: 'geo_tt_prem_2_2', title: 'Territoire de la région'}
            ]},
            {id: 'geo_tt_prem_2', title: 'Territoire français', content: [
              {id: 'geo_tt_prem_3_1', title: 'Valoriser et ménager les milieux'},
              {id: 'geo_tt_prem_3_2', title: 'La France en villes'},
              {id: 'geo_tt_prem_3_3', title: 'Dynamiques des espaces productifs'},
              {id: 'geo_tt_prem_3_4', title: 'Mobilités, flux et réseaux de communication'}
            ]},
            {id: 'geo_tt_prem_3', title: 'L\'Union européenne', content: [
              {id: 'geo_tt_prem_4_1', title: 'Europe et Union européenne'},
              {id: 'geo_tt_prem_4_2', title: 'Les territoires ultramarins'}
            ]},
            {id: 'geo_tt_prem_4', title: 'France, Europe et monde', content: [
              {id: 'geo_tt_prem_5_1', title: 'L\'UE dans la mondialisation'},
              {id: 'geo_tt_prem_5_2', title: 'La France dans la mondialisation'}
            ]},
            {id: 'geo_tt_prem_5', title: 'Méthodologie', content: [
              {id: 'geo_tt_prem_6_1', title: 'La composition'},
              {id: 'geo_tt_prem_6_2', title: 'L\'étude d\'un document'},
              {id: 'geo_tt_prem_6_3', title: 'L\'étude de deux documents'},
              {id: 'geo_tt_prem_6_4', title: 'Le croquis'},
              {id: 'geo_tt_prem_6_5', title: 'Le schéma'}
            ]}
          ]},

    // categories[3] : Maths, Prem ES ...
    {id: 'mat_pes ', title: '', matter: {id: 'mat'}, level: {id: 'pes'}, long_title: '', content: [
      {id: 'mat_pes_1', title: 'Algèbre/ analyse', content: [
        {id: 'mat_pes_2_1', title: 'Second degré'},
        {id: 'mat_pes_2_2', title: 'Etude de fonction'},
        {id: 'mat_pes_2_3', title: 'Pourcentages'},
        {id: 'mat_pes_2_4', title: 'Suites'}
      ]},
      {id: 'mat_pes_2', title: 'Statistiques / probabilités', content: [
        {id: 'mat_pes_3_1', title: 'Statistique, analyse de données, Probabilités'},
        {id: 'mat_pes_3_2', title: 'Échantillonnage'}
      ]},
      {id: 'mat_pes_3', title: 'Algorithmique'},
      {id: 'mat_pes_4', title: 'Notations / raisonnements'}
    ]},

    // categories[4] : Maths, Première S
    {id: 'mat_ps ', title: '', matter: {id: 'mat'}, level: {id: 'ps'}, long_title: '', content: [
      {id: 'math_ps_1', title: 'Analyse', content: [
        {id: 'math_ps_2_1', title: 'Second degré'},
        {id: 'math_ps_2_2', title: 'Etude de fonction'},
        {id: 'math_ps_2_3', title: 'Dérivation'},
        {id: 'math_ps_2_4', title: 'Suites'}
      ]},
      {id: 'math_ps_2', title: 'Géométrie', content: [
        {id: 'math_ps_3_1', title: 'Géométrie plane'},
        {id: 'math_ps_3_2', title: 'Trigonométrie'},
        {id: 'math_ps_3_3', title: 'Produit scalaire dans le plan'}
      ]},
      {id: 'math_ps_3', title: 'Statistiques/ probabilités', content: [
        {id: 'math_ps_4_1', title: 'Statistique descriptive, analyse de données'},
        {id: 'math_ps_4_2', title: 'Probabilités'},
        {id: 'math_ps_4_3', title: 'Echantillonnage'}
      ]},
      {id: 'math_ps_4', title: 'Algorithmique'},
      {id: 'math_ps_5', title: 'Notations et raisonnements en mathématiques'}
    ]},

    // categories[5] : Maths, Terminale S ...
    {id: 'mat_ts', title: 'Mathématiques', matter: {id: 'mat'}, level: {id: 'ts'},
      content: [
        {id: 'mat_ts_1', title: 'SUITES NUMERIQUES', content: [
          {id: 'mat_ts_1_1', title: 'Suites arithmétiques et géométriques'},
          {id: 'mat_ts_1_2', title: 'Convergence'},
          {id: 'mat_ts_1_3', title: 'Suites Adjacentes'}
        ]},
        {id: 'mat_ts_2', title: 'FONCTIONS', content: [
          {id: 'mat_ts_2_1', title: 'Limites et dérivabilité'},
          {id: 'mat_ts_2_2', title: 'Variations et extremums'}
        ]},
        {id: 'mat_ts_3', title: 'CALCUL INTEGRAL', content: [
          {id: 'mat_ts_3_1', title: 'Primitives et intégrales'},
          {id: 'mat_ts_3_2', title: 'Inégalités et intégrales'}
        ]},
        {id: 'mat_ts_4', title: 'EQUATIONS DIFFERENTIELLES'},
        {id: 'mat_ts_5', title: 'NOMBRES COMPLEXES ', content: [
          {id: 'mat_ts_5_1', title: 'Calculs'},
          {id: 'mat_ts_5_2', title: 'Géométrie'}
        ]},
        {id: 'mat_ts_6', title: 'PROBABILITES ', content: [
          {id: 'mat_ts_6_1', title: 'Dénombrements'},
          {id: 'mat_ts_6_2', title: 'Probabilités conditionnelles'},
          {id: 'mat_ts_6_3', title: 'Loi binomiale '},
          {id: 'mat_ts_6_4', title: 'Lois continues'},
          {id: 'mat_ts_6_5', title: 'Loi uniforme'},
          {id: 'mat_ts_6_6', title: 'Loi exponentielle'}
        ]},
        {id: 'mat_ts_7', title: 'PRODUIT SCALAIRE'},
        {id: 'mat_ts_8', title: 'PLANS ET DROITES', content: [
          {id: 'mat_ts_8_1', title: 'Equations d\'un plan'},
          {id: 'mat_ts_8_2', title: 'Représentation paramétrique d\'une droite'},
          {id: 'mat_ts_8_3', title: 'Intersections de plans ou de droites'}
        ]},
        {id: 'mat_ts_9', title: 'BARYCENTRES', content: [
          {id: 'mat_ts_9_1', title: 'Lignes de niveau'}
        ]},
        {id: 'mat_ts_sp_1', title: 'DIVISIBILITE (sp)', content: [
          {id: 'mat_ts_sp_1_1', title: 'Divisibilité dans Z'},
          {id: 'mat_ts_sp_1_2', title: 'Division euclidienne'},
          {id: 'mat_ts_sp_1_3', title: 'congruences'},
          {id: 'mat_ts_sp_1_4', title: 'Nombres premiers'}
        ]},
        {id: 'mat_ts_sp_2', title: 'PPCM ET PGCD (sp)', content: [
          {id: 'mat_ts_sp_2_1', title: 'PGCD'},
          {id: 'mat_ts_sp_2_2', title: 'PPCM'}
        ]},
        {id: 'mat_ts_sp_3', title: 'SIMILITUDES (sp)', content: [
          {id: 'mat_ts_sp_3_1', title: 'Similitudes directes'},
          {id: 'mat_ts_sp_3_2', title: 'Similitudes indirectes'}
        ]},
        {id: 'mat_ts_sp_4', title: 'GEOMETRIE DANS L\'ESPACE (sp)', content: [
          {id: 'mat_ts_sp_4_1', title: 'Cylindres'},
          {id: 'mat_ts_sp_4_2', title: 'Cônes'},
          {id: 'mat_ts_sp_4_3', title: 'Surfaces'}
        ]}
      ]}
    // categories[6] :
  ];

  // On populate l'anglais pour les autres levels
  this.categories.push({
    id: 'eng_tl', title: 'Anglais', matter: {id: 'eng'}, level: {id: 'tl'},
    content: this.categories[0].content
  });

  this.categories.push({
    id: 'eng_ts', title: 'Anglais', matter: {id: 'eng'}, level: {id: 'ts'},
    content: this.categories[0].content
  });

  this.categories.push({
    id: 'eng_tes', title: 'Anglais', matter: {id: 'eng'}, level: {id: 'tes'},
    content: this.categories[0].content
  });

  this.categories.push({
    id: 'eng_tt_prem', title: 'Anglais', matter: {id: 'eng'}, level: {id: 'tt_prem'},
    content: this.categories[0].content
  });

  this.categories.push({
    id: 'eng_ps', title: 'Anglais', matter: {id: 'eng'}, level: {id: 'ps'},
    content: this.categories[0].content
  });

  this.categories.push({
    id: 'eng_pes', title: 'Anglais', matter: {id: 'eng'}, level: {id: 'pes'},
    content: this.categories[0].content
  });

  this.categories.push({
    id: 'eng_pl', title: 'Anglais', matter: {id: 'eng'}, level: {id: 'pl'},
    content: this.categories[0].content
  });

  // On populate l'histoire pour les autres levels
  this.categories.push({
    id: 'his_ps', title: 'Histoire', matter: {id: 'his'}, level: {id: 'ps'}, long_title:
        'Questions pour comprendre le 20e siècle',
    content: this.categories[1].content
  });

  this.categories.push({
    id: 'his_pes', title: 'Histoire', matter: {id: 'his'}, level: {id: 'pes'}, long_title:
        'Questions pour comprendre le 20e siècle',
    content: this.categories[1].content
  });

  this.categories.push({
    id: 'his_pl', title: 'Histoire', matter: {id: 'his'}, level: {id: 'pl'}, long_title:
        'Questions pour comprendre le 20e siècle',
    content: this.categories[1].content
  });

  // On populate la géo pour les autres levels
  this.categories.push({
    id: 'geo_ps', title: 'Géographie', matter: {id: 'geo'}, level: {id: 'ps'}, long_title:
        'France et Europe : dynamiques des territoires dans la mondialisation',
    content: this.categories[2].content
  });

  this.categories.push({
    id: 'geo_pes', title: 'Géographie', matter: {id: 'geo'}, level: {id: 'pes'}, long_title:
        'France et Europe : dynamiques des territoires dans la mondialisation',
    content: this.categories[2].content
  });

  this.categories.push({
    id: 'geo_pl', title: 'Géographie', matter: {id: 'geo'}, level: {id: 'pl'}, long_title:
        'France et Europe : dynamiques des territoires dans la mondialisation',
    content: this.categories[2].content
  });

  this.categories.push({
    id: 'mat_pl ', title: '', matter: {id: 'mat'}, level: {id: 'pl'},
    content: this.categories[3].content
  });


});
