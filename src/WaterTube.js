var WaterTube = cc.Node.extend({
    ctor: function() {
        this._super();
        this.outer = cc.Sprite.create( 'res/images/water-outer-tube.png' );
        this.outer.setAnchorPoint( new cc.Point( 0 , 0 ) );
        this.outer.setPosition( new cc.Point( 50 , 77 ) );
        this.addChild( this.outer );

        this.inner = cc.Sprite.create( 'res/images/water-tube1.png' );
        this.setInnerPosition();
        this.addChild( this.inner );

        this.state = WaterTube.DIR.BUTTOM;
        this.countInnerUponBottle = 0;

       this.resetRate();
    },

    increase: function(){
    	if( this.rate < 1 && this.state == WaterTube.DIR.BUTTOM ){
    		this.rate += 0.03;
    		this.inner.setScaleY( this.rate );
    	}else {
            this.state = WaterTube.DIR.TOP;
            if( this.countInnerUponBottle < 8 )
                this.countInnerUponBottle++;
            this.setImageInner( this.countInnerUponBottle );
        }
    },

    decrease: function(){
    	if( this.rate >= 0.05 && this.state == WaterTube.DIR.BUTTOM ){
    		this.rate -= 0.05;
    		this.inner.setScaleY( this.rate );
    	}
        else {
            this.countInnerUponBottle--;
            this.setImageInner( this.countInnerUponBottle );
        }
    },

    resetRate: function(){
        this.rate = 0;
        this.inner.setScaleY( this.rate );
    },

    setImageInner: function( count ){
        switch( count ) {
            case 0:
                this.setInnerButtom();
                this.state = WaterTube.DIR.BUTTOM;
                break;
            case 1:
                this.setInnerMiddle1();
                break;
            case 2:
                this.setInnerMiddle2();
                break;
            case 3:
                this.setInnerMiddle3();
                break;
            case 4: 
                this.setInnerMiddle4();
                break;
            case 5:
                this.setInnerTop1();
                break;
            case 6: 
                this.setInnerTop2();
                break;
            case 7: 
                this.setInnerTop3();
                break;
            case 8:
                this.setInnerTop4();
                break;
        }
        this.setInnerPosition();
    },

    setInnerButtom: function(){
        this.inner.initWithFile( 'res/images/water-tube1.png' );
    },

    setInnerMiddle1: function(){
        this.inner.initWithFile( 'res/images/water-tube2.png' );
    },

    setInnerMiddle2: function(){
        this.inner.initWithFile( 'res/images/water-tube3.png' );
    },

    setInnerMiddle3: function(){
        this.inner.initWithFile( 'res/images/water-tube4.png' );
    },

    setInnerMiddle4: function(){
        this.inner.initWithFile( 'res/images/water-tube5.png' );
    },

    setInnerTop1: function(){
        this.inner.initWithFile( 'res/images/water-tube6.png' );
    },

    setInnerTop2: function(){
        this.inner.initWithFile( 'res/images/water-tube7.png' );
    },

    setInnerTop3: function(){
        this.inner.initWithFile( 'res/images/water-tube8.png' );
    },

    setInnerTop4: function(){
        this.inner.initWithFile( 'res/images/water-tube9.png' );
    },

    setInnerPosition: function(){
        this.inner.setAnchorPoint( new cc.Point( 0 , 0 ) );
        this.inner.setPosition( new cc.Point( 58 , 84 ) );
    },

    checkRate: function(){
        return this.rate >= 0.05;
    }
});

WaterTube.DIR = {
    BUTTOM : 0,
    TOP : 1
};