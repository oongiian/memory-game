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


//生成初始卡片
var displayCards = shuffle(cards);
displayCards.forEach((card, index) => {
  $('.deck').append(
    `<li class="card">
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
var steps = 0;
$(function(){
    //卡片点击
    $('.card').click(function(){
        if (!$(this).hasClass('open show')){
            $(this).addClass('open show');
            //步数
            steps++;
            $('span.moves').text(steps);
            clickedCards.push($(this));
            if (clickedCards.length === 2) {
                var firstCard = clickedCards[0].children().attr('class');
                var secondCard = clickedCards[1].children().attr('class');
                //对比卡片
                if (firstCard===secondCard) {
                    clickedCards[0].removeClass('open show').addClass('match');
                    clickedCards[1].removeClass('open show').addClass('match');
                    clickedCards = [];                                                        
                }else{
                    setTimeout(function wait() {
                        clickedCards[0].removeClass('open show');
                        clickedCards[1].removeClass('open show');
                        clickedCards = [];                                                            
                    }, 500);
                }
            }
                

        } 
    });
});


//刷新页面
$('.restart').click(function () {
    window.location.reload();
  });
