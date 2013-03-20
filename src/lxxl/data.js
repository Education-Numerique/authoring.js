// jsBoot.use('LxxlLib.model.Activity');
jsBoot.pack('LxxlLib.model.defines', function() {
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
    other: 'Autre'  }

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
    { id: "eng_0", title: 'Anglais', matter: {id: 'eng'}, level: {id: 'tt_lycee'}, content: [
        {id: "eng_0_1", title: 'COMPRÉHENSION ÉCRITE', content: [
            {id: "eng_0_1_1", title: "Comprendre l'essentiel d'un texte écrit"},
            {id: "eng_0_1_2", title: "De l'explicite à l'implicite"},
            {id: "eng_0_1_3", title: "Répondre aux questions"},
            {id: "eng_0_1_4", title: "Traduire"},
            {id: "eng_0_1_5", title: "Annales du Bac"}
        ]},
        {id: "eng_0_2", title: 'PRODUCTION ÉCRITE', content: [
            {id: "eng_0_2_1", title: "Rédiger un dialogue"},
            {id: "eng_0_2_2", title: "Rédiger une lettre"},
            {id: "eng_0_2_3", title: "Rédiger un récit"},
            {id: "eng_0_2_4", title: "Rédiger une argumentation"},
            {id: "eng_0_2_5", title: "Rédiger un essai organisé"}
        ]},
        {id: "eng_0_3", title: 'MONDE ANGLOPHONE', content: [
            {id: "eng_0_3_1", title: "Culture"},
            {id: "eng_0_3_2", title: "Civilisation"}
        ]},
        {id: "eng_0_4", title: 'LANGUE ANGLAISE', content: [
            {id: "eng_0_4_1", title: "Le lexique"},
            {id: "eng_0_4_2", title: "La syntaxe"},
            {id: "eng_0_4_3", title: "Les formes verbales"},
            {id: "eng_0_4_4", title: "Traduire"},
            {id: "eng_0_4_5", title: "Annales du Bac"}
        ]}
    ]},
    // categories[1] : Histoire, premières multiples ...
    {id: "his_0", title: 'Histoire', matter: {id: 'his'}, level: {id: 'tt_prem'}, long_title: "Questions pour comprendre le 20e siècle", content: [
        {id: "his_0_1", title: 'LE 19e SIÈCLE', content: [
            {id: "his_0_1_1", title: "Croissance et mondialisation"},
            {id: "his_0_1_2", title: "Mutation des sociétés"}
        ]},
        {id: "his_0_2", title: 'LA GUERRE AU 20e SIÈCLE', content: [
            {id: "his_0_2_1", title: "Guerres mondiales et paix"},
            {id: "his_0_2_2", title: "Guerre froide et nouveaux conflits"}
        ]},
        {id: "his_0_3", title: 'LES TOTALITARISMES', content: [
            {id: "his_0_3_1", title: "Développement des totalitarismes"},
            {id: "his_0_3_2", title: "Fin des totalitarismes"}
        ]},
        {id: "his_0_4", title: 'LA COLONISATION ET SA FIN', content: [
            {id: "his_0_4_1", title: "Le temps des dominations coloniales"},
            {id: "his_0_4_2", title: "La décolonisation"}
        ]},
        {id: "his_0_5", title: 'LES FRANÇAIS ET LEUR RÈPUBLIQUE', content: [
            {id: "his_0_5_1", title: "La République, trois républiques"},
            {id: "his_0_5_2", title: "La République et la société française"}
        ]},
        {id: "his_0_6", title: 'MÈTHODOLOGIE', content: [
            {id: "his_0_6_1", title: "La composition"},
            {id: "his_0_6_2", title: "L'étude d'un document"},
            {id: "his_0_6_3", title: "L'étude de deux documents"}
         ]}
    ]},
    // categories[2] : Maths, Terminale S ...
    {
      title: "Mathématiques", matter: {id: 'mat'}, level: {id: 'ts'}, id: "maths_0",
      content: [
        {title: "SUITES NUMERIQUES", id: "math_0_1", content: [
            {title: "Suites arithmétiques et géométriques", id: "math_0_1_1"},
            {title: "Convergence", id: "math_0_1_2"},
            {title: "Suites Adjacentes", id: "math_0_1_3"}
        ]},
        {title: "FONCTIONS", id: "math_0_2", content: [
            {title: "Limites et dérivabilité", id: "math_0_2_1"},
            {title: "Variations et extremums", id: "math_0_2_2"}
        ]},
        {title: "CALCUL INTEGRAL", id: "math_0_3", content: [
            {title: "Primitives et intégrales", id: "math_0_3_1"},
            {title: "Inégalités et intégrales", id: "math_0_3_2"}
        ]},
        {title: "EQUATIONS DIFFERENTIELLES", id: "math_0_4"},
        {title: "NOMBRES COMPLEXES ", id: "math_0_5", content: [
            {title: "Calculs", id: "math_0_5_1"},
            {title: "Géométrie", id: "math_0_5_2"}
        ]},
        {title: "PROBABILITES ", id: "math_0_6", content: [
            {title: "Dénombrements", id: "math_0_6_1"},
            {title: "Probabilités conditionnelles", id: "math_0_6_2"},
            {title: "Loi binomiale ", id: "math_0_6_3"},
            {title: "Lois continues", id: "math_0_6_4"},
            {title: "Loi uniforme", id: "math_0_6_5"},
            {title: "Loi exponentielle", id: "math_0_6_6"}
        ]},
        {title: "PRODUIT SCALAIRE", id: "math_0_7"},
        {title: "PLANS ET DROITES", id: "math_0_8", content: [
            {title: "Equations d'un plan", id: "math_0_8_1"},
            {title: "Représentation paramétrique d'une droite", id: "math_0_8_2"},
            {title: "Intersections de plans ou de droites", id: "math_0_8_3"}
        ]},
        {title: "BARYCENTRES", id: "math_0_9", content: [
            {title: "Lignes de niveau", id: "math_0_9_1"}
        ]},
        {title: "DIVISIBILITE (Sp)", id: "math_0_Sp_1", content: [
            {title: "Divisibilité dans Z", id: "math_0_Sp_1_1"},
            {title: "Division euclidienne", id: "math_0_Sp_1_2"},
            {title: "congruences", id: "math_0_Sp_1_3"},
            {title: "Nombres premiers", id: "math_0_Sp_1_4"}
        ]},
        {title: "PPCM ET PGCD (Sp)", id: "math_0_Sp_2", content: [
            {title: "PGCD", id: "math_0_Sp_2_1"},
            {title: "PPCM", id: "math_0_Sp_2_2"}
        ]},
        {title: "SIMILITUDES (Sp)", id: "math_0_Sp_3", content: [
            {title: "Similitudes directes", id: "math_0_Sp_3_1"},
            {title: "Similitudes indirectes", id: "math_0_Sp_3_2"}
        ]},
        {title: "GEOMETRIE DANS L'ESPACE (Sp)", id: "math_0_Sp_4", content: [
            {title: "Cylindres", id: "math_0_Sp_4_1"},
            {title: "Cônes", id: "math_0_Sp_4_2"},
            {title: "Surfaces", id: "math_0_Sp_4_3"}
        ]}
   ]}
   // categories[3] : 
  ];

  // On populate l'anglais pour les autres levels
  this.categories.push({
    id: "eng_0",
    title: 'Anglais',
    matter: {id: 'eng'},
    level: {id: 'tl'},
    content: this.categories[0].content
  });

  this.categories.push({
    id: "eng_2",
    title: 'Anglais',
    matter: {id: 'eng'},
    level: {id: 'tl'},
    content: this.categories[0].content
  });

  this.categories.push({
    id: "eng_3",
    title: 'Anglais',
    matter: {id: 'eng'},
    level: {id: 'tes'},
    content: this.categories[0].content
  });

  this.categories.push({
    id: "eng_4",
    title: 'Anglais',
    matter: {id: 'eng'},
    level: {id: 'ps'},
    content: this.categories[0].content
  });

  this.categories.push({
    id: "eng_5",
    title: 'Anglais',
    matter: {id: 'eng'},
    level: {id: 'pes'},
    content: this.categories[0].content
  });

  this.categories.push({
    id: "eng_6",
    title: 'Anglais',
    matter: {id: 'eng'},
    level: {id: 'pl'},
    content: this.categories[0].content
  });

  // On populate l'histoire pour les autres levels
  this.categories.push({
    id: "his_1", 
    title: 'Histoire',
    long_title: "Questions pour comprendre le 20e siècle",
    matter: {id: 'his'},
    level: {id: 'ps'},
    content: this.categories[1].content
  });

  this.categories.push({
    id: "his_2", 
    title: 'Histoire',
    long_title: "Questions pour comprendre le 20e siècle",
    matter: {id: 'his'},
    level: {id: 'pes'},
    content: this.categories[1].content
  });

  this.categories.push({
    id: "his_3", 
    title: 'Histoire',
    long_title: "Questions pour comprendre le 20e siècle",
    matter: {id: 'his'},
    level: {id: 'pl'},
    content: this.categories[1].content
  });
});
