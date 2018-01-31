var urlRoot = './';//根目录
var identity = '1';//用户身份：1-普通用户;0-管理员
var inUsers;//采购人
var useAccount;//使用人
var bigType;//打类别
var smallType = {};//小类
var users;//管理员获取到的所有用户
var allType;//管理员获取到的所有类别
var listSelect;//上次列表查询选项
//加载身份
function g_getIdentity(){
  $.ajax({
    url:urlRoot + "getIdentity",
    data:'',
    type:'get',
    dataType:'json',
    async:false,
    success:function(data, status){
      handleData(data);
    },
    error:function(data, status, e){
      console.log(data);
    }
  })

  function handleData(data){
    if(data.code === 0){
      console.log('身份获取成功');
      $('.header span:first').text(data.data.username + ',欢迎登录！');
      identity = data.data.identity;
      if(identity === "1"){
        $('.left ul li:lt(2)').hide();
      }
    }else{
      alert(data.msg);
    }
  }
}
//关闭弹出框
function g_closeMask(){
  $('.maskClose').click(function(){
    $('.mask').hide();
    $('.maskdiv').hide();
  })
}
//自定义提示内容的提示框
function g_warn(txt,callback){
  $('.maskdiv').hide();
  $('.maskdiv:eq(5) .warn').text(txt);
  $('.mask').show();
  $('.maskdiv:eq(5)').show();
  $('.maskdiv:eq(5) .btn:first').unbind();
  $('.maskdiv:eq(5) .btn:first').click(function(){
    callback();
    $('.mask').hide();
    $('.maskdiv:eq(5)').hide();
    $('.maskdiv:eq(5) .warn').text('');
  })
}
//材料状态转换函数
function g_parseMaterialStatus(code){
  switch (code) {
    case '1':
      return '使用';
    case '2':
      return '维修';
    case '3':
      return '归还';
    case '4':
      return '删除';
    default:
      alert('材料状态吗错误！');
  }
}
//材料质量状态码：  0：删除，1：良好，2：损坏，3：耗尽，4：借出，5：维修。
function g_parseMaterialQStatus(code){
  switch (code) {
    case '0':
      return '删除';
    case '1':
      return '良好';
    case '2':
      return '损坏';
    case '3':
      return '耗尽';
    case '4':
      return '借出';
    case '5':
      return '维修';
    default:
      alert('材料状态码错误！');
  }
}
//加载动画
function g_openLoadingAnimation(){
  $('.mask').show();
  $('.maskdiv').hide();
  $('.loading').show();
}
//关闭动画
function g_closeLoadingAnimation(){
  $('.mask').fadeOut(200);
  $('.loading').fadeOut(200);
}
//数据库操作
function g_db_test(){
  var db = null;
  if (!window.indexedDB) {
    window.indexedDB = window.mozIndexedDB || window.webkitIndexedDB;
  }
  var request = indexedDB.open("test",2);
  request.onupgradeneeded = function(event){
    alert(event.oldVersion);
    db = event.target.result;
    if(db.objectStoreNames.contains('moreInfo')){
      db.deleteObjectStore('moreInfo');
    }
    var store = db.createObjectStore('moreInfo',{keyPath:'materialId'});

    for(var i = 0; i < d.data.length; i++){
      store.put(d.data[i]);
    }
  };
  request.onsuccess = function(e){
    alert('ok');
    db = request.result;
  }
  request.onerror = function(e){
    console.log(e.value);
  }
  var transaction = db.transaction("moreInfo",'readwrite');
  var store = transaction.objectStore('moreInfo');

  for(var i = 0; i < d.data.length; i++){
    store.put(d.data[i]);
  }
}
