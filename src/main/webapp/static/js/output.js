//出库
function p_out_output(){
  $('.maskdiv:eq(1) .btn:first').unbind();
  $('.output').click(function(){
	  var clickFlag = $(this).text();
	  if(clickFlag === '不能出库'){
		  alert('不能出库！');
		  return;
	  }
	  if(clickFlag != '使用'){
		  $('.maskdiv:eq(1) td:eq(3)').hide();
	  }else{
		  $('.maskdiv:eq(1) td:eq(3)').show();
	  }
    $('.maskdiv:eq(1) td:eq(0) input').val('');
    $('.maskdiv:eq(1) td:eq(1) input').val('');
    $('.maskdiv:eq(1) td:eq(0) input').attr('disabled',false);
    $('.maskdiv:eq(1) td:eq(1) input').attr('disabled',false);
    if(!$(this).hasClass('btn')){
      var name = $(this.parentNode.parentNode).children('td:eq(2)').html();
      var materialId = $(this.parentNode.parentNode).children('td:eq(1)').html();
      $('.maskdiv:eq(1) td:eq(0) input').val(materialId);
      $('.maskdiv:eq(1) td:eq(0) input').attr('disabled','true');
      $('.maskdiv:eq(1) td:eq(1) input').val(name);
      $('.maskdiv:eq(1) td:eq(1) input').attr('disabled','true');
      $('.maskdiv:eq(1) select:first').val(clickFlag);
      $('.maskdiv:eq(1) select:first').attr('disabled','true');
    }else{
    	$('.maskdiv:eq(1) select:first').removeAttr('disabled');
    }
    $('.mask').show();
    $('.maskdiv:eq(1)').show();
  })
  $('.maskdiv:eq(1) .btn:first').click(function(){
    var url;
    var data = {};
    data['materialId'] = $('.maskdiv:eq(1) td:eq(0) input').val();
    data['number'] = $('.maskdiv:eq(1) input:eq(2)').val();
    var o = $('.maskdiv:eq(1) select:first').val();
    switch (o) {
      case '使用':
        url = urlRoot + 'outboundUse';
        break;
      case '借出':
    	  url = urlRoot + 'outboundUse';
    	  data['number'] = '1';
    	  break;
      case '归还':
        url = urlRoot + 'outboundReturn';
        break;
      case '维修':
        url = urlRoot + 'outboundRepair';
        break;
      default:
        console.error('出库操作参数错误');
        return;
    }

    $.ajax({
      url:url,
      data:{
    	  "materialId":data['materialId'],
    	  "number":data['number']
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
        alert( o + '成功');
        var btnType = $('.searchTab .btn-primary').text();
        var currentPage = $('.result .switchPage .currentPage').text();
        if(btnType === '查询'){
        	//debugger;
        	//p_se_getAllNum('3',listSelect);
        	p_se_selectList_ajax(currentPage-1,10,listSelect);
        }else{
        	p_se_selectAll(currentPage-1,10);//查询全部材料
        }
        $('.mask').hide();
        $('.maskdiv:eq(1)').hide();
      }else{
        alert(data.msg);
      }
      $('.maskdiv:eq(1) input').val('');
    }
  })
}
