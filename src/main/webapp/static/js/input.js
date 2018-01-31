//获取类别
function p_in_getType(){
  $.ajax({
    url:urlRoot + 'inboundGetType',
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
      bigType = data.data;
      console.log('bigType:');
      console.log(bigType);
      for(var i = 0; i < bigType.length; i++){
        getSmallType(bigType[i].bigTypeId,bigType[i].bigTypeName);
      }
    }else{
      alert(data.msg);
    }
  }
  function getSmallType(bigTypeId,bigTypeName){
    $.ajax({
      url:urlRoot + 'inboundGetType',
      data:{
        "bigTypeId":bigTypeId
      },
      type:'post',
      dataType:'json',
      async:false,
      success:function(data, status){
        handleSmallType(data,bigTypeId,bigTypeName);
      },
      error:function(data,status,e){
        console.log(data);
      }
    })

    function handleSmallType(data,bigTypeId,bigTypeName){
      if(data.code === 0){
        smallType[bigTypeId] = data.data;
        for(var k = 0; k < smallType[bigTypeId].length; k ++){
          smallType[bigTypeId][k]['bigTypeName'] = bigTypeName;
        }
        console.log(smallType);
      }else{
        alert(data.msg);
      }
    }
  }
}

//处理类型下拉菜单
function p_in_dealType(ele){
  $(ele + ' select:eq(0)').html('<option value="">请选择</option>');
  for(var i = 0; i < bigType.length; i++){
    var ht = '<option value="' + bigType[i].bigTypeId + '">' + bigType[i].bigTypeName + '</option>';
    $(ele + ' select:eq(0)').append(ht);
  }

  $(ele + ' select:eq(0)').change(function(){
    $(ele + ' select:eq(1)').html('<option value="">请选择</option>');
    if(ele === '.maskdiv:eq(0) td:eq(4)'){
      $(ele + ' select:eq(1)').append('<option value="新建小类别">新建小类别</option>');
    }
    for(var j = 0; j < smallType[this.value].length; j ++){
      ht = '<option value = "' + smallType[this.value][j].smallTypeId + '">' +
            smallType[this.value][j].smallTypeName + '</option>';
      $(ele + ' select:eq(1)').append(ht);
    }

  })
}

