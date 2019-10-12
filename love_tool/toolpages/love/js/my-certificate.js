$(function(){
	//param
	var matchName = '' 
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
			$('.head-pic')[0].src = res.data.obj.head
			$('.head-nickname').text(res.data.obj.nickname)
		},
		error: function(error){
			console.log('用户信息获取失败')
		}
	})
	//我的证书请求
	$.ajax({
		url: 'http://test.api.jibox.cn/match/love/api_my_love?callback_format=jsonp',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			user_id: 165
		},
		success: function(res){
			console.log(res)
			var html = ``
			for (var i = 0; i < res.data.list.length; i++) {
				var item = res.data.list[i]			
				html += `<div class="item" certificateType="${item.type}" user_role_opt="${item.user_role_opt}" 
							be_user_role_opt="${item.be_user_role_opt}" love_date="${item.love_date_text}">
							<span class="match-name">${item.user_name} & ${item.be_user_name?item.be_user_name:'???'}</span>
							<span class="item-look">查看</span>
						</div>`
			}
			$('.list-wrap').append(html)
		},
		error: function(error){
			console.log('我的证书请求失败')
		}
	})

	$('.head-add-btn').on('click',function(){
		window.location.href = '../html/love-index.html'
	})
	$('.list-wrap').on('click','.item',function(e){
		var value = $(this).attr("certificateType")
		var love_date = $(this).attr("love_date")
		var user_role_opt = $(this).attr("user_role_opt")
		var be_user_role_opt = $(this).attr("be_user_role_opt")
		matchName = $(this).find('.match-name').text().split('&')
		if(value === '1'){
			matchName = matchName[0].length>6?matchName[0].substring(0,6):matchName[0]		
			window.location.href = '../html/half-certificate.html?matchName='+encodeURI(matchName)+'&user_role_opt='+user_role_opt
			+'&love_date='+love_date
		}else if(value === '2'){
			var matchName0 = matchName[0].length>6?matchName[0].substring(0,6):matchName[0]
			var matchName1 = matchName[1].length>6?matchName[1].substring(0,6):matchName[1]
			window.location.href = '../html/share-certificate.html?matchName0='+encodeURI(matchName0)+'&matchName1='+encodeURI(matchName1)
									+'&user_role_opt='+user_role_opt+'&be_user_role_opt='+be_user_role_opt+'&love_date='+love_date
		}
	})
})