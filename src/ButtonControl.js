var ButtonControl = cc.Node.extend({
    ctor: function() {
        this._super();

        this.button = cc.Sprite.create( 'res/images/Play_Button.png' );
        this.button.setPosition(new cc.Point(450,120));
        this.addChild(this.button);

        // this.downButton = cc.Sprite.create( 'res/images/Down_default.png' );
        // this.downButton.setPosition(new cc.Point(450,110));
        // this.addChild(this.downButton);

        // this.rightButton = cc.Sprite.create('res/images/Right_default.png');
        // this.rightButton.setPosition(new cc.Point(560,110));
        // this.addChild(this.rightButton);

        // this.leftButton = cc.Sprite.create('res/images/Left_default.png');
        // this.leftButton.setPosition(new cc.Point(340,110));
        // this.addChild(this.leftButton);
    },
    setUpImageBlink: function(){
    	this.button.initWithFile( 'res/images/Up_Button.png' );
    },
    setUpDefault: function(){
    	this.button.initWithFile( 'res/images/Up_default.png' );
    },
    setDownImageBlink: function(){
        this.button.initWithFile( 'res/images/Down_Button.png' );
    },
    setDownDefault: function(){
        this.button.initWithFile( 'res/images/Down_default.png' );
    },
    setRightImageBlink: function(){
        this.button.initWithFile( 'res/images/Right_Button.png' );
    },
    setRightDefault: function(){
        this.button.initWithFile( 'res/images/Right_default.png' );
    },
    setLeftImageBlink: function(){
        this.button.initWithFile( 'res/images/Left_Button.png' );
    },
    setLeftDefault: function(){
        this.button.initWithFile( 'res/images/Left_default.png' );
    }
});