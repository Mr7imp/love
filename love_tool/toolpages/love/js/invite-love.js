$(function(){
  //param
  var time = 90
  var intervalId = null

	var swiper = new Swiper('.swiper-container', {
    	slidesPerView: 'auto',   //设置slider容器能够同时显示的slides数量
        centeredSlides: true,    //设定为true时，活动块会居中，而不是默认状态下的居左。
        loop: true,
        speed: 500,
        noSwiping: false,        //设置为true时禁止切换
        paginationClickable: false
    });
	
  $('.to-love').on('click',function(){
    $('.mask-love-info').css('display','flex')
  })
  $('.close-btn').on('touchend',function(){
    $('.mask-love-info').css('display','none')
  })
  $('.close-btn-mask-success').on('touchend',function(){
    $('.mask-love-success').css('display','none')
  })
  $('.ok-btn').on('touchend',function(){
    $('.love-success-btns').css('display','block')
    $('.loveing-btns').css('display','none')
    $('.mask-love-success').css('display','none')
    $('.page-title').text('恭喜你与【xx】结缘成功，恩爱不移')
  })
  $('.frame-width-love-btn').on('touchend',function(){
    var be_user_name = $('.nickName').val()
    var be_user_role_opt = $('.s-role-select').val()
    var phone = $('.enterPhoneNumber').val()
    var code = $('.s-input-verification-code').val()

    console.log(be_user_name)
    console.log(be_user_role_opt)
    console.log(phone)
    console.log(code)

    if(be_user_name===''||be_user_role_opt===''||phone===''||code===''){      
      showToast('请输入相关信息')
    }else if(!(/^1[3456789]\d{9}$/.test(phone))){     
      showToast('手机号格式错误')
    }else{
      $.ajax({
        url: 'http://test.api.jibox.cn/match/love/api_love_invi?callback_format=jsonp',
        type: 'GET',
        dataType: 'jsonp',
        data: {
          love_no: 'L2019100951495448',
          phone,
          code,
          be_user_name,
          be_user_role_opt
        },
        success: function(res){
          console.log(res)
          if(res.flag === 'false'){
            showToast(res.info)
          }else if(res.flag === 'success'){
            // showToast(res.info)
            $('.mask-love-info').css('display','none')
            $('.nickName-success').text(be_user_name)
            $('.mask-love-success').css('display','flex')
          }
        },
        error: function(err){

        }
      })
    }
  })
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
          phone: $('.enterPhoneNumber').val()
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
          if($('.enterPhoneNumber').val().length===11){
            $('.getCode').addClass('active')
          }          
        }
      },1000)
    }  
  })
  $('.enterPhoneNumber')[0].oninput = function(){
    if($(this).val().length===11){
      $('.getCode').addClass('active')
      $('.getCode').attr('disabled',false)
    }else{
      $('.getCode').removeClass('active')
      $('.getCode').attr('disabled',true)
    }
  }
  //toast
  function showToast(tipText){
    $('.toast').text(tipText)
    $('.toast').show()
    setTimeout(function(){
      $('.toast').fadeOut()
    },1000)
  }
})
