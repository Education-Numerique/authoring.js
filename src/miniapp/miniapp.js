console.warn("bienvenue dans miniapp !!!");
// UP TO YOU


//throw "stop here for now";

/**
 * Récupérer les utilisateurs ....

LxxlLib.service.user.list(function(d) {
  var content = "";
  d.forEach(function(item) {
    var user = new LxxlLib.model.User(item);
    content += user.email +'<br />';
  });
  $("#blabla").html(content);
}, function(){
  console.error("ARRRGGGG");
});
*/

/* */
LxxlLib.service.activities.list(function(d) {
  d.forEach(function(item) {
    var act = LxxlLib.factories.activities.getActivity(item);
    console.warn(act.draft.title);
  });
}, function(){
  console.error("ARRRGGGG");
});


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

/**  récupérer une activité 

var acti = LxxlLib.factories.activities.getById('517757c83361eb192e9c67b8');
acti.pull(function(){ // -> une fois que l'objet sera mis à jour par le retour réseau de pull
  console.warn(acti.draft.title);
});
*/

/**
 * Access metadata -> Regarder dans src/lxxl/data.js pour le détail sur la nature de ces objets

var discs = LxxlLib.factories.metadata.discipline;
var content = "";
for (ii=0;ii<discs.length;ii++){
  content += discs[ii].title + "<br />";
}
content = decodeURIComponent(escape(content));
$("#blabla").html(content);
*/

// OK get categories
var categ = LxxlLib.factories.metadata.getTreeFor('*', '*');
console.warn(categ);
var content = "";
for (ii=0;ii<categ.length;ii++){
  content += categ[ii].id + "<br />";
}
content = decodeURIComponent(escape(content));
//$("#blabla").html(content); // On affiche pas ...

//LxxlLib.factories.metadata.lengths;
//LxxlLib.factories.metadata.difficulties;
//LxxlLib.factories.metadata.flavors;
//LxxlLib.factories.metadata.matters;
//LxxlLib.factories.metadata.discipline; // = matters
//LxxlLib.factories.metadata.levels;
//LxxlLib.factories.metadata.categories;
//    { id: 'eng_tt_lycee', title: 'Anglais', matter: {id: 'eng'}, level: {id: 'tt_lycee'}, content: [

