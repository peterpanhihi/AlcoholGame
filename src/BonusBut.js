var BonusBut = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.bonus = cc.Sprite.create('res/images/fried_chicken.png');
        this.bonus.setPosition(new cc.Point(350,120));
        this.addChild(this.bonus);
	}
});