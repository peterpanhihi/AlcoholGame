var GameLayer = cc.LayerColor.extend({
	init: function(){

		this.waterTube = new WaterTube();
		this.addChild( this.waterTube );

		this.blood = new BloodTube();
		this.addChild( this.blood );

		this.but = new ButtonControl();
		this.addChild( this.but );

		this.bonus = new BonusBut();
		this.addChild( this.bonus );

		this.isPress = GameLayer.PRESS.UP; //this.isPress
		this.direction = GameLayer.DIR.STILL;
		this.correctDirection = GameLayer.DIR.STILL;

		this.scoreLabel = cc.LabelTTF.create( '0' , 'Arial' , 40 );
		this.scoreLabel.setPosition( new cc.Point( 750 , 550 ) );
        // this.scoreLabel.setColor( new cc.Color3B(255,255,255) );
        this.addChild( this.scoreLabel );

        this.waterLabel = cc.LabelTTF.create( 'press W' , 'Arial' , 27 );
        this.waterLabel.setPosition( new cc.Point( 100 , 50 ) );
        this.addChild( this.waterLabel );

        this.bonusLable = cc.LabelTTF.create( 'press S' , 'Arial' , 27 );
        this.bonusLable.setPosition( new cc.Point( 250 , 50 ) );
        this.addChild(this.bonusLable);

        this.bloodLabel = cc.LabelTTF.create( 'Blood Alcohol concentration' , 'Arial' , 16 );
        this.bloodLabel.setPosition( new cc.Point( 150 , 540 ) );
        this.addChild( this.bloodLabel );

        this.score = 0;
        this.countPress = 0;
        
        this.initSchedule();
        this.setKeyboardEnabled( true );
    },

    initSchedule : function(){
        this.bloodSchedule();
        this.waterSchedule();
        this.scheduleUpdate();
    },

    onKeyDown: function( e ) {
    	switch( e ) {
    		case cc.KEY.up:
                this.checkCloseTo("up");
                this.but.setUpImageBlink();
    		    break;
    		case cc.KEY.down:
                this.checkCloseTo("down");
                this.but.setDownImageBlink();
    	       	break;
    		case cc.KEY.left:
                this.checkCloseTo("left");
                this.but.setLeftImageBlink();
        		break;
    		case cc.KEY.right:
                this.checkCloseTo("right");
                this.but.setRightImageBlink();
           		break;
    		case cc.KEY.w:
    	       	this.checkWaterTube();
          		break;
    		case cc.KEY.s:
    	       	this.checkBonus();
           		break;
    	}
    },

    onKeyUp: function(){
        this.but.setDefault();
    	this.isPress = GameLayer.PRESS.UP;
    },

    checkWaterTube: function(){
        if( this.isPressButton() && this.waterTube.checkRate() ){
            this.waterTube.decrease();
            this.blood.decrease();
            cc.AudioEngine.getInstance().playEffect( 'effects/water_pour.mp3' );
        } else {
            this.score -= 5;
        }
    },

    checkBonus: function(){
        if( this.bonus.isBonus() ){
            this.score += this.bonus.getBonusScore();
            this.bonus.setDefault();
            cc.AudioEngine.getInstance().playEffect( 'effects/crunch-2.mp3' );
        }
    },

    checkCloseTo: function( message ){
        if( this.but.callCloseTo( message) ){
            this.bonus.increaseCorrectPress();
            this.isPressCorrect20Times();
            this.blood.decrease();
            this.score++;
            this.but.setDefault();
        }else{
            this.blood.increase();
            this.score--;
            this.bonus.resetCorrectPress();
        }
        cc.AudioEngine.getInstance().playEffect( 'effects/human_swallow_gulp.mp3' );
    },

    isPressButton: function(){
        if( this.isPress == GameLayer.PRESS.UP ){
            this.isPress = GameLayer.PRESS.DOWN;
            return true;
        }
        return false;
    },

    isPressCorrect20Times: function(){
        if( this.bonus.getCorrectPress() >= 20 ){
            this.bonus.setBlink();
            this.bonus.resetCorrectPress();
        }
    },

    bloodSchedule: function(){
    	this.schedule( function(){
    		this.blood.increase();
    	},1 );
    },

    waterSchedule: function(){
    	this.schedule( function(){
    		this.waterTube.increase();
    	},2 );
    },

	update:function( dt ){
		this.scoreLabel.setString( this.score );
        this.but.updateVelocity( this.blood.getRate() * 10 );
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
