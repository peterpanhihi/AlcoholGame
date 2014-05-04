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
        this.leftButton.setPosition( new cc.Point( ButtonControl.XPOSITION.ONE , 300 ) );
        this.addChild( this.leftButton );

        this.upButton = cc.Sprite.create( 'res/images/Up_frame.png' );
        this.upButton.setPosition( new cc.Point( ButtonControl.XPOSITION.TWO , 300 ) );
        this.addChild( this.upButton );

        this.downButton = cc.Sprite.create( 'res/images/Down_frame.png' );
        this.downButton.setPosition( new cc.Point( ButtonControl.XPOSITION.THREE , 300 ) );
        this.addChild( this.downButton );

        this.rightButton = cc.Sprite.create( 'res/images/Right_frame.png' );
        this.rightButton.setPosition( new cc.Point( ButtonControl.XPOSITION.FOUR , 300 ) );
        this.addChild( this.rightButton );
    },

    initMoving: function(){
        this.movBut = new Array();

        this.leftMove = cc.Sprite.create( 'res/images/Left_default.png' );
        this.leftMove.xpos = ButtonControl.XPOSITION.ONE;
        this.leftMove.status = ButtonControl.TRANFER.STOP;
        this.leftMove.startFrom = ButtonControl.LEAVE.TOP;
        this.leftMove.setPosition( new cc.Point( this.leftMove.xpos , 700 ) );
        this.addChild( this.leftMove );
        this.movBut[0] = this.leftMove;

        this.upMove = cc.Sprite.create( 'res/images/Up_default.png' );
        this.upMove.xpos = ButtonControl.XPOSITION.TWO;
        this.upMove.status = ButtonControl.TRANFER.STOP;
        this.upMove.startFrom = ButtonControl.LEAVE.TOP;
        this.upMove.setPosition( new cc.Point( this.upMove.xpos , 700 ) );
        this.addChild( this.upMove );
        this.movBut[1] = this.upMove;

        this.downMove = cc.Sprite.create( 'res/images/Down_default.png' );
        this.downMove.xpos = ButtonControl.XPOSITION.THREE;
        this.downMove.status = ButtonControl.TRANFER.STOP;
        this.downMove.startFrom = ButtonControl.LEAVE.TOP;
        this.downMove.setPosition( new cc.Point( this.downMove.xpos , 700 ) ); 
        this.addChild( this.downMove );
        this.movBut[2] = this.downMove;

        this.rightMove = cc.Sprite.create( 'res/images/Right_default.png' );
        this.rightMove.xpos = ButtonControl.XPOSITION.FOUR;
        this.rightMove.status = ButtonControl.TRANFER.STOP;
        this.rightMove.startFrom = ButtonControl.LEAVE.TOP;
        this.rightMove.setPosition( new cc.Point( this.rightMove.xpos , 700 ) );
        this.addChild( this.rightMove );
        this.movBut[3] = this.rightMove;

        this.velocity = 2;
        this.velocitySchedule();
    },

     buttonSchedule: function(){
        var random = Math.floor( Math.random() * 4 );
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
        var ran = Math.floor( Math.random() * 4 );
        this.movBut[ran].status = ButtonControl.TRANFER.MOVE;
    },

    checkMovingButton: function(){
        for( var i in this.movBut ){
            if( this.movBut[i].status == ButtonControl.TRANFER.MOVE ){
                this.pos = this.movBut[i].getPosition();
                if( this.movBut[i].startFrom == ButtonControl.LEAVE.TOP ){
                    if( this.pos.y <= 300 ){
                        this.restart( this.movBut[i] );
                    }
                    this.movBut[i].setPosition( new cc.Point( this.pos.x , this.pos.y - this.velocity ) );
                }
                else if( this.movBut[i].startFrom == ButtonControl.LEAVE.BUTTOM ){
                    if( this.pos.y >= 300 ){
                        this.restart( this.movBut[i] );
                    }
                    this.movBut[i].setPosition( new cc.Point( this.pos.x , this.pos.y + this.velocity ) );
                }
            }
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
            move.status = ButtonControl.TRANFER.STOP;
            cc.AudioEngine.getInstance().playEffect( 'effects/human_swallow_gulp.mp3' );
            return true;
        }
    },

    restart:function( move ){
        var leave = Math.floor( Math.random() * 2 ) + 1;
        if( leave == 1 ){
            move.startFrom = ButtonControl.LEAVE.TOP;
            move.setPosition( new cc.Point( move.xpos , 700 ) );
        }
        else if( leave == 2 ){
            move.startFrom = ButtonControl.LEAVE.BUTTOM;
            move.setPosition( new cc.Point( move.xpos , -100 ) );
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
    },

    velocitySchedule: function(){
        this.schedule( function(){
            this.velocity += 2;
            console.log(this.velocity);
        },5 );
    }

});

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

ButtonControl.LEAVE = {
    TOP: 1,
    BUTTOM: 2
};