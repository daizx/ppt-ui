function Ppt(wid,hei){
    this.content=document.getElementById('ppt');
    this.imgWrapper=this.content.getElementsByTagName('div')[0];
    this.contentWrapper=this.content.getElementsByTagName('div')[1];
    this.imgs=this.imgWrapper.getElementsByTagName('img');
    this.secimg=this.contentWrapper.getElementsByTagName('img')[0];
    this.oldimg=this.contentWrapper.getElementsByTagName('img')[1];
    this.hei=hei;
    this.wid=wid;
    this.createUI();
    this.changeImg();
}

//创建UI函数
Ppt.prototype.createUI=function(){

    this.content.style.position='relative';
    this.content.style.padding='10px';
    this.content.style.width=(this.wid)*1.5+'px';
    this.content.style.border='solid 1px black';
    this.imgWrapper.style.padding='20px';
    this.imgWrapper.style.width='150px';
    this.imgWrapper.style.height=this.hei+'px';
    this.imgWrapper.style.overflow='auto';
   
    for(var i=0;i<this.imgs.length;i++){
        this.imgs[i].style.display='block';
        this.imgs[i].style.width=(this.wid)/3.5+'px';
        this.imgs[i].style.height=(this.hei)/3.5+'px';;
        this.imgs[i].style.marginBottom='10px';
    };

    this.imgs[0].style.border='solid 1px red'
    this.contentWrapper.style.position='absolute';
    this.contentWrapper.style.top='20px';
    this.contentWrapper.style.left=((this.wid)/2.5+20)+'px';
    this.contentWrapper.style.padding='10px';
    this.contentWrapper.style.border='solid 1px black';
    this.contentWrapper.style.overflow='hidden';
    
    this.secimg.style.display='block';
    this.secimg.style.zIndex='1';
    this.secimg.style.height=this.hei+'px';
    this.secimg.style.width=this.wid+'px';
    this.oldimg.style.display='block';
    this.oldimg.style.height=this.hei+'px';
    this.oldimg.style.width=this.wid+'px';
    this.oldimg.style.position='absolute';
    this.oldimg.style.top='10px';
    this.oldimg.style.left='100%';

}

//切换函数
Ppt.prototype.changeImg=function(){
    var that=this;
    var exdex=1;
    var _exdex=0;
    this.contentWrapper.onclick=function(){
        that.secimg.src=that.imgs[exdex].getAttribute('src');
        that.oldimg.src=that.imgs[_exdex].getAttribute('src');
        that.animate.liner(that.oldimg,'0%','100%',10)
        that.imgs[exdex].style.border='solid 1px red';
        that.imgs[_exdex].style.border='';
        _exdex=exdex;
        exdex++;
        if(exdex>=that.imgs.length){
            exdex=1;
        };
    };
    console.log(this.over)
    for(let i=0;i<this.imgs.length;i++){
        var index=0;
        var _index=0;
        this.imgs[i].onclick=function(){
            index=i;
            that.secimg.src=that.imgs[i].getAttribute('src');
            that.imgs[index].style.border='solid 1px red';
            that.imgs[_index].style.border='';
            _index=index;
        }
    };
};


//动画函数
Ppt.prototype.animate=function(){
    var that=this;
    var liner=function(ele,nowPos,nextPos,num){
		var speed=(parseInt(nextPos)-parseInt(nowPos))/num;
        var i=0;
        var j=0;
        (function(){
            j=j+speed;
            ele.style.left=parseInt(nowPos)+j+"%";
			i++;
			if (i<num) {
                setTimeout(arguments.callee,60);
			}
		})();	
	},
	fastslow=function(ele,nowPos,nextPos){
		var speed=(parseInt(nextPos)-parseInt(nowPos))/num;
        var i=0;
        var j=0;
		(function(){
			j=j+speed;
			i++;
			if (i<(num/2)) {
				setTimeout(arguments.callee,80);
			}else if (i<num) {
				setTimeout(arguments.callee,30);
			}
		})();
    },
    slowfast=function(ele,nowPos,nextPos){
		var speed=(parseInt(nextPos)-parseInt(nowPos))/num;
        var i=0;
        var j=0;
		(function(){
			j=j+speed;
			i++;
			if (i<(num/2)) {
				setTimeout(arguments.callee,30);
			}else if (i<num) {
				setTimeout(arguments.callee,80);
			}
		})();
	};
	return {
		liner:liner,
		slowfast,slowfast
	}
}();




window.onload=function(){
    var ppt= new Ppt(500,300);		
}
