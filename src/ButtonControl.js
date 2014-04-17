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
        this.leftButton = cc.Sprite.create( 'res/images/Left_frame.png' );
        this.leftButton.setPosition( new cc.Point( ButtonControl.XPOSITION.ONE , 120 ) );
        this.addChild( this.leftButton );

        this.upButton = cc.Sprite.create( 'res/images/Up_frame.png' );
        this.upButton.setPosition( new cc.Point( ButtonControl.XPOSITION.TWO , 120 ) );
        this.addChild( this.upButton );

        this.downButton = cc.Sprite.create( 'res/images/Down_frame.png' );
        this.downButton.setPosition( new cc.Point( ButtonControl.XPOSITION.THREE , 120 ) );
        this.addChild( this.downButton );

        this.rightButton = cc.Sprite.create( 'res/images/Right_frame.png' );
        this.rightButton.setPosition( new cc.Point( ButtonControl.XPOSITION.FOUR , 120 ) );
        this.addChild( this.rightButton );
    },

    initMoving: function(){
        this.leftMove = cc.Sprite.create( 'res/images/Left_default.png' );
        this.leftMove.xpos = ButtonControl.XPOSITION.ONE;
        this.leftMove.status = ButtonControl.TRANFER.STOP;
        this.leftMove.setPosition( new cc.Point( this.leftMove.xpos , 700 ) );
        this.addChild( this.leftMove );

        this.upMove = cc.Sprite.create( 'res/images/Up_default.png' );
        this.upMove.xpos = ButtonControl.XPOSITION.TWO;
        this.upMove.status = ButtonControl.TRANFER.MOVE;
        this.upMove.setPosition( new cc.Point( this.upMove.xpos , 700 ) );
        this.addChild( this.upMove );

        this.downMove = cc.Sprite.create( 'res/images/Down_default.png' );
        this.downMove.xpos = ButtonControl.XPOSITION.THREE;
        this.downMove.status = ButtonControl.TRANFER.STOP;
        this.downMove.setPosition( new cc.Point( this.downMove.xpos , 700 ) ); 
        this.addChild( this.downMove );

        this.rightMove = cc.Sprite.create( 'res/images/Right_default.png' );
        this.rightMove.xpos = ButtonControl.XPOSITION.FOUR;
        this.rightMove.status = ButtonControl.TRANFER.STOP;
        this.rightMove.setPosition( new cc.Point( this.rightMove.xpos , 700 ) );
        this.addChild( this.rightMove );

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
        move.setPosition( new cc.Point( move.xpos , 700 ) );
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
    DOWN: 4
};

ButtonControl.TRANFER = {
    MOVE: 0,
    STOP: 1
};

ButtonControl.XPOSITION = {
    ONE: 390,
    TWO: 500,
    THREE: 610,
    FOUR: 720
};