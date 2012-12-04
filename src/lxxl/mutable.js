// Simple polymorph mutable object on top of EventDispatcher
// Whether or not in Ember context, will behave seemlessly
/*jshint newcap:false*/
// jsBoot.use('jsBoot.types.EventDispatcher').as('dispatcher');
// jsBoot.pack('jsBoot.types', function(api) {
//   /*global Ember*/
//   'use strict';

//   this.Mutable = function() {
//     if (typeof Ember != 'undefined') {
//       var em = new Ember.Object();
//       for (var i in em) {
//         if (i != 'constructor' && i != 'set')
//           this[i] = em[i];
//       }
//     }
//     api.dispatcher.apply(this);
//   };

//   Object.keys(api.dispatcher.prototype).forEach(function(x) {
//     this.Mutable.prototype[x] = api.dispatcher.prototype[x];
//   }, this);

//   this.Mutable.prototype.set = function(key, value) {
//     if (value == this[key])
//       return;
//     var ov = this[key];
//     this.dispatchEvent(this.CHANGE, {key: key, oldValue: ov, newValue: value});
//     if (typeof Ember != 'undefined')
//       Ember.set(this, key, value);
//     else
//       this[key] = value;
//   };
// });



// A simple helper to make for simple (chained) heritage
jsBoot.pack('jsBoot.types', function() {
  'use strict';
  this.utils = {
    makeClass: function() {
      var args = Array.prototype.slice.call(arguments).reverse();
      var classing = function() {
        var localArgs = arguments;
        args.forEach(function(parentClass) {
          if (parentClass.apply)
            parentClass.apply(this, localArgs);
          else
            Object.keys(parentClass).forEach(function(i) {
              this[i] = parentClass[i];
            }, this);
        }, this);
      };
      args.forEach(function(parentClass) {
        if (parentClass.prototype)
          Object.keys(parentClass.prototype).forEach(function(i) {
            classing.prototype[i] = parentClass.prototype[i];
          });
      });
      return classing;
    }
  };
});

// Simple TypedMutable for collections that DOESNT DISPATCH WITHOUT EMBER BEWARE!!!!!
jsBoot.use('jsBoot.types.EventDispatcher').as('dispatcher');
jsBoot.pack('jsBoot.types', function(api) {
  'use strict';
  this.ArrayMutable = function(subType, initialMesh) {
    var f = [];

    // Still work without Ember
    if (!('replace' in f))
      f.replace = f.splice;
    if (!('pushObject' in f))
      f.pushObject = f.push;

    Object.keys(api.dispatcher.prototype).forEach(function(item) {
      this[item] = api.dispatcher.prototype[item];
    }, f);
    api.dispatcher.apply(f);

    f.fromObject = function(mesh) {
      f.replace(0, f.length);
      mesh.forEach(function(item, idx) {
        if (subType && !subType.isDirty && (subType.constructor == Function)) {
          this.pushObject(new subType(item, idx));
        }else{
          this.pushObject(subType ? subType(item, idx) : item);
        }
      }, f);
    };

    f.toObject = function() {
      return this.map(function(item) {
        return ((typeof item == 'object') && ('toObject' in item)) ? item.toObject() : item;
      });
    };

    if (initialMesh)
      f.fromObject(initialMesh);
    return f;
  };
  this.ArrayMutable.isMutable = true;
});

