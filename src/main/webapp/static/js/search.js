//加载全部材料页数条数
function p_se_getAllNum(flag,data){
  $.ajax({
    url:urlRoot + 'listQuery',
    type:'get',
    data:data,
    dataType:'json',
    async:false,
    success: function(d, status) {
        handleData(flag,d);
    },
    error: function(d, status, e) {
        console.log(d);
    }
  })

  function handleData(flag,d){
    if(d.code === 0){
      switch (flag) {
        case '1'://all
        case '3':
          $('.result .switchPage .totalPages').text(d.data.page);
          $('.result .switchPage .totalResult').text(d.data.sum);
          $('.result .switchPage .currentPage').text('1');
          break;
        case '2'://history
          $('.maskdiv:eq(3) .switchPage .totalPages').text(d.data.page);
          $('.maskdiv:eq(3) .switchPage .totalResult').text(d.data.sum);
          $('.maskdiv:eq(3) .switchPage .currentPage').text('1');
          break;
        /*case '3'://list
          $('.resultList1 .switchPage .totalPages').text(d.data.page);
          $('.resultList1 .switchPage .totalResult').text(d.data.sum);
          $('.resultList1 .switchPage .currentPage').text('1');
          break;*/
      }
    }else{
      alert(d.msg);
    }
  }
}
//加载全部列表页码事件
function p_se_allSwitchPage(data){
  $('.result .switchPage li').click(function(){
	var btnType = $('.searchTab .btn-primary').text();
    var currentPage = $('.result .switchPage .currentPage').text();
    var totalPages = $('.result .switchPage .totalPages').text();

    var txt = $(this).text();
    var p;
    var len = 10;
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
    if(btnType === '查询'){
    	p_se_selectList_ajax(p,len,listSelect);
    }else{
    	p_se_selectAll(p,len);
    }
  })
}
//加载全部列表
function p_se_selectAll(page,offset) {
	p_se_getAllNum('1',{"flag":"1"});//获取页码
    $.ajax({
        url: urlRoot + 'selectGetAll',
        data: {
          "page":parseInt(page)+1,
          "offset":offset
        },
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(d, status) {
            handleData(d,page);
        },
        error: function(d, status, e) {
            console.log(d);
        }
    })
    function handleData(d) {
        if (d.code === 0) {
            $('#resultList tbody').html('');
            for (var i = 0; i < d.data.length; i++) {
                var ht = '<tr>' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' + d.data[i].materialId + '</td>' +
                    '<td>' + d.data[i].materialName + '</td>' +
                    '<td>' + d.data[i].surplus + '</td>' +
                    '<td>' + g_parseMaterialQStatus(d.data[i].status) + '</td>' +
                    '<td><a href="#" class="viewInfo">查看</a></td>' +
                    '<td><a href="#" class="viewHistory">查看</a></td>' +
                    '<td><a href="#" class="editInfo">编辑</a></td>' ;
                if(d.data[i].status === '1' && d.data[i].characters === '1'){
                	ht += '<td><a href="#" class="output">使用</a></td>';
                }else if(d.data[i].status === '1' && d.data[i].characters === '0'){
                	ht += '<td><a href="#" class="output">借出</a></td>';
                }else if(d.data[i].status === '2'){
                	ht += '<td><a href="#" class="output">维修</a></td>';
                }else if(d.data[i].status === '3'){
                	ht += '<td><a href="#" class="output">不能出库</a></td>';
                }else if(d.data[i].status === '4'){
                	ht += '<td><a href="#" class="output">归还</a></td>';
                }else if(d.data[i].status === '5'){
                	ht += '<td><a href="#" class="output">归还</a></td>';
                }else{
                	console.log('材料状态错误！');
                }
                
                if (identity === '0') {
                    ht += '<td><a href="#" class="warn">删除</a></td>';
                }
                ht += '</tr>';
                $('#resultList tbody').append(ht);
            }
            $('.result .switchPage .currentPage').text(parseInt(page) + 1);
            p_se_viewInfo();//查看详情
            p_se_viewHistory();//查看历史使用记录
            p_in_editMaterialsInfo();//编辑材料
            p_out_output();//出库
            if(identity === '0'){
              p_admin_deleteMaterials();//删除材料
            }
        } else {
            alert(d.msg);
        }
    }
}
//查看材料详情
function p_se_viewInfo(){
  $('#resultList .viewInfo').click(function(){
    var materialId = $(this.parentNode.parentNode).children('td:eq(1)').text();
    $.ajax({
      url:urlRoot + 'selectGetAll',
      data:{
        "materialId":materialId
      },
      type:'post',
      dataType:'json',
      async:false,
      success:function(data,status){
        handleData(data);
      },
      error:function(data,status,e){
        console.log(data);
      }
    })

    function handleData(data){
      if(data.code === 0){
        $('.maskdiv:eq(2) td:eq(0) span:eq(1)').html(data.data.materialId);
        $('.maskdiv:eq(2) td:eq(1) span:eq(1)').html(data.data.materialName);
        $('.maskdiv:eq(2) td:eq(2) span:eq(1)').html(data.data.bigTypeName);
        $('.maskdiv:eq(2) td:eq(3) span:eq(1)').html(data.data.smallTypeName);
        $('.maskdiv:eq(2) td:eq(4) span:eq(1)').html(data.data.inUserName);
        $('.maskdiv:eq(2) td:eq(5) span:eq(1)').html(data.data.useUserName);
        $('.maskdiv:eq(2) td:eq(6) span:eq(1)').html(data.data.purpose);
        $('.maskdiv:eq(2) td:eq(7) span:eq(1)').html(data.data.buyTime);
        $('.maskdiv:eq(2) td:eq(8) span:eq(1)').html(data.data.price);
        $('.maskdiv:eq(2) td:eq(9) span:eq(1)').html(data.data.standard);
        $('.maskdiv:eq(2) td:eq(10) span:eq(1)').html(data.data.number);
        $('.maskdiv:eq(2) td:eq(11) span:eq(1)').html(data.data.surplus);
        $('.maskdiv:eq(2) td:eq(12) span:eq(1)').html(g_parseMaterialQStatus(data.data.status));
        $('.maskdiv:eq(2) td:eq(13) span:eq(1)').html(data.data.comments);
      }else{
        alert(data.msg);
      }
    }
    $('.mask').show();
    $('.maskdiv:eq(2)').show();
  })
  $('.maskdiv:eq(2) .btn:first').unbind();
  $('.maskdiv:eq(2) .btn:first').click(function(){
    $('.mask').hide();
    $('.maskdiv:eq(2)').hide();
  })
  g_closeMask();//关闭弹出框
}
//获取材料历史使用情况
function p_se_viewHistory(page,offset){
  $('#resultList .viewHistory').click(function(){

    var materialId = $(this.parentNode.parentNode).children('td:eq(1)').text();
    p_se_getAllNum('2',{"flag":"2","materialId":materialId});//获取页码
    p_se_viewHistory_ajax(0,10,materialId);
    p_se_historySwitchPage(materialId);
    
    
  })
  $('.maskdiv:eq(3) .btn:first').unbind();
  $('.maskdiv:eq(3) .btn:first').click(function(){
    $('.mask').hide();
    $('.maskdiv:eq(3)').hide();
  })
}
//viewHistory page click
function p_se_historySwitchPage(materialId){
  $('.maskdiv:eq(3) .switchPage li').click(function(){
    var currentPage = $('.maskdiv:eq(3) .switchPage .currentPage').text();
    var totalPages = $('.maskdiv:eq(3) .switchPage .totalPages').text();

    var txt = $(this).text();
    var p;
    var len = 10;
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
    p_se_viewHistory_ajax(p,len,materialId);
  })
}
//viewHistory_ajax
function p_se_viewHistory_ajax(page,offset,materialId){
	//console.log(materialId);
  $.ajax({
    url:urlRoot + 'selectGetdatainfo',
    data:{
      "page":parseInt(page)+1,
      "offset":offset,
      "materialId":materialId
    },
    type:'get',
    dataType:'json',
    async:false,
    success:function(data,status){
      handleData(data);
    },
    error:function(data,status,e){
      console.log(data);
    }
  })

  function handleData(data){
    if(data.code === 0){
      $('.maskdiv:eq(3) tbody').html('');
      if(data.data !== ''){
        console.log(data);
        for(var i = 0; i < data.data.length; i++){
          var ht = '<tr>'+
                '<td>' + (i+1) + '</td>' +
                '<td>' + data.data[i].materialName + '</td>' +
                '<td>' + data.data[i].number + '</td>' +
                '<td>' + data.data[i].useTime + '</td>' +
                '<td>' + data.data[i].username + '</td>' +
                '<td>' + g_parseMaterialStatus(data.data[i].operate) + '</td>' +
                '</td>';
          $('.maskdiv:eq(3) tbody').append(ht);
        }
        $('.maskdiv:eq(3) .switchPage .currentPage').text(parseInt(page) + 1);
      }else{
        $('.maskdiv:eq(3) tbody').html('没有记录');
      }
      if($('.maskdiv:eq(3)').is(':hidden')&&$('.mask').is(':hidden')){
    	  $('.mask').show();
    	   $('.maskdiv:eq(3)').show();
      }
    }else{
      alert(data.msg);
    }
  }
}
//列表查询
function p_se_selectList(){
  $('.searchTab .btn:eq(0)').click(function(){
	  $('.searchTab .btn').removeClass('btn-primary');
	  $(this).addClass('btn-primary');
    var data = {};
    data['bigTypeId'] = $('.searchTab select:first').val();//大类id
    data['smallTypeId'] = $('.searchTab select:eq(1)').val();//小类id
    data['materialId'] = $('.searchTab input:eq(0)').val();//材料号
    data['surplus'] = $('.searchTab input:eq(1)').val();//余量
    data['priceUp'] = $('.searchTab input:eq(2)').val();//价格上区间
    data['priceDown'] = $('.searchTab input:eq(3)').val();//价格下区间
    data['inAccount'] = $('.searchTab select:eq(2)').val();//采购人
    data['timeId'] = p_se_parseBuyTime($('.searchTab .time .active').text());//采购时间
    //data['page'] = 1;//页数
    //data['offset'] = 10;//

    //data = JSON.stringify(data);
    console.log(data);
    p_se_getAllNum('3',{
      "flag":"3",
      "bigTypeId":data['bigTypeId'],
      "smallTypeId":data['smallTypeId'],
      "materialId":data['materialId'],
      "surplus":data['surplus'],
      "priceUp":data['priceUp'],
      "priceDown":data['priceDown'],
      "inAccount":data['inAccount'],
      "timeId":data['timeId']
    });//获取页码
    listSelect = data;
    p_se_selectList_ajax(0,10,data);
    //p_se_historySwitchPage(data);
  })
  $('.searchTab .btn:eq(1)').click(function(){
	  $('.searchTab .btn').removeClass('btn-primary');
	  $(this).addClass('btn-primary');
	  p_se_selectAll(0,10);//查询全部材料
//    $('.result').show();
//    $('.resultList1').hide();
  })
}
//selectlist page click
/*
function p_se_historySwitchPage(data){
	$('.resultList1 .switchPage li').unbind();
  $('.resultList1 .switchPage li').click(function(){
    var currentPage = $('.resultList1 .switchPage .currentPage').text();
    var totalPages = $('.resultList1 .switchPage .totalPages').text();

    var txt = $(this).text();
    var p;
    var len = 10;
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
    p_se_selectList_ajax(p,len,data);
  })
}
*/
//get list search
function p_se_selectList_ajax(page,offset,data){
  $.ajax({
    url:urlRoot + 'listQuery',
    data:{
      "bigTypeId":data['bigTypeId'],
      "smallTypeId":data['smallTypeId'],
      "materialId":data['materialId'],
      "surplus":data['surplus'],
      "priceUp":data['priceUp'],
      "priceDown":data['priceDown'],
      "inAccount":data['inAccount'],
      "timeId":data['timeId'],
      "page":parseInt(page)+1,
      "offset":offset
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
      if(data.data !== ''){
    	  $('#resultList tbody').html('');
        //$('.resultList1 tbody').html('');
        for(var i = 0; i < data.data.length; i ++){
        	var ht = '<tr>' +
            '<td>' + (i + 1) + '</td>' +
            '<td>' + data.data[i].materialId + '</td>' +
            '<td>' + data.data[i].materialName + '</td>' +
            '<td>' + data.data[i].surplus + '</td>' +
            '<td>' + g_parseMaterialQStatus(data.data[i].status) + '</td>' +
            '<td><a href="#" class="viewInfo">查看</a></td>' +
            '<td><a href="#" class="viewHistory">查看</a></td>' +
            '<td><a href="#" class="editInfo">编辑</a></td>' ;
        if(data.data[i].status === '1' && data.data[i].characters === '1'){
        	ht += '<td><a href="#" class="output">使用</a></td>';
        }else if(data.data[i].status === '1' && data.data[i].characters === '0'){
        	ht += '<td><a href="#" class="output">借出</a></td>';
        }else if(data.data[i].status === '2'){
        	ht += '<td><a href="#" class="output">维修</a></td>';
        }else if(data.data[i].status === '3'){
        	ht += '<td><a href="#" class="output">不能出库</a></td>';
        }else if(data.data[i].status === '4'){
        	ht += '<td><a href="#" class="output">归还</a></td>';
        }else if(data.data[i].status === '5'){
        	ht += '<td><a href="#" class="output">归还</a></td>';
        }else{
        	console.log('材料状态错误！');
        }
        
        if (identity === '0') {
            ht += '<td><a href="#" class="warn">删除</a></td>';
        }
        ht += '</tr>';
        $('#resultList tbody').append(ht);
        }
        $('.result .switchPage .currentPage').text(parseInt(page) + 1);
        p_se_viewInfo();//查看详情
        p_se_viewHistory();//查看历史使用记录
        p_in_editMaterialsInfo();//编辑材料
        p_out_output();//出库
        if(identity === '0'){
          p_admin_deleteMaterials();//删除材料
        }
//        $('.resultList1').show();
//        $('.result').hide();
      }else{
        $('.resultList1 tbody').html('没有记录');
        alert('没有记录');
      }
      p_out_output();//出库
    }else{
      alert(data.msg);
    }
  }
}
//获取采购人
function p_se_getInuser(){
  $.ajax({
    url:urlRoot + 'selectGetname',
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
      inUsers = data.data;
      $('.searchTab select:eq(2)').html('<option value="">请选择</option>');
      for(var i = 0; i < inUsers.length; i++){
        var ht = '<option value="' + inUsers[i].inAccount + '">' + inUsers[i].username + '</option>';
        $('.searchTab select:eq(2)').append(ht);
      }
    }else{
      console.log(data.msg);
    }
  }
}
//采购时间转换函数
function p_se_parseBuyTime(name){
  switch (name) {
    case '不限时间':
      return 0;
    case '一周内':
      return 1;
    case '一月内':
      return 2;
    case '半年内':
      return 3;
    case '一年内':
      return 4;
    default:
      alert('采购时间状态码错误');
  }
}
//列表查询的采购时间
function p_se_selectTime(){
  $('.time .checkBoxBtn').click(function(){
    $('.time .checkBoxBtn').removeClass('active');
    $(this).addClass('active');
  })
}
