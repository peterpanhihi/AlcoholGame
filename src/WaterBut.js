var WaterBut = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.water = cc.Sprite.create('res/images/water-but.png');
        this.water.setPosition(new cc.Point(250,120));
        this.addChild(this.water);
	}
});