$(function(){
	//用户信息请求
	$.ajax({
		url: 'http://test.api.jibox.cn/match/love/api_user_info?callback_format=jsonp',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			user_id: 165
		},
		success: function(res){
			console.log(res)
			if(res.flag === 'false'){
				$('.toast').text(res.info)
				$('.toast').show()
				setTimeout(function(){
					$('.toast').fadeOut()
				},1000)
			}else{
				$('.head-pic')[0].src = res.data.obj.head
				$('.head-nickname').text(res.data.obj.nickname)
			}			
		},
		error: function(error){
			console.log('用户信息获取失败')
		}
	})
	//换一批请求
	changeBatchReq()
	function changeBatchReq(){
		$.ajax({
			url: 'http://test.api.jibox.cn/match/love/api_love_list?callback_format=jsonp',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				is_rand: 1
			},
			success: function(res){
				console.log(res)
				/*
				 *	derection: p-user-info/p-user-info-horizontal
				 */
				/*function htmlTemplet(derection,type2,c,d){ 
					html = `<div class="${derection}${type2}">
										<div class="p-user1 mr4">
											<img src="../love/images/role/${res.data.list[i].user_role_opt}.png">
											<span>${user_name}</span>
										</div>
										<div class="p-user1">
											<img src="../love/images/role/${res.data.list[i].be_user_role_opt}.png">
											<span>${be_user_name}</span>
										</div>
										<div class="p-user2"></div>
										<div class="time-type1">${res.data.list[i].love_date_text}</div>
									</div>`
				}*/
				$('.p-wrap').html('')
				for (var i = 0; i < res.data.list.length; i++) {
					var style_opt = res.data.list[i].style_opt
					var user_name = res.data.list[i].user_name
					var be_user_name =res.data.list[i].be_user_name

					user_name = user_name.length>6?user_name.substring(0,6):user_name
					be_user_name = be_user_name.length>6?be_user_name.substring(0,6):be_user_name
					
					var html = ''				
					$('.s-name'+i).text(res.data.list[i].user_name+'&'+res.data.list[i].be_user_name)
					$('.s-img'+i)[0].src='../love/images/'+style_opt+'.png'
					switch(style_opt){
						case 1:
							html = `<div class="p-user-info">
										<div class="p-user1 mr4">
											<img src="../love/images/role/${res.data.list[i].user_role_opt}.png">
											<span>${user_name}</span>
										</div>
										<div class="p-user1">
											<img src="../love/images/role/${res.data.list[i].be_user_role_opt}.png">
											<span>${be_user_name}</span>
										</div>
										<div class="p-user2"></div>
										<div class="time-type1">${res.data.list[i].love_date_text}</div>
									</div>`
							break;							
						case 2: //1、2差别 就一个type2
						case 3:
							html = `<div class="p-user-info type2">
										<div class="p-user1 mr4">
											<img src="../love/images/role/${res.data.list[i].user_role_opt}.png">
											<span>${user_name}</span>
										</div>
										<div class="p-user1">
											<img src="../love/images/role/${res.data.list[i].be_user_role_opt}.png">
											<span>${be_user_name}</span>
										</div>
										<div class="p-user2"></div>
										<div class="time-type1">${res.data.list[i].love_date_text}</div>
									</div>`
							break;						
						case 4:
							html = `<div class="p-user-info-horizontal">
										<div class="p-user1">
											<img src="../love/images/role/${res.data.list[i].user_role_opt}.png">
											<span>${user_name}</span>
										</div>
										<div class="p-user1">
											<img src="../love/images/role/${res.data.list[i].be_user_role_opt}.png">
											<span>${user_name}</span>
										</div>										
									</div>`
							break;
						case 5: //4、5只差 type5
							html = `<div class="p-user-info-horizontal type5">
										<div class="p-user1">
											<img src="../love/images/role/${res.data.list[i].user_role_opt}.png">
											<span>${user_name}</span>
										</div>
										<div class="p-user1">
											<img src="../love/images/role/${res.data.list[i].be_user_role_opt}.png">
											<span>${user_name}</span>
										</div>										
									</div>`
							break;
					}
					$('.s-wrap'+i).append(html)
				}
				
			},
			error: function(error){
				console.log('幸福专区列表请求失败')
			}
		})
	}
	//生成情缘证请求
	function createCertificateReq(options,successCallback,errorCallback){
		$.ajax({
			url: 'http://test.api.jibox.cn/match/love/api_love_create?callback_format=jsonp',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				user_id: options.user_id || 165,
				type: options.type,
				user_name: options.user_name,
				user_role_opt: options.user_role_opt,
				be_user_name: options.be_user_name,
				be_user_role_opt: options.be_user_role_opt,
				stylle_opt: options.stylle_opt || 1
			},
			success: function(res){
				successCallback(res)
			},
			error: function(err){
				errorCallback(err)
			}
		})
	}
	$('.head-myCertificate').on('click',function(){
		window.location.href = '../html/my-certificate.html'
	})
	$('.on-change-btn').on('click',function(){
		changeBatchReq()
	})
	$('.btn-create').on('click',function(){
		$('.mask-double').css('display','flex')		
	})	
	$('.btn-invite').on('click',function(){
		$('.mask-single').css('display','flex')
	})
	$('.close-btn').on('touchend',function(){
		$('.mask').css('display','none')
	})
	//单人生产按钮事件
	$('.on-single-create-btn').on('click',function(){
		var user_name = $('.s-nick-name').val()
		var user_role_opt = $('.s-role-select').val()
		var options = {
			type: 1,
			user_name,
			user_role_opt
		}
		console.log(options)
		if(user_name.trim() === '' || user_role_opt === '0'){
			$('.toast').text('请输入相关信息')
			$('.toast').show()
			setTimeout(function(){
				$('.toast').fadeOut()
			},1000)
		}else{
			createCertificateReq(options,
				function(res){
					console.log(res)
					if(res.flag === 'false'){
						$('.toast').text(res.info)
						$('.toast').show()
						setTimeout(function(){
							$('.toast').fadeOut()
						},1000)
					}else{
						matchName = encodeURI(user_name+'&???')
						window.location.href = '../html/half-certificate.html?matchName='+matchName
					}
				},function(err){
					console.log('生成单人情缘证失败')
				})
		}
	})
	//双人生产按钮事件
	$('.on-double-create-btn').on('click',function(){
		var nickName1 = $('.s-nick-name1').val()		
		var user1_role = $('.s-role-select-double-user1').val()
		var nickName2 = $('.s-nick-name2').val()
		var user2_role = $('.s-role-select-double-user2').val()
		var options = {
			type: 2,
			user_name: nickName1,
			user_role_opt: user1_role,
			be_user_name: nickName2,
			be_user_role_opt: user2_role
		}
		console.log(options)
		if(nickName1.trim() === '' || user1_role === '0' || 
			nickName2.trim() === '' || user2_role === '0' ){
			$('.toast').text('请输入相关信息')
			$('.toast').show()
			setTimeout(function(){
				$('.toast').fadeOut()
			},1000)
		}else{
			createCertificateReq(options,
				function(res){
					console.log(res)
					if(res.flag === 'false'){
						$('.toast').text(res.info)
						$('.toast').show()
						setTimeout(function(){
							$('.toast').fadeOut()
						},1000)
					}else{
						matchName = encodeURI(nickName1+'&'+nickName2)
						window.location.href = '../html/share-certificate.html?matchName='+matchName
					}
				},function(err){
					console.log('生成双人情缘证失败')
				})
		}
	})

})

