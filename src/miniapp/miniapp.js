// UP TO YOU

jsBoot.controllers.application.login("viapanda@gmail.com", "XXXXX", true);


throw "stop here for now";

/**
 * Comment récupérer les utilisateurs?
 */

LxxlLib.service.user.list(function(d) {
  d.forEach(function(item) {
    var user = new LxxlLib.model.User(item);
    console.warn(user.uid);
  });
}, function(){});


/**
 * Comment récupérer une activité 
 */

var acti = LxxlLib.factories.activities.getById('517757c83361eb192e9c67b8');
acti.pull();
acti.draft.title;


/**
 * Access metadata -> Regarder dans model.js pour le détail sur la nature de ces objets
 */

LxxlLib.factories.metadata.difficulties;
LxxlLib.factories.metadata.discipline;
LxxlLib.factories.metadata.flavors;
LxxlLib.factories.metadata.lengths;
LxxlLib.factories.metadata.levels;
LxxlLib.factories.metadata.matters;


/**
 * Pour chaque type d'objet, voir ensuite model.js pour les différentes propriétés
 */