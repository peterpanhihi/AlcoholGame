var BonusBut = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.status = false;
		this.bonus = cc.Sprite.create('res/images/fried_chicken_default.png');
        this.bonus.setPosition(new cc.Point(260,150));
        this.addChild(this.bonus);
        this.correctPress = 0;
	},
	setBlink:function(){
		this.bonus.initWithFile( 'res/images/fried_chicken.png' );
		this.status = true;
	},
	setDefault:function(){
		this.bonus.initWithFile( 'res/images/fried_chicken_default.png' );
		this.status = false;
	},
	getBonus: function(){
		return 5;
	},
	isBonus: function(){
		return this.status;
	},
	resetCorrectPress : function(){
		this.correctPress = 0;
	},
	increaseCorrectPress : function(){
		this.correctPress++;
	},
	getCorrectPress : function(){
		return this.correctPress;
	}

});