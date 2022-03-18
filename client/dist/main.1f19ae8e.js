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
var baseUrl = "https://fancy-todos-app1.herokuapp.com/";
var btnRegister = $(".btn-register");
var btnLogin = $(".btn-login");
var btnLogout = $(".btn-logout");
var formRegister = $("#register-form");
var formLogin = $("#login-form");
var home = $(".home");
var homeAfter = $("#home-after-login");
var submitRegister = $("#register-submit");
var submitLogin = $("#login-submit");
$(document).ready(function () {
  auth();
});
btnRegister.click(function () {
  pageRegister();
});
btnLogin.click(function () {
  pageLogin();
});
btnLogout.click(function () {
  logout();
});

function pageRegister() {
  hideFuture();
  formRegister.show();
  home.show();
  btnLogin.show();
  submitRegister.off('click').on('click', function (event) {
    event.preventDefault();
    data = {
      email: $("#email-regis").val(),
      password: $("#password-regis").val()
    };
    handleRegister(data);
  });
}

function handleRegister(data) {
  // console.log(data, '<<<<<<<<');
  $.ajax({
    method: 'POST',
    url: "".concat(baseUrl, "register"),
    data: data
  }).done(function () {
    formRegister.trigger('reset');
    pageLogin();
  }).fail(function (xhr) {
    $('#password-regis').val('');
    Swal.fire({
      title: 'Oops error',
      text: xhr.responseJSON.message[0],
      icon: 'error',
      confirmButtonText: 'Ok'
    }); // console.log(err, `error register from ajax`);
  }).always(function () {
    $("#email").val('');
    $("#password").val('');
  });
}

function pageLogin() {
  hideFuture();
  home.show();
  formLogin.show();
  btnRegister.show();
  homeAfter.hide();
  submitLogin.off('click').on('click', function (event) {
    event.preventDefault();
    data = {
      email: $("#login-email").val(),
      password: $("#login-password").val()
    };
    handleLogin(data);
  });
}

