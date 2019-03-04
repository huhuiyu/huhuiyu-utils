(function() {
  var huhuiyu = {};

  //md5加密开始===========================================================================================================
  var MD5Util = {};
  MD5Util.rhex = function(num) {
    var hex_chr = '0123456789abcdef';
    str = '';
    for (j = 0; j <= 3; j++) {
      str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0f) + hex_chr.charAt((num >> (j * 8)) & 0x0f);
    }
    return str;
  };

  MD5Util.str2blks_MD5 = function(str) {
    nblk = ((str.length + 8) >> 6) + 1;
    blks = new Array(nblk * 16);
    for (i = 0; i < nblk * 16; i++) blks[i] = 0;
    for (i = 0; i < str.length; i++) {
      blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
    }
    blks[i >> 2] |= 0x80 << ((i % 4) * 8);
    blks[nblk * 16 - 2] = str.length * 8;
    return blks;
  };

  MD5Util.add = function(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  };

  MD5Util.rol = function(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  };

  MD5Util.cmn = function(q, a, b, x, s, t) {
    return MD5Util.add(MD5Util.rol(MD5Util.add(MD5Util.add(a, q), MD5Util.add(x, t)), s), b);
  };
  MD5Util.ff = function(a, b, c, d, x, s, t) {
    return MD5Util.cmn((b & c) | (~b & d), a, b, x, s, t);
  };
  MD5Util.gg = function(a, b, c, d, x, s, t) {
    return MD5Util.cmn((b & d) | (c & ~d), a, b, x, s, t);
  };
  MD5Util.hh = function(a, b, c, d, x, s, t) {
    return MD5Util.cmn(b ^ c ^ d, a, b, x, s, t);
  };
  MD5Util.ii = function(a, b, c, d, x, s, t) {
    return MD5Util.cmn(c ^ (b | ~d), a, b, x, s, t);
  };

  MD5Util.md5 = function(str) {
    x = MD5Util.str2blks_MD5(str);
    a = 1732584193;
    b = -271733879;
    c = -1732584194;
    d = 271733878;

    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;

      a = MD5Util.ff(a, b, c, d, x[i + 0], 7, -680876936);
      d = MD5Util.ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = MD5Util.ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = MD5Util.ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = MD5Util.ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = MD5Util.ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = MD5Util.ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = MD5Util.ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = MD5Util.ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = MD5Util.ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = MD5Util.ff(c, d, a, b, x[i + 10], 17, -42063);
      b = MD5Util.ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = MD5Util.ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = MD5Util.ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = MD5Util.ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = MD5Util.ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = MD5Util.gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = MD5Util.gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = MD5Util.gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = MD5Util.gg(b, c, d, a, x[i + 0], 20, -373897302);
      a = MD5Util.gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = MD5Util.gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = MD5Util.gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = MD5Util.gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = MD5Util.gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = MD5Util.gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = MD5Util.gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = MD5Util.gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = MD5Util.gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = MD5Util.gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = MD5Util.gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = MD5Util.gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = MD5Util.hh(a, b, c, d, x[i + 5], 4, -378558);
      d = MD5Util.hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = MD5Util.hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = MD5Util.hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = MD5Util.hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = MD5Util.hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = MD5Util.hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = MD5Util.hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = MD5Util.hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = MD5Util.hh(d, a, b, c, x[i + 0], 11, -358537222);
      c = MD5Util.hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = MD5Util.hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = MD5Util.hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = MD5Util.hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = MD5Util.hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = MD5Util.hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = MD5Util.ii(a, b, c, d, x[i + 0], 6, -198630844);
      d = MD5Util.ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = MD5Util.ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = MD5Util.ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = MD5Util.ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = MD5Util.ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = MD5Util.ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = MD5Util.ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = MD5Util.ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = MD5Util.ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = MD5Util.ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = MD5Util.ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = MD5Util.ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = MD5Util.ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = MD5Util.ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = MD5Util.ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = MD5Util.add(a, olda);
      b = MD5Util.add(b, oldb);
      c = MD5Util.add(c, oldc);
      d = MD5Util.add(d, oldd);
    }
    return MD5Util.rhex(a) + MD5Util.rhex(b) + MD5Util.rhex(c) + MD5Util.rhex(d);
  };

  huhuiyu.md5 = MD5Util.md5;
  //md5加密结束===========================================================================================================

  //字符串工具开始=========================================================================================================
  huhuiyu.replaceAll = function(str, ostr, dstr) {
    return str.split(ostr).join(dstr);
  };

  huhuiyu.trim = function(str) {
    return str.replace(/(^[\s]*)|([\s]*$)/g, '');
  };

  huhuiyu.isInt = function(str) {
    return /^\d+$/.test(str) && parseInt(str, 10) + '' === str;
  };

  huhuiyu.uuid = function() {
    var s = [];
    var hexDigits = '0123456789abcdef';
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '-';
    var uuid = s.join('');
    return uuid;
  };

  huhuiyu.uuid32 = function() {
    return huhuiyu.replaceAll(huhuiyu.uuid(), '-', '');
  };

  huhuiyu.isArray = function(obj) {
    return Object.prototype.toString.call(obj).toLowerCase() === '[object array]';
  };

  //字符串工具结束=========================================================================================================

  //json工具开始==========================================================================================================
  var styles = {
    key: 'color: red;',
    string: 'color: fuchsia;',
    number: 'color: green;',
    boolean: 'color: maroon;',
    other: 'color: maroon;'
  };

  //判断对象或者字符串是否为json，否就返回null，是就返回json
  huhuiyu.isJson = function(info) {
    //检查参数
    if (!info) {
      return null;
    }
    if (typeof info == 'object' && Object.prototype.toString.call(info).toLowerCase() == '[object object]' && !info.length) {
      return info;
    }
    if (typeof info == 'string') {
      try {
        var obj = JSON.parse(info);
        if (typeof obj == 'object' && Object.prototype.toString.call(obj).toLowerCase() == '[object object]' && !obj.length) {
          return obj;
        }
        return null;
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }
  };

  huhuiyu.formatJson = function(json, highlight) {
    var jsonObj = huhuiyu.isJson(json);
    if (!jsonObj) {
      return '';
    }
    // 缩进显示json字符串
    var result = JSON.stringify(json, undefined, 4);
    if (highlight) {
      return huhuiyu.jsonSyntaxHighlight(result);
    }
    return result;
  };

  huhuiyu.jsonSyntaxHighlight = function(json) {
    // 格式化显示json
    // json语法高亮
    json = json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
      var style = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          style = 'key';
        } else {
          style = 'string';
        }
      } else if (/true|false/.test(match)) {
        style = 'boolean';
      } else if (/null/.test(match)) {
        style = 'other';
      }
      return '<span style="' + styles[style] + '">' + match + '</span>';
    });
    return json;
  };

  huhuiyu.jsonToQueryString = function(json) {
    var jsonObj = huhuiyu.isJson(json);
    if (!jsonObj) {
      return '';
    }
    return jsonObjToQueryString(jsonObj, '');
  };

  function jsonObjToQueryString(json, basename) {
    var qs = '';
    for (var key in json) {
      var keyname = basename ? basename + '.' + key : key;
      var value = json[key];
      var jsonValue = huhuiyu.isJson(value);
      if (jsonValue) {
        qs += '&' + jsonObjToQueryString(jsonValue, keyname);
      } else if (huhuiyu.isArray(value)) {
        for (var i = 0; i < value.length; i++) {
          jsonValue = huhuiyu.isJson(value[i]);
          if (jsonValue) {
            qs += '&' + jsonObjToQueryString(jsonValue, keyname);
          } else {
            qs += '&' + keyname + '=' + encodeURI(value);
          }
        }
      } else {
        qs += '&' + keyname + '=' + encodeURI(value);
      }
    }
    qs = qs.replace('&', '');
    return qs;
  }

  //json工具结束==========================================================================================================

  //其它==========================================================================================================

  // 是否为手机浏览器
  huhuiyu.isMobile = function() {
    return huhuiyu.getBrowserInfo().versions.mobile;
  };

  // 获取浏览器信息
  huhuiyu.getBrowserInfo = function() {
    var browserInfo = {
      versions: (function() {
        var u = navigator.userAgent;
        var info = {
          trident: u.indexOf('Trident') > -1, // IE内核
          presto: u.indexOf('Presto') > -1, // opera内核
          webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
          iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
          webApp: u.indexOf('Safari') === -1
          // 是否web程序，没有头部与底部
        };
        info.mobile = info.iPhone || info.android || info.webApp;
        return info;
      })(),
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    return browserInfo;
  };

  //其它结束==========================================================================================================

  window.huhuiyu = huhuiyu;
})();
