var UpButton = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Up_default.png' );
    },
    setImageBlink: function(){
    	this.initWithFile( 'res/images/Up_Button.png' );
    },
    setDefault: function(){
    	this.initWithFile( 'res/images/Up_default.png' );
    }
});