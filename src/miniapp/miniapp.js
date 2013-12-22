// UP TO YOU

//jsBoot.controllers.application.login("viapanda@gmail.com", "XXXXX", true);
// jsBoot.controllers.application.login("jb@touchard.org", "gabuzomeux", true);
//throw "stop here for now";

/**
 * Comment récupérer les utilisateurs?

LxxlLib.service.user.list(function(d) {
  d.forEach(function(item) {
    var user = new LxxlLib.model.User(item);
    console.warn(user.uid);
  });
}, function(){
  console.error("ARRRGGGG");
});


LxxlLib.service.activities.list(function(d) {
  d.forEach(function(item) {
    var act = LxxlLib.factories.activities.getActivity(item);
    console.warn(act.id);
  });
}, function(){
  console.error("ARRRGGGG");
});
*/

/*
LxxlLib.service.activities.list(function(d){
  d.forEach(function(item) {
    var act = LxxlLib.factories.activities.getActivity(item);
    if (act.isPublished) {
      console.warn(act.id)
    }
  },

});
*/
/*

 * Comment récupérer une activité 

//var acti = LxxlLib.factories.activities.getById('517757c83361eb192e9c67b8');
var acti = LxxlLib.service.activities.getById('517757c83361eb192e9c67b8');
acti.pull(function(){
  // -> une fois que l'objet sera mis à jour par le retour réseau de pull
  console.warn(acti.draft.title);
});
*/

/**
 * Access metadata -> Regarder dans model.js pour le détail sur la nature de ces objets
 */
var discs = LxxlLib.factories.metadata.discipline;
var content = "";
for (ii=0;ii<discs.length;ii++){
  content += discs[ii].title + "<br />";
}
content = decodeURIComponent(escape(content));
$("#blabla").html(content);

//LxxlLib.factories.metadata.flavors;
//LxxlLib.factories.metadata.lengths;
//LxxlLib.factories.metadata.levels;
//LxxlLib.factories.metadata.matters;


/**
 * Pour chaque type d'objet, voir ensuite model.js pour les différentes propriétés
 */