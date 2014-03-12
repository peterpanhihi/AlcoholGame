var GameLayer = cc.LayerColor.extend({
	init: function(){

		this.blood = new bloodTube();
		this.addChild(this.blood);

		this.upBut = new UpButton();
		this.upBut.setPosition(cc.p(450,230));
		this.addChild(this.upBut);

		this.click = GameLayer.STILL;
		this.nextClick = GameLayer.STILL;

		this.bloodSchedule();
		this.buttonSchedule();
		this.setKeyboardEnabled(true);
	},
	onKeyDown: function( e ) {
		switch(e) {
			case cc.KEY.up:
				this.setClick(GameLayer.DIR.UP);
				if(this.checkClick()){
					this.upBut.setDefault();
				}
				break;
			case cc.KEY.down:
				this.setClick(GameLayer.DIR.DOWN);
				break;
			case cc.KEY.left:
				this.setClick(GameLayer.DIR.LEFT);
				break;
			case cc.KEY.right:
				this.setClick(GameLayer.DIR.RIGHT);
				break;
		}
	},
	onKeyUp: function(){
		this.setClick(GameLayer.DIR.STILL);
	},
	checkClick: function(){
		if(this.click == this.nextClick){
			this.blood.decrease();
			return true;
		}
		return false;
	},
	setClick: function( dir ){
		this.click = dir;
	},
	setNextClick: function( dir ){
		this.nextClick = dir;
	},
	bloodSchedule: function(){
		this.schedule(function(){
			this.blood.increase();
		},1);
	},
	buttonSchedule: function(){
		this.schedule(function(){
			this.randomButton();
		},1.5);
	},
	randomButton: function(){
		// var ran = Math.floor(Math.random()*4)+1;
		var ran = Math.floor(Math.random()*4)+1;
		switch(ran){
			case GameLayer.DIR.UP:
				this.upBut.setImageBlink();
				this.setNextClick(GameLayer.DIR.UP);
                break;
            case GameLayer.DIR.DOWN:
           		this.setNextClick(GameLayer.DIR.DOWN);
                break;
            case GameLayer.DIR.LEFT:
            	this.setNextClick(GameLayer.DIR.LEFT);
                break;
            case GameLayer.DIR.RIGHT:
            	this.setNextClick(GameLayer.DIR.RIGHT);
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
