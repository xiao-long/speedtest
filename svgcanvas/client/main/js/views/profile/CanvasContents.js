define( function( ) {
    return function(sandbox){
        
        
        var myScroll,
            pullDownEl, pullDownOffset,
            pullUpEl, pullUpOffset,
            generatedCount = 0;
            
        /*******************************************************************
         * HomeMainPage (Entry View)
         *******************************************************************/
        var CANVAS_WIDTH = 1000,
            CANVAS_HEIGHT = 600;
        sandbox.views.CanvasContents = BaseBone.View.extend({
            id: 'scroller',
            
            events:{
                "click #redraw-canvas":"redrawCanvas",
                "click #run-canvas":"run",
                "click #paulse-canvas":"paulse",
                "click #increase-speed-canvas":"plusSpeed" ,
                "click #decrease-speed-canvas":"minusSpeed"

            },
            run: function(){
                this.speed = 50;
                var self = this;
                setTimeout(function(){
                    self.movearound('circle-950', 10);
                    self.movearound('circle-940', 10);
                },self.speed);
            },
            paulse: function(){
                this.speed = 10000000000;
            },
            plusSpeed: function(){

                this.speed -= 20;
                if(this.speed<0) this.speed = 0;
                console.log(this.speed);
            },
            minusSpeed: function(){
                this.speed += 20;
                console.log(this.speed);
            },


            initialize: function(options){
                var self = this;
                this.NUMBER_OF_DRAW = 1000;
                this.currentDirections = { 'circle-950':'e', 'circle-940':'e'};
                this.locations = { 'circle-950': {x:30,y:100, color:'#fff'}, 'circle-940': {x:430,y:400,color:'#fff'} };
                this.speed = 50;
                this.jump = 50;

                this.drawingTools = [
                    {
                        name:"circle",
                        fn:function(id){
                            var canvas = document.getElementById('canvas');
                            if (canvas.getContext){
                                var ctx = canvas.getContext('2d');

                                var p1=75, p2=50,color='#' + self.getRandomInt(100000, 999999);
                                p1 =  parseInt(self.getRandomInt(20, CANVAS_WIDTH-20),10);
                                p2 =  parseInt(self.getRandomInt(20, CANVAS_HEIGHT-20),10);
                                if(self.locations[id]){
                                    color = self.locations[id].color;
                                    p1 = self.locations[id].x;
                                    p2 = self.locations[id].y;
                                } else {
                                    self.locations[id] = {x:p1, y:p2, 'color':color};
                                }
                                ctx.beginPath();
                                ctx.arc(p1, p2, 20, 0, 2 * Math.PI, true);
                                ctx.closePath();
                                ctx.fillStyle = color;
                                ctx.fill();
                            }
                        }
                    }

                ]
            },

            initScroll: function(){

             
            },
            getRandomInt : function(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            paintCanvas: function(sample){
                var milliseconds = new Date().getTime(), end_milliseconds=0;

                this.drawingTools[0].fn('circle-' + i);

                if( sample ){
                    setTimeout( function(){
                        end_milliseconds = new Date().getTime();
                        console.log("Total Time to paint :: " + (end_milliseconds - milliseconds));
                        //alert( "Total :: " + (end_milliseconds - milliseconds) );
                    },0);
                }

            },


            movearound:function(id, distance){
                var milliseconds = new Date().getTime(), end_milliseconds=0;

                var self = this;
                setTimeout(function(){
                    self.movearoundElement(id, 20);
                },this.speed);

                setTimeout( function(){
                    end_milliseconds = new Date().getTime();
                    console.log("Time Taken to move element:: " + (end_milliseconds - milliseconds) + ' with speed:: ' + self.speed) ;
                },0);

            },
            movearoundElement:function(id, distance){
                var dir=this.currentDirections[id],
                    self = this,
                    x = this.locations[id].x,
                    y = this.locations[id].y;

                dir = self.currentDirections[id] = this.getDirection(dir, x, y);
                self.moveElement( id,  dir, distance);
                self.movearound(id, distance);

            },
            getDirection: function(currentDirection, x, y){
                if(currentDirection=='e'){
                    if( x >= CANVAS_WIDTH-50 ){
                        return 's';
                    } else return 'e';
                }

                if(currentDirection=='s'){
                    if(y>=CANVAS_HEIGHT-50){

                        return 'w';
                    } else return 's';
                }

                if(currentDirection=='w'){

                    if( x <= 50 ){
                        return 'n';
                    } else return 'w';
                }

                if(currentDirection=='n'){
                    if(y<=50){
                        return 'e';
                    } else return 'n';
                }

            },
            moveCanvas: function(direction, distance){
                var el = null;
                for(var i=0;i<1; /*this.NUMBER_OF_DRAW*/ i++){
                    el =  'circle-' + i ;
                    this.moveElement(el, direction, 50);
                }
            },
            moveElement: function(id, direction, distance){
                distance = parseInt(distance,10);
                console.log( id );
                //el.setAttribute('fill','#fff');
                switch(direction){
                    case 'n':{
                        this.locations[id].y = this.locations[id].y - distance;

                    }break;
                    case 's':{
                        this.locations[id].y = this.locations[id].y + distance;

                    }break;
                    case 'e':{
                        this.locations[id].x = this.locations[id].x + distance;

                    }break;
                    case 'w':{
                        this.locations[id].x = this.locations[id].x - distance;
                    }break;
                }
                this.paintCanvas();
            } ,


            redrawCanvas: function(){

                this.paintCanvas(true);
            },
            
            render: function(){
                // render main view
                $(this.el).html( sandbox.templates.CanvasContents( {} ));


                return this;
            }
        });
        
    };
});
