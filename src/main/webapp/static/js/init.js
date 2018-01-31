$(document).ready(function(){
  g_openLoadingAnimation(); //打开加载动画
  g_getIdentity();//加载身份
  p_se_getInuser();//加载采购人
  p_in_getUseAccount();//获取使用负责人
  p_in_getType();//获取类别
  p_in_dealType('.searchTab td:eq(0)');//搜索狂的类别选择
  p_in_dealNav();//处理导航栏
  p_in_input();//入库
  p_se_selectTime();//列表查询的选择时间
  p_se_getAllNum('1',{"flag":"1"});//获取页码
  p_se_selectAll(0,10);//查询全部材料
  p_se_allSwitchPage();

  p_se_selectList();//列表查询
  if(identity === '0'){
    p_admin_getNormalUser();//获取普通用户
    p_admin_addUsers();//添加用户
    p_admin_getType();//获取所有类别
  }
  g_closeLoadingAnimation();
  
  $("#inputTime").jeDate({
	    format:"YYYY-MM-DD hh:mm",
	    isTime:true, 
	    minDate:"2016-09-19 00:00:00"
	})
	$('#editTime').jeDate({
	    format:"YYYY-MM-DD hh:mm",
	    isTime:true, 
	    minDate:"2016-09-19 00:00:00"
	})
	$('#editPwd').click(function(){
		$('.mask').show();
        $('.maskdiv:eq(9)').show();
        $('.maskdiv:eq(9) .btn:eq(0)').unbind();
        $('.maskdiv:eq(9) .btn:eq(0)').click(function(){
        	$.ajax({
        		url: urlRoot + 'updatePassword',
        		data:{
        	    	  "oldPassword":$('.maskdiv:eq(9) input:eq(0)').val(),
        	    	  "newPassword1":$('.maskdiv:eq(9) input:eq(1)').val(),
        	    	  "newPassword2":$('.maskdiv:eq(9) input:eq(2)').val()
        	      },
        	      type:'post',
        	      dataType:'json',
        	      async:false,
        	      success:function(data, status){
        	    	  if(data.code === 0){
        	    		  alert('修改成功！');
        	    		  $('.mask').hide();
        	    	      $('.maskdiv:eq(9)').hide();
        	    	      $('.maskdiv:eq(9) input').val('');
        	    	  }else{
        	    		  alert(data.msg);
        	    	  }
        	      },
        	      error:function(data, status, e){
        	        console.log(data);
        	      }
        	})
        })
	})
})
