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
        sandbox.views.SvgContents = BaseBone.View.extend({
            id: 'scroller',
            currentDirections: {},
            speed: 50,
            jump: 50,
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
                this.speed = 50;
                this.jump = 50;
                this.drawingTools = [
                    {
                        name:"circle",
                        fn:function(id){
                            var canvas = document.getElementById('svg-panel');
                            if (canvas){
                                var p1=75, p2=50,p3=100,fillStyle = '#' + self.getRandomInt(100000, 999999);;
                                p1 =  self.getRandomInt(20, CANVAS_WIDTH-20);
                                p2 =  self.getRandomInt(20, CANVAS_HEIGHT-20);

                                var svgns = "http://www.w3.org/2000/svg";
                                var shape = document.createElementNS(svgns,"circle");
                                shape.setAttribute( 'id', id);
                                shape.setAttributeNS(null, "cx", p1);
                                shape.setAttributeNS(null, "cy", p2);
                                shape.setAttributeNS(null, "r", 20);
                                shape.setAttributeNS(null, "fill", fillStyle);
                                canvas.appendChild(shape);

                            }
                        }
                    }

                ]
            },
            getRandomInt : function(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            paintCanvas: function(sample){
                var milliseconds = new Date().getTime(), end_milliseconds=0;
                console.log("Start at :: " + milliseconds );
                for(var i=0;i<this.NUMBER_OF_DRAW; i++){
                    this.drawingTools[0].fn('circle-' + i);
                }
                if(sample){
                    setTimeout( function(){
                        end_milliseconds = new Date().getTime();
                        console.log("Total Time to paint :: " + (end_milliseconds - milliseconds));

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
                var el = document.getElementById(id),
                    dir=this.currentDirections[id],
                    self = this,
                    x = parseInt(el.getAttribute('cx'), 10),
                    y = parseInt(el.getAttribute('cy'), 10);
                //console.log( y );
                dir = self.currentDirections[id] = this.getDirection(dir, x, y);
                self.moveElement(el, dir, distance);
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
                var milliseconds = new Date().getTime(), end_milliseconds=0;
                console.log("Start at :: " + milliseconds );
                var el = null;
                for(var i=0;i<1; /*this.NUMBER_OF_DRAW*/ i++){
                    el = document.getElementById('circle-' + i);
                    this.moveElement(el, direction, 50);
                }
                setTimeout( function(){
                    end_milliseconds = new Date().getTime();
                    console.log("End at :: " + end_milliseconds );
                    console.log("Total :: " + (end_milliseconds - milliseconds));
                    alert( "Total :: " + (end_milliseconds - milliseconds) );
                },0);
            },
            moveElement: function(el, direction, distance){
                distance = parseInt(distance,10);

                //el.setAttribute('fill','#fff');
                switch(direction){
                    case 'n':{
                        var y = parseInt(el.getAttribute('cy'),10);
                        el.setAttribute('cy',y-distance);
                    }break;
                    case 's':{
                        var y = parseInt(el.getAttribute('cy'),10);
                        el.setAttribute('cy',y+distance);
                    }break;
                    case 'e':{
                        var x = parseInt(el.getAttribute('cx'),10);
                        el.setAttribute('cx',x+distance);
                    }break;
                    case 'w':{
                        var x = parseInt(el.getAttribute('cx'),10);
                        el.setAttribute('cx',x-distance);
                    }break;
                }
            } ,
            redrawCanvas: function(){

                this.paintCanvas(true);
                //this.moveCanvas('e',50);
            },

            render: function(){
                // render main view
                $(this.el).html( sandbox.templates.SvgContents ( {} ));


                return this;
            }
        });

    };
});
