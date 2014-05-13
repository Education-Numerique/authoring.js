(function() {
  /*crappy plugin require this*/
  /*jshint camelcase:false*/
  'use strict';
  I18n.translations = {
    // This is javascript! - and must be valid
    // Be sure to call "puke flint" before commiting
    // Be also sure that "puke lint" passes ok
    fr: {
      // Some common stuff
      breadHome: 'Accueil',
      copyright: 'Association Éducation & Numérique - Siège social : 47 rue Meslay, 75003 Paris | ',
      conditions: 'Conditions générales & Respect de la vie privée',
      welcome: 'Bienvenue !',

      // Breadcrumb - Main title of the page, along with the optional breadcrumb
      breadcrumb: {
        account: {
          validation: {
            title: 'Validation de compte'
          },
          login: {
            title: 'Bienvenue'
          },
          register: {
            title: 'Créez votre compte'
          },
          settings: {
            title: 'Mes préférences'
          },
          profile: {
            title: 'Mon profil'
          },
          reminder: {
            title: 'Mot de passe perdu'
          },

          remindervalidate: {
            title: 'Mot de passe perdu'
          }
        },
        categories: {
          title: 'Programme'
        },
        users: {
          title: 'Utilisateurs'
        },
        admin: {
          activities: {
            title: 'Administration des activités'
          },
          users: {
            title: 'Administration des utilisateurs'
          }
        },
        sandbox: {
          title: 'Le Catalogue'
        },
        dashboard: {
          title: 'Bienvenue sur la plateforme auteur d’Education & Numérique'
        },
        myactivities: {
          title: 'Mes Activités'
        },
        activityedit: {
          title: 'Édition de l\'activité'
        }
      },

      // These elements are in the top and left navigation widgets
      nav: {
        home: {
          // Notip means no tip :)
          // tip: 'Accès au dashboard',
          text: 'Accueil'
        },
        profile: {
          tip: 'Accéder à mon profil',
          text: 'Mon profil'
        },
        settings: {
          tip: 'Accéder à mes préférences',
          text: 'Mes préférences'
        },
        logout: {
          tip: 'Se déconnecter',
          text: 'Déconnexion'
        },
        login: {
          tip: 'Se connecter',
          text: 'Connexion'
        },
        register: {
          tip: 'Créer un compte',
          text: 'Inscription'
        },
        sandbox: {
          tip: 'Accéder au Catalogue',
          text: 'Catalogue'
        },
        act: {
          tip: 'Mes activités',
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
          tip: 'Accrochez vos activités au programme',
          text: 'Programme'
        },
        catlist: {
          tip: 'Gérer les programmes',
          text: 'Liste'
        },
        catnew: {
          tip: 'Créer un programme',
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

      // app/common/controllers/pages/activity.js
      publishActivity: {
          SHORT_TITLE: {
              warning: 'le titre de votre activité doit compter au moins 4 caractères'
          },
          SHORT_DESCRIPTION: {
              warning: 'la description de votre activité doit compter au moins 20 caractères'
          },
          LONG_DESCRIPTION: {
              warning: 'la description de votre activité doit compter au plus 200 caractères'
          },
          PERF_MUSTACHE_MALFORMED: {
              warning: 'il y une ou plusieurs erreur de syntaxe dans une page performance :<br/>'
          },
          ONE_PAGE: {
              warning: 'votre activité doit contenir au moins une page'
          },
          NO_GOOD_ANSWER: {
              warning: 'certaines de vos questions n\'indiquent pas de bonne réponse !'
          },
      },
      embedActivity: {
          warning: 'Seules les activités publiées peuvent être partagées'
      },
      exportScorm: {
          warning: 'Seules les activités publiées peuvent être exportées sous cette forme'
      },
      addPage: {},
      deletePage: {},
      movePage: {},

      timeminute: 'minute',
      timeminutes: 'minutes',
      timeseconds: 'secondes',
      timesecond: 'seconde',

      // app/common/pages/activity/editor/editor.tpl
      /*
        'Pages de l\'activité',
        'dépublier'
        'Publier'
        'Partager'
        'Exporter SCORM'
        'Prévisualiser'
        'Sauvegarder'
        'Informations'
        'Ajouter une page'
        'Voulez-vous vraiment supprimer cette réponse ?
        'Annuler'
        'Supprimer'
        'Voulez-vous vraiment supprimer cette question ?'
        'Annuler'
        'Supprimer'
        'Voulez-vous vraiment supprimer cette page ?'
        'Annuler'
        'Supprimer'
        'Voulez-vous vraiment supprimer TOUTE cette activité ?'
        'Annuler'
        'Supprimer'
        'Voulez-vous vraiment dépublier cette activité ?'
        'Annuler'
        'Dépublier'
        'Créer une nouvelle page'
        'Choisissez le modèle de votre page'
        'Annuler'
        'Créer'
        'Gérer le temps limité'
        'Ok'
        'Séquenceur'
        'Afficher toutes les questions'
        'Afficher les questions par ordre :'
        'Aléatoire sur la totalité'
        'Aléatoire sur un nombre de questions'
        'Nombre d\'éléments'
        'Ok'
        'Preview'
        'Activité sauvegardée'

        'Le brouillon de votre activité a bien été sauvegardé.<br />En fait, cette sauvegarde est automatique. Vous devriez pratiquement toujours récupérer votre travail, n\'importe où, n\'importe quand.<br /><small>Attention à ne pas avoir plusieurs instances de votre activité en cours de publication ouvertes en même temps. Vous risqueriez de tout perdre à cause d'une instance que vous auriez oublié de refermer ...</small>
        'Ok'
        'Activité publiée'

            Cette version de votre activité a bien été publiée. Elle est désormais consultable par tous dans le Catalogue.<br />Nous vous rappelons que l'association se réserve le droit de présenter votre activité sur son site. (<a href='http://www.education-et-numérique.org' target='_blank'>Conditions Générales</a>)<br />Si vous continuez à travailler, seul votre <strong>brouillon</strong> sera modifié tant que vous n'aurez pas utilisé à nouveau le bouton "Publier".

        Télécharger le package SCORM'
        Package scorm exporté'
        Annuler'
        Télécharger'
        Activité non publiée'

            Votre activité n'est pas prête à être publiée. En effet, <span id="pub-err"></span>
            <br />Merci de corriger le problème.

        Corriger'
        Package scorm'
        Fermer'
        Codes d'insertion'
        Fermer'
        Codes d'insertion'

            Lien vers l'activité : ' 
            <pre>
              https://www.education-et-numerique.fr/0.3/activity/embed.html?id={{content.controller.id}}
            </pre>
            <hr />
            Code &lt;iframe&gt; à copier/coller dans le code source html de votre blog :
            <pre>
              &lt;iframe src=&quot;//www.education-et-numerique.fr/0.3/activity/embed.html?id={{content.controller.id}}&quot; style=&quot;width: 600px; max-width: 1000px; height: 800px;&quot; &gt;&lt;/iframe&gt;
            </pre>
        Ok'
        AsciiMath'
        Latex'
        Formule :
        Aperçu : 
                "http://fr.wikipedia.org/wiki/Aide:Formules_TeX"
        Documentation
        Insérer
        Fermer
        Upload
        Galerie
        Déposez le fichier ici
        Ajouter une image
        Fermer
        Condition d'affichage : 
        Conditionner
        Annuler

        ot supprimé : 
        Indice : 
        Autres réponses acceptées (séparées par ; | joker : *) : 
        Trouer
        Reboucher
        Annuler
        Condition d'affichage : 
        Conditioner
        Annuler
        Texte 
        Tooltip 
        Emplacement 
        Haut
        Droite
        Bas
        Gauche
        Insérer
        Supprimer
        Annuler
        Voulez-vous vraiment supprimer ce side document ?
        Annuler
        Supprimer


      */


      // Localization for pages
      pages: {
        tat: {
          holeslist: 'Liste des trous&nbsp;'
        }
      },

      // Localization for the smart tables
      tables: {
        oAria: {
          sSortAscending: ' - classer par ordre croissant',
          sSortDescending: ' - classer par ordre décroissant'
        },
        oPaginate: {
          sFirst: 'Première page',
          sLast: 'Dernière page',
          sNext: 'Page suivante',
          sPrevious: 'Page précédente'
        },
        sSearch: 'Chercher:',
        sLengthMenu: 'Limiter à _MENU_ entrées par page'
      },

      redactor: {
        html: 'Code HTML',
        video: 'Insérer une vidéo...',
        image: 'Paramètres de l\'image',
        table: 'Tableau',
        link: 'Lien',
        link_insert: 'Insérer un lien...',
        unlink: 'Supprimer le lien',
        formatting: 'Styles',
        paragraph: 'Paragraphe',
        quote: 'Citation',
        code: 'Code',
        header1: 'Titre 1',
        header2: 'Titre 2',
        header3: 'Titre 3',
        header4: 'Accordéon',
        bold: 'Gras',
        italic: 'Italique',
        fontcolor: 'Couleur du texte',
        backcolor: 'Couleur d\'arrière plan du texte',
        unorderedlist: 'Liste à puces',
        orderedlist: 'Liste numérotée',
        outdent: 'Diminuer le trait',
        indent: 'Augmenter le trait',
        cancel: 'Annuler',
        insert: 'Insérer',
        save: 'Sauvegarder',
        _delete: 'Supprimer',
        insert_table: 'Insérer un tableau...',
        insert_row_above: 'Ajouter une rangée au-dessus',
        insert_row_below: 'Ajouter une rangée en-dessous',
        insert_column_left: 'Ajouter une colonne à gauche',
        insert_column_right: 'Ajouter une colonne à droite',
        delete_column: 'Supprimer la colonne',
        delete_row: 'Supprimer la rangée',
        delete_table: 'Supprimer le tableau',
        rows: 'Rangées',
        columns: 'Colonnes',
        add_head: 'Ajouter un en-tête',
        delete_head: 'Supprimer l\'en-tête',
        title: 'Titre',
        image_position: 'Position',
        none: 'Aucun',
        left: 'Gauche',
        right: 'Droite',
        image_web_link: 'Adresse URL de l\'image',
        text: 'Texte',
        mailto: 'Courriel',
        web: 'Adresse URL',
        video_html_code: 'Code d\'intégration de la vidéo',
        file: 'Insérer un fichier...',
        upload: 'Téléverser',
        download: 'Télécharger',
        choose: 'Choisir',
        or_choose: 'Ou choisissez',
        drop_file_here: 'Déposez le fichier ici',
        align_left: 'Aligner à gauche',
        align_center: 'Aligner au centre',
        align_right: 'Aligner à droite',
        align_justify: 'Justifier',
        horizontalrule: 'Insérer une ligne horizontale',
        deleted: 'Supprimé',
        anchor: 'Ancre',
        link_new_tab: 'Ouvrir le lien dans un nouvel onglet',
        underline: 'Souligné',
        alignment: 'Alignement'
      }
    }
  };
})();