//下拉插件
/*var search = {
    searchKeyword: function () {
        var nWord = $("#search-input").val();
        //var temarray = nWord.split(""); //分割
        var array=this.unique(nWord.split(""));
        var dsa = $("#search").find("ul li a");//获取全部列表
        var linumber = 0;

        $("#search ul li").show();
        for (var t = 0; t < dsa.length; t++) {
            $(dsa[t]).html($(dsa[t]).text());
            var temstr = ($(dsa[t]).text()).split("");
            var yes = false;
            for (var i = 0; i < array.length; i++) {
                var posarr = this.findAll(temstr, array[i]);
                if (posarr.length > 0) {
                    yes = true;
                    for (var j = 0; j < posarr.length; j++) {
                        temstr[posarr[j]] = "<em style='color:red;'>" + temstr[posarr[j]] + "</em>";
                    }
                }
            }
            if (!yes) {
                $(dsa[t]).closest("li").hide();
            }
            else {
                linumber++;
                var htmlstr = "";
                for (var m = 0; m < temstr.length; m++) {
                    htmlstr += temstr[m];
                }
                $(dsa[t]).html(htmlstr);
            }

        }
        if (linumber == 0) {
            $("#search ul li").show();
            $("#search ul").slideDown(200);
        }
    },
    findAll: function (arr, str) {
        var results = [],
            len = arr.length,
            pos = 0;
        while (pos < len) {
            pos = arr.indexOf(str, pos);
            if (pos === -1) {
                break;
            }
            results.push(pos);
            pos++;
        }
        return results;
    },
    unique: function (arr) {
        var new_arr = [];
        for (var i = 0; i < arr.length; i++) {
            var items = arr[i];
            //判断元素是否存在于new_arr中，如果不存在则插入到new_arr的最后
            if ($.inArray(items, new_arr) == -1) {
                new_arr.push(items);
            }
        }
        return new_arr;
    },
    changeValue: function (obj) {
        $('.dropdown ul').slideUp(200);
        var input = $(obj).find('.dropdown-selected');
        var ul = $(obj).find('ul');
        if (!ul.is(':visible')) {
            ul.slideDown('fast');
        } else {
            ul.slideUp('fast');
        }

        $(obj).find('ul a').click(function () {
            input.val($(this).text());
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active')
            $(this).closest('ul').slideUp(200);
            return false;
        })
        var e = this.getEvent();
        window.event ? e.cancelBubble = true : e.stopPropagation();
    },
    _init: function () {
        $("#search").on("click", "ul li a", function () {
            $("#search-input").val($(this).text());
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active')
            $(this).closest('ul').slideUp(200);
            return false;
        })
    },
    getEvent: function(){
    if(window.event){
        return window.event;
    }
    var f = arguments.callee.caller;
    do{
        var e = f.arguments[0];
        if(e && (e.constructor === Event || e.constructor===MouseEvent || e.constructor===KeyboardEvent)){
            return e;
        }
    }while(f=f.caller);
}

}
search._init();*/