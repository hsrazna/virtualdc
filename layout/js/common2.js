$(function() {
	$(".header-menu-icon").click(function(){
		$(this).toggleClass("on");
		$(".sidebar").toggleClass("sidebar-show");
		return false;
	});

});
