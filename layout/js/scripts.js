$(function() {


});

$(function() {
	$(".header-menu-icon").click(function(){
		$(this).toggleClass("on");
		$(".sidebar").toggleClass("sidebar-show");
		return false;
	});

	$(".price-slider").each(function(){
		var pmin = parseInt($(this).siblings("input[name=min-val]").val());
		var pmax = parseInt($(this).siblings("input[name=max-val]").val());
		var pval = parseInt($(this).parents(".price-block").find(".price-range-input").val());
		$(this).parents(".price-block").find(".price-range-input").val(f1(pval));//)
		$(this).slider({
			min: pmin,
			max: pmax,
			value: pval,
			change: function( event, ui ) {
				$(this).parents(".price-block").find(".price-range-input").val(f1(ui.value));
			},
			slide: function( event, ui ) {
				$(this).parents(".price-block").find(".price-range-input").val(f1(ui.value));
			}
		});
	});

	$(".price-range-input").blur(function(){
		if(!isNaN(parseInt($(this).val()))){
			$(this).parents(".price-block").find(".price-slider").slider( "option", "value", f1(parseInt($(this).val())) );
		} else{
			$(this).val($(this).parents(".price-block").find(".price-slider").slider( "option", "value"));
		}
	});

	$(".price-range-input").keyup(function(e){
		if(e.keyCode === 13){
			$(this).trigger("blur");
		}
	});






	$(".price-slider-log").each(function(){
		var pmin = parseInt($(this).siblings("input[name=min-val]").val());
		var pmax = parseInt($(this).siblings("input[name=max-val]").val());
		var pval = parseInt($(this).parents(".price-block").find(".price-range-input-log").val());
		$(this).parents(".price-block").find(".price-range-input-log").val(f2(pval));//)
		$(this).slider({
			min: pmin,
			max: pmax,
			value: pval,
			change: function( event, ui ) {
				$(this).parents(".price-block").find(".price-range-input-log").val(f2(parseInt(ui.value)));
			},
			slide: function( event, ui ) {
				$(this).parents(".price-block").find(".price-range-input-log").val(f2(parseInt(ui.value)));
			}
		});
	});

	$(".price-range-input-log").blur(function(){
		if(!isNaN(parseInt($(this).val()))){
			$(this).parents(".price-block").find(".price-slider-log").slider( "option", "value", f2_rev(parseInt($(this).val())) );
		} else{
			$(this).val($(this).parents(".price-slider-log").find(".price-slider").slider( "option", "value"));
		}
	});

	$(".price-range-input-log").keyup(function(e){
		if(e.keyCode === 13){
			$(this).trigger("blur");
		}
	});







	$(".price-slider-log2").each(function(){
		var pmin = parseInt($(this).siblings("input[name=min-val]").val());
		var pmax = parseInt($(this).siblings("input[name=max-val]").val());
		var pval = parseInt($(this).parents(".price-block").find(".price-range-input-log2").val());
		$(this).parents(".price-block").find(".price-range-input-log2").val(f3(pval));//)
		$(this).slider({
			min: pmin,
			max: pmax,
			value: pval,
			change: function( event, ui ) {
				$(this).parents(".price-block").find(".price-range-input-log2").val(f3(parseInt(ui.value)));
			},
			slide: function( event, ui ) {
				$(this).parents(".price-block").find(".price-range-input-log2").val(f3(parseInt(ui.value)));
			}
		});
	});

	$(".price-range-input-log2").blur(function(){
		if(!isNaN(parseInt($(this).val()))){
			$(this).parents(".price-block").find(".price-slider-log2").slider( "option", "value", f3_rev(parseInt($(this).val())) );
		} else{
			$(this).val($(this).parents(".price-slider-log2").find(".price-slider").slider( "option", "value"));
		}
	});

	$(".price-range-input-log2").keyup(function(e){
		if(e.keyCode === 13){
			$(this).trigger("blur");
		}
	});

});

function f1(val){
	return val===0?1:val;
}

function f2(val){
	if(val>=20&&val<=100){
		return val;
	} else if(val>100&&val<=120){
		return 100 + ((val-100)*5);
	} else if(val>120&&val<=160){
		return 200 + ((val-120)*20);
	} else if(val>160&&val<=180){
		return 1000 + ((val-160)*50);
	}
	return val;
}

function f2_rev(val){
	if(val>=20&&val<=100){
		return val;
	} else if(val>100&&val<=200){
		return 100 + Math.floor((val-100)/5);
	} else if(val>200&&val<=1000){
		return 120 + Math.floor((val-200)/20);
	} else if(val>1000&&val<=2000){
		return 160 + Math.floor((val-1000)/50);
	}
	return val;
}


function f3(val){
	if(val == 0){
		return 1;
	}else if(val>=1&&val<=50){
		return val;
	} else if(val>50&&val<90){
		return 50 + ((val-50)*5);
	} else if(val==90){
		return 254;
	}
	return val;
}

function f3_rev(val){
	if(val == 0){
		return 1;
	} else if(val>=1&&val<=50){
		return val;
	} else if(val>50&&val<=254){
		return 50 + Math.floor((val-50)/5);
	}
	return val;
}