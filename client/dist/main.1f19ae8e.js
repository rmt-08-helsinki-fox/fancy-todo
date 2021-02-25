// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

$(document).ready(function () {
  auth();
  $('#form_register').on("submit", function (e) {
    e.preventDefault();
    register();
  });
  $('#form_login').on("submit", function (e) {
    e.preventDefault();
    login();
  });
  $('#logout').click(function () {
    logout();
  });
  $('#form_Add').on("submit", function (e) {
    e.preventDefault();
    addtodo();
  });
  $('#form_Edit').on("submit", function (e) {
    e.preventDefault();
    edittodo();
  });
  $('#form_EditStatus').on("submit", function (e) {
    e.preventDefault();
    editStatusPatch();
  });
  $('#triggerForm_addTodo').click(function () {
    formtodo();
  });
  $('#cancelAdd').click(function (e) {
    e.preventDefault();
    auth();
  });
  $('#cancelEdit').click(function (e) {
    e.preventDefault();
    auth();
  });
  $('#cancelEditStatus').click(function (e) {
    e.preventDefault();
    auth();
  });
  $('#LoginPage').click(function () {
    $('#form_login').show();
    $('#form_register').hide();
  });
  $('#RegisterPage').click(function () {
    $('#form_login').hide();
    $('#form_register').show();
  });
  $('#delete').click(function () {
    console.log('asd'); // deleteTodo(id)
  });
});
var base_url = "http://localhost:3000/";

function auth() {
  $('#clearfindTodo').remove();
  $('#welcoming').text(localStorage.getItem('email'));

  if (!localStorage.getItem('access_token')) {
    $('#welcoming').hide();
    $('#form_login').show();
    $('#form_register').hide();
    $('#home').hide();
    $('#todoList').hide();
    $('#form_Add').hide();
    $('#form_Edit').hide();
    $('#LoginPage').show();
    $('#RegisterPage').show();
    $('#form_EditStatus').hide();
  } else {
    findAllTodo();
    $('#welcoming').show();
    $('#form_login').hide();
    $('#form_register').hide();
    $('#home').show();
    $('#todoList').show();
    $('#form_Add').hide();
    $('#form_Edit').hide();
    $('#form_EditStatus').hide();
    $('#LoginPage').hide();
    $('#RegisterPage').hide();
    $('#form_EditStatus').hide();
    $('#triggerForm_addTodo').show();
  }
}

function login() {
  $.ajax({
    url: base_url + "users/signin",
    method: 'post',
    data: {
      email: $('#email').val(),
      password: $('#password').val()
    }
  }).done(function (response) {
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('email', $('#email').val());
    $('#email').val('');
    $('#password').val('');
    auth();
  }).fail(function (err) {
    console.log(err, "ini error");
  });
}

function logout() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.clear();
  auth();
}

function findAllTodo() {
  $.ajax({
    url: base_url + "todos",
    method: 'get',
    headers: {
      token: localStorage.getItem('access_token')
    }
  }).done(function (data) {
    console.log(data.data);

    var _iterator = _createForOfIteratorHelper(data.data),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var i = _step.value;
        $('#todoList').append("\n                <tr id='clearfindTodo'>\n                    <th>".concat(i.title, "</th>\n                    <th>").concat(i.description, "</th>\n                    <th>").concat(i.status, "</th>\n                    <th>").concat(i.due_date.slice(0, 10), "</th>\n                    <th>\n                        <a href=\"#\" onclick=\"deleteTodo(").concat(i.id, ")\">Delete</a>\n                        <a href=\"#\" onclick=\"editAll(").concat(i.id, ")\">EditAll</a>\n                        <a href=\"#\" onclick=\"editStatus(").concat(i.id, ")\">EditStatus</a>\n                    </th>\n                </tr>\n            "));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }).fail(function (err) {
    console.log(err);
  });
}

function formtodo() {
  $('#clearfindTodo').remove();
  $('#triggerForm_addTodo').hide();
  $('#todoList').hide();
  $('#form_Add').show();
}

