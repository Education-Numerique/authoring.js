
var activ_title;

var a = LxxlLib.factories.activities.getActivity({id: "5149a1183361eb5bc6911903"});
a.pull(function(){ // callback après que le pull soit fait...
	activ_title = a.draft.title;
});

console.log (activ_title);


