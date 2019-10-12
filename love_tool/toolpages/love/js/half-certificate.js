$(function(){
	var swiper = new Swiper('.swiper-container', {
    	slidesPerView: 'auto',   //设置slider容器能够同时显示的slides数量
        centeredSlides: true,    //设定为true时，活动块会居中，而不是默认状态下的居左。
        loop: true,
        speed: 500,
        noSwiping: false,        //设置为true时禁止切换
        paginationClickable: false
    });
	var urlParam = GetUrlParam()
  var matchName = urlParam.matchName
  var user_role_opt = urlParam.user_role_opt
  var date = urlParam.love_date
  $('.match-name').text(matchName+'& ?')
  $('.user1_name').text(matchName)
  $('.role1-pic').attr('src','../love/images/role/'+user_role_opt+'.png')
  $('.time-type1').text(date)
  $('.swiper-slide').on('click',function(){
    var imgType = $(this).attr('imgType')

    var html = ''
    $('.p-wrap-scan').html('')
    switch(imgType){
      case 'type1':
        html = `
                <div class="p-user-info s-flag">
                  <div class="p-user1 mr12">
                    <img class="role1-pic" src="../love/images/role/${user_role_opt}.png">
                    <span class="user1_name">${matchName}</span>
                  </div>
                  <div class="p-user1">
                    <img src="../love/images/defaultHead.png">
                    <span>?</span>
                  </div>
                  <div class="time-type1">${date}</div>
                </div>              
              `
          break;              
      case 'type2': //1、2差别 就一个type2
      case 'type3':
        html = `
                <div class="p-user-info s-flag type2">
                  <div class="p-user1 mr12">
                    <img class="role1-pic" src="../love/images/role/${user_role_opt}.png">
                    <span class="user1_name">${matchName}</span>
                  </div>
                  <div class="p-user1">
                    <img src="../love/images/defaultHead.png">
                    <span>?</span>
                  </div>
                  <div class="time-type1">${date}</div>
                </div>
              `
        break;            
      case 'type4':
        html = `<div class="p-user-info-horizontal s-flag">
                  <div class="p-user1 mr12">
                    <img class="role1-pic" src="../love/images/role/${user_role_opt}.png">
                    <span class="user1_name">${matchName}</span>
                  </div>
                  <div class="p-user1">
                    <img src="../love/images/defaultHead.png">
                    <span>?</span>
                  </div>
                </div>`
        break;
      case 'type5': //4、5只差 type5
        html = `<div class="p-user-info-horizontal s-flag type5">
                  <div class="p-user1 mr12">
                    <img class="role1-pic" src="../love/images/role/${user_role_opt}.png">
                    <span class="user1_name">${matchName}</span>
                  </div>
                  <div class="p-user1">
                    <img src="../love/images/defaultHead.png">
                    <span>?</span>
                  </div>
                </div>`
        break;
    }
    $('.p-wrap-scan').append(html)

    var src = $(this).find('.s-type-img')[0].src
    $('.view-img').attr('src',src)
    $('.scan-img-wrap').show()
  })
  $('.close-img-wrap-btn').on('click',function(){
    $('.scan-img-wrap').hide()
  })
  //
  /* Basic Gallery */
  // $( '.swipebox' ).swipebox();
})

//
function GetUrlParam() {
   var url = location.search; //获取url中"?"符后的字串  
   var theRequest = new Object();  
   if (url.indexOf("?") != -1) {  
      var str = url.substr(1);
      str =  decodeURI(str) 
      strs = str.split("&");  
      for(var i = 0; i < strs.length; i++) {  
         theRequest[strs[i].split("=")[0]]=strs[i].split("=")[1];
      }  
   }  
   return theRequest;  
}