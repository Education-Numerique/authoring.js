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
    jmt: 'Page mix and match'
  };

  // You can add new matters here - but DONT RENAME existing keys!!!! - you can still change the value obviously
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
    ts: 'Terminale S',
    tes: 'Terminale ES',
    tl: 'Terminale L',
    ps: '1 S',
    pes: '1 ES',
    pl: '1 L',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    other: 'Autre'
  };

  this.categories = [
    {
      id: 1, // Arbo 1 : Anglais, niveaux multiples ...
      title: 'Anglais',
      matter: {id: 'eng'},
      level: {id: 'ts'},
      content: [
        {
          id: 11,
          title: 'COMPRÉHENSION ÉCRITE',
          content: [  // pour les sous-catégories de niveau 2, ce serait "nice to have"
                      // de mettre un CSS padding-left: 15px;
            {
              id: 111,
              title: "Comprendre l'essentiel d'un texte écrit"
            },
            {
              id: 112,
              title: "De l'explicite à l'implicite"
            },
            {
              id: 113,
              title: "Répondre aux questions"
            },
            {
              id: 114,
              title: "Traduire"
            },
            {
              id: 115,
              title: "Annales du Bac"
            }
          ]
        },
        {
          id: 12,
          title: 'PRODUCTION ÉCRITE',
          content: [
            {
              id: 121,
              title: "Rédiger un dialogue"
            },
            {
              id: 122,
              title: "Rédiger une lettre"
            },
            {
              id: 123,
              title: "Rédiger un récit"
            },
            {
              id: 124,
              title: "Rédiger une argumentation"
            },
            {
              id: 125,
              title: "Rédiger un essai organisé"
            }
          ]
        },
        {
          id: 13,
          title: 'MONDE ANGLOPHONE',
          content: [
            {
              id: 131,
              title: "Culture"
            },
            {
              id: 132,
              title: "Civilisation"
            }
          ]
        },
        {
          id: 14,
          title: 'LANGUE ANGLAISE',
          content: [
            {
              id: 141,
              title: "Le lexique"
            },
            {
              id: 142,
              title: "La syntaxe"
            },
            {
              id: 143,
              title: "Les formes verbales"
            },
            {
              id: 144,
              title: "Traduire"
            },
            {
              id: 145,
              title: "Annales du Bac"
            }
          ]
        }
      ]
    }
/*
    {
      id: 2,
      title: 'Ceci est une catégorie attachée au français de terminale L, sans subtree',
      matter: {id: 'fra'},
      level: {id: 'tl'}
    },


    {
      id: 3,
      title: ' français autre',
      content: [
        {
          id: 31,
          title: 'Francais autre',
          content: [
            {
              id: 311,
              title: 'subfrancais'
            },
            {
              id: 312,
              title: 'subfrancais2'
            },
            {
              id: 313,
              title: 'subfrancais3'
            },
            {
              id: 314,
              title: 'subfrancais4'
            },
            {
              id: 315,
              title: 'subfrancais5'
            }
          ]
        }
      ],
      matter: {id: 'fra'},
      level: {id: 'other'}
    }*/
  ];


  this.categories.push({
    id: 2,
    title: 'Anglais',
    matter: {id: 'eng'},
    level: {id: 'tl'},
    content: this.categories[0].content
  });

  this.categories.push({
    id: 3,
    title: 'Anglais',
    matter: {id: 'eng'},
    level: {id: 'tes'},
    content: this.categories[0].content
  });

  this.categories.push({
    id: 4,
    title: 'Anglais',
    matter: {id: 'eng'},
    level: {id: 'ps'},
    content: this.categories[0].content
  });

  this.categories.push({
    id: 5,
    title: 'Anglais',
    matter: {id: 'eng'},
    level: {id: 'pes'},
    content: this.categories[0].content
  });

  this.categories.push({
    id: 6,
    title: 'Anglais',
    matter: {id: 'eng'},
    level: {id: 'pl'},
    content: this.categories[0].content
  });

});
