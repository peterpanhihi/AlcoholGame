var delay = 1.5;
var ButtonControl = cc.Node.extend({
    ctor: function() {
        this._super();
        this.initFrame();
        this.initMoving();
        this.buttonSchedule();
        this.scheduleUpdate();
    },

    initFrame: function(){

        this.upButton = cc.Sprite.create( 'res/images/Up_frame.png' );
        this.upButton.setPosition( new cc.Point( 500 , 120 ) );
        this.addChild( this.upButton );

        this.downButton = cc.Sprite.create( 'res/images/Down_frame.png' );
        this.downButton.setPosition( new cc.Point( 610 , 120 ) );
        this.addChild( this.downButton );

        this.rightButton = cc.Sprite.create( 'res/images/Right_frame.png' );
        this.rightButton.setPosition( new cc.Point( 720 , 120 ) );
        this.addChild( this.rightButton );

        this.leftButton = cc.Sprite.create( 'res/images/Left_frame.png' );
        this.leftButton.setPosition( new cc.Point( 390 , 120 ) );
        this.addChild( this.leftButton );

    },

    initMoving: function(){
        this.upMove = cc.Sprite.create( 'res/images/Up_default.png' );
        this.upMove.setPosition( new cc.Point( 500 , 700 ) );
        this.upMove.status = ButtonControl.TRANFER.MOVE;
        this.addChild( this.upMove );

        this.downMove = cc.Sprite.create( 'res/images/Down_default.png' );
        this.downMove.setPosition( new cc.Point( 610 , 700 ) );
        this.downMove.status = ButtonControl.TRANFER.STOP;
        this.addChild( this.downMove );

        this.rightMove = cc.Sprite.create( 'res/images/Right_default.png' );
        this.rightMove.setPosition( new cc.Point( 720 , 700 ) );
        this.rightMove.status = ButtonControl.TRANFER.STOP;
        this.addChild( this.rightMove );

        this.leftMove = cc.Sprite.create( 'res/images/Left_default.png' );
        this.leftMove.setPosition( new cc.Point( 390 , 700 ) );
        this.leftMove.status = ButtonControl.TRANFER.STOP;
        this.addChild( this.leftMove );

        this.velocity = 1;
    },

     buttonSchedule: function(){
        var random = Math.floor( Math.random() * 4 ) + 1;
        for( var i = 0; i < random; i++ ){
            this.randomButton();
        }
        this.setDelay();
        this.scheduleOnce(function(){
            this.buttonSchedule();
        }, delay );
    },

    setDelay: function(){
        if( delay >= 0.4 ) delay -= 0.05;
    },

    randomButton: function(){
        var ran = Math.floor( Math.random() * 4 ) + 1;
        switch(ran){
            case ButtonControl.DIR.UP:
            this.upMove.status = ButtonControl.TRANFER.MOVE;
            break;
            case ButtonControl.DIR.DOWN:
            this.downMove.status = ButtonControl.TRANFER.MOVE;
            break;
            case ButtonControl.DIR.LEFT:
            this.leftMove.status = ButtonControl.TRANFER.MOVE;
            break;
            case ButtonControl.DIR.RIGHT:
            this.rightMove.status = ButtonControl.TRANFER.MOVE;
            break;
        }
    },

    checkMovingButton: function(){
        if( this.upMove.status == ButtonControl.TRANFER.MOVE ){
            this.moveUpButton();
        }

        if( this.downMove.status == ButtonControl.TRANFER.MOVE ){
            this.moveDownButton();
        }

        if( this.rightMove.status == ButtonControl.TRANFER.MOVE ){
            this.moveRightButton();
        }

        if( this.leftMove.status == ButtonControl.TRANFER.MOVE ){
            this.moveLeftButton();
        }
    },

    callCloseTo: function( message ){
        switch ( message ){
            case "up":
                return this.closeTo( this.upButton , this.upMove );
                break;
            case "down":
                return this.closeTo( this.downButton , this.downMove );
                break;
            case "right":
                return this.closeTo( this.rightButton , this.rightMove );
                break;
            case "left":
                return this.closeTo( this.leftButton , this.leftMove );
                break;
        }
    },

    closeTo: function( frame , move ){
        var f = frame.getPosition();
        var m = move.getPosition();
        if ( ( Math.abs(f.y - m.y ) <= 80 ) ){
            this.restart( move );
            return true;
        }
    },

    restart:function( move ){
        var xPos = 0;
        if( move == this.upMove )xPos = 500;
        else if( move == this.downMove ) xPos = 610;
        else if( move == this.rightMove ) xPos = 720;
        else if( move == this.leftMove ) xPos = 390;

        move.setPosition( new cc.Point( xPos , 700 ) );
        move.status = ButtonControl.TRANFER.STOP;
    },

    moveUpButton: function(){
        this.pos = this.upMove.getPosition();
        if( this.pos.y <= 0 ){
            this.restart( this.upMove );
        }
        else
            this.upMove.setPosition( new cc.Point( this.pos.x , this.pos.y - this.velocity ) );
    },

    moveDownButton: function(){
        this.pos = this.downMove.getPosition();
        if( this.pos.y <= 0 ){
            this.restart( this.downMove );
        }
        else
            this.downMove.setPosition( new cc.Point( this.pos.x , this.pos.y - this.velocity ) );
    },

    moveRightButton: function(){
        this.pos = this.rightMove.getPosition();
        if( this.pos.y <= 0 ){
            this.restart( this.rightMove );
        }
        else
            this.rightMove.setPosition( new cc.Point( this.pos.x , this.pos.y - this.velocity ) );
    },

    moveLeftButton: function(){
        this.pos = this.leftMove.getPosition();
        if( this.pos.y <= 0 ){
            this.restart( this.leftMove );
        }
        else
            this.leftMove.setPosition( new cc.Point( this.pos.x , this.pos.y - this.velocity ) );
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
        this.upButton.initWithFile( 'res/images/Up_frame.png' );
        this.downButton.initWithFile( 'res/images/Down_frame.png' );
        this.rightButton.initWithFile( 'res/images/Right_frame.png' );
        this.leftButton.initWithFile( 'res/images/Left_frame.png' );
    },

    updateVelocity: function( ve ){
        if( ve < 1 ) this.velocity = 1;
        else this.velocity = ve;
    },

    update: function( dt ){
        this.checkMovingButton();
    }

});

ButtonControl.DIR = {
    LEFT: 1,
    RIGHT: 2,
    UP: 3,
    DOWN: 4,
    STILL:0
};
ButtonControl.TRANFER = {
    MOVE: 0,
    STOP: 1
};