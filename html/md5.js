(function() {
  var huhuiyu = { MD5Util: {} };

  huhuiyu.MD5Util.rhex = function(num) {
    var hex_chr = '0123456789abcdef';
    str = '';
    for (j = 0; j <= 3; j++) {
      str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0f) + hex_chr.charAt((num >> (j * 8)) & 0x0f);
    }
    return str;
  };

  huhuiyu.MD5Util.str2blks_MD5 = function(str) {
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

  huhuiyu.MD5Util.add = function(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  };

  huhuiyu.MD5Util.rol = function(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  };

  huhuiyu.MD5Util.cmn = function(q, a, b, x, s, t) {
    return huhuiyu.MD5Util.add(huhuiyu.MD5Util.rol(huhuiyu.MD5Util.add(huhuiyu.MD5Util.add(a, q), huhuiyu.MD5Util.add(x, t)), s), b);
  };
  huhuiyu.MD5Util.ff = function(a, b, c, d, x, s, t) {
    return huhuiyu.MD5Util.cmn((b & c) | (~b & d), a, b, x, s, t);
  };
  huhuiyu.MD5Util.gg = function(a, b, c, d, x, s, t) {
    return huhuiyu.MD5Util.cmn((b & d) | (c & ~d), a, b, x, s, t);
  };
  huhuiyu.MD5Util.hh = function(a, b, c, d, x, s, t) {
    return huhuiyu.MD5Util.cmn(b ^ c ^ d, a, b, x, s, t);
  };
  huhuiyu.MD5Util.ii = function(a, b, c, d, x, s, t) {
    return huhuiyu.MD5Util.cmn(c ^ (b | ~d), a, b, x, s, t);
  };

  /*
   * Take a string and return the hex representation of its MD5.
   */
  huhuiyu.MD5Util.md5 = function(str) {
    x = huhuiyu.MD5Util.str2blks_MD5(str);
    a = 1732584193;
    b = -271733879;
    c = -1732584194;
    d = 271733878;

    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;

      a = huhuiyu.MD5Util.ff(a, b, c, d, x[i + 0], 7, -680876936);
      d = huhuiyu.MD5Util.ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = huhuiyu.MD5Util.ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = huhuiyu.MD5Util.ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = huhuiyu.MD5Util.ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = huhuiyu.MD5Util.ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = huhuiyu.MD5Util.ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = huhuiyu.MD5Util.ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = huhuiyu.MD5Util.ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = huhuiyu.MD5Util.ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = huhuiyu.MD5Util.ff(c, d, a, b, x[i + 10], 17, -42063);
      b = huhuiyu.MD5Util.ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = huhuiyu.MD5Util.ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = huhuiyu.MD5Util.ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = huhuiyu.MD5Util.ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = huhuiyu.MD5Util.ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = huhuiyu.MD5Util.gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = huhuiyu.MD5Util.gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = huhuiyu.MD5Util.gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = huhuiyu.MD5Util.gg(b, c, d, a, x[i + 0], 20, -373897302);
      a = huhuiyu.MD5Util.gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = huhuiyu.MD5Util.gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = huhuiyu.MD5Util.gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = huhuiyu.MD5Util.gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = huhuiyu.MD5Util.gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = huhuiyu.MD5Util.gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = huhuiyu.MD5Util.gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = huhuiyu.MD5Util.gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = huhuiyu.MD5Util.gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = huhuiyu.MD5Util.gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = huhuiyu.MD5Util.gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = huhuiyu.MD5Util.gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = huhuiyu.MD5Util.hh(a, b, c, d, x[i + 5], 4, -378558);
      d = huhuiyu.MD5Util.hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = huhuiyu.MD5Util.hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = huhuiyu.MD5Util.hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = huhuiyu.MD5Util.hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = huhuiyu.MD5Util.hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = huhuiyu.MD5Util.hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = huhuiyu.MD5Util.hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = huhuiyu.MD5Util.hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = huhuiyu.MD5Util.hh(d, a, b, c, x[i + 0], 11, -358537222);
      c = huhuiyu.MD5Util.hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = huhuiyu.MD5Util.hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = huhuiyu.MD5Util.hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = huhuiyu.MD5Util.hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = huhuiyu.MD5Util.hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = huhuiyu.MD5Util.hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = huhuiyu.MD5Util.ii(a, b, c, d, x[i + 0], 6, -198630844);
      d = huhuiyu.MD5Util.ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = huhuiyu.MD5Util.ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = huhuiyu.MD5Util.ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = huhuiyu.MD5Util.ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = huhuiyu.MD5Util.ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = huhuiyu.MD5Util.ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = huhuiyu.MD5Util.ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = huhuiyu.MD5Util.ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = huhuiyu.MD5Util.ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = huhuiyu.MD5Util.ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = huhuiyu.MD5Util.ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = huhuiyu.MD5Util.ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = huhuiyu.MD5Util.ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = huhuiyu.MD5Util.ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = huhuiyu.MD5Util.ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = huhuiyu.MD5Util.add(a, olda);
      b = huhuiyu.MD5Util.add(b, oldb);
      c = huhuiyu.MD5Util.add(c, oldc);
      d = huhuiyu.MD5Util.add(d, oldd);
    }
    return huhuiyu.MD5Util.rhex(a) + huhuiyu.MD5Util.rhex(b) + huhuiyu.MD5Util.rhex(c) + huhuiyu.MD5Util.rhex(d);
  };

  window.huhuiyu = huhuiyu;
})();
