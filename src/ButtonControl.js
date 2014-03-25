var ButtonControl = cc.Node.extend({
    ctor: function() {
        this._super();

        this.upButton = cc.Sprite.create( 'res/images/Up_default.png' );
        this.upButton.setPosition(new cc.Point(450,220));
        this.addChild(this.upButton);

        this.downButton = cc.Sprite.create( 'res/images/Down_default.png' );
        this.downButton.setPosition(new cc.Point(450,110));
        this.addChild(this.downButton);

        this.rightButton = cc.Sprite.create('res/images/Right_default.png');
        this.rightButton.setPosition(new cc.Point(560,110));
        this.addChild(this.rightButton);

        this.leftButton = cc.Sprite.create('res/images/Left_default.png');
        this.leftButton.setPosition(new cc.Point(340,110));
        this.addChild(this.leftButton);
    },
    setUpImageBlink: function(){
    	this.upButton.initWithFile( 'res/images/Up_Button.png' );
    },
    setUpDefault: function(){
    	this.upButton.initWithFile( 'res/images/Up_default.png' );
    }
});