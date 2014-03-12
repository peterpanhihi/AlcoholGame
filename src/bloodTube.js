var bloodTube = cc.Node.extend({
    ctor: function() {
        this._super();
        this.outer = cc.Sprite.create('res/images/outer-tube.png');
        this.outer.setAnchorPoint(new cc.Point(0,0));
        this.outer.setPosition(new cc.Point(630,200));
        this.addChild(this.outer);

        this.inner = cc.Sprite.create('res/images/inner-tube.png');
        this.inner.setAnchorPoint(new cc.Point(0,0));
        this.inner.setPosition(new cc.Point(638,208));
        this.addChild(this.inner);

        this.rate = 0;
        this.inner.setScaleY(this.rate);
    },

    increase: function(){
    	if(this.rate<1){
    		this.rate+=0.05;
    		this.inner.setScaleY(this.rate);
    	}
    },
    decrease: function(){
    	if(this.rate>=0.05){
    		this.rate-=0.05;
    		this.inner.setScaleY(this.rate);
    	}
    }

});