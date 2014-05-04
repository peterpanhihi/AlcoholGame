var BloodTube = cc.Node.extend({
    ctor: function() {
        this._super();
        this.outer = cc.Sprite.create( 'res/images/outer-tube.png' );
        this.outer.setAnchorPoint( new cc.Point( 0 , 0 ) );
        this.outer.setPosition( new cc.Point( 50 , 500 ) );
        this.addChild( this.outer );

        this.inner = cc.Sprite.create( 'res/images/inner-tube.png' );
        this.inner.setAnchorPoint( new cc.Point( 0 , 0 ) );
        this.inner.setPosition( new cc.Point( 50 , 500 ) );
        this.addChild( this.inner );

        this.rate = 0;
        this.rateValue = 0.05;
        this.inner.setScaleX( this.rate );
    },

    increase: function(){
    	if( this.rate < 1 ){
    		this.rate += this.rateValue;
    		this.inner.setScaleX( this.rate );
    	}
    },

    decrease: function(){
    	if( this.rate >= 0.05 ){
    		this.rate -= 0.05;
    		this.inner.setScaleX( this.rate );
    	}
    },

    getRate: function(){
        return this.rate;
    }

});