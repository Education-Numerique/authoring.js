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

  this.difficulties = {
    easy: 'Facile',
    normal: 'Normal',
    hard: 'Difficile'
  };

  this.flavors = {
    simple: 'Page simple',
    quizz: 'Page quiz',
    tat: 'Page texte à trous',
    jmt: 'Page glisser-déposer',
    perf: 'Page performance'
  };

// You can add new matters here - but DONT RENAME existing keys!!!! - you can still change the value obviously
  this.matters = {
    fra: 'Français',
    lit: 'Littérature',
    let: 'Lettres',
    mat: 'Maths',
    mate: 'Maths éco',
    sciec: 'Sciences économiques et sociales',
    sci: 'Sciences',
    phys: 'Physique',
    chim: 'Chimie',
    svt: 'SVT',
    his: 'Histoire',
    geo: 'Géographie',
    edc: 'Education civique',
    phi: 'Philosophie',
    all: 'Allemand',
    eng: 'Anglais',
    esp: 'Espagnol',
    ita: 'Italien',
    chin: 'Chinois',
    jap: 'Japonais',
    lat: 'Latin',
    gre: 'Grec',
    hda: 'Histoire de l\'Art',
    artpla: 'Arts plastiques',
    artsza: 'Arts appliqués',
    mus: 'Musique',
    eps: 'EPS',
    tpe: 'TPE',
    tech: 'Technologie',
    meca: 'Mecanique',
    inf: 'Informatique',
    docu: 'Documentation',
    tice: 'TICE',
    tuto: 'Tutoriel',
    other: 'Autre'
  };

  // You can add new matters here - but DONT RENAME existing keys!!!! - you can still change the value obviously
  this.discipline = this.matters;

  // You can add new levels here - but DONT RENAME existing keys!!!! - you can still change the value obviously
  this.levels = {
    tt_lycee: 'Tout le lycée',
    tt_tles: 'Toutes terminales',
    ts: 'Terminale S',
    tes: 'Terminale ES',
    tl: 'Terminale L',
    tt_prem: 'Toutes premières',
    ps: 'Première S',
    pes: 'Première ES',
    pl: 'Première L',
    two: 'Seconde',
    tt_colg: 'Tout le collège',
    three: 'Troisième',
    four: 'Quatrième',
    five: 'Cinquième',
    six: 'Sixième',
    prim: 'primaire',
    cm2: 'CM2',
    cm1: 'CM1',
    ce2: 'CE2',
    ce1: 'CE1',
    cp: 'CP',
    other: 'Autre'
  };

  this.categories = [
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

    {id: 'mat_pes', title: 'Mathématiques - première ES', matter: {id: 'mat'},
      level: {id: 'pes'}, long_title: '', content: [
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

    {id: 'mat_ps', title: 'Mathématiques - première S', matter: {id: 'mat'},
      level: {id: 'ps'}, long_title: '', content: [
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

    {id: 'mat_ts', title: 'Mathématiques - terminale S', matter: {id: 'mat'}, level: {id: 'ts'},
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
    ]},

    {id: 'fra_six', title: 'Français - Sixième', matter: {id: 'fra'}, level: {id: 'six'}, long_title: 'Français sixième', content: [
        {id: 'fra_six_1', title: 'L\'étude de la langue', content: [
            {id: 'fra_six_1_1', title: 'Grammaire'},
            {id: 'fra_six_1_2', title: 'Orthographe'}, 
            {id: 'fra_six_1_3', title: 'Lexique'}
        ]},
        {id: 'fra_six_2', title: 'La lecture', content: [
            {id: 'fra_six_2_1', title: 'Textes de l\'Antiquité'},
            {id: 'fra_six_2_2', title: 'Contes et récits merveilleux'},
            {id: 'fra_six_2_3', title: 'Initiation à la poésie'},
            {id: 'fra_six_2_4', title: 'Initiation au théâtre'},
            {id: 'fra_six_2_5', title: 'Étude de l\'image'}
        ]},
        {id: 'fra_six_3', title: 'L\'expression écrite', content: [
            {id: 'fra_six_3_1', title: 'Méthodologie'},
            {id: 'fra_six_3_2', title: 'Récit d\'une expérience'},
            {id: 'fra_six_3_3', title: 'Récit sur une œuvre, un support'},
            {id: 'fra_six_3_4', title: 'L\'expression poétique'}
        ]},
        {id: 'fra_six_4', title: 'L\'expression orale', content: [
            {id: 'fra_six_4_1', title: 'Raconter une expérience'}
        ]},
        {id: 'fra_six_5', title: 'L\'histoire des arts', content: [
            {id: 'fra_six_5_1', title: 'Arts, mythes et religions'}
        ]}
    ]},

    {id: 'edc_six', title: 'Éducation Civique - Sixième', matter: {id: 'edc'}, level: {id: 'six'}, long_title: 'Éducation Civique', content: [
        {id: 'edc_six_1', title: ' Le collégien', content: [
            {id: 'edc_six_1_1', title: 'Les missions et l\'organisation du collège'},
            {id: 'edc_six_1_2', title: 'L\'éducation : un droit, une nécessité'}
        ]},
        {id: 'edc_six_2', title: 'L\'enfant', content: [
            {id: 'edc_six_2_1', title: 'Une personne'},
            {id: 'edc_six_2_2', title: 'Un mineur'},
            {id: 'edc_six_2_3', title: 'Une personne avec droits et devoirs'}
        ]},
        {id: 'edc_six_3', title: 'L\'habitant', content: [
            {id: 'edc_six_3_1', title: 'L\'organisation de la commune'},
            {id: 'edc_six_3_2', title: 'Citoyenneté et acteurs locaux'}
        ]}
    ]},

    {id: 'fra_five', title: 'Français - Cinquième', matter: {id: 'fra'}, level: {id: 'five'}, long_title: 'Cinquième', content: [
        {id: 'fra_five_1', title: 'L\'étude de la langue', content: [
            {id: 'fra_five_1_1', title: 'Grammaire'},
            {id: 'fra_five_1_2', title: 'Orthographe'},
            {id: 'fra_five_1_3', title: 'Lexique'}
        ]},
        {id: 'fra_five_2', title: 'La lecture', content: [
            {id: 'fra_five_2_1', title: 'Littérature du Moyen-âge et de la Renaissance'},
            {id: 'fra_five_2_2', title: 'Récits d\'aventures'},
            {id: 'fra_five_2_3', title: 'Poésie : jeux de langage'},
            {id: 'fra_five_2_4', title: 'Théâtre : la comédie'},
            {id: 'fra_five_2_5', title: 'Étude de l\'image'}
        ]},
        {id: 'fra_five_3', title: 'L\'expression écrite', content: [
            {id: 'fra_five_3_1', title: 'Méthodologie'},
            {id: 'fra_five_3_2', title: 'Récit d\'une expérience'},
            {id: 'fra_five_3_3', title: 'Descriptions \/ Portraits'},
            {id: 'fra_five_3_4', title: 'Dialogues'},
            {id: 'fra_five_3_5', title: 'Récit sur une œuvre, un support'},
            {id: 'fra_five_3_6', title: 'L\'expression poétique'}
        ]},
        {id: 'fra_five_4', title: 'L\'expression orale', content: [
            {id: 'fra_five_4_1', title: 'Raconter une expérience'},
            {id: 'fra_five_4_2', title: 'Dialogue, jeux de rôle'}
        ]},
        {id: 'fra_five_5', title: 'L\'histoire des arts', content: [
            {id: 'fra_five_5_1', title: 'Art, États et pouvoir'},
            {id: 'fra_five_5_2', title: 'Arts du visuel '},
            {id: 'fra_five_5_3', title: 'Arts du son'},
            {id: 'fra_five_5_4', title: 'Arts du spectacle vivant'},
            {id: 'fra_five_5_5', title: 'Arts de l\'espace'}
        ]}
    ]},

    {id: 'fra_four', title: 'Français - Quatrième', matter: {id: 'fra'}, level: {id: 'four'}, long_title: 'Quatrième', content: [
        {id: 'fra_four_1', title: 'L\'étude de la langue', content: [
            {id: 'fra_four_1_1', title: 'Grammaire'},
            {id: 'fra_four_1_2', title: 'Orthographe'},
            {id: 'fra_four_1_3', title: 'Lexique'}
        ]},
        {id: 'fra_four_2', title: 'La lecture', content: [
            {id: 'fra_four_2_1', title: 'La lettre'},
            {id: 'fra_four_2_2', title: 'Le récit au XIXe siècle'},
            {id: 'fra_four_2_3', title: 'Poésie : Le lyrisme'},
            {id: 'fra_four_2_4', title: 'Théâtre : faire rire, faire pleurer'},
            {id: 'fra_four_2_5', title: 'Étude de l\'image'}
        ]},
        {id: 'fra_four_3', title: 'L\'expression écrite', content: [
            {id: 'fra_four_3_1', title: 'Méthodologie'},
            {id: 'fra_four_3_2', title: 'L\'expression poétique'},
            {id: 'fra_four_3_3', title: 'Scènes de théâtre'},
            {id: 'fra_four_3_4', title: 'Nouvelles'},
            {id: 'fra_four_3_5', title: 'Prolongement narratif'},
            {id: 'fra_four_3_6', title: 'Paragraphe argumenté'}
        ]},
        {id: 'fra_four_4', title: 'L\'expression orale', content: [
            {id: 'fra_four_4_1', title: 'Dialogue explicatif'},
            {id: 'fra_four_4_2', title: 'Dialogue argumentatif'}
        ]},
        {id: 'fra_four_5', title: 'L\'histoire des arts', content: [
            {id: 'fra_four_5_1', title: 'Arts, espace et temps'},
            {id: 'fra_four_5_5', title: 'Arts, ruptures, continuités'}
        ]}
    ]},

    {id: 'fra_three', title: 'Français - Troisième', matter: {id: 'fra'}, level: {id: 'three'}, long_title: 'Troisième', content: [
        {id: 'fra_three_1', title: 'L\'étude de la langue', content: [
            {id: 'fra_three_1_1', title: 'Grammaire'},
            {id: 'fra_three_1_2', title: 'Orthographe'},
            {id: 'fra_three_1_3', title: 'Lexique'}
        ]},
        {id: 'fra_three_2', title: 'La lecture', content: [
            {id: 'fra_three_2_1', title: 'Formes du récit au XX et XXIe siècles'},
            {id: 'fra_three_2_2', title: 'La poésie dans le monde et dans le siècle'},
            {id: 'fra_three_2_3', title: 'Théâtre : continuité et renouvellement'},
            {id: 'fra_three_2_4', title: 'Étude de l\'image'}
        ]},
        {id: 'fra_three_3', title: 'L\'expression écrite', content: [
            {id: 'fra_three_3_1', title: 'Méthodologie'},
            {id: 'fra_three_3_2', title: 'L\'écriture narrative'},
            {id: 'fra_three_3_3', title: 'Résumé'},
            {id: 'fra_three_3_4', title: 'Scène tragique'},
            {id: 'fra_three_3_5', title: 'Poésie et expression de soi'},
            {id: 'fra_three_3_6', title: 'Article de presse'},
            {id: 'fra_three_3_7', title: 'Écrit argumentatif'},
            {id: 'fra_three_3_8', title: 'Entraînement au brevet'}
        ]},
        {id: 'fra_three_4', title: 'L\'expression orale', content: [
            {id: 'fra_three_4_1', title: 'Débat'},
            {id: 'fra_three_4_2', title: 'Lecture à voix haute'}
        ]},
        {id: 'fra_three_5', title: 'L\'histoire des arts', content: [
            {id: 'fra_three_5_1', title: 'Arts, Etats et pouvoir'}
        ]},
        {id: 'fra_three_6', title: 'Repères de fin de collège', content: [
            {id: 'fra_three_6_1', title: 'Dates importantes'},
            {id: 'fra_three_6_2', title: 'Notions importantes'},
            {id: 'fra_three_6_3', title: 'Auteurs essentiels'},
            {id: 'fra_three_6_4', title: 'Œuvres immanquables'},
            {id: 'fra_three_6_5', title: 'Méthodologie du Brevet'}
        ]}
    ]},

    {id: 'mat_six', title: 'Mathématiques - Sixième', matter: {id: 'mat'}, level: {id: 'six'}, long_title: 'Sixième', content: [
        {id: 'mat_six_1', title: 'Organisation de données, fonctions', content: [
            {id: 'mat_six_1_1', title: 'Proportionnalité'},
            {id: 'mat_six_1_2', title: 'Organisation et représentation de données'}
        ]},
        {id: 'mat_six_2', title: 'Nombres et calculs', content: [
            {id: 'mat_six_2_1', title: 'Nombres entiers et décimaux'},
            {id: 'mat_six_2_2', title: 'Opérations '},
            {id: 'mat_six_2_3', title: 'Opérations '},
            {id: 'mat_six_2_4', title: 'Nombres en écriture fractionnaire'}
        ]},
        {id: 'mat_six_3', title: 'Géométrie', content: [
            {id: 'mat_six_3_1', title: 'Figures planes'},
            {id: 'mat_six_3_2', title: 'Symétrie orthogonale'},
            {id: 'mat_six_3_3', title: 'Parallélépipède rectangle'}
        ]},
        {id: 'mat_six_4', title: 'Grandeurs et mesures', content: [
            {id: 'mat_six_4_1', title: 'Longueurs, masses, durées'},
            {id: 'mat_six_4_2', title: 'Angles'},
            {id: 'mat_six_4_3', title: 'Aires'},
            {id: 'mat_six_4_4', title: 'Volumes'}
        ]}
    ]},

    {id: 'mat_five', title: 'Mathématiques - Cinquième', matter: {id: 'mat'}, level: {id: 'five'}, long_title: 'Cinquième', content: [
        {id: 'mat_five_1', title: 'Organisation de données, fonctions', content: [
            {id: 'mat_five_1_1', title: 'Proportionnalité'},
            {id: 'mat_five_1_2', title: 'Expressions littérales'},
            {id: 'mat_five_1_3', title: 'Activités graphiques'},
            {id: 'mat_five_1_4', title: 'Représentation et traitement des données'}
        ]},
        {id: 'mat_five_2', title: 'Nombres et calculs', content: [
            {id: 'mat_five_2_1', title: 'Nombres entiers et décimaux positifs'},
            {id: 'mat_five_2_2', title: 'Nombres positifs en écriture fractionnaire'},
            {id: 'mat_five_2_3', title: 'Nombres relatifs entiers et décimaux'},
            {id: 'mat_five_2_4', title: 'Initiative à la notion d\'équation'}
        ]},
        {id: 'mat_five_3', title: 'Géométrie', content: [
            {id: 'mat_five_3_1', title: 'Figures planes'},
            {id: 'mat_five_3_2', title: 'Symétries'},
            {id: 'mat_five_3_3', title: 'Prismes droits, cylindres de révolution'}
        ]},
        {id: 'mat_five_4', title: 'Grandeurs et mesures', content: [
            {id: 'mat_five_4_1', title: 'Longueurs, masses, durées'},
            {id: 'mat_five_4_2', title: 'Angles'},
            {id: 'mat_five_4_3', title: 'Aires'},
            {id: 'mat_five_4_4', title: 'Volumes'}
        ]}
    ]},

    {id: 'mat_four', title: 'Mathématiques - Quatrième', matter: {id: 'mat'}, level: {id: 'four'}, long_title: 'Quatrième', content: [
        {id: 'mat_four_1', title: 'Organisation de données, fonctions', content: [
            {id: 'mat_four_1_1', title: 'Utilisation de la proportionnalité'},
            {id: 'mat_four_1_2', title: 'Proportionnalité'},
            {id: 'mat_four_1_3', title: 'Traitement de données'}
        ]},
        {id: 'mat_four_2', title: 'Nombres et calculs', content: [
            {id: 'mat_four_2_1', title: 'Calcul numérique'},
            {id: 'mat_four_2_2', title: 'Calcul littéral'},
            {id: 'mat_four_2_3', title: 'Équation à une inconnue'}
        ]},
        {id: 'mat_four_3', title: 'Géométrie', content: [
            {id: 'mat_four_3_1', title: 'Figures planes'},
            {id: 'mat_four_3_2', title: 'Configurations dans l\'espace'},
            {id: 'mat_four_3_3', title: 'Agrandissement et réduction'}
        ]},
        {id: 'mat_four_4', title: 'Grandeurs et mesures', content: [
            {id: 'mat_four_4_1', title: 'Aires et volumes'},
            {id: 'mat_four_4_2', title: 'Grandeurs quotients courantes'}
        ]}
    ]},

    {id: 'mat_three', title: 'Mathématiques - Troisième', matter: {id: 'mat'}, level: {id: 'three'}, long_title: 'Troisième', content: [
        {id: 'mat_three_1', title: 'Organisation de données, fonctions', content: [
            {id: 'mat_three_1_1', title: 'Notion de fonction'},
            {id: 'mat_three_1_2', title: 'Fonction linéaire, fonction affine'},
            {id: 'mat_three_1_3', title: 'Statistiques'},
            {id: 'mat_three_1_4', title: 'Notion de probabilité'}
        ]},
        {id: 'mat_three_2', title: 'Nombres et calculs', content: [
            {id: 'mat_three_2_1', title: 'Nombres entiers et rationnels'},
            {id: 'mat_three_2_2', title: 'Calculs élémentaires sur les radicaux'},
            {id: 'mat_three_2_3', title: 'Écritures littérales'},
            {id: 'mat_three_2_4', title: 'Équations et inéquations au premier degré'}
        ]},
        {id: 'mat_three_3', title: 'Géométrie', content: [
            {id: 'mat_three_3_1', title: 'Figures planes'},
            {id: 'mat_three_3_2', title: 'Configurations dans l\'espace'},
            {id: 'mat_three_3_3', title: 'Sphère, centre et rayon'}
        ]},
        {id: 'mat_three_4', title: 'Grandeurs et mesures', content: [
            {id: 'mat_three_4_1', title: 'Aires et volumes'},
            {id: 'mat_three_4_2', title: 'Grandeurs composées, changement d\'unité'}
        ]}
    ]},

    {id: 'his_six', title: 'Histoire - Sixième', matter: {id: 'his'}, level: {id: 'six'}, long_title: 'Sixième', content: [
        {id: 'his_six_1', title: 'L\'Orient ancient', content: [
            {id: 'his_six_1_1', title: 'Premières civilisations'},
            {id: 'his_six_1_2', title: 'Premières écritures'}
        ]},
        {id: 'his_six_2', title: 'La civilisation grecque', content: [
            {id: 'his_six_2_1', title: 'Aux fondements de la Grèce : cités, mythes et panhellénisme'},
            {id: 'his_six_2_2', title: 'La Cité des Athéniens : citoyenneté et démocratie'},
            {id: 'his_six_2_3', title: 'Alexandre le Grand'},
            {id: 'his_six_2_4', title: 'La Grèce des savants'}
        ]},
        {id: 'his_six_3', title: 'Rome', content: [
            {id: 'his_six_3_1', title: 'Des origines à la fin de la République'},
            {id: 'his_six_3_2', title: 'L\'Empire : l\'Empereur, la ville, la romanisation'}
        ]},
        {id: 'his_six_4', title: 'Les débuts du judaïsme et du christianisme', content: [
            {id: 'his_six_4_1', title: 'Les débuts du judaïsme'},
            {id: 'his_six_4_2', title: 'Les débuts du christianisme'}
        ]},
        {id: 'his_six_5', title: 'Les empires chrétiens du haut Moyen-âge', content: [
            {id: 'his_six_5_1', title: 'L\'empire byzantin'},
            {id: 'his_six_5_2', title: 'L\'empire carolingien'}
        ]},
        {id: 'his_six_6', title: 'Regards sur des mondes lointains', content: [
            {id: 'his_six_6_1', title: 'La Chine des Han à son apogée'},
            {id: 'his_six_6_2', title: 'L\'Inde classique au IVe et Ve siècles'}
        ]}
    ]},

    {id: 'his_five', title: 'Histoire - Cinquième', matter: {id: 'his'}, level: {id: 'five'}, long_title: 'Cinquième', content: [
        {id: 'his_five_1', title: 'Les débuts de l\'Islam', content: [
            {id: 'his_five_1_1', title: 'Contexte'},
            {id: 'his_five_1_2', title: 'Les textes'},
            {id: 'his_five_1_3', title: 'Vie quotidienne'}
        ]},
        {id: 'his_five_2', title: 'L\'occident féodal (XI-XVe)', content: [
            {id: 'his_five_2_1', title: 'Paysans et seigneurs'},
            {id: 'his_five_2_2', title: 'Féodaux, souverains, premiers Etats'},
            {id: 'his_five_2_3', title: 'La place de l\'Église'}
        ]},
        {id: 'his_five_3', title: 'Regards sur l\'Afrique', content: [
            {id: 'his_five_3_1', title: 'Une civilisation africaine'},
            {id: 'his_five_3_2', title: 'Les grands échanges'},
            {id: 'his_five_3_3', title: 'Les traites'}
        ]},
        {id: 'his_five_4', title: 'Vers la modernité (XV-XVIIe)', content: [
            {id: 'his_five_4_1', title: 'Bouleversements culturels et intellectuels'},
            {id: 'his_five_4_2', title: 'L\'émergence du \'Roi absolu\' '}
        ]}
    ]},

    {id: 'his_four', title: 'Histoire - Quatrième', matter: {id: 'his'}, level: {id: 'four'}, long_title: 'Quatrième', content: [
        {id: 'his_four_1', title: 'Thème transversal : les arts, témoins de l\'Histoire (XVIII-XXe)', content: [
            {id: 'his_four_1_1', title: 'Œuvres littéraires'},
            {id: 'his_four_1_2', title: 'Œuvres de compositeurs'},
            {id: 'his_four_1_3', title: 'Œuvres architecturale'},
            {id: 'his_four_1_4', title: 'Tableaux, sculptures'},
            {id: 'his_four_1_5', title: 'Photos et premiers films'},
            {id: 'his_four_1_6', title: 'Méthodologie'}
        ]},
        {id: 'his_four_2', title: 'L\'Europe et le Monde au XVIIIe', content: [
            {id: 'his_four_2_1', title: 'L\'Europe dans le Monde au début du XVIIIe'},
            {id: 'his_four_2_2', title: 'L\'Europe des Lumières'},
            {id: 'his_four_2_3', title: 'Traites négrières et esclavage'},
            {id: 'his_four_2_4', title: 'Difficultés de la Monarchie sous Louis XVI'}
        ]},
        {id: 'his_four_3', title: 'La Révolution et l\'Empire', content: [
            {id: 'his_four_3_1', title: 'Les temps forts de la Révolution'},
            {id: 'his_four_3_2', title: 'Les fondations d\'une France nouvelle'},
            {id: 'his_four_3_3', title: 'La France et l\'Europe en 1815'}
        ]},
        {id: 'his_four_4', title: 'Le XIXe siècle', content: [
            {id: 'his_four_4_1', title: 'L\'âge industriel'},
            {id: 'his_four_4_2', title: 'L\'évolution politique de la France, 1815-1914'},
            {id: 'his_four_4_3', title: 'L\'affirmation des nationalismes'},
            {id: 'his_four_4_4', title: 'Les colonies'},
            {id: 'his_four_4_5', title: 'Carte de l\'Europe en 1914'}
        ]}
    ]},

    {id: 'his_three', title: 'Histoire - Troisième', matter: {id: 'his'}, level: {id: 'three'}, long_title: 'Troisième', content: [
        {id: 'his_three_1', title: 'Thème transversal : les arts, témoins de l\'Histoire (XX-XXIe)', content: [
            {id: 'his_three_1_1', title: 'Œuvres littéraires'},
            {id: 'his_three_1_2', title: 'Œuvres de compositeurs'},
            {id: 'his_three_1_3', title: 'Œuvres architecturale'},
            {id: 'his_three_1_4', title: 'Tableaux, sculptures'},
            {id: 'his_three_1_5', title: 'Photos et premiers films'},
            {id: 'his_three_1_6', title: 'Méthodologie'}
        ]},
        {id: 'his_three_2', title: 'Le XXe : un siècle de transformations', content: [
            {id: 'his_three_2_1', title: 'Grandes innovations scientifiques et technologiques'},
            {id: 'his_three_2_2', title: 'Evolution de la production et conséquences sociales'}
        ]},
        {id: 'his_three_3', title: 'Guerres mondiales et régimes totalitaires', content: [
            {id: 'his_three_3_1', title: 'La 1ère Guerre mondiale, guerre totale (1914-18)'},
            {id: 'his_three_3_2', title: 'Les régimes totalitaires des années 1930'},
            {id: 'his_three_3_3', title: 'La 2de Guerre mondiale, guerre d\'anéantissement (1939-45)'}
        ]},
        {id: 'his_three_4', title: 'Une géopolitique mondiale', content: [
            {id: 'his_three_4_1', title: 'La Guerre froide (1945-91)'},
            {id: 'his_three_4_2', title: 'Des colonies aux États nouvellement indépendants'},
            {id: 'his_three_4_3', title: 'La construction européenne (jusqu\'à 2000)'},
            {id: 'his_three_4_4', title: 'Le monde depuis le début des années 1990'}
        ]},
        {id: 'his_three_5', title: 'La vie politique en France', content: [
            {id: 'his_three_5_1', title: 'La République de l\'Entre-deux-guerres'},
            {id: 'his_three_5_2', title: 'Effondrement et refondation républicaine (1940-46)'},
            {id: 'his_three_5_3', title: 'De Gaulle et nouveau système républicain (1958-69)'},
            {id: 'his_three_5_4', title: 'La Ve République à l\'épreuve de sa durée'}
        ]},
        {id: 'his_three_6', title: 'Repères de fin de collège', content: [
            {id: 'his_three_6_1', title: 'Dates importantes'},
            {id: 'his_three_6_2', title: 'Notions importantes'},
            {id: 'his_three_6_3', title: 'Personnages importants'},
            {id: 'his_three_6_4', title: 'Méthodologie du Brevet'}
        ]}
    ]},

    {id: 'geo_six', title: 'Géographie - Sixième', matter: {id: 'geo'}, level: {id: 'six'}, long_title: 'Géographie', content: [
        {id: 'geo_six_1', title: 'Mon espace proche', content: [
            {id: 'geo_six_1_1', title: 'Paysages et territoire'},
            {id: 'geo_six_1_2', title: 'Les différentes échelles'}
        ]},
        {id: 'geo_six_2', title: 'Où sont les hommes sur la Terre ?', content: [
            {id: 'geo_six_2_1', title: 'La répartition des hommes sur Terre '}
        ]},
        {id: 'geo_six_3', title: 'Habiter', content: [
            {id: 'geo_six_3_1', title: 'Habiter la ville'},
            {id: 'geo_six_3_2', title: 'Habiter le monde rural'},
            {id: 'geo_six_3_3', title: 'Habiter les littoraux'},
            {id: 'geo_six_3_4', title: 'Habiter des espaces à fortes contraintes'}
        ]},
        {id: 'geo_six_4', title: 'Question au choix \/ Autre thème'
        }
    ]},

    {id: 'geo_five', title: 'Géographie - Cinquième', matter: {id: 'geo'}, level: {id: 'five'}, long_title: 'Géographie', content: [
        {id: 'geo_five_1', title: 'La question du développement durable', content: [
            {id: 'geo_five_1_1', title: 'Enjeux du développement durable'},
            {id: 'geo_five_1_2', title: 'Dynamique de la population et DD'}
        ]},
        {id: 'geo_five_2', title: 'Des sociétés inégalement développées', content: [
            {id: 'geo_five_2_1', title: 'Inégalités devant la santé'},
            {id: 'geo_five_2_2', title: 'Inégalités devant l\'alphabétisation'},
            {id: 'geo_five_2_3', title: 'Inégalités devant les risques'},
            {id: 'geo_five_2_4', title: 'La pauvreté dans le monde'}
        ]},
        {id: 'geo_five_3', title: 'Des hommes et des ressources', content: [
            {id: 'geo_five_3_1', title: 'Les ressources alimentaires'},
            {id: 'geo_five_3_2', title: 'L\'accès à l\'eau'},
            {id: 'geo_five_3_3', title: 'Gérer les océans et leurs ressources'},
            {id: 'geo_five_3_4', title: 'Ménager l\'atmosphère'},
            {id: 'geo_five_3_5', title: 'L\'énergie'}
        ]},
        {id: 'geo_five_4', title: 'Question au choix \/ Autre thème'
        }
    ]},

    {id: 'geo_four', title: 'Géographie - Quatrième', matter: {id: 'geo'}, level: {id: 'four'}, long_title: 'Géographie', content: [
        {id: 'geo_four_1', title: 'Des échanges internationaux', content: [
            {id: 'geo_four_1_1', title: 'Espaces majeurs de production et d\'échanges'},
            {id: 'geo_four_1_2', title: 'Échanges de marchandises'},
            {id: 'geo_four_1_3', title: 'Mobilités humaines'},
            {id: 'geo_four_1_4', title: 'Lieux de commandement'},
            {id: 'geo_four_1_5', title: 'Entreprises transnationales'}
        ]},
        {id: 'geo_four_2', title: 'Les territoires dans la mondialisation', content: [
            {id: 'geo_four_2_1', title: 'Les États-Unis'},
            {id: 'geo_four_2_2', title: 'Les puissances émergentes'},
            {id: 'geo_four_2_3', title: 'Les pays pauvres'}
        ]},
        {id: 'geo_four_3', title: 'Questions sur la mondialisation', content: [
            {id: 'geo_four_3_1', title: 'Mondialisation et diversité culturelle'},
            {id: 'geo_four_3_2', title: 'Mondialisation et ses contestations'}
        ]}
    ]},

    {id: 'geo_three', title: 'Géographie - Troisième', matter: {id: 'geo'}, level: {id: 'three'}, long_title: 'Géographie', content: [
        {id: 'geo_three_1', title: 'Habiter la France', content: [
            {id: 'geo_three_1_1', title: 'De la ville à l\'espace rural'},
            {id: 'geo_three_1_2', title: 'La région'},
            {id: 'geo_three_1_3', title: 'Le territoire national et sa population'}
        ]},
        {id: 'geo_three_2', title: 'Aménagement et développement du territoire français', content: [
            {id: 'geo_three_2_1', title: 'Les espaces productifs'},
            {id: 'geo_three_2_2', title: 'L\'organisation du territoire français'}
        ]},
        {id: 'geo_three_3', title: 'La France dans l\'Union européenne', content: [
            {id: 'geo_three_3_1', title: 'L\'UE, une union d\'États'},
            {id: 'geo_three_3_2', title: 'La France intégrée dans l\'UE'}
        ]},
        {id: 'geo_three_4', title: 'Le rôle mondial de la France et de l\'UE', content: [
            {id: 'geo_three_4_1', title: 'La France, une influence mondiale'},
            {id: 'geo_three_4_2', title: 'Réalités et limites de la puissance de l\'UE'}
        ]},
        {id: 'geo_three_5', title: 'Repères de fin de collège', content: [
            {id: 'geo_three_5_1', title: 'Dates importantes'},
            {id: 'geo_three_5_2', title: 'Notions importantes'},
            {id: 'geo_three_5_3', title: 'Repères géographiques indispensables'},
            {id: 'geo_three_5_4', title: 'Méthodologie du Brevet'}
        ]}
    ]},

    {id: 'hda_six', title: 'Histoire de l\'Art - Sixième', matter: {id: 'hda'}, level: {id: 'six'}, long_title: 'Histoire de l\'Art', content: [
        {id: 'hda_six_1', title: 'Arts, créations, culture', content: [
            {id: 'hda_six_1_1', title: 'Genèse des cultures'},
            {id: 'hda_six_1_2', title: 'Création et traditions'},
            {id: 'hda_six_1_3', title: 'Formes populaires de l\'Art'}
        ]},
        {id: 'hda_six_2', title: 'Arts, espace, temps', content: [
            {id: 'hda_six_2_1', title: 'Évocation du temps et de l\'espace'},
            {id: 'hda_six_2_2', title: 'Grandes figures du temps et de l\'espace'},
            {id: 'hda_six_2_3', title: 'Place du corps et de l\'homme dans le monde et la nature'}
        ]},
        {id: 'hda_six_3', title: 'Arts, États et pouvoir', content: [
            {id: 'hda_six_3_1', title: 'Art et pouvoir'},
            {id: 'hda_six_3_2', title: 'Art et État'},
            {id: 'hda_six_3_3', title: 'Art et mémoire'}
        ]},
        {id: 'hda_six_4', title: 'Arts, mythes et religion', content: [
            {id: 'hda_six_4_1', title: 'Art et mythe'},
            {id: 'hda_six_4_2', title: 'Art et sacré'},
            {id: 'hda_six_4_3', title: 'Grandes figures de l\'inspiration artistique en Occident'}
        ]},
        {id: 'hda_six_5', title: 'Arts, techniques, expressions', content: [
            {id: 'hda_six_5_1', title: 'Influence des techniques'},
            {id: 'hda_six_5_2', title: 'Technique, source d\'inspiration'},
            {id: 'hda_six_5_3', title: 'Grandes figures artistiques et techniques'},
            {id: 'hda_six_5_4', title: 'La prouesse technique'}
        ]},
        {id: 'hda_six_6', title: 'Arts, ruptures, continuités', content: [
            {id: 'hda_six_6_1', title: 'Tradition des œuvres d\'art'},
            {id: 'hda_six_6_2', title: 'Composition des œuvres d\'art'},
            {id: 'hda_six_6_3', title: 'Dialogue des arts'}
        ]}
    ]},

    {id: 'hda_five', title: 'Histoire de l\'Art - Cinquième', matter: {id: 'hda'}, level: {id: 'five'}, long_title: 'Histoire de l\'Art', content: [
        {id: 'hda_five_1', title: 'Arts, créations, culture', content: [
            {id: 'hda_five_1_1', title: 'Genèse des cultures'},
            {id: 'hda_five_1_2', title: 'Création et traditions'},
            {id: 'hda_five_1_3', title: 'Formes populaires de l\'Art'}
        ]},
        {id: 'hda_five_2', title: 'Arts, espace, temps', content: [
            {id: 'hda_five_2_1', title: 'Évocation du temps et de l\'espace'},
            {id: 'hda_five_2_2', title: 'Grandes figures du temps et de l\'espace'},
            {id: 'hda_five_2_3', title: 'Place du corps et de l\'homme dans le monde et la nature'}
        ]},
        {id: 'hda_five_3', title: 'Arts, États et pouvoir', content: [
            {id: 'hda_five_3_1', title: 'Art et pouvoir'},
            {id: 'hda_five_3_2', title: 'Art et État'},
            {id: 'hda_five_3_3', title: 'Art et mémoire'}
        ]},
        {id: 'hda_five_4', title: 'Arts, mythes et religion', content: [
            {id: 'hda_five_4_1', title: 'Art et mythe'},
            {id: 'hda_five_4_2', title: 'Art et sacré'},
            {id: 'hda_five_4_3', title: 'Grandes figures de l\'inspiration artistique en Occident'}
        ]},
        {id: 'hda_five_5', title: 'Arts, techniques, expressions', content: [
            {id: 'hda_five_5_1', title: 'Influence des techniques'},
            {id: 'hda_five_5_2', title: 'Technique, source d\'inspiration'},
            {id: 'hda_five_5_3', title: 'Grandes figures artistiques et techniques'},
            {id: 'hda_five_5_4', title: 'La prouesse technique'}
        ]},
        {id: 'hda_five_6', title: 'Arts, ruptures, continuités', content: [
            {id: 'hda_five_6_1', title: 'Tradition des œuvres d\'art'},
            {id: 'hda_five_6_2', title: 'Composition des œuvres d\'art'},
            {id: 'hda_five_6_3', title: 'Dialogue des arts'}
        ]}
    ]},

    {id: 'hda_four', title: 'Histoire de l\'Art - Quatrième', matter: {id: 'hda'}, level: {id: 'four'}, long_title: 'Histoire de l\'Art', content: [
        {id: 'hda_four_1', title: 'Arts, créations, culture', content: [
            {id: 'hda_four_1_1', title: 'Genèse des cultures'},
            {id: 'hda_four_1_2', title: 'Création et traditions'},
            {id: 'hda_four_1_3', title: 'Formes populaires de l\'Art'}
        ]},
        {id: 'hda_four_2', title: 'Arts, espace, temps', content: [
            {id: 'hda_four_2_1', title: 'Évocation du temps et de l\'espace'},
            {id: 'hda_four_2_2', title: 'Grandes figures du temps et de l\'espace'},
            {id: 'hda_four_2_3', title: 'Place du corps et de l\'homme dans le monde et la nature'}
        ]},
        {id: 'hda_four_3', title: 'Arts, États et pouvoir', content: [
            {id: 'hda_four_3_1', title: 'Art et pouvoir'},
            {id: 'hda_four_3_2', title: 'Art et État'},
            {id: 'hda_four_3_3', title: 'Art et mémoire'}
        ]},
        {id: 'hda_four_4', title: 'Arts, mythes et religion', content: [
            {id: 'hda_four_4_1', title: 'Art et mythe'},
            {id: 'hda_four_4_2', title: 'Art et sacré'},
            {id: 'hda_four_4_3', title: 'Grandes figures de l\'inspiration artistique en Occident'}
        ]},
        {id: 'hda_four_5', title: 'Arts, techniques, expressions', content: [
            {id: 'hda_four_5_1', title: 'Influence des techniques'},
            {id: 'hda_four_5_2', title: 'Technique, source d\'inspiration'},
            {id: 'hda_four_5_3', title: 'Grandes figures artistiques et techniques'},
            {id: 'hda_four_5_4', title: 'La prouesse technique'}
        ]},
        {id: 'hda_four_6', title: 'Arts, ruptures, continuités', content: [
            {id: 'hda_four_6_1', title: 'Tradition des œuvres d\'art'},
            {id: 'hda_four_6_2', title: 'Composition des œuvres d\'art'},
            {id: 'hda_four_6_3', title: 'Dialogue des arts'}
        ]}
    ]},

    {id: 'hda_three', title: 'Histoire de l\'Art - Troisième', matter: {id: 'hda'}, level: {id: 'three'}, long_title: 'Histoire de l\'Art', content: [
        {id: 'hda_three_1', title: 'Arts, créations, culture', content: [
            {id: 'hda_three_1_1', title: 'Genèse des cultures'},
            {id: 'hda_three_1_2', title: 'Création et traditions'},
            {id: 'hda_three_1_3', title: 'Formes populaires de l\'Art'}
        ]},
        {id: 'hda_three_2', title: 'Arts, espace, temps', content: [
            {id: 'hda_three_2_1', title: 'Évocation du temps et de l\'espace'},
            {id: 'hda_three_2_2', title: 'Grandes figures du temps et de l\'espace'},
            {id: 'hda_three_2_3', title: 'Place du corps et de l\'homme dans le monde et la nature'}
        ]},
        {id: 'hda_three_3', title: 'Arts, États et pouvoir', content: [
            {id: 'hda_three_3_1', title: 'Art et pouvoir'},
            {id: 'hda_three_3_2', title: 'Art et État'},
            {id: 'hda_three_3_3', title: 'Art et mémoire'}
        ]},
        {id: 'hda_three_4', title: 'Arts, mythes et religion', content: [
            {id: 'hda_three_4_1', title: 'Art et mythe'},
            {id: 'hda_three_4_2', title: 'Art et sacré'},
            {id: 'hda_three_4_3', title: 'Grandes figures de l\'inspiration artistique en Occident'}
        ]},
        {id: 'hda_three_5', title: 'Arts, techniques, expressions', content: [
            {id: 'hda_three_5_1', title: 'Influence des techniques'},
            {id: 'hda_three_5_2', title: 'Technique, source d\'inspiration'},
            {id: 'hda_three_5_3', title: 'Grandes figures artistiques et techniques'},
            {id: 'hda_three_5_4', title: 'La prouesse technique'}
        ]},
        {id: 'hda_three_6', title: 'Arts, ruptures, continuités', content: [
            {id: 'hda_three_6_1', title: 'Tradition des œuvres d\'art'},
            {id: 'hda_three_6_2', title: 'Composition des œuvres d\'art'},
            {id: 'hda_three_6_3', title: 'Dialogue des arts'}
        ]},
        {id: 'hda_three_7', title: 'Repères de fin de collège', content: [
            {id: 'hda_three_7_1', title: 'Dates importantes'},
            {id: 'hda_three_7_2', title: 'Notions importantes'},
            {id: 'hda_three_7_3', title: 'Grandes figures culturelles'},
            {id: 'hda_three_7_4', title: 'Œuvres immanquables'},
            {id: 'hda_three_7_5', title: 'Méthodologie du Brevet'}
        ]}
    ]},

    {id: 'eng_tt_colg', title: 'Anglais - Tout le collège', matter: {id: 'eng'}, level: {id: 'tt_colg'}, long_title: 'Anglais', content: [
        {id: 'eng_tt_colg_1', title: ' Compréhension orale', content: [
            {id: 'eng_tt_colg_1_1', title: 'Instructions et consignes'},
            {id: 'eng_tt_colg_1_2', title: 'Expressions usuelles'},
            {id: 'eng_tt_colg_1_3', title: 'Présentations'},
            {id: 'eng_tt_colg_1_4', title: 'Indications chiffrées'},
            {id: 'eng_tt_colg_1_5', title: 'Récits'}
        ]},
        {id: 'eng_tt_colg_2', title: 'Expression orale en continu', content: [
            {id: 'eng_tt_colg_2_1', title: 'Présentations'},
            {id: 'eng_tt_colg_2_2', title: 'Descriptions'},
            {id: 'eng_tt_colg_2_3', title: 'Récits'},
            {id: 'eng_tt_colg_2_4', title: 'Explications'}
        ]},
        {id: 'eng_tt_colg_3', title: 'Interaction orale', content: [
            {id: 'eng_tt_colg_3_1', title: 'Communication sociale'},
            {id: 'eng_tt_colg_3_2', title: 'Recherche d\'informations'},
            {id: 'eng_tt_colg_3_3', title: 'Dialogues'},
            {id: 'eng_tt_colg_3_4', title: 'Réactions à des propositions'}
        ]},
        {id: 'eng_tt_colg_4', title: 'Compréhension de l\'écrit', content: [
            {id: 'eng_tt_colg_4_1', title: 'Instructions et consignes'},
            {id: 'eng_tt_colg_4_2', title: 'Correspondance'},
            {id: 'eng_tt_colg_4_3', title: 'Textes informatif'},
            {id: 'eng_tt_colg_4_4', title: 'Textes de fiction'},
            {id: 'eng_tt_colg_4_5', title: 'Littérature enfantine'}
        ]},
        {id: 'eng_tt_colg_5', title: 'Expression écrite', content: [
            {id: 'eng_tt_colg_5_1', title: 'Influence des techniques'},
            {id: 'eng_tt_colg_5_2', title: 'Technique, source d\'inspiration'},
            {id: 'eng_tt_colg_5_3', title: 'Grandes figures artistiques et techniques'},
            {id: 'eng_tt_colg_5_4', title: 'La prouesse technique'}
        ]},
        {id: 'eng_tt_colg_6', title: 'Correspondance', content: [
            {id: 'eng_tt_colg_6_1', title: 'Portraits'},
            {id: 'eng_tt_colg_6_2', title: 'Descriptions'},
            {id: 'eng_tt_colg_6_3', title: 'Récits réels ou imaginaires'}
        ]},
        {id: 'eng_tt_colg_7', title: 'Compétences culturelles', content: [
            {id: 'eng_tt_colg_7_1', title: 'Différences linguistiques'},
            {id: 'eng_tt_colg_7_2', title: 'Codes socioculturels'},
            {id: 'eng_tt_colg_7_3', title: 'Mode de vie, usages, traditions'},
            {id: 'eng_tt_colg_7_4', title: 'Expression artistique'}
        ]},
        {id: 'eng_tt_colg_8', title: 'Compétences linguistiques', content: [
            {id: 'eng_tt_colg_8_1', title: 'Grammaire'},
            {id: 'eng_tt_colg_8_2', title: 'Lexique'}
        ]}
    ]},

    {id: 'edc_five', title: 'Éducation Civique - Cinquième', matter: {id: 'edc'}, level: {id: 'five'}, long_title: 'Éducation Civique', content: [
        {id: 'edc_five_1', title: 'Êtres humains, une seule humanité', content: [
            {id: 'edc_five_1_1', title: 'Différents mais égaux'},
            {id: 'edc_five_1_2', title: 'Identités multiples de la personne'}
        ]},
        {id: 'edc_five_2', title: 'Égalité, valeur en construction', content: [
            {id: 'edc_five_2_1', title: 'L\'Égalité, principe républicain'},
            {id: 'edc_five_2_2', title: 'La réduction des inégalités'}
        ]},
        {id: 'edc_five_3', title: 'Sécurité et risques majeurs', content: [
            {id: 'edc_five_3_1', title: 'Notion de risque'},
            {id: 'edc_five_3_2', title: 'Sécurité nationale et collective'},
            {id: 'edc_five_3_3', title: 'Risques majeurs'}
        ]},
        {id: 'edc_five_4', title: 'Une action solidaire', content: [
            {id: 'edc_five_4_1', title: 'Étude de cas'},
            {id: 'edc_five_4_2', title: 'Mise en œuvre d\'un projet'}
        ]}
    ]},

    {id: 'edc_four', title: 'Éducation Civique - Quatrième', matter: {id: 'edc'}, level: {id: 'four'}, long_title: 'Éducation Civique', content: [
        {id: 'edc_four_1', title: 'L\'exercice des libertés en France', content: [
            {id: 'edc_four_1_1', title: 'Libertés individuelles et collectives'},
            {id: 'edc_four_1_2', title: 'Usage des libertés et exigences sociales'}
        ]},
        {id: 'edc_four_2', title: 'Droit et justice en France', content: [
            {id: 'edc_four_2_1', title: 'Le Droit, code des relations humaines'},
            {id: 'edc_four_2_2', title: 'La Justice, garante du respect du Droit'},
            {id: 'edc_four_2_3', title: 'La Justice des mineurs'}
        ]},
        {id: 'edc_four_3', title: 'La sûreté, un droit de l\'Homme'
        }
    ]},

    {id: 'edc_three', title: 'Éducation Civique - Troisième', matter: {id: 'edc'}, level: {id: 'three'}, long_title: 'Éducation Civique', content: [
        {id: 'edc_three_1', title: 'La République et la citoyenneté', content: [
            {id: 'edc_three_1_1', title: 'Valeurs, principes et symboles de la République'},
            {id: 'edc_three_1_2', title: 'Nationalité et citoyennetés français et européenne'},
            {id: 'edc_three_1_2', title: 'Le droit de vote'}
        ]},
        {id: 'edc_three_2', title: 'La vie démocratique', content: [
            {id: 'edc_three_2_1', title: 'La vie politique'},
            {id: 'edc_three_2_2', title: 'La vie sociale'},
            {id: 'edc_three_2_3', title: 'L\'opinion publique et les médias'}
        ]},
        {id: 'edc_three_3', title: 'La défense et la paix', content: [
            {id: 'edc_three_3_1', title: 'La recherche collective de la paix'},
            {id: 'edc_three_3_2', title: 'La Défense et l\'action internationale de la France'}
        ]}
    ]},

    {id: 'svt_six', title:'SVT', matter: {id:'svt'}, level:{id:'six'}, long_title:'Sciences de la Vie et de la Terre', content:[
     {id: 'svt_six_1', title:'Environnement et répartition des êtres vivants', content:[
       {id: 'svt_six_1_1', title:'Composantes minérales'},
       {id: 'svt_six_1_2', title:'Organismes vivants et leurs restes'},
       {id: 'svt_six_1_3', title:'Manifestations de l\'activité humaine'}]},
     {id: 'svt_six_2', title:'Peuplement d\'un milieu', content:[
       {id: 'svt_six_2_1', title:'Occupation par les végétaux selon les saisons'},
       {id: 'svt_six_2_2', title:'Colonisation d\'un milieu par les végétaux'},
       {id: 'svt_six_2_3', title:'Peuplement animal selon les saisons'}]},
     {id: 'svt_six_3', title:'Origine de la matière des êtres vivants', content:[
       {id: 'svt_six_3_1', title:'Etres vivants produisent de la matière'},
       {id: 'svt_six_3_2', title:'Transformation de matière par les êtres vivants'}]},
     {id: 'svt_six_4', title:'Des pratiques au service de l\'alimentation humaine', content:[
       {id: 'svt_six_4_1', title:'Prod alimentaire par l\'élevage ou la culture'},
       {id: 'svt_six_4_2', title:'Prod alimentaire par transformation biologique'}]},
     {id: 'svt_six_5', title:'Diversité, parenté et unité des êtres vivants', content:[
       {id: 'svt_six_5_1', title:'Qu\'est-ce qu\'une espèce ?'},
       {id: 'svt_six_5_2', title:'Classification scientifique des êtres vivants'},
       {id: 'svt_six_5_3', title:'Etres vivants, composés de cellules'}]}]},

    {id: 'svt_five', title:'SVT', matter: {id:'svt'}, level:{id:'five'}, long_title:'Sciences de la Vie et de la Terre', content:[
       {id: 'svt_five_1', title:'Respiration et occupation des milieux de vie', content:[
         {id: 'svt_five_1_1', title:'Respirer dans des milieux de vie différents'},
         {id: 'svt_five_1_2', title:'Respiration et répartition des êtres vivants'}]},
       {id: 'svt_five_2', title:'Fonctionnement organisme / besoin en énergie', content:[
         {id: 'svt_five_2_1', title:'Les besoins des organes'},
         {id: 'svt_five_2_2', title:'La respiration'},
         {id: 'svt_five_2_3', title:'La digestion'},
         {id: 'svt_five_2_4', title:'L\'élimination des déchets'},
         {id: 'svt_five_2_5', title:'La circulation sanguine'}]},
       {id: 'svt_five_3', title:'Géologie externe : évolution des paysages', content:[
         {id: 'svt_five_3_1', title:'L\'action de l\'eau : l\'érosion'},
         {id: 'svt_five_3_2', title:'Roches sédimentaires et fossilisation'}]}]},

    {id: 'svt_four', title:'SVT', matter: {id:'svt'}, level:{id:'four'}, long_title:'Sciences de la Vie et de la Terre', content:[
     {id: 'svt_four_1', title:'Activité interne du globe terrestre', content:[
       {id: 'svt_four_1_1', title:'Les séismes'},
       {id: 'svt_four_1_2', title:'Le volcanisme'},
       {id: 'svt_four_1_3', title:'La tectonique des plaques'},
       {id: 'svt_four_1_4', title:'Les risques de l\'activité terrestre'}]},
     {id: 'svt_four_2', title:'Reproduction sexuée et maintien des espèces', content:[
       {id: 'svt_four_2_1', title:'Reproduction sexuée des êtres vivants'},
       {id: 'svt_four_2_2', title:'Reproduction sexuées et milieux de vie'}]},
     {id: 'svt_four_3', title:'Transmission de la vie chez l’Homme', content:[
       {id: 'svt_four_3_1', title:'Devenir homme, devenir femme'},
       {id: 'svt_four_3_2', title:'Formation d\'un nouvel être humain'},
       {id: 'svt_four_3_3', title:'Choisir ou non d\'avoir un enfant'}]},
     {id: 'svt_four_4', title:'Relations au sein de l\’organisme', content:[
       {id: 'svt_four_4_1', title:'Système nerveux et communication interne'},
       {id: 'svt_four_4_2', title:'Système nerveux et ses perturbations'},
       {id: 'svt_four_4_3', title:'Communication assurée par les hormones'}]}]},
    
    {id: 'svt_three', title:'SVT', matter: {id:'svt'}, level:{id:'three'}, long_title:'Sciences de la Vie et de la Terre', content:[
     {id: 'svt_three_1', title:'Diversité et unité des êtres humains', content:[
       {id: 'svt_three_1_1', title:'Supports de l\'hérédite'},
       {id: 'svt_three_1_2', title:'Reproduction sexuée et diversité génétique'}]},
     {id: 'svt_three_2', title:'Évolution êtres vivants / Histoire de la Terre', content:[
       {id: 'svt_three_2_1', title:'Rappels du collège'},
       {id: 'svt_three_2_2', title:'Comparaison de deux environnements'}]},
     {id: 'svt_three_3', title:'Risque infectieux / protection de l\'organisme', content:[
       {id: 'svt_three_3_1', title:'Contamination par les micro-organismes'},
       {id: 'svt_three_3_2', title:'Réactions immunitaires'}]},
     {id: 'svt_three_4', title:'Responsabilité humaine santé et environnement', content:[
       {id: 'svt_three_4_1', title:'Biodiversité, alimentation et activité humaine'},
       {id: 'svt_three_4_2', title:'Energies fossiles et énergies renouvelables'},
       {id: 'svt_three_4_3', title:'Risques de l\'activité humaine'},
       {id: 'svt_three_4_4', title:'Pollution des sols, de l\'eau et risques'},
       {id: 'svt_three_4_5', title:'Habitudes de vie et santé '},
       {id: 'svt_three_4_6', title:'Pratiques médicales pour sauver des vies'},
       {id: 'svt_three_4_7', title:'Maîtrise de la reproduction'},
       {id: 'svt_three_4_8', title:'Méthodologie'}]}]},
    
    {id: 'svt_two', title:'SVT', matter: {id:'svt'}, level:{id:'two'}, long_title:'Sciences de la Vie et de la Terre', content:[
     {id: 'svt_two_1', title:'La Terre, une planète habitée', content:[
       {id: 'svt_two_1_1', title:'Conditions de vie, particularité terrienne ?'},
       {id: 'svt_two_1_2', title:'La nature du vivant'},
       {id: 'svt_two_1_3', title:'La biodiversité, résultat/étape évolution'}]},
     {id: 'svt_two_2', title:'Enjeux planétaires contemporains', content:[
       {id: 'svt_two_2_1', title:'Le soleil : une source d\’énergie essentielle'},
       {id: 'svt_two_2_2', title:'Le sol : un patrimoine durable ?'}]},
     {id: 'svt_two_3', title:'Corps humain et santé, exercice physique', content:[
       {id: 'svt_two_3_1', title:'Des modifications physiologiques à l\’effort'},
       {id: 'svt_two_3_2', title:'Une boucle de régulation nerveuse'},
       {id: 'svt_two_3_3', title:'Activité physique et santé'}]},
     {id: 'svt_two_4', title:'Méthodologie', content:[
       {id: 'svt_two_4_1', title:'Préparation au Bac'}]}]},

    {id: 'svt_ps', title:'SVT', matter: {id:'svt'}, level:{id:'ps'}, long_title:'Sciences de la Vie et de la Terre', content:[
     {id: 'svt_ps_1', title:'Terre dans l\'Univers, évolution êtres vivants', content:[
       {id: 'svt_ps_1_1', title:'Le patrimoine génétique'},
       {id: 'svt_ps_1_2', title:'La tectonique des plaques'}]},
     {id: 'svt_ps_2', title:'Enjeux planétaires contemporains ', content:[
       {id: 'svt_ps_2_1', title:'Tectonique des plaques et géologie appliquée'},
       {id: 'svt_ps_2_2', title:'Nourrir l\’humanité'}]},
     {id: 'svt_ps_3', title:'Corps humain et santé', content:[
       {id: 'svt_ps_3_1', title:'Féminin, masculin'},
       {id: 'svt_ps_3_2', title:'Variation génétique et santé'},
       {id: 'svt_ps_3_3', title:'De l\’œil au cerveau : aspects de la vision'}]},
     {id: 'svt_ps_4', title:'Méthodologie', content:[
       {id: 'svt_ps_4_1', title:'Préparation au Bac'},
       {id: 'svt_ps_4_2', title:'TPE'}]}]},
    
    {id: 'svt_ts', title:'SVT', matter: {id:'svt'}, level:{id:'ts'}, long_title:'Sciences de la Vie et de la Terre', content:[
     {id: 'svt_ts_1', title:'Terre dans l\'Univers, évolution êtres vivants', content:[
       {id: 'svt_ts_1_1', title:'Génétique et évolution'},
       {id: 'svt_ts_1_2', title:'Le domaine continental et sa dynamique'},
       {id: 'svt_ts_1_3', title:'Énergie et cellule vivante (spé)'}]},
     {id: 'svt_ts_2', title:'Enjeux planétaires contemporains', content:[
       {id: 'svt_ts_2_1', title:'Géothermie et propriétés thermiques'},
       {id: 'svt_ts_2_2', title:'La plante domestiquée'},
       {id: 'svt_ts_2_3', title:'Atmosphère, hydrosphère, climats (spé)'}]},
     {id: 'svt_ts_3', title:'Corps humain et santé', content:[
       {id: 'svt_ts_3_1', title:'Aspects de la réaction immunitaire'},
       {id: 'svt_ts_3_2', title:'Neurone/fibre musculaire : com. nerveuse'},
       {id: 'svt_ts_3_3', title:'Glycémie et diabète (spé)'}]},
     {id: 'svt_ts_4', title:'Méthodologie', content:[
       {id: 'svt_ts_4_1', title:'Les projets personnels encadrés (PPE)'},
       {id: 'svt_ts_4_2', title:'L\'épreuve du bac'}
      ]}
    ]}


 ];

  // On populate l'anglais pour les autres levels...
  this.categories.push({id: 'eng_tl', title: 'Anglais',
    matter: {id: 'eng'}, level: {id: 'tl'},
    content: this.categories[0].content
  });

  this.categories.push({id: 'eng_tt_tles', title: 'Anglais',
    matter: {id: 'eng'}, level: {id: 'tt_tles'},
    content: this.categories[0].content
  });

  this.categories.push({id: 'eng_ts', title: 'Anglais',
    matter: {id: 'eng'}, level: {id: 'ts'},
    content: this.categories[0].content
  });

  this.categories.push({id: 'eng_tes', title: 'Anglais',
    matter: {id: 'eng'}, level: {id: 'tes'},
    content: this.categories[0].content
  });

  this.categories.push({id: 'eng_tt_prem', title: 'Anglais',
    matter: {id: 'eng'}, level: {id: 'tt_prem'},
    content: this.categories[0].content
  });

  this.categories.push({id: 'eng_ps', title: 'Anglais',
    matter: {id: 'eng'}, level: {id: 'ps'},
    content: this.categories[0].content
  });

  this.categories.push({id: 'eng_pes', title: 'Anglais',
    matter: {id: 'eng'}, level: {id: 'pes'},
    content: this.categories[0].content
  });

  this.categories.push({id: 'eng_pl', title: 'Anglais',
    matter: {id: 'eng'}, level: {id: 'pl'},
    content: this.categories[0].content
  });

  // On populate l'histoire pour les autres levels
  this.categories.push({id: 'his_ps', title: 'Histoire - première S',
    matter: {id: 'his'}, level: {id: 'ps'},
    long_title: 'Questions pour comprendre le 20e siècle',
    content: this.categories[1].content
  });

  this.categories.push({id: 'his_pes', title: 'Histoire - première ES',
    matter: {id: 'his'}, level: {id: 'pes'},
    long_title: 'Questions pour comprendre le 20e siècle',
    content: this.categories[1].content
  });

  this.categories.push({id: 'his_pl', title: 'Histoire - première L',
    matter: {id: 'his'}, level: {id: 'pl'},
    long_title: 'Questions pour comprendre le 20e siècle',
    content: this.categories[1].content
  });

  // On populate la géo pour les autres levels
  this.categories.push({id: 'geo_ps', title: 'Géographie - première S',
    matter: {id: 'geo'}, level: {id: 'ps'},
    long_title: 'France et Europe : dynamiques des territoires dans la mondialisation',
    content: this.categories[2].content
  });

  this.categories.push({id: 'geo_pes', title: 'Géographie - première ES',
    matter: {id: 'geo'}, level: {id: 'pes'},
    long_title: 'France et Europe : dynamiques des territoires dans la mondialisation',
    content: this.categories[2].content
  });

  this.categories.push({id: 'geo_pl', title: 'Géographie - première S',
    matter: {id: 'geo'}, level: {id: 'pl'},
    long_title: 'France et Europe : dynamiques des territoires dans la mondialisation',
    content: this.categories[2].content
  });

  this.categories.push({id: 'mat_pl ', title: 'Mathématiques - première L',
    matter: {id: 'mat'}, level: {id: 'pl'},
    content: this.categories[3].content
  });
});