// A simple extension to Mutables that is meshable and supports a descriptor initializer
// Has accessors for complex subtypes as to reduce hard ref linkage
jsBoot.use('jsBoot.types.Mutable').as('mutable');
jsBoot.pack('jsBoot.types', function(api) {
  'use strict';

  this.TypedMutable = function(descriptor, initialMesh) {
    api.mutable.apply(this);

    this.isMutable = true;

    Object.keys(api.mutable.prototype).forEach(function(x) {
      this[x] = api.mutable.prototype[x];
    }, this);

    var privatePool = {};
    var lastMesh = {};

    Object.keys(descriptor).forEach(function(i) {
      var item = descriptor[i];
      switch (typeof item) {
        case 'number':
          this[i] = parseInt(item, 10);
          break;
        case 'boolean':
          // XXX ??? wtf 'true'
          this[i] = (item === true);
          break;
        case 'string':
          this[i] = '' + ((item !== null) ? item : '');
          break;
        case 'object':
          // May be null, an array, or an object-object
          this[i] = item;
          break;
        case 'function':
          Object.defineProperty(this, i, {
            enumerable: true,
            configurable: true,
            get: function() {
              // XXX super dirty and dangerous - cause of the bind
              // Verify this in IE and other non-bindable browsers
              if (item.isDirty || item.constructor != Function)
                return item(lastMesh[i]);
              else {
                if (typeof privatePool[i] == 'undefined') {
                  privatePool[i] = new item(lastMesh[i] || null);
                }
                return privatePool[i];
              }
            },
            set: function(value) {
              privatePool[i] = value;
              // XXX dirty trix to let polymorph descriptors do whatever job need be be done
              if (item.isDirty)
                privatePool[i] = item(value);
            }
          });
          break;
      }
    }, this);

    var t = this.destroy;
    this.destroy = function() {
      t.apply(this);
      privatePool = {};
      lastMesh = {};
      Object.keys(descriptor).forEach(function(i) {
        var item = descriptor[i];
        switch (typeof item) {
          case 'number':
            this[i] = parseInt(item, 10);
            break;
          case 'boolean':
            this[i] = (item === true);
            break;
          case 'string':
            this[i] = '' + item;
            break;
          case 'object':
            // May be null, an array, or an object-object
            this[i] = item;
            break;
        }
      });
    };

    this.toObject = function() {
      var ret = {};
      Object.keys(descriptor).forEach(function(i) {
        ret[i] = (!!this[i] && (typeof this[i] == 'object') && ('toObject' in this[i])) ? this[i].toObject() : this[i];
      }, this);
      return ret;
    };

    this.fromObject = function(networkMesh) {
      if (typeof networkMesh != 'object')
        networkMesh = {id: networkMesh};
      Object.keys(networkMesh).forEach(function(i) {
        if (!(i in descriptor))
          return;
        var item = networkMesh[i];
        switch (typeof descriptor[i]) {
          case 'number':
            this.set(i, parseInt(item, 10));
            break;
          case 'boolean':
            this.set(i, (item == 'true'));
            break;
          case 'string':
            this.set(i, '' + ((item !== null) ? item : ''));
            break;
          case 'object':
            // May be null, an array, or an object-object
            this.set(i, item);
            break;
          case 'function':
            if (typeof privatePool[i] != 'undefined') {
              if (descriptor[i].constructor == Function) {
                if (!!privatePool[i]) {
                  privatePool[i].fromObject(networkMesh[i]);
                }else {
                  lastMesh[i] = networkMesh[i];
                }
              }else
                this.set(i, descriptor[i](networkMesh[i]));
            }else
              // Merge and override lastMesh otherwise, to be used for later construction
              lastMesh[i] = networkMesh[i];


            // if(typeof privatePool[i] != 'undefined')
            //   if('fromObject' in privatePool[i])
            //     privatePool[i].fromObject(networkMesh[i]);
            //   else
            //     this.set(i, descriptor[i](networkMesh[i]));
            // else
            //   // Merge and override lastMesh otherwise, to be used for later construction
            //   lastMesh[i] = networkMesh[i];
            break;
          default:
            this.set(i, item);
            throw new Error('UNTYPED_MESH', 'Mesh is not typed properly ' + i + ' ' + descriptor[i] + ' ' + item);
        }
      }, this);
    };

    if (initialMesh)
      this.fromObject(initialMesh);
  };

});

jsBoot.use('jsBoot.types.TypedMutable').as('mutable');
jsBoot.pack('jsBoot.types', function(api) {
  'use strict';
  this.getPooledMutable = function(descriptor) {
    var inner = api.mutable.bind({}, descriptor);
    var pool = {};
    return function(initialMesh) {
      if (!initialMesh || !('id' in initialMesh))
        return null;
      if (!(initialMesh.id in pool)) {
        pool[initialMesh.id] = new inner(initialMesh);
      }else {
        pool[initialMesh.id].fromObject(initialMesh);
      }
      return pool[initialMesh.id];
    };
  };
});
