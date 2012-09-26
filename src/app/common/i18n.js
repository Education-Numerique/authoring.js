(function() {
  I18n.translations = {

    // This is javascript! - and must be valid
    // Be sure to call "puke flint" before commiting
    // Be also sure that "puke lint" passes ok
    fr: {
      // Some common stuff
      breadHome: 'Maison',
      copyright: 'Copyright © 2011 LxxL - Education & Numérique. Tous droits réservés. | ',
      conditions: 'Conditions générales & Respect de la vie privée',
      welcome: 'Bienvenue!',

      // Breadcrumb - these specify the main title of the page, along with the optional breadcrumb
      breadcrumb: {
        login: {
          title: 'Login'
          // No bread means no bread ;)
        },
        register: {
          title: 'Création de compte',
          bread: 'Créer votre compte en trois étapes simples'
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
          title: 'Activités',
          bread: 'Administration de toutes les activités'
        },

        sandbox: {
          title: 'Sandbox',
          bread: 'Les activités dans la sandbox'
        },
        dashboard: {
          title: 'Accueil',
          bread: 'Lxxl page d\'accueil'
        },

        myqtis: {
          title: 'Mes Activités',
          bread: 'Gestion de mes activités'
        },

        qtiedit: {
          title: 'Créer une activité',
          bread: ''
        }
      },

      // These elements are in the top and left navigation widgets
      nav: {
        home: {
          // Notip means no tip :)
          // tip: 'Accès au dashboard',
          text: 'Home'
        },

        profile: {
          tip: 'Accéder à mon profil',
          text: 'Profil'
        },
        settings: {
          tip: 'Accéder aux réglages',
          text: 'Settings'
        },
        logout: {
          tip: 'Se déconnecter',
          text: 'Logout'
        },
        login: {
          tip: 'Se connecter',
          text: 'Login'
        },
        register: {
          tip: 'Créer un compte',
          text: 'Register'
        },

        sandbox: {
          tip: 'Accès à la sandbox',
          text: 'Sandbox'
        },

        act: {
          //          tip: 'Gérer les activités',
          text: 'Mes Activités'
        },

        actlist: {
          tip: 'Gérer les activités',
          text: 'Liste'
        },

        actnew: {
          tip: 'Créer une activité',
          text: 'Créer'
        },

        cat: {
          // tip: '',
          text: 'Catégories'
        },

        catlist: {
          tip: 'Gérer les catégories',
          text: 'Liste'
        },

        catnew: {
          tip: 'Créer une catégorie',
          text: 'Créer'
        },

        allact: {
          tip: 'Modérer les activités',
          text: 'Activités'
        },

        users: {
          tip: 'Gérer les comptes utilisateurs',
          text: 'Utilisateurs'
        }

      },

      // Localization for the smart tables
      tables: {
        oAria: {
          sSortAscending: ' - cliquez/return pour classer par ordre croissant',
          sSortDescending: ' - cliquez/return pour classer par ordre décroissant'
        },
        oPaginate: {
          sFirst: 'Première page'
        },
        sSearch: 'Chercher:',
        sLengthMenu: 'Limiter à _MENU_ entrées par page'
        /*
        oLanguage.oPaginate.sLast
        Show details  Text to use when using the 'full_numbers' type of pagination for the button
        to take the user to the last page.
        oLanguage.oPaginate.sNext
        Show details  Text to use when using the 'full_numbers' type of pagination for the button
        to take the user to the next page.
        oLanguage.oPaginate.sPrevious
        Show details  Text to use when using the 'full_numbers' type of pagination for the button
        to take the user to the previous page.
        oLanguage.sEmptyTable
        Show details  This string is shown in preference to sZeroRecords when the table is empty of
        data (regardless of filtering). Note that this is an optional parameter - if it is not
        given, the value of sZeroRecords will be used instead (either the default or given value).
        oLanguage.sInfo
        Show details  This string gives information to the end user about the information that is
        current on display on the page. The _START_, _END_ and _TOTAL_ variables are all dynamically
        replaced as the table display updates, and can be freely moved or removed as the language
        requirements change.
        oLanguage.sInfoEmpty
        Show details  Display information string for when the table is empty. Typically the format
        of this string should match sInfo.
        oLanguage.sInfoFiltered
        Show details  When a user filters the information in a table, this string is appended to
        the information (sInfo) to give an idea of how strong the filtering is. The variable
        _MAX_ is dynamically updated.
        oLanguage.sInfoPostFix
        Show details  If can be useful to append extra information to the info string at times,
        and this variable does exactly that. This information will be appended to the sInfo
        (sInfoEmpty and sInfoFiltered in whatever combination they are being used) at all times.
        oLanguage.sInfoThousands
        Show details  DataTables has a build in number formatter (fnFormatNumber) which is used to
        format large numbers that are used in the table information. By default a comma is used,
        but this can be trivially changed to any character you wish with this parameter.
        oLanguage.sLoadingRecords
        oLanguage.sProcessing
        oLanguage.sZeroRecords
         */

      },

      // You can add new matters here - but DONT RENAME existing keys!!!! - you can still rename
      // the value obviously
      activities: {

        matters: {
          fra: 'Français',
          lit: 'Littérature',
          mat: 'Maths',
          mate: 'Maths éco',
          sci: 'Sciences éco',
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
        },

        // You can add new levels here - but DONT RENAME existing keys!!!! - you can still rename
        // the value obviously
        levels: {
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
          10: '10 minutes',
          15: '15 minutes',
          20: '20 minutes',
          30: '30 minutes',
          45: '45 minutes',
          60: '60 minutes'
        },

        difficulties: {
          easy: 'Facile',
          normal: 'Normal',
          hard: 'Difficile'
        },

        pageFlavors: {
          staticPage: 'Page simple',
          quizz: 'Page quizz',
          tat: 'Page texte à trous'
        },

        defaultValues: {
          title: 'Titre par défaut de l\'activité',
          // level: '',
          // matter: '',
          // category: '',
          description: 'Description par défaut de l\'activité',
          duration: 10,
          difficulty: 'easy',

          page: {
            title: 'Titre par défaut de la page',
            subtitle: 'Sous-titre par défaut de la page',
            flavor: 'staticPage',
            coef: 0,
            limitedTime: 0, // // 0 == infinity - X seconds = time
            sequencing: -1 // -1 = follow through | 0 = random sur la totalité | X = random sur un subset
            // advice: '',
            // document: '',
          }
        }
      }
    }
  };
}).apply(this);
