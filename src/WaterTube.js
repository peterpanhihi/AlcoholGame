var WaterTube = cc.Node.extend({
    ctor: function() {
        this._super();
        this.outer = cc.Sprite.create('res/images/water-outer-tube.png');
        this.outer.setAnchorPoint(new cc.Point(0,0));
        this.outer.setPosition(new cc.Point(50,80));
        this.addChild(this.outer);

        this.inner = cc.Sprite.create('res/images/water-tube.png');
        this.inner.setAnchorPoint(new cc.Point(0,0));
        this.inner.setPosition(new cc.Point(58,88));
        this.addChild(this.inner);

        this.rate = 0;
        this.inner.setScaleY(this.rate);
    },
    increase: function(){
    	if(this.rate<1){
    		this.rate+=0.03;
    		this.inner.setScaleY(this.rate);
    	}
    },
    decrease: function(){
    	if(this.rate>=0.05){
    		this.rate-=0.05;
    		this.inner.setScaleY(this.rate);
    	}
    },
    checkRate: function(){
        return this.rate>=0.05;
    }

});