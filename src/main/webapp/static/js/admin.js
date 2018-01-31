//添加用户
function p_admin_addUsers(){
  $('.manageUsers .btn').click(function(){
    $('.mask').show();
    $('.maskdiv:eq(4)').show();
  })
  $('.maskdiv:eq(4) .btn:first').click(function(){
    var username = $('.maskdiv:eq(4) input').val();
    if(username == ''){
      $('.maskdiv:eq(4) td:eq(1) span').text('用户名不能为空');
      $('.maskdiv:eq(4) td:eq(1)').show();
      return;
    }
    $('.maskdiv:eq(4) td:eq(1)').hide();

    $.ajax({
      url:urlRoot + 'adminNewUser',
      data:{
        "username":username
      },
      type:'post',
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
        $('.maskdiv:eq(4) input').attr('disabled','disabled');
        $('.maskdiv:eq(4) tr:eq(1) span:eq(1)').text(data.data.account);
        $('.maskdiv:eq(4) tr:eq(2) span:eq(1)').text(data.data.password);
        $('.maskdiv:eq(4) tr:eq(1)').show();
        $('.maskdiv:eq(4) tr:eq(2)').show();
        $('.maskdiv:eq(4) .btn:eq(0)').hide();
        p_admin_getNormalUser();
        p_in_getUseAccount();//获取使用负责人
      }else{
        alert(data.msg);
      }
    }
  })
  $('.maskdiv:eq(4) .btn:eq(1)').unbind();
  $('.maskdiv:eq(4) .btn:eq(1)').click(function(){
	  $('.maskdiv:eq(4) input').removeAttr('disabled');
        $('.maskdiv:eq(4) tr:eq(1) span:eq(1)').text('');
        $('.maskdiv:eq(4) tr:eq(2) span:eq(1)').text('');
        $('.maskdiv:eq(4) tr:eq(1)').hide();
        $('.maskdiv:eq(4) tr:eq(2)').hide();
        $('.maskdiv:eq(4) .btn:eq(0)').show();
        $('.mask').hide();
        $('.maskdiv:eq(4)').hide();
        $('.maskdiv:eq(4) input').val('')
  })
  $('.maskdiv:eq(4) .maskClose').unbind();
  $('.maskdiv:eq(4) .maskClose').click(function(){
	  $('.maskdiv:eq(4) input').removeAttr('disabled');
        $('.maskdiv:eq(4) tr:eq(1) span:eq(1)').text('');
        $('.maskdiv:eq(4) tr:eq(2) span:eq(1)').text('');
        $('.maskdiv:eq(4) tr:eq(1)').hide();
        $('.maskdiv:eq(4) tr:eq(2)').hide();
        $('.maskdiv:eq(4) .btn:eq(0)').show();
        $('.mask').hide();
        $('.maskdiv:eq(4)').hide();
        $('.maskdiv:eq(4) input').val('')
  })
}
//获取普通用户帐号
function p_admin_getNormalUser(){
  $.ajax({
    url:urlRoot + 'adminDeleteUser',
    data:{},
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
      users = data.data;
      var len = 15;
      if(data.data.length < 15){
        len = data.data.length;
        $('.manageUsers .switchPage').hide();
      }else{
        $('.manageUsers .switchPage .totalPages').text(Math.ceil(data.data.length/15));
        $('.manageUsers .switchPage .totalResult').text(data.data.length);
        $('.manageUsers .switchPage .currentPage').text('1');
        p_admin_usersSwitchPage();
        $('.manageUsers .switchPage').show();
      }
      p_admin_switchShow(0,len,users);
    }else{
      alert(data.msg);
    }
  }
}
function p_admin_usersSwitchPage(){
  $('.manageUsers .switchPage li').click(function(){
    var currentPage = $('.manageUsers .switchPage .currentPage').text();
    var totalPages = $('.manageUsers .switchPage .totalPages').text();
   
    var txt = $(this).text();
    console.log(txt);
    var p;
    var len = 15;
    switch (txt) {
      case '首页':
        p = 0;
        break;
      case '上页':
        if(currentPage == 1){
          alert('当前已经是第一页了！');
          console.log('1');
          return;
        }
        console.log('2');
        p = parseInt(currentPage) - 2;
        break;
      case '下页':
        if(currentPage == totalPages){
          alert('当前已经是最后一页了！');
          return;
        }
        p = currentPage;
        break;
      case '末页':
        p = parseInt(totalPages) - 1;
        break;
    }
    p_admin_switchShow(p,len,users);
  })
}
function p_admin_switchShow(page,offset,data){
  var start,end;
  start = 15 * parseInt(page);
  end = start + offset;
  if(users.length < end){
    end = users.length;
  }
  var ht;
  $('.manageUsers tbody').html('');
  for(var i = start; i < end; i ++){
    ht ='<tr>'+
          '<td>' + (i+1) + '</td>' +
          '<td>' + data[i].username + '</td>' +
          '<td>' + data[i].account + '</td>' +
          '<td>' + data[i].password + '</td>' +
          '<td><a href="#" class="warn">删除</a></td>' +
          '</tr>';
    $('.manageUsers tbody').append(ht);
  }
  $('.manageUsers .switchPage .currentPage').text(parseInt(page) + 1);
  p_admin_deleteUsers();//删除用户
}
//删除用户
function p_admin_deleteUsers(){
  $('.manageUsers .warn').unbind();
  $('.manageUsers .warn').click(function(){
    var username = $(this.parentNode.parentNode).children('td:eq(1)').text();
    var account = $(this.parentNode.parentNode).children('td:eq(2)').text();
    g_warn('删除用户-'+username,function(){
      $.ajax({
        url:urlRoot + 'adminDeleteUser',
        data:{
          "account":account
        },
        type:'post',
        dataType:'json',
        async:false,
        success:function(data, status){
          if(data.code === 0){
        	  
            alert('删除成功');
            p_in_getUseAccount();//获取使用负责人
            p_admin_getNormalUser();
          }else{
            alert(data.msg);
          }
        },
        error:function(data, status, e){
          console.log(data);
        }
      })
      
    });
  })
}
//获取材料小类别---管理员
function p_admin_getType(){
  $.ajax({
    url:urlRoot + 'adminUpdateType',
    data:{},
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
      allType = data.data;
      var type;
      $('.manageType div:first').html('<span>类别管理:</span>');
      var allHt = '<span class="manageTypeCheckBtn active">' +
                  '<input type="hidden" value="all"/>全部</span>';
      $('.manageType div:first').append(allHt);
      for(var j = 0; j < bigType.length; j ++){
        type = '<span class="manageTypeCheckBtn">'+
                '<input type="hidden" value="' + bigType[j].bigTypeId +
                '">' + bigType[j].bigTypeName + '</span>';
        $('.manageType div:first').append(type);
      }
      if(data.data.length < 15){
        len = data.data.length;
        $('.manageType .switchPage').hide();
      }else{
        $('.manageType .switchPage .totalPages').text(Math.ceil(data.data.length/15));
        $('.manageType .switchPage .totalResult').text(data.data.length);
        $('.manageType .switchPage .currentPage').text('1');
        p_admin_switchType();
      }
      p_admin_typeShow(0,15,allType);
      p_admin_manageBigType();//切换大类
    }else{
      alert(data.msg);
    }
  }
}
function p_admin_switchType(){
  $('.manageType .switchPage li').click(function(){
    var currentPage = $('.manageType .switchPage .currentPage').text();
    var totalPages = $('.manageType .switchPage .totalPages').text();
    var big_type = $('.manageType #type .active input').val();
    var txt = $(this).text();
    var p;
    var len = 15;
    switch (txt) {
      case '首页':
        p = 0;
        break;
      case '上页':
        if(currentPage == 1){
          alert('当前已经是第一页了！');
          return;
        }
        p = parseInt(currentPage) - 2;
        break;
      case '下页':
        if(currentPage == totalPages){
          alert('当前已经是最后一页了！');
          return;
        }
        p = currentPage;
        break;
      case '末页':
        p = parseInt(totalPages) - 1;
        break;
    }
    if(big_type == 'all'){
      p_admin_typeShow(p,len,allType);
    }else{
      p_admin_typeShow(p,len,smallType[big_type]);
    }
  })
}
function p_admin_typeShow(page,offset,data){
  var start,end;
  start = 15 * parseInt(page);
  end = start + offset;
  if(data.length < end){
    end = data.length;
  }
  var ht;
  $('.manageType tbody').html('');
  for(var i = start; i < end; i ++){
    ht = '<tr>'+
          '<td>' + (i+1) + '</td>' +
          '<td>' + data[i].bigTypeName + '</td>' +
          '<td>' + data[i].smallTypeName + '</td>' +
          '<td>' + data[i].smallTypeId + '</td>' +
          '<td><a href="#" class="editInfo">编辑</a></td>' +
          '</tr>';
    $('.manageType tbody').append(ht);
  }
  $('.manageType .switchPage .currentPage').text(parseInt(page) + 1);
  p_admin_editSmallTypeInfo();//编辑小类名称
}
//编辑小类名称
function p_admin_editSmallTypeInfo(){
  var smallTypeId = '';
  $('.maskdiv:eq(7) .btn:first').unbind();
  $('.manageType .editInfo').click(function(){
    var txt = $(this.parentNode.parentNode).children('td:eq(2)').text();
    smallTypeId = $(this.parentNode.parentNode).children('td:eq(3)').text();
    $('.maskdiv:eq(7) #originClassName').attr('value',txt);
    $('.mask').show();
    $('.maskdiv:eq(7)').show();
  })
  $('.maskdiv:eq(7) .btn:first').click(function(){
    var smallTypeName = $('.maskdiv:eq(7) input:eq(1)').val();
    $.ajax({
      url:urlRoot + 'adminUpdateType',
      data:{
        "smallTypeName":smallTypeName,
        "smallTypeId":smallTypeId
      },
      type:'post',
      dataType:'json',
      async:false,
      success:function(data,status){
        handleDt(data);
      },
      error:function(data,status,e){
        console.log(e);
      }
    })

    function handleDt(data){
      if(data.code === 0){
        alert('编辑成功');
        p_admin_getType();//加载小类别列表
        $('.mask').hide();
        $('.maskdiv:eq(7)').hide();
        $('.maskdiv:eq(7) input:eq(1)').val('');
      }else{
        alert(data.msg);
      }
    }
  })
}
//删除材料
function p_admin_deleteMaterials(){
  var materialId = '';
  var materialName = '';
  $('#resultList .warn').click(function(){
    materialId = $(this.parentNode.parentNode).children('td:eq(1)').text();
    materialName = $(this.parentNode.parentNode).children('td:eq(2)').text();
    g_warn('确认删除-'+materialName,function(){
      $.ajax({
        url:urlRoot + 'adminDeleteMaterial',
        data:{
          "materialId":materialId
        },
        type:'post',
        dataType:'json',
        async:false,
        success:function(data, status){
          if(data.code === 0){
            alert('删除成功');
            p_se_getAllNum('1',{"flag":"1"});//加载页码
            p_se_selectAll(0,10);//查询全部材料
          }else{
            alert(data.msg);
          }
        },
        error:function(data,status, e){
          console.log(e);
        }
      })
    })
  })
}
//类别管理，大类选择
function p_admin_manageBigType(){
  $('.manageTypeCheckBtn').click(function(){
    $('.manageTypeCheckBtn').removeClass('active');
    $(this).addClass('active');
    var bigId = $(this).children('input:eq(0)').val();
    var bigName = $(this).text();
    console.log(bigName);
    var ht;
    $('.manageType tbody').html('');
    if(bigName === '全部'){
      //p_admin_switchShow(0,len,allType);
    	p_admin_typeShow(0,15,allType);
    }else {
      for(var i = 0; i < smallType[bigId].length; i ++){
        ht = '<tr>'+
              '<td>' + (i+1) + '</td>' +
              '<td>' + bigName + '</td>' +
              '<td>' + smallType[bigId][i].smallTypeName + '</td>' +
              '<td>' + smallType[bigId][i].smallTypeId + '</td>' +
              '<td><a href="#" class="editInfo">编辑</a></td>' +
              '</tr>';
        $('.manageType tbody').append(ht);
      }
    }
    p_admin_editSmallTypeInfo();//编辑小类名称
  })
}
