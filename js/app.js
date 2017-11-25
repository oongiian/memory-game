/*
 * Create a list that holds all of your cards
 */

var cards = [
    'fa fa-diamond', 
    'fa fa-diamond', 
    'fa fa-paper-plane-o',
    'fa fa-paper-plane-o',
    'fa fa-bolt',
    'fa fa-bolt',
    'fa fa-bicycle',
    'fa fa-bicycle',
    'fa fa-anchor',
    'fa fa-anchor',
    'fa fa-cube',
    'fa fa-cube',
    'fa fa-leaf',
    'fa fa-leaf',
    'fa fa-bomb',
    'fa fa-bomb'
]
//生成初始随机卡片
var displayCards = shuffle(cards);
displayCards.forEach((card, index) => {
  $('.deck').append(
    `<li class="card ">
      <i class="${card}"></i>
    </li>`)
});
//洗牌
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
var clickedCards = [];
var matchedCards = 0;

var steps = 0;
$(function(){
    //卡片点击
    $('.card').click(function(){
        if (!$(this).hasClass('open show animated')){
            $(this).addClass('open show animated')
            //步数
            steps++;
            $('.moves').text(steps);
            //星星评分
            if (steps == 18) {
                $('ul.stars').find('i').eq(0).removeClass('fa-star').addClass('fa-star-o');
             } else if (steps == 26) {
                $('ul.stars').find('i').eq(1).removeClass('fa-star').addClass('fa-star-o');
            } else if (steps == 34) {
                $('ul.stars').find('i').eq(2).removeClass('fa-star').addClass('fa-star-o');
            }
            clickedCards.push($(this));
            if (clickedCards.length === 2) {
                var firstCard = clickedCards[0].children().attr('class');
                var secondCard = clickedCards[1].children().attr('class');

                //对比卡片
                if (firstCard===secondCard) {
                    clickedCards[0].removeClass('open show').addClass('match rubberBand');
                    clickedCards[1].removeClass('open show').addClass('match rubberBand');
                    clickedCards = [];
                    matchedCards++;                                                      
                }else{
                    clickedCards[0].addClass('shake nomatch');
                    clickedCards[1].addClass('shake nomatch');

                    $('.deck').addClass('noclick')                    
                    setTimeout(function wait() {
                        clickedCards[0].removeClass('nomatch animated shake open show');
                        clickedCards[1].removeClass('nomatch animated shake open show');
                        clickedCards = [];
                        $('.deck').removeClass('noclick')                        
                    }, 700);
                }
            }
               if(matchedCards==8){
                   matchAllCards()
               } 

        } 
    });
});
function matchAllCards(){
    stopClock()   
    $('#modal').toggleClass('hidden animated bounceInDown');
    const starRating = $('.stars li .fa.fa-star').length;    
    if (starRating == 2) {
        $('.modalStar').find('i').eq(0).removeClass('fa-star').addClass('fa-star-o');
     } else if (starRating == 1) {
        $('.modalStar').find('i').eq(0).removeClass('fa-star').addClass('fa-star-o');        
        $('.modalStar').find('i').eq(1).removeClass('fa-star').addClass('fa-star-o');
    } else if (starRating == 0) {
        $('.modalStar').find('i').eq(0).removeClass('fa-star').addClass('fa-star-o');        
        $('.modalStar').find('i').eq(1).removeClass('fa-star').addClass('fa-star-o');
        $('.modalStar').find('i').eq(2).removeClass('fa-star').addClass('fa-star-o');
    }
    $('.modalButton').click(() => {
      window.location.reload();
    });
}
//刷新页面
$('.restart').click(function () {
    window.location.reload();
    
  });
//计时器
var time = 0;
var interval
function clock() {
  interval = setInterval(function () {
    time ++;
    $("span.seconds").text(time);
}, 1000);}
function stopClock(){
    clearInterval(interval);
    delete interval;
}
$('.deck').one("click", function () {
  clock();
});
function displayCongratsModal() {
    const starRating =3;
    const starRatingDisplay = starRating === 1 ? ' star' : ' stars';
    const congratsModal = document.getElementById('congrats-modal');
  
    $('.starRating').text(starRating).append(starRatingDisplay);
    $('#play-again').click(() => {
      congratsModal.style.display = 'none';
    });
    congratsModal.style.display = 'block';
  }