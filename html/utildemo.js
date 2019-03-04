(function() {
  //md5===================================================================================
  var txtMd5 = document.getElementById('txtMd5');
  var spMd5 = document.getElementById('spMd5');
  document.getElementById('btnMd5').addEventListener('click', function() {
    if (txtMd5.value.length == 0) {
      spMd5.innerHTML = '请输入要转换的信息';
      return;
    }
    spMd5.innerHTML = huhuiyu.md5(txtMd5.value);
  });
  //json===================================================================================
  var txtJson = document.getElementById('txtJson');
  var preJson = document.getElementById('preJson');
  var jsonTestObj = { tbAdmin: { username: '张三', password: 'abc-123', dept: { deptId: 100 } } };
  txtJson.value = JSON.stringify(jsonTestObj);
  document.getElementById('btnJson').addEventListener('click', function() {
    var json = huhuiyu.isJson(txtJson.value);
    if (json) {
      preJson.innerHTML = huhuiyu.formatJson(json, true) + '<br>' + huhuiyu.formatJson(json) + '<br>' + huhuiyu.jsonToQueryString(json);
      return;
    }
    preJson.innerHTML = '请输入json格式字符串';
  });

  console.log(jsonTestObj, '==>', huhuiyu.jsonToQueryString(jsonTestObj));
  //字符串===================================================================================
  var divStringResult = document.getElementById('divStringResult');
  var strR1 = ' 张三  张三丰  小张 ';
  var strR2 = '张';
  var strR3 = '李';
  var strR4 = '123';
  var strR5 = '0123';

  divStringResult.innerHTML = '替换' + strR1 + '中的' + strR2 + '为' + strR3 + '的结果：' + huhuiyu.replaceAll(strR1, strR2, strR3) + '<br>';
  divStringResult.innerHTML += '去头尾空格："' + strR1 + '"结果："' + huhuiyu.trim(strR1) + '"<br>';
  divStringResult.innerHTML += '整数判断' + strR1 + ':' + huhuiyu.isInt(strR1) + ',' + strR4 + ':' + huhuiyu.isInt(strR4) + ',' + strR5 + ':' + huhuiyu.isInt(strR5) + '<br>';
  divStringResult.innerHTML += 'uuid:' + huhuiyu.uuid() + '<br>uuid32:' + huhuiyu.uuid32() + '<br>';
})();
