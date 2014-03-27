var GameLayer = cc.LayerColor.extend({
	init: function(){

		this.waterTube = new WaterTube();
		this.addChild(this.waterTube);

		this.blood = new BloodTube();
		this.addChild(this.blood);

		this.but = new ButtonControl();
		this.addChild(this.but);

		this.waterBut = new WaterBut();
		this.addChild(this.waterBut);

		this.bonus = new BonusBut();
		this.addChild(this.bonus);

		this.press = GameLayer.PRESS.UP;
		this.direction = GameLayer.DIR.STILL;
		this.correctDirection = GameLayer.DIR.STILL;

		this.countPress = 0;

		this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 750, 550 ) );
        // this.scoreLabel.setColor( new cc.Color3B(255,255,255) );
        this.addChild( this.scoreLabel );
        this.score = 0;

		this.bloodSchedule();
		this.buttonSchedule();
		this.waterSchedule();
		this.bonusSchedule();
		this.scheduleUpdate();
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
				if(this.checkDirection()){
					this.but.setDownDefault();
				}
				break;
			case cc.KEY.left:
				this.setDirection(GameLayer.DIR.LEFT);
				if(this.checkDirection()){
					this.but.setLeftDefault();
				}
				break;
			case cc.KEY.right:
				this.setDirection(GameLayer.DIR.RIGHT);
				if(this.checkDirection()){
					this.but.setRightDefault();
				}
				break;
			case cc.KEY.w:
				if(this.waterTube.checkRate()){
					this.waterTube.decrease();
					this.blood.decrease();
				}else{
					this.score -= 5;
				}
				break;
			case cc.KEY.b:
				if(this.bonus.isBonus()){
					this.score += this.bonus.getBonus();
					this.bonus.setDefault();
				}
				break;
			}
	},
	onKeyUp: function(){
			this.press = GameLayer.PRESS.UP;
			this.setDirection(GameLayer.DIR.STILL);
	},
	checkDirection: function(){
		if(this.direction == this.correctDirection){
			if(this.press == GameLayer.PRESS.UP && this.countPress == 0){
				this.blood.decrease();
				this.press = GameLayer.PRESS.DOWN;
				this.countPress++;
				this.score++;
				return true;
			}
		}else{
			this.blood.increase();
			this.score--;
		}
		return false;
	},
	setDirection: function( dir ){
		this.direction = dir;
	},
	setCorrectDirection: function( dir ){
		this.correctDirection = dir;
	},
	bloodSchedule: function(){
		this.schedule(function(){
			this.blood.increase();
		},1.5);
	},
	waterSchedule: function(){
		this.schedule(function(){
			this.waterTube.increase();
		},2);
	},
	bonusSchedule: function(){
		this.schedule(function(){
			this.bonus.setBlink();
		},3);
	},
	buttonSchedule: function(){
		this.schedule(function(){
			this.randomButton();
			this.countPress = 0;
		},1);
	},
	randomButton: function(){
		// var ran = Math.floor(Math.random()*4)+1;
		var ran = Math.floor(Math.random()*4)+1;
		switch(ran){
			case GameLayer.DIR.UP:
				this.but.setUpImageBlink();
				this.setCorrectDirection(GameLayer.DIR.UP);
                break;
            case GameLayer.DIR.DOWN:
            	this.but.setDownImageBlink();
           		this.setCorrectDirection(GameLayer.DIR.DOWN);
                break;
            case GameLayer.DIR.LEFT:
            	this.but.setLeftImageBlink();
            	this.setCorrectDirection(GameLayer.DIR.LEFT);
                break;
            case GameLayer.DIR.RIGHT:
           		this.but.setRightImageBlink();
            	this.setCorrectDirection(GameLayer.DIR.RIGHT);
                break;
		}
	},
	update:function(dt){
		this.scoreLabel.setString(this.score);
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