function addtodo() {
  console.log('masuk add');
  $.ajax({
    url: base_url + "todos",
    method: 'post',
    headers: {
      token: localStorage.getItem('access_token')
    },
    data: {
      title: $('#title').val(),
      description: $('#description').val(),
      status: $('#status').val(),
      due_date: $('#due_date').val()
    }
  }).done(function (success) {
    $('#title').val('');
    $('#description').val('');
    $('#status').val('');
    $('#due_date').val('');
    auth();
  }).fail(function (err) {
    console.log(err);
  });
}

function deleteTodo(id) {
  $('#clearfindTodo').remove();
  console.log(base_url + "todos/" + id);
  $.ajax({
    url: base_url + "todos/" + id,
    method: "delete",
    headers: {
      token: localStorage.getItem('access_token')
    }
  }).done(function (success) {
    console.log('berhasil hapus');
    auth();
  }).fail(function (err) {
    console.log(err, 'tidak berhasil delete');
  });
}

function editAll(id) {
  console.log(id, 'ini id edit ya anjenk');
  $.ajax({
    url: base_url + "todos/" + id,
    method: "get",
    headers: {
      token: localStorage.getItem('access_token')
    }
  }).done(function (success) {
    console.log(success);
    $('#titleEdit').val(success.title);
    $('#descriptionEdit').val(success.description);
    $('#statusEdit select').val(success.status);
    $('#due_dateEdit').val(success.due_date.slice(0, 10));
    localStorage.setItem('idTodoEdit', success.id);
  }).fail(function (err) {
    console.log(err);
  });
  $('#clearfindTodo').remove();
  $('#triggerForm_addTodo').hide();
  $('#todoList').hide();
  $('#form_Edit').show();
}

function edittodo() {
  console.log('ini trigger edit');
  $.ajax({
    url: base_url + "todos/" + localStorage.getItem('idTodoEdit'),
    method: 'put',
    headers: {
      token: localStorage.getItem('access_token')
    },
    data: {
      title: $('#titleEdit').val(),
      description: $('#descriptionEdit').val(),
      status: $('#statusEdit').val(),
      due_date: $('#due_dateEdit').val()
    }
  }).done(function (success) {
    console.log(success);
    auth();
  }).fail(function (err) {
    console.log(err);
  });
  localStorage.removeItem('idTodoEdit');
}

function editStatus(id) {
  console.log('ini edit Status');
  $.ajax({
    url: base_url + "todos/" + id,
    method: "get",
    headers: {
      token: localStorage.getItem('access_token')
    }
  }).done(function (success) {
    $('#statusEditing select').val(success.status);
    $('#EditStatusTitle').text(success.title);
    localStorage.setItem('idTodoEdit', success.id);
  }).fail(function (err) {
    console.log(err);
  });
  $('#clearfindTodo').remove();
  $('#triggerForm_addTodo').hide();
  $('#todoList').hide();
  $('#form_EditStatus').show();
}

function editStatusPatch() {
  $.ajax({
    url: base_url + "todos/" + localStorage.getItem('idTodoEdit'),
    method: 'patch',
    headers: {
      token: localStorage.getItem('access_token')
    },
    data: {
      status: $('#statusEditing').val()
    }
  }).done(function (success) {
    console.log(success);
    auth();
  }).fail(function (err) {
    console.log(err);
  });
  localStorage.removeItem('idTodoEdit');
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: base_url + 'users/googlesignin',
    method: 'post',
    data: {
      googleToken: id_token
    }
  }).done(function (response) {
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('email', $('#email').val());
    $('#email').val('');
    $('#password').val('');
    auth();
  }).fail(function (err) {
    console.log(err, "ini error");
  });
}

function onSignUp(googleUser) {
  console.log('ini google SignUp');
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: base_url + 'users/googlesignup',
    method: 'post',
    data: {
      googleToken: id_token
    }
  }).done(function (response) {
    localStorage.clear();
    auth(); // console.log(JSON.stringify(response))
  }).fail(function (err) {
    console.log(err);
  });
}

function register() {
  console.log('ini register');
  $.ajax({
    url: base_url + 'users/signup',
    method: 'post',
    data: {
      email: $('#emailRegister').val(),
      password: $('#passwordRegister').val()
    }
  }).done(function (success) {
    localStorage.clear();
    auth();
  }).fail(function (err) {
    console.log(err);
  });
  $('#emailRegister').val('');
  $('#passwordRegister').val('');
  $('#email').val('');
  $('#password').val('');
}
},{}],"../../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "1785" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map