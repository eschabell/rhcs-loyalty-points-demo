cordova.define("com.feedhenry.plugins.apis.FHAPI_ANDROID", function(require, exports, module) { var loadOverride = function() {
  var $fh = window.$fh;
  if (typeof $fh === "undefined" || typeof $fh.__dest__ === "undefined") {
    return;
  }

  $fh.__dest__.env = function(p, s, f) {
    var density = 1.0;
    //we put new device propeties into our own plugin
    if (window.fhdevice && window.fhdevice.density) {
      density = window.fhdevice.density;
    } else if (window.device && window.device.density) {
      density = window.device.density;
    }
    s({
      uuid: window.device ? window.device.uuid + "" : "",
      //convert it to string
      density: density
    });
  };

  $fh.__dest__.handlers = function(p, s, f) {
    if (typeof navigator === "undefined" || typeof navigator.app === "undefined") {
      return f("handlers_nosupport");
    }
    if (!p.type) {
      f('hanlders_no_type');
      return;
    }
    var types = {
      'back': function() {
        navigator.app.overrideBackbutton();
        var handler = function() {
          var exit = s();
          if (exit) {
            navigator.app.exitApp();
          }
        };
        document.addEventListener('backbutton', handler, false);
      },
      'menu': function() {
        var handler = function() {
          s();
        };
        document.addEventListener('menubutton', handler, false);
      }
    };
    types[p.type] ? types[p.type]() : f('hanlders_invalid_type');
  };

  $fh.__dest__.send = function(p, s, f) {
    if (p.type == "email") {
      var url = "mailto:" + p.to + "?cc=" + (p.cc ? p.cc : " ") + "&bcc=" + (p.bcc ? p.bcc : " ") + "&subject=" + (p.subject ? p.subject : "") + "&body=" + (p.body ? encodeURI(p.body) : "");
      document.location = url;
    } else if (p.type == "sms") {
      if (typeof p.background != "undefined" && p.background) {
        if (typeof navigator.sms != "undefined") {
          navigator.sms.send(function() {
            s();
          }, function(err) {
            f(err, {}, p);
          }, p.to, p.body);
        } else {
          f('send_sms_nobackground', {}, p);
        }
      } else {
        var url = "sms:" + p.to;
        document.location = url;
      }
    } else {
      f('send_nosupport', {}, p);
      return;
    }
  };

  $fh.__dest__.audio = function(p, s, f) {
    var audioManager = navigator.audio;
    if (window.plugins && window.plugins.stream) {
      audioManager = window.plugins.stream;
    }
    if (audioManager) {
      audioManager.action(p, s, f);
    } else {
      f("audio_nosupport");
    }
  };

  $fh.__dest__.webview = function(p, s, f) {
    if (navigator && navigator.webview) {
      navigator.webview.action(p, s, f);
    } else {
      return f("webview_nosupport");
    }
  };

  $fh.__dest__.push = function(p, s, f) {
    if (typeof window.PushNotification === "undefined") {
      return f("push_nosupport");
    }
    var acts = {
      'register': function() {
        var onRegistration = function(event) {
          if (event.error) {
            console.log("Push Reg error: " + event.error);
            f(event.error);
          } else {
            console.log("Push Reg success: " + event.pushID);
            s({
              apid: event.pushID
            });
          }
        };
        document.addEventListener("urbanairship.registration", onRegistration, false);
        document.addEventListener("resume", function() {
          document.addEventListener("urbanairship.registration", onRegistration, false);
        }, false);
        document.addEventListener("pause", function() {
          document.removeEventListener("urbanairship.registration", onRegistration, false);
        }, false);
        window.PushNotification.enablePush(function() {});
      },
      'receive': function() {
        var handleIncomingPush = function(event) {
          if (event.message) {
            console.log("Incoming push: " + event.message);
            s({
              message: event.message,
              extras: event.extras
            });
          } else {
            console.log("No incoming message");
          }
        };
        document.addEventListener("urbanairship.push", handleIncomingPush, false);
        document.addEventListener("resume", function() {
          document.addEventListener("urbanairship.push", handleIncomingPush, false);
        }, false);
        document.addEventListener("pause", function() {
          document.removeEventListener("urbanairship.push", handleIncomingPush, false);
        }, false);
        window.PushNotification.getIncoming(handleIncomingPush);
        console.log("Push receive regsitered");
      }
    };
    acts[p.act] ? acts[p.act]() : f('push_badact');
  };


  document.addEventListener('deviceready', function() {
    if (navigator.splashscreen) {
      try {
        navigator.splashscreen.hide();
      } catch (e) {}
    }
    $fh._readyState = true;
    document.removeEventListener('deviceready', arguments.callee, false);
    while ($fh._readyCallbacks && $fh._readyCallbacks.length > 0) {
      var f = $fh._readyCallbacks.shift();
      try {
        f();
      } catch (e) {
        console.log("Error during $fh.ready. Skip. Error = " + e.message);
      }
    }
  });
}

//since these overrides are loaded by cordova asynchronously via script injection, there is a chance that this file is loaded before
//the feedhenry sdk file is loaded. Then the overrides won't work. So if that is the case, delay the load of the overrides.
if (typeof window.$fh !== "undefined" && typeof window.$fh.__dest__ !== "undefined") {
  loadOverride();
} else {
  setTimeout(function() {
    loadOverride();
  }, 200);
}
});