function handleLogin(data) {
  $.ajax({
    method: 'POST',
    url: "".concat(baseUrl, "login"),
    data: data
  }).done(function (res) {
    // console.log(res, '<<<<<');
    localStorage.setItem('access_token', res.access_token);
    formLogin.trigger('reset');
    auth();
  }).fail(function (xhr) {
    $("#login-password").val('');
    Swal.fire({
      title: 'Oops error',
      text: xhr.responseJSON.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    }); // console.log(err.responseText, `error login from ajax`);
  }).always(function () {
    $("#login-email").val('');
    $("#login-password").val('');
  });
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token; // console.log(id_token);

  $.ajax({
    method: 'POST',
    url: "".concat(baseUrl, "googlelogin"),
    data: {
      id_token: id_token
    }
  }).done(function (res) {
    localStorage.setItem('access_token', res.access_token);
    auth();
  }).fail(function (xhr) {
    console.log("".concat(xhr, ", >>>>>>> error google login from ajax"));
    Swal.fire({
      title: 'Oops error',
      text: xhr.responseJSON.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }); // .always(() => {
  //   console.log(`di always`);
  // })
}

function getTodo() {
  $.ajax({
    method: 'GET',
    url: "".concat(baseUrl, "todos"),
    headers: {
      access_token: localStorage.access_token
    }
  }).done(function (data) {
    $("#todo-list").empty();
    $.each(data, function (index, data) {
      var status = "<input type=\"checkbox\" class=\"form-check-input\" id=\"status-".concat(data.id, "\" onclick=\"editStatus(").concat(data.id, ", '").concat(data.status, "')\" ");

      if (data.status === true) {
        status += "checked>";
      } else if (data.status === false) {
        status += ">";
      } // console.log(data)


      $('#todo-list').append("\n                <div class=\"card\" id=\"list-task\" style=\"width: 40rem\";>\n                    <div class=\"card-body todo-list-card\" id=todoCard".concat(data.id, ">\n                        <div id=todoCardBody").concat(data.id, ">\n                            ").concat(status, "\n                            <h5 class=\"card-title\">").concat(data.title, "</h5>\n                            <h6 class=\"card-subtitle mb-2 text-muted\">").concat(data.due_date.split('T')[0], "</h6>\n                            <p class=\"card-text\">").concat(data.description, "</p>\n                            <a href=\"#\" onclick='editForm(").concat(data.id, ")' class=\"card-link btn btn-primary mt-4\" id=\"editTodo\">Edit</a>\n                            <a href=\"#\" onclick=\"deleteTodo(event, ").concat(data.id, ")\" class=\"card-link btn btn-danger mt-4\" id=\"deleteTodo\">Hapus</a>\n                        </div>\n                    </div>\n                </div>\n            "));
    });
  }).fail(function (xhr) {
    Swal.fire({
      title: 'Oops error',
      text: xhr.responseJSON.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  });
}

$('#btn-add-todo').click(function (event) {
  event.preventDefault();
  $('#add-form').show();
});
$('#add-submit').click(function (event) {
  event.preventDefault();
  addTodo();
});

function addTodo() {
  var title = $('#todo-tile').val();
  var description = $('#todo-description').val();
  var due_date = $('#todo-date').val(); // ajax

  $.ajax({
    method: 'POST',
    url: "".concat(baseUrl, "todos"),
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title: title,
      description: description,
      due_date: due_date
    }
  }).done(function (response) {
    getTodo();
    $('#add-todo-form').hide();
  }).fail(function (err) {
    console.log(err, "ini error dari ajax");
  }).always(function () {});
}

$("#add-cancel-btn").click(function (event) {
  event.preventDefault();
  $('#add-form').hide();
});

function deleteTodo(event, id) {
  event.preventDefault;
  $.ajax({
    method: 'DELETE',
    url: "".concat(baseUrl, "todos/").concat(id),
    headers: {
      access_token: localStorage.access_token
    }
  }).done(function (response) {
    getTodo();
  }).fail(function (err) {
    console.log(err, "ini error dari ajax");
  }).always(function () {});
}

function editForm(id) {
  var todoId = id;
  $.ajax({
    method: 'GET',
    url: "".concat(baseUrl, "todos/").concat(todoId),
    headers: {
      access_token: localStorage.access_token
    }
  }).done(function (data) {
    $("#todoCardBody".concat(todoId)).hide();
    $("#todoCard".concat(todoId)).append("\n    <div class=\"edited-form\">\n    <h3>Edit Form </h3>\n    <form role=\"form\" id=\"form-edit-main".concat(todoId, "\">\n      <input type=\"text\" class=\"form-control\" value=\"").concat(data.title, " id=\"title-edit\">\n      <input type=\"text\" class=\"form-control\" value=\"").concat(data.due_date.split('T')[0], " id=\"due-date-edit\">\n      <input type=\"text\" class=\"form-control\" value=\"").concat(data.description, " id=\"description-edit\">\n      <button onclick=\"submitEdit(event)\" class=\"btn btn-primary-mt-3\" id=\"edit-button\">Save</button>\n      <button onclick=\"editCancel(event)\" class=\"btn btn-danger-mt-3\" id=\"edit-cancel-button\">Cancel</button>\n    </form>\n    </div>\n    "));
  });
}

function editCancel(event) {
  event.preventDefault();
  $("#form-edit-main").hide();
  $('.todo-list-card').show();
  $("#add-todo-form").hide();
  getTodo();
}

function submitEdit(event) {
  event.preventDefault();
  editSubmit();
}

function editSubmit(event) {
  $("#form-edit-main").show();
  $.ajax({
    method: 'PUT',
    url: "".concat(baseUrl, "todos/").concat(todoId),
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title: $('#title-edit').val(),
      description: $('#description-edit').val(),
      due_date: $('#due-date-edit').val()
    }
  }).done(function (data) {
    $("#form-edit-main").hide();
    $('.todo-list-card').show();
    $("#add-todo-form").show();
    $('#add-todo-form').hide();
    getTodo();
  }).fail(function (err) {
    console.log(err, 'ERROR EDIT');
  }).always(function () {
    $('#title-edit').val('');
    $('#due-date-edit').val('');
    $('#description-edit').val('');
  });
}

function editStatus(id, status) {
  var inputStatus;

  if (status === 'true') {
    inputStatus = false;
  } else {
    inputStatus = true;
  }

  $.ajax({
    method: 'PATCH',
    url: "".concat(baseUrl, "todos/").concat(id),
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      status: inputStatus
    }
  }).done(function (data) {
    console.log('Berhasil di Edit');
    getTodo();
  }).fail(function (err) {
    console.log(err, "ERROR EDIT");
  }).always(function () {});
}

function auth() {
  if (localStorage.getItem('access_token')) {
    mainPage();
  } else {
    pageLogin();
  }
}

function logout() {
  localStorage.clear();
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User logout from the app.");
  });
  pageLogin();
}

function mainPage() {
  hideFuture();
  getTodo(); // formLogin.hide()

  btnLogout.show();
  homeAfter.show();
  $("#page-todo").show();
}

function hideFuture() {
  btnRegister.hide();
  btnLogin.hide();
  btnLogout.hide();
  home.hide();
  formLogin.hide();
  formRegister.hide();
  homeAfter.hide();
  $("#page-todo").hide();
  $('#add-form').hide();
}
},{}],"../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61997" + '/');

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
},{}]},{},["../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map