//处理左边导航栏
function p_in_dealNav(){
  /*for(var i=0; i < bigType.length; i ++){
    var ht = '<li>&gt;&nbsp;' + bigType[i].bigTypeName +
              '-' + bigType[i].bigTypeId +
              '</li>';
    $('.left ul').append(ht);
  }*/

  $('.left ul li').click(function(){
    // alert($(this).html());
    $('.left ul li').attr('class','');
    $(this).attr('class','active');

    switch ($(this).html()) {
      case '&gt;&nbsp;用户管理':
        $('.result').hide();
        $('.resultList1').hide();
        $('.searchTab').hide();
        $('.searchTabList').hide();
        $('.manageType').hide();
        $('.manageUsers').show();
        break;
      case '&gt;&nbsp;类别管理':
        $('.result').hide();
        $('.resultList1').hide();
        $('.searchTab').hide();
        $('.searchTabList').hide();
        $('.manageUsers').hide();
        $('.manageType').show();
        break;
      case '&gt;&nbsp;查询':
        $('.resultList1').hide();
        $('.searchTabList').hide();
        $('.manageUsers').hide();
        $('.manageType').hide();
        $('.searchTab').show();
        $('.result').show();
        break;
      default:
        navType($(this).text());
    }

    function navType(text){
      var id = text.split('-');
      $('.searchTabList').html('');
      $('.searchTabList').html('<div class="searchTitle">'+id[0]+'</div>');
      var ht;
      for(var i = 0; i < smallType[id[1]].length; i++){
        if(i > 2){
          ht = '<span class="checkBoxBtn checkBoxBtnHide">' + smallType[id[1]][i].smallTypeName + '</span>';
        }else{
          ht = '<span class="checkBoxBtn">' + smallType[id[1]][i].smallTypeName + '</span>';
        }
        $('.searchTabList').append(ht);
      }
      $('.searchTabList').append('<span>显示全部</span>');
      $('.searchTabList span:last').click(function(){
        if($(this).text() === '显示全部'){
          $('.searchTabList .checkBoxBtn:gt(3)').attr('class','checkBoxBtn');
          $(this).text('收起');
        }else{
          $('.searchTabList .checkBoxBtn:gt(3)').attr('class','checkBoxBtn checkBoxBtnHide');
          $(this).text('显示全部');
        }
      })
      $('.searchTabList .checkBoxBtn').click(function(){
        $('.searchTabList .checkBoxBtn').removeClass('active');
        $(this).addClass('active');
      })
      $('.manageUsers').hide();
      $('.manageType').hide();
      $('.searchTab').hide();
      $('.result').hide();
      $('.resultList1').show();
      $('.searchTabList').show();
    }
  })
}
//入库操作
function p_in_input(){
  $('.input').click(function(){
    $('.mask').show();
    $('.maskdiv:eq(0)').show();
    p_in_dealType('.maskdiv:eq(0) td:eq(4)');
    // p_in_getUseAccount();//获取使用负责人
    addSmallType();//添加小类
  })
  $('.maskdiv:eq(0) .btn:first').click(function(){
    var data = {};
    data['materialId'] = $('.maskdiv:eq(0) input:first').val();//材料号
    data['materialName'] = $('.maskdiv:eq(0) input:eq(1)').val();//材料名称
    data['price'] = $('.maskdiv:eq(0) input:eq(2)').val();//单价
    data['number'] = $('.maskdiv:eq(0) input:eq(3)').val();//件数
    data['buyTime'] = $('.maskdiv:eq(0) input:eq(4)').val();//采购时间
    data['standard'] = $('.maskdiv:eq(0) input:eq(5)').val();//规格
    data['purpose'] = $('.maskdiv:eq(0) input:eq(6)').val();//用途
    data['comments'] = $('.maskdiv:eq(0) input:eq(7)').val();//备注
    data['bigTypeId'] = $('.maskdiv:eq(0) select:first').val();//大类别号
    if($('.maskdiv:eq(0) select:eq(1)').val().split('_#$#_')[0] === "_new"){
      data['smallTypeId'] = '';
      data['judgestatus'] = '1';
      data['smallTypeName'] = $('.maskdiv:eq(0) select:eq(1)').val().split('_#$#_')[1];
    }else{
      data['smallTypeId'] = $('.maskdiv:eq(0) select:eq(1)').val();
      if(data['smallTypeId'] === "请选择"){
    	  alert('请选择小类');
    	  return;
      }
      data['judgestatus'] = '0';
    }
    for(var i = 0; i < bigType.length; i ++){
    	if(data['bigTypeId'] === bigType[i].bigTypeId){
    		data['characters'] = bigType[i].characters;
    		break;
    	}
    }
    //data['characters'] = $('.maskdiv:eq(0) select:first').val().split('_#$#_')[1];//大类特征
    data['useAccount'] = $('.maskdiv:eq(0) select:eq(2)').val();//使用负责人帐号
    if(data['useAccount'] === '请选择'){
    	alert('请选择使用负责人');
    	return;
    }
    //console.log(data);
    //data = JSON.stringify(data);
    $.ajax({
      url:urlRoot + 'inboundPutLib',
      data:{
    	  "materialId":data['materialId'],
    	  "materialName":data['materialName'],
    	  "price":data['price'],
    	  "number":data['number'],
    	  "buyTime":data['buyTime'],
    	  "price":data['price'],
    	  "standard":data['standard'],
    	  "purpose":data['purpose'],
    	  "price":data['price'],
    	  "comments":data['comments'],
    	  "bigTypeId":data['bigTypeId'],
    	  "smallTypeId":data['smallTypeId'],
    	  "judgestatus":data['judgestatus'],
    	  "smallTypeName":data['smallTypeName'],
    	  "characters":data['characters'],
    	  "useAccount":data['useAccount']
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
        alert('入库成功');
        p_in_getType();//获取类别
        p_se_getAllNum('1',{"flag":"1"});//加载页码
        p_se_selectAll(0,10);//查询全部材料
        $('.mask').hide();
        $('.maskdiv:eq(0)').hide();
        $('.maskdiv:eq(0) input').val('');
      }else{
        alert(data.msg);
      }
      
    }
  })
  $('.maskdiv:eq(0) .btn:eq(1)').unbind();
  $('.maskdiv:eq(0) .btn:eq(1)').click(function(){
	  $('.maskdiv:eq(0) input').val('');
  })
  $('.maskdiv:eq(0) .maskClose').unbind();
  $('.maskdiv:eq(0) .maskClose').click(function(){
	  $('.maskdiv:eq(0) input').val('');
  })

  //添加小类
  function addSmallType(){
    $('.maskdiv:eq(0) #smallType').change(function(){
      if($(this).val() === '新建小类别'){
        $('.mask').show();
        $('.maskdiv:eq(0)').hide();
        $(this).val('请选择');
        $('.maskdiv:eq(8)').show();
      }
    })

    $('.maskdiv:eq(8) .btn:eq(0)').click(function(){
      console.log('ok');
      var t = $('.maskdiv:eq(8) input:eq(0)').val();
      var e = '<option value="_new_#$#_' + t +'">' + t + '</option>';
      $(e).insertBefore('.maskdiv:eq(0) td:eq(4) select:last option:eq(1)');
      $('.mask').show();
      $('.maskdiv:eq(8)').hide();
      $('.maskdiv:eq(0)').show();
    })
    $('.maskdiv:eq(8) .btn:eq(1)').click(function(){
      $('.mask').show();
      $('.maskdiv:eq(8)').hide();
      $('.maskdiv:eq(0)').show();
    })
  }
}
//获取使用负责人
function p_in_getUseAccount(){
  $.ajax({
    url:urlRoot + 'inboundPutLib',
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
    	
      useAccount = data.data;
      $('.maskdiv:eq(0) select:last').html('<option>请选择</option>');
      var ht;
      for(var i = 0; i < useAccount.length; i ++){
        ht = '<option value = "' + useAccount[i].account + '">' + useAccount[i].username + '</option>';
        $('.maskdiv:eq(0) select:last').append(ht);
      }
    }else{
      alert(data.msg);
    }
  }
}
//编辑材料
function p_in_editMaterialsInfo(){
  $('#resultList .editInfo').click(function(){
    var name = $(this.parentNode.parentNode).children('td:eq(2)').text();
    var materialId = $(this.parentNode.parentNode).children('td:eq(1)').text();
    $('.maskdiv:eq(6) #originName').val(name);
    $('.maskdiv:eq(6) td:eq(0) span:eq(1)').html(materialId);
    addOldInfo(materialId);
    $('.mask').show();
    $('.maskdiv:eq(6)').show();
  })
  $('.maskdiv:eq(6) .btn:first').unbind();
  $('.maskdiv:eq(6) .btn:first').click(function(){
    var data = {};
    data['materialId'] = $('.maskdiv:eq(6) td:eq(0) span:eq(1)').text();//获取材料ID
    data['useAccount'] = $('.maskdiv:eq(6) select:first').val();//使用负责人
    data['status'] = $('.maskdiv:eq(6) select:eq(1)').val();//状态
    data['materialName'] = $('.maskdiv:eq(6) input:eq(0)').val();//材料名称
    data['purpose'] = $('.maskdiv:eq(6) input:eq(2)').val();//用途
    data['buyTime'] = $('.maskdiv:eq(6) input:eq(3)').val();//采购时间
    data['price'] = $('.maskdiv:eq(6) input:eq(4)').val();//单价
    data['standard'] = $('.maskdiv:eq(6) input:eq(5)').val();//规格
    data['number'] = $('.maskdiv:eq(6) input:eq(6)').val();//件数
    data['comments'] = $('.maskdiv:eq(6) input:eq(7)').val();//备注
    data['characters'] = $('.maskdiv:eq(6) td:eq(2) span:eq(1) input').val();//大类特征

    if(data['useAccount'] === '请选择'){
    	alert('请选择使用负责人');
    	return;
    }
    //data = JSON.stringify(data);
    //console.log(data);
    $.ajax({
      url:urlRoot + 'inboundUpdate',
      data:{
    	  "characters":data['characters'],
    	  "materialId":data['materialId'],
    	  "useAccount":data['useAccount'],
    	  "status":data['status'],
    	  "materialName":data['materialName'],
    	  "purpose":data['purpose'],
    	  "buyTime":data['buyTime'],
    	  "price":data['price'],
    	  "standard":data['standard'],
    	  "number":data['number'],
    	  "comments":data['comments']
      },
      type:'post',
      dataType:'json',
      async:false,
      success:function(data, status){
        handledt(data);
      },
      error:function(data, status, e){
        console.log(data);
      }
    })

    function handledt(data){
      if(data.code === 0){
        alert('修改成功');
        p_se_selectAll(0,10);//查询全部材料
        $('.mask').hide();
        $('.maskdiv:eq(6)').hide();
      }else{
        alert(data.msg);
      }
    }
  })

  function addOldInfo(materialId){
    $.ajax({
      url:urlRoot + 'selectGetAll',
      data:{
        "materialId":materialId
      },
      type:'post',
      dataType:'json',
      async:false,
      success:function(data,status){
        handledata(data);
      },
      error:function(data,status,e){
        console.log(data);
      }
    })
    function handledata(data){
      if(data.code === 0){
        $('.maskdiv:eq(6) select:eq(0)').html('<option>请选择</option>');
        var ht, typeFlag, statuFlag;
        if(data.data.characters === '1'){
        	typeFlag = 1;
        }else{
        	typeFlag = 0;
        }
        for(var i = 0; i < useAccount.length; i ++){
          ht = '<option value = "' + useAccount[i].account + '">' + useAccount[i].username + '</option>';
          $('.maskdiv:eq(6) select:eq(0)').append(ht);
        }

        $('.maskdiv:eq(6) td:eq(2) span:eq(1)').html(data.data.bigTypeName+'<input type="hidden" value="' + data.data.characters + '"/>');
        $('.maskdiv:eq(6) td:eq(3) span:eq(1)').html(data.data.smallTypeName);
        $('.maskdiv:eq(6) input:eq(2)').val(data.data.purpose);
        $('.maskdiv:eq(6) input:eq(3)').val(data.data.buyTime);
        $('.maskdiv:eq(6) input:eq(4)').val(data.data.price);
        if(typeFlag === 0){
        	$('.maskdiv:eq(6) input:eq(5)').attr('disabled', 'disabled');
        	$('.maskdiv:eq(6) input:eq(6)').attr('disabled', 'disabled');
        }else{
        	$('.maskdiv:eq(6) input:eq(5)').removeAttr('disabled');
        	$('.maskdiv:eq(6) input:eq(6)').removeAttr('disabled');
        }
        $('.maskdiv:eq(6) input:eq(5)').val(data.data.standard);
        $('.maskdiv:eq(6) input:eq(6)').val(data.data.number);
        $('.maskdiv:eq(6) input:eq(7)').val(data.data.comments);
        $('.maskdiv:eq(6) select:eq(0)').val(data.data.useUserAccount);
        if(typeFlag === 1 || data.data.status != '1'){
        	$('.maskdiv:eq(6) select:eq(1)').attr('disabled', 'disabled');
        	statuFlag = '<option value="0">删除</option>'+
                '<option value="1">良好</option>'+
                '<option value="2">损坏</option>'+
                '<option value="3">耗尽</option>'+
                '<option value="4">借出</option>'+
                '<option value="5">维修</option>';
        }else{
        	$('.maskdiv:eq(6) select:eq(1)').removeAttr('disabled');
        	statuFlag = '<option value="1">良好</option><option value="2">损坏</option><option value="3">耗尽</option>';
        }
        $('.maskdiv:eq(6) select:eq(1)').html(statuFlag);
        $('.maskdiv:eq(6) select:eq(1)').val(data.data.status);
      }else{
        alert(data.msg);
      }
    }
  }
}
