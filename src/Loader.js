count = 0;
var Loader = cc.Layer.extend({
	ctor: function(){
		this._super();
	},

	init: function(){
		var bg = cc.Sprite.create( "res/images/bgAlcohol.jpg" );
        bg.setPosition(new cc.Point(400,300) );
        this.addChild(bg);

        this.setTouchEnabled(true);
        this.setTouchMode(1);
        this.playSound();

        this.texts = [ "ARE" , "YOU" , "READY" ];


        this.lable = cc.LabelTTF.create( this.texts[0] , 'Arial' , 100 );
        this.lable.setPosition( new cc.Point( 400 , 220 ) );
        this.addChild(this.lable);
        this.textSchedule();

	},

	playSound: function(){
		cc.AudioEngine.getInstance().playMusic( 'effects/Are_You_Ready.mp3' , true );
	},

	onTouchBegan: function( touch , event ){
		var director = cc.Director.getInstance();
		director.replaceScene( cc.TransitionFade.create( 1.5 , new StartScene() ));
	},

	textSchedule: function(){
        this.schedule(function(){
        	if( count >= 3 ) {
        		this.scheduleOnce(function(){
        			count = 0;
        		}, 2);

        	}else{
        		this.lable.setString( this.texts[count] );
           		count++;
        	}
        }, 0.5 );
        
    }

});

var LoadScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		var layer = new Loader();
		layer.init();
		this.addChild( layer );
	}
});