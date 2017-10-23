cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        maxStarDuration: 0,
        minStarDuration: 0,
        
        ground: {
            default: null,
            type: cc.Node
        },
        player: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        }

        
    },

    // use this for initialization
    onLoad: function () {
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y/2;
        // 生成一个新的星星
        this.spawnNewStar();
        // 初始化计分
        this.score = 0;
        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;
    },

    spawnNewStar: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 将 Game 组件的实例传入星星组件
        newStar.getComponent('Star').game = this;
        // 重置计时器，根据消失时间范围随机取一个值
        this.starDuration = this.minStarDuration + cc.random0To1 * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;

    },
    getNewStarPosition: function(){
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width/2;
        randX = cc.randomMinus1To1() * maxX;
        // 返回星星坐标
        return cc.p(randX, randY);


    },
    
    gainScore: function(){
        this.score += 1;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },
    gameOver: function(){
        this.player.stopAllActions();
        cc.director.loadScene('game');
    },
    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if(this.timer > this.starDuration){
            this.gameOver();
            return;
        }
        this.timer += dt * 10;
        console.log("timer is:" + this.timer + " and starDuration is:" + this.starDuration.toString());
     },
});
