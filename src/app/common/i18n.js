(function() {
  I18n.translations = {

    fr: {
      register: {
        title: 'Création de compte',
        bread: 'Créer votre compte en trois étapes simples'
      },
      login: {
        title: 'Login'
        // No bread means no bread ;)
      },
      settings: {
        title: 'Réglages',
        bread: 'Vos réglages'
      },
      profile: {
        title: 'Votre profil',
        bread: 'Gestion de votre profil'
      },

      categories: {
        title: 'Catégories',
        bread: 'Exploration des catégories'
      },
      users: {
        title: 'Utilisateurs',
        bread: 'Gestion des utilisateurs'
      },
      qtis: {
        title: 'QTIs',
        bread: 'Administration de tous les QTIs'
      },

      sandbox: {
        title: 'Sandbox',
        bread: 'Les QTIs dans la sandbox'
      },
      dashboard: {
        title: 'Accueil',
        bread: 'Lxxl page d\'accueil'
      },

      myqtis: {
        title: 'Mes QTIs',
        bread: 'Gestion de mes QTIs'
      },

      qtiedit : {
        title : 'Créer un QTI',
        bread : ''
      },

      // You can add new matters here - but DONT RENAME existing keys!!!! - you can still rename
      // the value obviously
      activities:{

        matters: {
          fra: "Français",
          lit: "Littérature",
          mat: "Maths",
          mate: "Maths éco",
          sci: "Sciences éco",
          svt: "SVT",
          his: "Histoire",
          geo: "Géographie",
          phi: "Philosophie",
          all: "Allemand",
          eng: "Anglais",
          esp: "Espagnol",
          ita: "Italien",
          lat: "Latin",
          gre: "Grec",
          mus: "Musique",
          eps: "EPS",
          tpe: "TPE",
          inf: "Informatique",
          other: "Autre"
        },

        // You can add new levels here - but DONT RENAME existing keys!!!! - you can still rename
        // the value obviously
        levels: {
          ts: "Terminale S", 
          tes: "Terminale ES",
          tl: "Terminale L",
          ps: "1 S",
          pes: "1 ES",
          pl: "1 L",
          two: "2",
          three: "3", 
          four: "4",
          five: "5",
          six: "6",
          other: "Autre"
        },
/*        categories: {
          fra-ts: {
            bla: {
              title: "bla",
              subtree: {

              }
            },
            foo: {
              title: "foo",
              subtree: {
                fooriendises: "Stuff"
              }
            },
            bar: {
              title: "bar",
              subtree: {
                fooriendises: "Barendises"
              }
            },
            eng: {
              title: "Anglais pas littéraire du tout",

            }
          }
        },*/

        lengths: {
          10: "10 minutes",
          15: "15 minutes",
          20: "20 minutes",
          30: "30 minutes",
          45: "45 minutes",
          60: "60 minutes"
        },

        difficulties: {
          easy: "Facile",
          normal: "Normal",
          hard: "Difficile"
        },

        pageFlavors: {
          staticPage: "Page simple",
          quizz: "Page quizz",
          tat: "Page texte à trous"
        },

        defaultValues:{
          // title: '',
          // level: '',
          // matter: '',
          // category: '',
          description: 'Description par défaut de l\'activité',
          duration: 60,
          difficulty: 'easy',

          page: {
            title: 'Titre par défaut de la page',
            subtitle: 'Sous-titre par défaut de la page',
            flavor: 'staticPage',
            coef: 0,
            // advice: '',
            // document: '',
          }
        }
      }
    }
  };
}).apply(this);
