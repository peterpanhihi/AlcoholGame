var GameLayer = cc.LayerColor.extend({
	init: function(){

		this.blood = new bloodTube();
		this.addChild(this.blood);

		this.but = new ButtonControl();
		this.addChild(this.but);

		this.press = GameLayer.PRESS.UP;
		this.direction = GameLayer.DIR.STILL;
		this.nextDirection = GameLayer.DIR.STILL;

		this.countPress = 0;

		this.bloodSchedule();
		this.buttonSchedule();
		this.setKeyboardEnabled(true);
	},
	onKeyDown: function( e ) {
			switch(e) {
			case cc.KEY.up:
				this.setDirection(GameLayer.DIR.UP);
				if(this.checkDirection()){
					this.but.setUpDefault();
				}
				break;
			case cc.KEY.down:
				this.setDirection(GameLayer.DIR.DOWN);
				break;
			case cc.KEY.left:
				this.setDirection(GameLayer.DIR.LEFT);
				break;
			case cc.KEY.right:
				this.setDirection(GameLayer.DIR.RIGHT);
				break;
			}
	},
	onKeyUp: function(){
			this.press = GameLayer.PRESS.UP;
			this.setDirection(GameLayer.DIR.STILL);
	},
	checkDirection: function(){
		if(this.direction == this.nextDirection){
			if(this.press == GameLayer.PRESS.UP && this.countPress == 0){
				this.blood.decrease();
				this.press = GameLayer.PRESS.DOWN;
				this.countPress++;
				return true;
			}
		}
		return false;
	},
	setDirection: function( dir ){
		this.direction = dir;
	},
	setNextDirection: function( dir ){
		this.nextDirection = dir;
	},
	bloodSchedule: function(){
		this.schedule(function(){
			this.blood.increase();
		},1);
	},
	buttonSchedule: function(){
		this.schedule(function(){
			this.randomButton();
			this.countPress = 0;
		},1.5);
	},
	randomButton: function(){
		// var ran = Math.floor(Math.random()*4)+1;
		var ran = Math.floor(Math.random()*4)+1;
		switch(ran){
			case GameLayer.DIR.UP:
				this.but.setUpImageBlink();
				this.setNextDirection(GameLayer.DIR.UP);
                break;
            case GameLayer.DIR.DOWN:
           		this.setNextDirection(GameLayer.DIR.DOWN);
                break;
            case GameLayer.DIR.LEFT:
            	this.setNextDirection(GameLayer.DIR.LEFT);
                break;
            case GameLayer.DIR.RIGHT:
            	this.setNextDirection(GameLayer.DIR.RIGHT);
                break;
		}
	}
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

GameLayer.DIR = {
    LEFT: 1,
    RIGHT: 2,
    UP: 3,
    DOWN: 4,
    STILL:0
};

GameLayer.PRESS = {
	UP:0,
	DOWN:1
};
