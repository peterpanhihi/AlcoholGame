var delay = 2;
var ButtonControl = cc.Node.extend({
    ctor: function() {
        this._super();
        this.initFrame();
        this.initMoving();
        this.correctDirection = ButtonControl.DIR.STILL;

        // this.buttonSchedule();
    },

    initFrame: function(){

        this.upButton = cc.Sprite.create( 'res/images/Up_frame.png' );
        this.upButton.setPosition( new cc.Point( 500 , 120 ) );
        this.addChild( this.upButton );

        this.downButton = cc.Sprite.create( 'res/images/Down_frame.png' );
        this.downButton.setPosition( new cc.Point( 720 , 120 ) );
        this.addChild( this.downButton );

        this.rightButton = cc.Sprite.create( 'res/images/Right_frame.png' );
        this.rightButton.setPosition( new cc.Point( 610 , 120 ) );
        this.addChild( this.rightButton );

        this.leftButton = cc.Sprite.create( 'res/images/Left_frame.png' );
        this.leftButton.setPosition( new cc.Point( 390 , 120 ) );
        this.addChild( this.leftButton );

    },

    initMoving: function(){
        this.upMove = cc.Sprite.create( 'res/images/Up_default.png' );
        this.upMove.setPosition( new cc.Point( 500 , 700 ) );
        this.addChild( this.upMove );

        this.downMove = cc.Sprite.create( 'res/images/Down_default.png' );
        this.downMove.setPosition( new cc.Point( 720 , 700 ) );
        this.addChild( this.downMove );

        this.rightMove = cc.Sprite.create( 'res/images/Right_default.png' );
        this.rightMove.setPosition( new cc.Point( 610 , 700 ) );
        this.addChild( this.rightMove );

        this.leftMove = cc.Sprite.create( 'res/images/Left_default.png' );
        this.leftMove.setPosition( new cc.Point( 390 , 700 ) );
        this.addChild( this.leftMove );
    },

     buttonSchedule: function(){
        this.randomButton();
        this.setDelay();
        
        this.scheduleOnce(function(){
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

    moveUpButton: function(){

    },

    moveDownButton: function(){

    },

    moveRightButton: function(){

    },

    moveLeftButton: function(){

    },

    setDelay: function(){
        if( delay > 0.4 ){
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