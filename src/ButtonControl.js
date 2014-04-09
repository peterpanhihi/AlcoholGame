var delay = 3;
var ButtonControl = cc.Node.extend({
    ctor: function() {
        this._super();

        this.upButton = cc.Sprite.create( 'res/images/Up_default.png' );
        this.upButton.setPosition( new cc.Point( 500 , 120 ) );
        this.addChild( this.upButton );

        this.downButton = cc.Sprite.create( 'res/images/Down_default.png' );
        this.downButton.setPosition( new cc.Point( 600 , 120 ) );
        this.addChild( this.downButton );

        this.rightButton = cc.Sprite.create( 'res/images/Right_default.png' );
        this.rightButton.setPosition( new cc.Point( 700 , 120 ) );
        this.addChild( this.rightButton );

        this.leftButton = cc.Sprite.create( 'res/images/Left_default.png' );
        this.leftButton.setPosition( new cc.Point( 400 , 120 ) );
        this.addChild( this.leftButton );

        this.correctDirection = ButtonControl.DIR.STILL;

        this.buttonSchedule();
    },

     buttonSchedule: function(){
        this.randomButton();
        this.setDelay();
        
        this.scheduleOnce(function(){
            console.log(delay);
            this.buttonSchedule();
        }, delay );
    },

    randomButton: function(){
        // var ran = Math.floor(Math.random()*4)+1;
        this.setDefault();

        var ran = Math.floor( Math.random() * 4 ) + 1;
        switch(ran){
            case ButtonControl.DIR.UP:
            this.setUpImageBlink();
            this.correctDirection = ButtonControl.DIR.UP;
            break;
            case ButtonControl.DIR.DOWN:
            this.setDownImageBlink();
            this.correctDirection = ButtonControl.DIR.DOWN ;
            break;
            case ButtonControl.DIR.LEFT:
            this.setLeftImageBlink();
            this.correctDirection = ButtonControl.DIR.LEFT;
            break;
            case ButtonControl.DIR.RIGHT:
            this.setRightImageBlink();
            this.correctDirection = ButtonControl.DIR.RIGHT;
            break;
        }
    },
    setDelay: function(){
        if( delay > 0.8 ){
            delay -= 0.05;
        }
    },
    setUpImageBlink: function(){
    	this.upButton.initWithFile( 'res/images/Up_Button.png' );
    },
    setDownImageBlink: function(){
        this.downButton.initWithFile( 'res/images/Down_Button.png' );
    },
    setRightImageBlink: function(){
        this.rightButton.initWithFile( 'res/images/Right_Button.png' );
    },
    setLeftImageBlink: function(){
        this.leftButton.initWithFile( 'res/images/Left_Button.png' );
    },
    setDefault: function(){
        this.upButton.initWithFile( 'res/images/Up_default.png' );
        this.downButton.initWithFile( 'res/images/Down_default.png' );
        this.rightButton.initWithFile( 'res/images/Right_default.png' );
        this.leftButton.initWithFile( 'res/images/Left_default.png' );
    },
    getCorrectDirection: function(){
        return this.correctDirection;
    }
});

ButtonControl.DIR = {
    LEFT: 1,
    RIGHT: 2,
    UP: 3,
    DOWN: 4,
    STILL:0
}