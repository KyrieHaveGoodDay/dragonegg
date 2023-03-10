// $('.discount').fadeOut(200);
$(function () {
  // [側邊選單]
  var $sidenav = $('.sidenav');
  // [側邊選單]--// 收合
  $sidenav.on('click', '.sidenav__btn a', function (e) {
    e.preventDefault();
    $(this).parents('.sidenav').toggleClass('sidenav--hide');
  });

  // [右邊選單]
  var $rightNav = $('.sidenav--right');
  // [右邊選單]--// 側選單是否存在
  var $sidenavTop = $rightNav.length > 0 ? $rightNav.offset().top : 0;
  // [右邊選單]--// 手機版置頂
  function rightnavFixedTop() {
    var $windowTop = $(window).scrollTop();
    if ($windowTop > $sidenavTop) {
      $sidenav.addClass('fixed');
      // $('.wrap').addClass('addPadding');
    } else {
      $sidenav.removeClass('fixed');
      // $('.wrap').removeClass('addPadding');
    }
  }

  // [右邊GoTop]--// 滾動出現
  function goTopShow() {
    var $windowTop = $(window).scrollTop();
    $windowTop >= 100 ? $('.gotop').addClass('show') : $('.gotop').removeClass('show');
  }
  // [右邊GoTop]--// gotop
  $('.gotop').on('click', function () {
    $('html,body').animate({ scrollTop: '0px' }, 300);
  });

  // [錨點]--// 判斷滑動位置
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var headerH = $('.header').height();
    var sidenavH = $('.sidenav').height();
    var targetTop = $($(this).attr('href')).offset().top;
    var scrollPos = $(window).width() >= 768 ? targetTop : targetTop - headerH - sidenavH;
    $('html, body').stop().animate(
      {
        scrollTop: scrollPos,
      },
      300
    );
  });

  $(window)
    .on('scroll', function () {
      goTopShow();
      $(window).width() < 768 && rightnavFixedTop();
    })
    .scroll();
});

$(document).ready(function(){
  randomEgg(eggBox)
})


function randomEgg(data){
  let i = data.length;
  let eggNum = Math.floor(Math.random() * i)
  let str = ''
  str = `
          <div class="drAndEgg">
            <img class="dragon  " src="img/${data[eggNum].dragon}" alt="">
            <img class="eggImg overGmaeDragon" src="img/${data[eggNum].eggs}" alt="">
          </div>

          <img class="eggLeft egg" src="img/${data[eggNum].fragmentsL1}" alt="">
          <img class="eggLeft2 egg" src="img/${data[eggNum].fragmentsL2}" alt="">
          <img class="eggright egg" src="img/${data[eggNum].fragmentsR1}" alt="">
          <img class="eggright2 egg" src="img/${data[eggNum].fragmentsR2}" alt="">
  
  `
  $('.eggBox').append(str)
}

$('#goAni').one('click', function () {
  $('.eggImg').removeClass('overGmaeDragon')
  $('.start').removeClass('overGmaeBtn')
  $('.start').addClass('goingAni');
  const t1 = gsap.timeline({})
  t1.to('.eggBox', { duration: 0.1, rotate: 3, yoyo: true, repeat: 3 })
    .to('.eggImg', { duration: 0.001, left: '-100%' })
    .to('.eggBox', { duration: 0.1, rotate: 3, yoyo: true, repeat: 3, delay: 1 })
    .to('.eggImg', { duration: 0.001, left: '-200%', onStart:function(){
      $('.dragon').css('opacity','1')
    }})
    .to('.eggBox', { duration: 0.1, rotate: 3, yoyo: true, repeat: 3, delay: 1 })
    .to('.eggImg', {
      duration: 0.001, left: '-300%', 
      onStart:function(){
      gsap.to('.dragon',{duration:0.01 , scale:1.5})
        
      },
      onComplete: function () {
        
        $('.start').removeClass('goingAni');
        $('.start span').text('領取獎勵')
        $('.start a').attr('href', passLink)
        $('.start a').attr('target', '_blank')
      }
    })
    
    .to('.eggImg', {
      duration: 0.5, opacity: 0, 
      onComplete:function(){
        $('.eggImg').remove();
        $('.drAndEgg').css('overflow','unset')
        
      }
    }, 4)
    .to('.dragon',{duration:0.3, y:-30 , yoyo:true,repeat:3  , ease:'none',
    onStart:function(){
      Fragments()
    },
    onComplete:function(){
        const endAni = gsap.timeline({})
        .to('.dragon',{duration:0.8, scale:2.5 ,onComplete:()=>{
          $('.start').addClass('overGmaeBtn')
        }})
        .to('.dragon',{duration:1 , y:10 , yoyo:true , repeat:-1 , ease:'none'})
        
    }},3.1)

})
function Fragments() {
  const t2 = gsap.timeline()
  t2.to('.eggLeft', { duration: 0.001, opacity: 1 })
    .to('.eggLeft', { duration: 0.5, x: -100, y: -100 }, 0.1)
    .to('.eggLeft', { duration: 0.5, rotate: -360 }, 0.1)
    .to('.eggLeft', { duration: 0.5, opacity: 0 }, 0.2)
    .to('.eggLeft2', { duration: 0.001, opacity: 1 }, 0.1)
    .to('.eggLeft2', { duration: 0.5, x: '-100%', y: '-50%' }, 0.1)
    .to('.eggLeft2', { duration: 0.5, rotate: -360 }, 0.1)
    .to('.eggLeft2', { duration: 0.5, opacity: 0 }, 0.2)
    .to('.eggright', { duration: 0.001, opacity: 1 }, 0.1)
    .to('.eggright', { duration: 0.5, x: 100, y: -100 }, 0.1)
    .to('.eggright', { duration: 0.5, rotate: 360 }, 0.1)
    .to('.eggright', { duration: 0.5, opacity: 0 }, 0.2)
    .to('.eggright2', { duration: 0.001, opacity: 1 }, 0.1)
    .to('.eggright2', { duration: 0.5, x: 50, y: -100 }, 0.1)
    .to('.eggright2', { duration: 0.5, rotate: 360 }, 0.1)
    .to('.eggright2', {
      duration: 0.5, opacity: 0, onComplete: function () {
        $('.egg').remove()
      }
    }, 0.2)

}

