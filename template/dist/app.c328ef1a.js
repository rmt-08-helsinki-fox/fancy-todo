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
})({"app.js":[function(require,module,exports) {
// let baseUrl = 'https://fancy-todo-hacktiv8-indo.herokuapp.com'
var baseUrl = 'http://localhost:3000';
var user_name;
var email;
$(document).ready(function () {
  console.log('ready');
  defaultLogout();

  if (localStorage.getItem('token')) {
    Auth();
  }
});

function defaultLogout() {
  $("#loginForm").show();
  $("#registerForm").hide();
  $("#profile").hide();
  $("#todoSegment").hide();
  $("#brewery").hide();
  $("#todos").empty();
  $("#loginError").hide();
  $("#registerError").hide();
  $("#addTodoForm").hide();
  $("#addTodoError").hide();
  $("#editTodoForm").hide();
  $("#editTodoError").hide();
}

function homepage() {
  $("#loginForm").hide();
  $("#registerForm").hide();
  $("#profileMessage").text("Welcome, ".concat(user_name));
  $("#profile").show();
  $("#toHome").hide();
  $("#toBrewery").show();
  getTodos();
  $("#addTodoForm").hide();
  $("#addTodoError").hide();
  $("#editTodoForm").hide();
  $("#editTodoError").hide();
  $("#todoSegment").show();
  $("#brewery").hide();
  $("#cancelEditTodo").click(function (e) {
    e.preventDefault();
    homepage();
  });
  $("#cancelAddTodo").click(function (e) {
    e.preventDefault();
    homepage();
  });
}

function Auth() {
  var token = localStorage.getItem('token');
  $.ajax({
    url: baseUrl + '/auth',
    method: "GET",
    headers: {
      token: localStorage.getItem('token')
    }
  }).then(function (result) {
    // console.log('auth berhasil')
    // console.log(result)
    user_name = result.name;
    email = result.email; // redirect to homepage

    homepage();
  }).catch(function (err) {
    console.log(err);
  });
}

$("#toRegister").click(function (e) {
  e.preventDefault();
  $("#loginForm").hide();
  $("#registerForm").show();
});
$("#toLogin").click(function (e) {
  e.preventDefault();
  $("#loginForm").show();
  $("#registerForm").hide();
});
$("#login").click(function (e) {
  e.preventDefault();
  login($("#loginEmail").val(), $("#loginPassword").val());
});
$("#register").click(function (e) {
  e.preventDefault();
  $.ajax({
    url: baseUrl + '/register',
    method: 'POST',
    data: {
      name: $("#registerName").val(),
      email: $("#registerEmail").val(),
      password: $("#registerPassword").val()
    }
  }).done(function (result) {
    $("#loginForm").show();
    $("#registerForm").hide();
  }).fail(function (xhr, err) {
    // console.log(xhr.responseJSON.message)
    $("#registerErrorMessage").text(xhr.responseJSON ? xhr.responseJSON.message : 'No Connection');
    $("#registerError").show();
  });
});
$("#logout").click(function (e) {
  e.preventDefault();
  logout();
});

function login(email, password) {
  console.log('loging in');
  $.ajax({
    url: baseUrl + '/login',
    method: "POST",
    data: {
      email: email,
      password: password
    }
  }).done(function (result) {
    // console.log(result)
    localStorage.setItem('token', result.token);
    user_name = result.name;
    homepage(); // Auth()
  }).fail(function (xhr, err) {
    $("#loginErrorMessage").text(xhr.responseJSON ? xhr.responseJSON.message : 'No Connection');
    $("#loginError").show();
  });
}

function logout() {
  localStorage.removeItem('token');
  user_name = '';
  email = '';
  $("#loginEmail").val('');
  $("#loginPassword").val('');
  signOut();
  defaultLogout();
}

function getTodos() {
  // e.preventDefault()
  $.ajax({
    url: baseUrl + "/todos",
    method: 'GET',
    headers: {
      token: localStorage.getItem("token")
    }
  }).done(function (result) {
    $("#todoSegment").show();
    $("#todos").empty();
    result.forEach(function (todo) {
      $("#todos").append("\n                <div class=\"card\">\n                    <div class=\"content\">\n                    <img class=\"right floated mini ui image\" src=\"https://semantic-ui.com/images/avatar/large/elliot.jpg\">\n                    <div class=\"header\">\n                        ".concat(todo.title, "\n                    </div>\n                    <div class=\"meta\">\n                        ").concat(todo.due_date, "\n                    </div>\n                    <div class=\"description\" style=\"margin-top:20px;\">\n                        ").concat(todo.description, "\n                    </div>\n                    <div class=\"ui label\" style=\"margin-top:10px;\">\n                        <b>").concat(todo.status ? 'Completed' : 'On Progress', "</b>\n                    </div>\n                    </div>\n                    <div class=\"extra content\">\n                    <div class=\"ui three buttons\">\n                        <div class=\"ui basic green button completeTodo\" data-value=\"").concat(todo.id, "\">Complete</div>\n                        <div class=\"ui basic grey button editTodo\" data-value=\"").concat(todo.id, "\">Edit</div>\n                        <div class=\"ui basic red button deleteTodo\" data-value=\"").concat(todo.id, "\">Delete</div>\n                    </div>\n                    </div>\n                </div>\n            "));
    });
    $(".completeTodo").on('click', function (e) {
      // console.log($(this).data('value'))
      // console.log(e.target.dataset.value)
      var id = e.target.dataset.value;
      completeTodo(id);
    });
    $(".deleteTodo").on('click', function (e) {
      var id = e.target.dataset.value;
      deleteTodo(id);
    });
    $(".editTodo").on('click', function (e) {
      var id = e.target.dataset.value;
      $("#editTodo").data('value', id);
      $.ajax({
        url: baseUrl + "/todos/".concat(id),
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      }).done(function (result) {
        console.log(result);
        var title = result.title,
            description = result.description,
            due_date = result.due_date;
        $("#editTodoTitle").val(title);
        $("#editTodoDescription").val(description);
        $("#editTodoDuedate").val(due_date.split('T')[0]);
      }).fail(function (xhr, err) {
        $("#editTodoErrorMessage").text(xhr.responseJSON ? xhr.responseJSON.message : 'No Connection');
        $("#editTodoError").show();
      });
      $("#editTodoForm").show();
      $("#todoSegment").hide();
    });
  }).fail(function (xhr, err) {
    console.log(err);
  });
}

$("#toAddTodo").click(function (e) {
  e.preventDefault();
  $("#addTodoForm").show();
  $("#todoSegment").hide();
});
$("#addTodo").click(function (e) {
  e.preventDefault();
  var newAddTodo = {
    title: $("#addTodoTitle").val(),
    description: $("#addTodoDescription").val(),
    due_date: $("#addTodoDuedate").val()
  };
  console.log(newAddTodo);
  $.ajax({
    url: baseUrl + '/todos',
    method: 'POST',
    headers: {
      token: localStorage.getItem('token')
    },
    data: newAddTodo
  }).done(function (result) {
    homepage();
  }).fail(function (xhr, err) {
    $("#addTodoErrorMessage").text(xhr.responseJSON ? xhr.responseJSON.message : 'No Connection');
    $("#addTodoError").show();
  });
});

function completeTodo(id) {
  $.ajax({
    url: baseUrl + "/todos/".concat(id),
    method: 'PATCH',
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      status: true
    }
  }).done(function (result) {
    homepage();
  }).fail(function (xhr, err) {
    console.log(xhr.responseJSON.message);
  });
}

function deleteTodo(id) {
  $.ajax({
    url: baseUrl + "/todos/".concat(id),
    method: 'DELETE',
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      status: true
    }
  }).done(function (result) {
    homepage();
  }).fail(function (xhr, err) {
    console.log(xhr.responseJSON.message);
  });
}

$("#editTodo").click(function (e) {
  e.preventDefault();
  var id = $("#editTodo").data('value');
  var updateTodo = {
    title: $("#editTodoTitle").val(),
    description: $("#editTodoDescription").val(),
    due_date: $("#editTodoDuedate").val()
  };
  $.ajax({
    url: baseUrl + "/todos/".concat(id),
    method: 'PUT',
    headers: {
      token: localStorage.getItem('token')
    },
    data: updateTodo
  }).done(function (result) {
    homepage();
  }).fail(function (xhr, err) {
    console.log(xhr.responseJSON.message);
  });
}); // BREWERY

$("#toHome").click(function () {
  homepage();
});
$("#toBrewery").click(function () {
  // homepage()
  $("#toHome").show();
  $("#toBrewery").hide();
  $("#todoSegment").hide();
  $("#brewery").show();
  $("#breweryList").empty();
  $.ajax({
    url: baseUrl + '/brewery/list',
    method: 'GET'
  }).done(function (result) {
    console.log(result);
    result.forEach(function (el) {
      $("#breweryList").append("\n            <div class=\"ui card\">\n                <div class=\"content\">\n                    <div class=\"header\">".concat(el.name, "</div>\n                </div>\n                <div class=\"content\">\n                    <h4 class=\"ui sub header\">Activity</h4>\n                    <div class=\"ui small feed\">\n                    <div class=\"event\">\n                        <div class=\"content\">\n                        <div class=\"summary\">\n                            <a>Country</a> ").concat(el.country, "\n                        </div>\n                        </div>\n                    </div>\n                    <div class=\"event\">\n                        <div class=\"content\">\n                        <div class=\"summary\">\n                            <a>State</a> ").concat(el.state, "\n                        </div>\n                        </div>\n                    </div>\n                    <div class=\"event\">\n                        <div class=\"content\">\n                        <div class=\"summary\">\n                            <a>Website</a> ").concat(el.website_url, "\n                        </div>\n                        </div>\n                    </div>\n                    </div>\n                </div>\n                <div class=\"extra content\">\n                    <button class=\"ui button primary disabled\">Add To Favorites</button>\n                    <div class=\"right floated author\">\n                        <img class=\"ui avatar image\" src=\"https://semantic-ui.com/images/avatar/small/matt.jpg\">\n                    </div>\n                </div>\n                \n            </div>\n            "));
    });
  }).fail(function (err) {
    console.log(err);
  });
}); // GOOGLE OAUTH

function onSignIn(googleUser) {
  console.log('google oauth'); // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  var id_token = googleUser.getAuthResponse().id_token; // console.log(id_token)

  $.ajax({
    url: baseUrl + '/googlelogin',
    method: 'GET',
    headers: {
      token: id_token
    }
  }).done(function (result) {
    // auto login
    console.log('login google berhasil'); // console.log(result.token)

    localStorage.setItem('token', result.token);
    user_name = result.name;
    homepage();
  }).fail(function (err) {
    console.log(err);
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
},{}],"C:/Users/ASUS/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50352" + '/');

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
},{}]},{},["C:/Users/ASUS/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map