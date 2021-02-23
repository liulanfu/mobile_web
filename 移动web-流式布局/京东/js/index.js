window.addEventListener('load',function(){
    const silder=document.querySelector('.silder');
    const ul=silder.querySelector('ul');
    const ol=silder.querySelector('ol');
    let index=0;
    let flag=false;
    let w=silder.offsetWidth;
    let timer=setInterval(function(){
        index++;
        ul.style.transition='all .3s';
        ul.style.transform=`translateX(${-index*w}px)`;
    },2000);

    ul.addEventListener("transitionend",function(){
        if(index>=5){
            index=0;
            ul.style.transition='none';
            ul.style.transform=`translateX(${-index*w}px)`;
        }else if(index<0){
            index=4;
            ul.style.transition='none';
            ul.style.transform=`translateX(${-index*w}px)`;
        }
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
        
    });

    let startx=0;   //s手指最初的位置
    let movex=0;    //移动的距离

    ul.addEventListener("touchstart",function(e){
        startx=e.targetTouches[0].pageX;
        clearInterval(timer);
    });

    ul.addEventListener("touchmove",function(e){
        // 组织屏幕滚动行为
        e.preventDefault();
        flag=true;
        movex=e.targetTouches[0].pageX-startx;
        ul.style.transition='none';
        ul.style.transform=`translateX(${-index*w+movex}px)`;
    });

    ul.addEventListener('touchend',function(){
        if(flag){
            if(Math.abs(movex)>80){
                if(movex>0){
                    index--;
                }else{
                    index++;
                }
                ul.style.transform=`translateX(${-index*w}px)`;
                ul.style.transition='all .3s';
            }else{
                ul.style.transform=`translateX(${-index*w}px)`;
                ul.style.transition='all .1s';
            }
        } 
        timer=setInterval(function(){
            index++;
            ul.style.transition='all .3s';
            ul.style.transform=`translateX(${-index*w}px)`;
        },2000);
    })
})