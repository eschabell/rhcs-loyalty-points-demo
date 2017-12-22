cordova.define("com.feedhenry.plugins.apis.FHAPI", function(require, exports, module) { var loadOverride = function() {
  var $fh = window.$fh;
  if (typeof $fh === "undefined" || typeof $fh.__dest__ === "undefined") {
    return;
  }

  /**
   * Override $fh.setUUID on devices as the uuid is provided by cordova
   */

  $fh.__dest__.setUUID = function(p, s, f) {
    //do nothing for devices
  };

  /**
   * Override $fh.log
   */
  $fh.__dest__.log = function(p, s, f) {
    if (typeof p === "object" && p.message) {
      window.console.log(p.message);
    } else if (typeof p === "string") {
      window.console.log(p);
    } else {
      window.console.log(JSON.stringify(p));
    }
  };

  /**
   * ACCELEROMETER
   */
  $fh.__dest__._accWatcher = undefined;
  $fh.__dest__.acc = function(p, s, f) {
    if (typeof navigator === "undefined" || typeof navigator.accelerometer === "undefined") {
      return f('acc_nosupport', {}, p);
    }
    if (!p.act || p.act == "register") {
      if ($fh.__dest__._accWatcher) {
        f('acc_inuse', {}, p);
        return;
      }
      if (p.interval === 0) {
        navigator.accelerometer.getCurrentAcceleration(function(accel) {
          var result = {
            x: accel.x,
            y: accel.y,
            z: accel.z,
            when: accel.timestamp
          };
          s(result);
        }, function() {
          f('error_acc', {}, p);
        }, {});
      }
      if (p.interval > 0) {
        $fh.__dest__._accWatcher = navigator.accelerometer.watchAcceleration(function(accel) {
          var result = {
            x: accel.x,
            y: accel.y,
            z: accel.z,
            when: accel.timestamp
          };
          s(result);
        }, function() {
          f('error_acc', {}, p);
        }, {
          frequency: p.interval
        });
      }
    } else if (p.act == "unregister") {
      if ($fh.__dest__._accWatcher) {
        navigator.accelerometer.clearWatch($fh.__dest__._accWatcher);
        $fh.__dest__._accWatcher = undefined;
      }
      s();
    } else {
      f('acc_badact', {}, p);
    }
  };

  /**
   * Cemera
   */
  $fh.__dest__.cam = function(p, s, f) {
    if (typeof navigator === "undefined" || typeof navigator.camera === "undefined") {
      return f('cam_nosupport');
    }
    if (p.act && p.act != "picture") {
      f('cam_nosupport', {}, p);
      return;
    }
    var source = navigator.camera.PictureSourceType.CAMERA; //camera type
    if (p.source && p.source === 'photo') {
      source = navigator.camera.PictureSourceType.PHOTOLIBRARY;
    }
    var destType = navigator.camera.DestinationType.DATA_URL;
    if (p.uri) {
      destType = navigator.camera.DestinationType.FILE_URI;
    }
    var options = {
      'sourceType': source,
      'destinationType': destType
    };
    navigator.camera.getPicture(function(pic) {
      if (p.uri) {
        s({
          uri: pic
        });
      } else {
        var picdata = {
          format: 'jpg',
          b64: pic
        };
        s(picdata);
      }
    }, function(message) {
      f('cam_error', {
        message: message
      }, p);
    }, options);
  };

  /**
   *  CONTACTS
   */
  $fh.__dest__.contacts = function(p, s, f) {
    if (typeof navigator === "undefined" || typeof navigator.contacts === "undefined") {
      return f("contacts_nosupport");
    }
    var convertFormat = function(ct) {
      var c = ct;
      if (typeof ct == "string") {
        c = JSON.parse(ct);
      }
      return {
        first: getName(c).first,
        last: getName(c).last,
        name: getName(c).formatted || c.displayName || c.nickname,
        addr: convertRecords(c.addresses, "home"),
        phone: convertRecords(c.phoneNumbers, "mobile"),
        email: convertRecords(c.emails, "email"),
        id: c.id
      };
    };

    var getName = function(c) {
      var first = "";
      var last = "";
      var formatted = null;
      if (c.name) {
        first = c.name.givenName;
        last = c.name.familyName;
        formatted = c.name.formatted;
      } else if (c.displayName) {
        var parts = c.displayName.split(" ");
        first = parts[0];
        last = parts[parts.length - 1];
      }

      return {
        first: first,
        last: last,
        formatted: formatted
      };
    };

    var processResults = function(cl) {
      var cs = [];
      for (var i = 0; i < cl.length; i++) {
        var c = convertFormat(cl[i]);
        cs.push(c);
      }
      return cs;
    };

    var convertRecords = function(records, defaultType) {
      var retJson = {};
      if (null != records) {
        for (var i = 0; i < records.length; i++) {
          var obj = records[i];
          if (typeof obj == "object") {
            retJson[obj.type] = obj.value;
          } else if (typeof obj == "string") {
            retJson[defaultType] = obj;
          }
        }
      }
      return retJson;
    };

    var fields = ["*"];
    var defaultFields = ["name", "displayName", "nickname", "phoneNumbers", "emails", "addresses"];
    var options = {
      multiple: true,
      filter: ""
    };
    var acts = {
      list: function() {
        navigator.contacts.find(fields, function(cl) {
          var cs = processResults(cl);
          s({
            list: cs
          });
        }, function() {
          f('contacts_error', {}, p);
        }, options);
      },

      find: function() {
        var searchFields = defaultFields;
        if (p.by) {
          searchFields.push(p.by);
        }

        options.filter = p.val;
        navigator.contacts.find(searchFields, function(cl) {
          var cs = processResults(cl);
          s({
            list: cs
          });
        }, function() {
          f('contacts_error', {}, p);
        }, options);
      },

      add: function() {
        if (p.gui) {
          if (navigator.contacts.newContactUI) {
            //gui is supported on ios
            navigator.contacts.newContactUI(function(cid) {
              return s({
                id: cid
              });
            });
          } else if (navigator.contacts.insert) {
            //gui is supported on android
            navigator.contacts.insert(function(c) {
              var contact = convertFormat(c);
              return s(contact);
            });
          } else {
            return f("contacts_no_support");
          }
        } else {
          var params = {};
          var contactParam = p.contact;
          if (p.contact) {
            var phones = [];
            if (typeof p.contact.phone == "object") {
              for (var key in p.contact.phone) {
                phones.push({
                  type: key,
                  value: p.contact.phone[key]
                });
              }
            } else if (typeof p.contact.phone == "string") {
              phones.push({
                type: "mobile",
                value: p.contact.phone
              });
            }
            if (phones.length > 0) {
              contactParam["phoneNumbers"] = phones;
            }
            if (p.contact.first || p.contact.last) {
              contactParam["name"] = {
                "givenName": p.contact.first,
                "familyName": p.contact.last
              };
            }
          }
          var newContact = navigator.contacts.create(contactParam);
          newContact.save(function(c) {
            s(convertFormat(c));
          }, function(err) {
            f(err, {}, p);
          });
        }
      },

      remove: function() {
        if (!p.contact) {
          f('no_contact', {}, p);
          return;
        }
        if (!p.contact.id) {
          f("no_contactId", {}, p);
          return;
        }
        var params = {
          id: p.contact.id
        };
        var contactObj = navigator.contacts.create(params);
        contactObj.remove(function() {
          s();
        }, function(err) {
          f(err, {}, p);
        });
      },

      choose: function() {
        var chooseFunc = navigator.contacts.chooseContact || navigator.contacts.choose;
        if (chooseFunc && typeof chooseFunc === "function") {
          var options = {
            "fields": defaultFields
          };
          if (p.allowEdit) {
            options["allowEditing"] = "true";
          }
          chooseFunc(function(cid, c) {
            //ios returns cid and c and android only return c as the first arguments
            var data = c || cid;
            var cs = processResults([data]);
            s({
              list: cs
            });
          });
        } else {
          f('contacts_not_supported', {}, p);
        }
      }
    };

    var actfunc = acts[p.act];
    if (actfunc) {
      actfunc();
    } else {
      f('contacts_badact', {}, p);
    }
  };

  /**
   * File Upload
   */
  $fh.__dest__.file = function(p, s, f) {
    if (typeof FileTransfer === "undefined") {
      return f('file_nosupport');
    }
    var errors = ['file_notfound', 'file_invalid_url', 'file_connection_err', 'file_server_err'];
    var acts = {
      'upload': function() {
        if (!p.filepath) {
          f('file_nofilepath');
          return;
        }
        if (!p.server) {
          f('file_noserver');
          return;
        }
        var options = {};
        if (p.filekey) {
          options.fileKey = p.filekey;
        }
        if (p.filename) {
          options.fileName = p.filename;
        }
        if (p.mime) {
          options.mimeType = p.mime;
        }
        if (p.params) {
          options.params = p.params;
        }
        var debug = false;
        if (p.debug) {
          debug = true;
        }
        if (!navigator.fileTransfer) {
          navigator.fileTransfer = new FileTransfer();
        }
        navigator.fileTransfer.upload(p.filepath, p.server, function(message) {
          s({
            status: message.responseCode,
            res: message.response,
            size: message.bytesSent
          });
        }, function(error) {
          var err = 'file_unknown';
          if (1 <= error.code <= 4) {
            err = errors[error.code - 1];
          }
          f(err);
        }, options, debug);
      }
    };
    var actfunc = acts[p.act];
    if (actfunc) {
      actfunc();
    } else {
      f('file_badact');
    }
  };

  /** **************************************************
   *  GEO
   *  **************************************************
   */
  $fh.__dest__._geoWatcher = undefined;

  $fh.__dest__.geo = function(p, s, f) {
    if (typeof navigator === "undefined" || typeof navigator.geolocation === "undefined") {
      return f("geo_nosupport");
    }
    if (!p.act || p.act == "register") {
      if ($fh.__dest__._geoWatcher) {
        f('geo_inuse', {}, p);
        return;
      }
      if (p.interval === 0) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var coords = position.coords;
          var resdata = {
            lon: coords.longitude,
            lat: coords.latitude,
            alt: coords.altitude,
            acc: coords.accuracy,
            head: coords.heading,
            speed: coords.speed,
            when: position.timestamp
          };
          s(resdata);
        }, function() {
          f('error_geo');
        }, {
          enableHighAccuracy: p.enableHighAccuracy,
          maximumAge: p.maximumAge || 600000
        });
      }
      if (p.interval > 0) {
        $fh.__dest__._geoWatcher = navigator.geolocation.watchPosition(

          function(position) {
            var coords = position.coords;
            var resdata = {
              lon: coords.longitude,
              lat: coords.latitude,
              alt: coords.altitude,
              acc: coords.accuracy,
              head: coords.heading,
              speed: coords.speed,
              when: position.timestamp
            };
            s(resdata);
          }, function() {
            f('error_geo');
          }, {
            timeout: p.interval,
            enableHighAccuracy: p.enableHighAccuracy,
            maximumAge: p.maximumAge || 600000
          });
      }
    } else if (p.act == "unregister") {
      if ($fh.__dest__._geoWatcher) {
        navigator.geolocation.clearWatch($fh.__dest__._geoWatcher);
        $fh.__dest__._geoWatcher = undefined;
      }
      s();
    } else {
      f('geo_badact', {}, p);
    }
  };

  /** **************************************************
   *  NOTIFY
   *  **************************************************
   */

  $fh.__dest__.notify = function(p, s, f) {
    if (typeof navigator === "undefined" || typeof navigator.notification === "undefined") {
      return f("notify_nosupport");
    }
    var acts = {
      vibrate: function() {
        navigator.notification.vibrate(1000);
      },

      beep: function() {
        navigator.notification.beep(2);
      }
    };
    var actfunc = acts[p.type];
    if (actfunc) {
      actfunc();
    } else {
      f('notify_badact', {}, p);
    }
  };

  /**
   * $fh.env
   */
  $fh.__dest__.env = function(p, s, f) {
    var uuid = null;
    if (window.fhdevice && window.fhdevice.uuid) {
      uuid = window.fhdevice.uuid;
    } else if (navigator.device && navigator.device.uuid) {
      uuid = navigator.device.uuid;
    } else if (window.device && window.device.uuid) {
      uuid = window.device.uuid;
    }
    s({
      uuid: uuid
    });
  };

  /**
   * Orientation
   */
  $fh.__dest__.ori = function(p, s, f) {
    if (typeof p.act == "undefined" || p.act == "listen") {
      window.addEventListener('orientationchange', function(e) {
        s(window.orientation);
      }, false);
    } else if (p.act == "set") {
      if (navigator.deviceOrientation || (window.plugins && window.plugins.deviceOrientation)) {
        if (!p.value) {
          f('ori_no_value');
          return;
        }
        var deviceOrientation = window.deviceOrientation || window.plugins.deviceOrientation;
        deviceOrientation.setOrientation(p.value, function(ori) {
          s(ori);
        }, function(err) {
          f('set_ori_error');
        });
      } else {
        f('ori_nosupport');
      }
    } else {
      f('ori_badact');
    }
  };

  $fh._readyCallbacks = $fh._readyCallbacks || [];
  $fh._readyState = $fh._readyState || false;
  $fh.__dest__.ready = function(p, s, f) {
    if ($fh._readyState) {
      try {
        s();
      } catch (e) {
        console.log("Error during $fh.ready. Skip. Error = " + e.message);
      }
    } else {
      $fh._readyCallbacks.push(s);
    }
  };
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
