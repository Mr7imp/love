$(function(){
	//param
	var time = 90
	var intervalId = null

	$('.on-btn-with-love').on('click',function(){
		$('.mask-download').css('display','flex')
	})
	$('.close-btn-mask-download').on('click',function(){
		$('.mask-download').css('display','none')
	})
	$('.mask-receive-close-btn').on('click',function(){
		$('.mask-receive').css('display','none')
	})
	$('.on-btn-get-package').on('click',function(){
		$('.mask-receive').css('display','flex')
	})
	$('.s-phone-number')[0].oninput = function(){
		if($(this).val().length===11){
	      	$('.getCode').addClass('active')
	      	$('.go-btn').addClass('active')
	      	$('.getCode').attr('disabled',false)
	    }else{
	      	$('.getCode').removeClass('active')
	      	$('.go-btn').removeClass('active')
	      	$('.getCode').attr('disabled',true)
	    }
	}
	//获取验证码
	$('.getCode').on('click',function(){    
	    if(!intervalId){
	      	$(this).removeClass('active')
	      	$(this).text('（'+time+'s）')
	      	//短信验证码请求
	      	$.ajax({
	        	url: 'http://test.api.jibox.cn/match/love/api_send_sms?callback_format=jsonp',
	        	type: 'GET',
	        	dataType: 'jsonp',
	        	data: {
	          		phone: $('.s-phone-number').val()
	        	},
	        	success: function(res){
	          		console.log(res)
	          		if(res.flag==="false"){
	            		showToast(res.info)
	          		}
	        	},
	        	error: function(err){
	          		console.log('发送验证码请求失败')
	        	}
	      	})
	      	intervalId = setInterval(()=>{
	        	time--;
	        	$(this).text('（'+time+'s）')
		        if(time<=0){
		          	clearInterval(intervalId)
		          	intervalId = null
		          	time = 90
		          	$(this).text('获取验证码')
		          	if($('.s-phone-number').val().length===11){
		            	$('.getCode').addClass('active')
		          	}          
		        }
	      },1000)
	    }  
	})
	//
	$('.go-btn').on('click',function(){
		var phone = $('.s-phone-number').val()
		var code = $('.s-verification-code').val()
		if(phone.trim()===''||code.trim()===''){
			showToast('请输入相关信息')
		}else if(!(/^1[3456789]\d{9}$/.test(phone))){     
	      	showToast('手机号格式错误')
	    }else{
	    	$.ajax({
	    		url: 'http://test.api.jibox.cn/match/love/api_get_gift?callback_format=jsonp',
	    		type: 'GET',
	    		dataType: 'jsonp',
	    		data: {
	    			love_no: 'L2019100949101975',
	    			phone,
	    			code
	    		},
	    		success: function(res){
	    			console.log(res)
	    			if(res.flag === 'false'){
	    				showToast(res.info)
	    				if(res.code === 2){ //老用户,不可以领礼包
	    					$('.mask-receive').css('display','none')
	    					$('.mask-tip').css('display','flex')
	    				}
	    			}else if(res.flag === 'success'){
	    				showToast(res.info)
	    			}
	    		},
	    		error: function(err){
	    			console.log('领取喜糖失败')
	    		}
	    	})
	    }
	})
	//领取记录
	$.ajax({
		url: 'http://test.api.jibox.cn/match/love/api_love_gift?callback_format=jsonp',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			love_no: 'L2019100910248561',
			page: 1,
			pagesize: 10
		},
		success: function(res){
			var htmls = ''
			for (var i = 0; i < res.data.list.length; i++) {				
				htmls += `<li>
							<span class="phone-number">${res.data.list[i].phone}</span>
							<span>成功领取了新人礼包！</span>
						  </li>`
			}
			
			$('.receiving-records').append(htmls)
		},
		error: function(err){

		}
	})
})

//toast
function showToast(tipText){
	$('.toast').text(tipText)
	$('.toast').show()
	setTimeout(function(){
	  $('.toast').fadeOut()
	},1000)
}