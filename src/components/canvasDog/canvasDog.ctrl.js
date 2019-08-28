import business from '../business.mod'
import './canvasDog.less'
export default business.controller('canvasDogCtrl',['$scope',function($scope){
    class DogAnimation {
        constructor (canvas) {
            this.canvas = canvas;
            canvas.width = window.innerWidth;
            window.onresize = () => canvas.width = window.innerWidth;
            canvas.height = 200;
            // 记录上一帧的时间
            this.lastWalkingTime = Date.now();
            // 当前画的图片索引
            this.keyFrameIndex = -1;
            this.ctx = this.canvas.getContext("2d");
            this.IMG_COUNT = 8;
            this.dog = {
                // 一步10px
                stepDistance: 9,
                // 狗的速度
                speed: 0.15,
                // 鼠标的x坐标
                mouseX: -1,
                // 往前走停留的位置
                frontStopX: -1,
                // 往回走停留的位置,
                backStopX: window.innerWidth,
            };
        }
        async start () {
            await this.loadResources();
            this.pictureWidth = this.dogPictures[0].naturalWidth / 2;
            // 小狗初始化的位置放在最右边
            this.dog.mouseX = window.innerWidth - this.pictureWidth;
            this.recordMousePosition();
            window.requestAnimationFrame(this.walk.bind(this));
        }
        // 记录鼠标位置
        recordMousePosition() {
            window.addEventListener("mousemove", event => {
                this.dog.frontStopX = event.clientX - this.pictureWidth;
                this.dog.backStopX = event.clientX;
            });
            window.addEventListener("touchstart", event => {
                this.dog.frontStopX = event.touches[0].clientX - this.pictureWidth;
                this.dog.backStopX = event.touches[0].clientX;
            });
        }
        // 加载图片
        loadResources () {
            let works = [];
            for (let i = 0; i <= this.IMG_COUNT; i++) {
                works.push(new Promise(resolve => {
                    let img = new Image();
                    img.src = require(`../image/canvasDogImg/${i}.png`);
                    img.onload = () => resolve(img);
                   
                }));
            }
            return new Promise(resolve => {
                Promise.all(works).then(dogPictures => {
                    console.log(dogPictures)
                    this.dogPictures = dogPictures;
                    resolve();
                });
            });
        }
        walk () {
            let now = Date.now();
            let diffDistance = (now - this.lastWalkingTime) * this.dog.speed;
            if (diffDistance < this.dog.stepDistance) {
                window.requestAnimationFrame(this.walk.bind(this));
                return;
            }
            this.keyFrameIndex = ++this.keyFrameIndex % this.IMG_COUNT;
            let direct = -1,
                stopWalking = false;
            // 如果鼠标在狗的前面则往前走
            if (this.dog.frontStopX > this.dog.mouseX) {
                direct = 1;
            } 
            // 如果鼠标在狗的后面则往回走
            else if (this.dog.backStopX < this.dog.mouseX) {
                direct = -1;
            }
            // 如果鼠标在狗在位置
            else {
                stopWalking = true;
                // 初始化的时候小狗是反方向的，frontStopX为初始值-1
                // 说明鼠标还没动过
                direct = this.dog.frontStopX === -1 ? -1 :
                            this.dog.backStopX - this.dog.mouseX 
                                > this.pictureWidth / 2 ? 1 : -1;
                this.keyFrameIndex = -1;
                //this.dog.mouseX = this.dog.stopX;
            }
            let ctx = this.ctx;
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            ctx.save();//保存
            if (!stopWalking) {
                this.dog.mouseX += this.dog.stepDistance * direct;
            }
            if (direct === -1) {
                ctx.scale(direct, 1);
            }
            let img = this.dogPictures[this.keyFrameIndex + 1];
            let drawX = 0;
            drawX = this.dog.mouseX * direct - 
                        (direct === -1 ? this.pictureWidth : 0);
            ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight,
                            drawX, 20, 186, 162); 
            ctx.restore();//回复初始化
            this.lastWalkingTime = now;
            window.requestAnimationFrame(this.walk.bind(this));
        }
    }
    class DogAnimation2{
        constructor(canvas,imgCount){
            this.canvas=canvas;
            canvas.width = window.innerWidth;//设置画布的宽高
            canvas.height = 200;
            this.IMG_COUNT=imgCount;
            this.dogPositionX= 0;
            // 记录上一帧的时间
            this.lastWalkingTime = Date.now();
            this.canvasTxt=canvas.getContext('2d');
            this.dogPosture=-1;
            this.dog={
                dogSpeed: 0.15,
                dogStep: 9,
                dogStopX: -1,

            }
        }
        async start(){
            await this.loadResourceImages();
            console.log(this.canvas.width,this.dogPictures[0].naturalWidth/2)
            this.dog.dogStopX=this.canvas.width-this.dogPictures[0].naturalWidth/2;
            this.recordMousePosition();
            window.requestAnimationFrame(this.walking.bind(this));
        }
        recordMousePosition(){
            window.addEventListener('mousemove', event =>{
                // console.log(event.clientX) 当前鼠标位置
            })
        };
        loadResourceImages(){
            let imgArr=[];
            for(let i=0;i<this.IMG_COUNT;i++){
                imgArr.push(new Promise((resolve)=>{
                    let img=new Image();
                    img.src=require(`../image/canvasDogImg/${i}.png`);
                    img.onload=()=>resolve(img)
                }))
            }
            
            return new Promise(resolve=>{
                Promise.all(imgArr).then(dogPictures=>{
                    console.log(this,dogPictures)
                    this.dogPictures=dogPictures;
                    resolve();
                })
            })
        };
        walking(){
            let now = Date.now();
            // 计算
            let diffDistance=(now-this.lastWalkingTime) * this.dog.dogSpeed;//计算走多少才能够移动
            if(diffDistance<this.dog.dogStep){
                window.requestAnimationFrame(this.walking.bind(this));
                return;
            }
            
            this.dogPosture=++this.dogPosture%(this.IMG_COUNT-1);//变换图片
            let currentImg=this.dogPictures[this.dogPosture+1];
            let naturalWidth=currentImg.naturalWidth;
            let naturalHeight=currentImg.naturalHeight;
            this.canvasTxt.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.canvasTxt.save();
            this.dogPositionX=this.dogPositionX+this.dog.dogStep;
            console.log(this.dogPositionX)
            if(this.dogPositionX>this.canvas.width){
                this.canvasTxt.scale(-1,1);
                this.dogPositionX=-this.dogPositionX
            }
            this.canvasTxt.drawImage(currentImg,0,0,naturalWidth,naturalHeight,this.dogPositionX,20,naturalWidth/2,naturalHeight/2);
            this.canvasTxt.restore();
            this.lastWalkingTime=now;
            window.requestAnimationFrame(this.walking.bind(this));
        }
    }
    let canvas = document.querySelector("#dog-walking");
    let dogAnimation = new DogAnimation2(canvas,9);
    dogAnimation.start();
   
}])