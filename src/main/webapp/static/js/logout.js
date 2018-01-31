//登出
$(function(){
	$("#logout").unbind("click").click(function(){
		window.location.replace("login.jsp");
	});
});
