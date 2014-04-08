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
    }
});