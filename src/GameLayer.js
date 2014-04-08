var delay = 0.6;
var GameLayer = cc.LayerColor.extend({
	init: function(){

		this.waterTube = new WaterTube();
		this.addChild(this.waterTube);

		this.blood = new BloodTube();
		this.addChild(this.blood);

		this.but = new ButtonControl();
		this.addChild(this.but);

		this.bonus = new BonusBut();
		this.addChild(this.bonus);

		this.isPress = GameLayer.PRESS.UP; //this.isPress
		this.direction = GameLayer.DIR.STILL;
		this.correctDirection = GameLayer.DIR.STILL;

		this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
		this.scoreLabel.setPosition( new cc.Point( 750, 550 ) );
        // this.scoreLabel.setColor( new cc.Color3B(255,255,255) );
        this.addChild( this.scoreLabel );

        this.score = 0;
        this.countPress = 0;
        // this.speed = 1;
        this.initSchedule();
        this.setKeyboardEnabled(true);
    },

    initSchedule : function(){
        this.bloodSchedule();
        this.buttonSchedule();
        this.waterSchedule();
        this.scheduleUpdate();
    },

    onKeyDown : function( e ) {
    	switch(e) {
    		case cc.KEY.up:
    		this.setDirection(GameLayer.DIR.UP);
    		this.checkDirection();
    		break;
    		case cc.KEY.down:
    		this.setDirection(GameLayer.DIR.DOWN);
    		this.checkDirection();
    		break;
    		case cc.KEY.left:
    		this.setDirection(GameLayer.DIR.LEFT);
    		this.checkDirection();
    		break;
    		case cc.KEY.right:
    		this.setDirection(GameLayer.DIR.RIGHT);
    		this.checkDirection();
    		break;
    		case cc.KEY.w:
    		if(this.waterTube.checkRate()){
    			this.waterTube.decrease();
    			this.blood.decrease();
    		}else{
    			this.score -= 5;
    		}
    		break;
    		case cc.KEY.s:
    		if(this.bonus.isBonus()){
    			this.score += this.bonus.getBonus();
    			this.bonus.setDefault();
    		}
    		break;
    	}
    },

    onKeyUp: function(){
    	this.isPress = GameLayer.PRESS.UP;
    	this.setDirection(GameLayer.DIR.STILL);
    },

    checkDirection: function(){
    	if(this.direction == this.correctDirection){
    		if(this.isPress == GameLayer.PRESS.UP && this.countPress == 0){
                if( this.bonus.getCorrectPress() == 5 ){
                    this.bonus.setBlink();
                    this.bonus.resetCorrectPress();
                }
                this.bonus.increaseCorrectPress();
    			this.blood.decrease();
    			this.isPress = GameLayer.PRESS.DOWN;
    			this.countPress++;
    			this.score++;
                this.but.setDefault();
    			return true;
    		}
    	}else{
            this.bonus.resetCorrectPress();
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
    	},1.5 );
    },

    waterSchedule: function(){
    	this.schedule(function(){
    		this.waterTube.increase();
    	},2 );
    },

    buttonSchedule: function(){
    	this.schedule(function(){
    		this.randomButton();
            this.countPress = 0;
    	}, delay );
    },

    randomButton: function(){
		// var ran = Math.floor(Math.random()*4)+1;
        this.but.setDefault();

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
	},
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
