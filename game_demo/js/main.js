//游戏开始加载进来
$(document).ready(function(){
   start();
});


//初始化数据
//定义我的得分秒数
var sco_time=0;
var your=[];
//第几局
var round=1;
//初始化倒计时间
var time=84;
//翻对的次数
var suctimes=0;
//初始化点击要素
var times=0;
//初始化要抽的牌组
var playcard=[];
//定义一个总牌数
var allcardNum=75;
//总共有18个格子，也就是要新牌组要9个就好
var playcardNum=9;
//初始化分数
var score_ever=[];


//开局动画
start=function(){
     //游戏提示内容
    $("#gamestart").slideDown(2000);
    //玩家点击开始，对游戏主体进行加载
    $("#start").click(function(){
        //游戏提示消失
         $("#gamestart").fadeOut();
         game();
         score();
    });   
}
//剑跟分数板的动画
score=function(){
    //游戏开始的标识
        $("#sword").fadeIn(2000);
    //游戏动画消失
        setTimeout(function(){$("#sword").animate({left:'1260px',width:'90px',height:'90px'},function(){
                $("#sword").hide();
                $("#sword").css({left:'470px',width:'auto',height:'auto'});
                $("#score").slideDown(3000,round_new(round));
                setTimeout(function(){
                     $("#playstart").slideDown(3000);
                     
                     back();
                },1000);
        })},1000); 
    }
//游戏主要运行程序
game=function(){
                playcard=create();
                turnup(playcard);
                //开始计时
                my_time=setInterval("countdown(--time)",1000);
                
}

//点一下纸牌会翻页
turnup=function(arr){
    for(var i=1,j=0;j<arr.length;i++,j++){
        turn(i,arr[j]);   
 }
}
//判断有效点击与无效点击
turn=function(i,j){
    
    $("#card"+i).click(function(){
        
       $(this).attr("src","../images/"+j+".jpg"); 
     if(times===0){
         if(your.indexOf(j)===-1){
            first_i=i;
            first_j=j;
            times++;
         }else{
            times=0;    
            }
        //alert("我的位置"+i+"我的内容"+j);
        }else{
            if(your.indexOf(j)===-1&&first_i!==i){
        times=0;
        $("#card"+i).attr("src","../images/"+j+".jpg");
        if(first_j!==j){      
        setTimeout(function time(){$("#card"+i).attr("src","../images/bm.png")}, 200);
        setTimeout(function time(){$("#card"+first_i).attr("src","../images/bm.png")},200);
        }else{
        //每翻对一次加一
        your[suctimes]=j;
        suctimes++;
     if(suctimes===9){
         suctimes=0;
         your=[];
         round++;
         playcard=[];
         if(round<4){newgame();
     }else{
        clearInterval(my_time);
        $("#swordclear").fadeIn(2000);
        $("#playstart").fadeOut(1000);
        setTimeout(function(){$("#swordclear").animate({left:'1260px',width:'90px',height:'90px'},function(){
            $("#swordclear").hide();
            my_score();
        })},1000); 
                        }
                    }
                }        
             }   
         else{
             times++;
         } 
    }
   });
    
}
//上面是点一下循环一次，这样写一个方法，点第二下进入判断
//随机抽取N张牌
create=function(){
    //先定义两个牌组，一个牌组是总牌，一个牌组是要展示的牌
    var allcard=[];
    var gamecard=[];
    //初始化要抽的牌组
    var playcard=[];
    //先把所有牌都创建起来
    for(var i=1;i<=allcardNum;i++){
        allcard.push(i);
    }
    
    //随机抽取自己要的牌
    for(var i=0;i<playcardNum;i++){
        var card=allcard.splice(Math.random()*allcard.length,1).pop();
        gamecard.push(card,card);

    }
     
    //然后在打乱顺序
   for(var i=0;i<18;i++){
       var card2=gamecard.splice(Math.random()*gamecard.length,1).pop();
       playcard.push(card2);
   }   
    return playcard;
}

//倒计时
countdown=function(count){
    sco_time++;
    $("#livetime").text(count);
    if(count===0){
       clearInterval(my_time);
        $("#swordfail").fadeIn(3000,function(){
            //这里写个函数，让所有牌都翻过来
           $("#look").click(function(){ 
                $("#swordfail").hide();
                $("#playstart").fadeOut(1000);
                setTimeout(function(){my_score()},1000);
           });
            $("#reload").click(function(){
                location.reload();
            });
        });
    }else{
          
    }
}
//写一个方法，把所有牌都变成背面显示
back=function(){
    for(var i=0;i<=18;i++){
        $("#card"+i).attr("src","../images/bm.png");
    }
}
//开始新的一局
newgame=function(){
    clearInterval(my_time);
     $("#swordsuc").fadeIn();
     setTimeout(function(){ $("#swordsuc").fadeOut(function(){
                             $("#playstart").fadeOut();
                               $("#score").slideUp(3000);
                                change();
                                game();
         score();})
    },2000)
}

//替换元素,必须要将原来的div清空才能放新的
change=function(){
   
    var newcard=$("#playstart div").remove();
        $("#playstart").append(newcard);
    
}

//判断关卡
round_new=function(round){
    
    switch(round){
        case 1: time=82;
                $("#round").text("第一关");
                score_ever[0]=(84-sco_time)*10;
                sco_time=0;
                break;
        case 2: time=62;
                $("#round").text("第二关");
                score_ever[1]=(64-sco_time)*20;
                sco_time=0;
                break;
        case 3: time=42;
                $("#round").text("第三关");
                score_ever[2]=(44-sco_time)*30;
                
                break;
    }
}

//得分情况的方法
my_score=function(){
    setTimeout(function(){$("#firscore").animate({top:'150px'}),
                        $("#my_firscore").text(score_ever[0])},600);
    setTimeout(function(){$("#secscore").animate({top:'130px'}),
                        $("#my_secscore").text(score_ever[1])},1200);
    setTimeout(function(){$("#thrscore").animate({top:'150px'}),
                        $("#my_thrscore").text(score_ever[2])},1800);
    setTimeout(function(){$("#last").show(function(){
        $("#last").click(function(){
            location.reload();
        })
    })},3000);
}