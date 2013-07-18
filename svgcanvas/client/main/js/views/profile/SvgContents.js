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
                    },
                    {
                        name:"face",
                        fn:function(){
                            var canvas = document.getElementById('canvas');
                            if (canvas.getContext){
                                var ctx = canvas.getContext('2d');

                                ctx.beginPath();
                                ctx.arc(75,75,50,0,Math.PI*2,true); // Outer circle
                                ctx.moveTo(110,75);
                                ctx.arc(75,75,35,0,Math.PI,false);   // Mouth (clockwise)
                                ctx.moveTo(65,65);
                                ctx.arc(60,65,5,0,Math.PI*2,true);  // Left eye
                                ctx.moveTo(95,65);
                                ctx.arc(90,65,5,0,Math.PI*2,true);  // Right eye
                                ctx.stroke();
                            }
                        }
                    },
                    {
                        name:"line",
                        fn:function(){
                            var canvas = document.getElementById('canvas');
                            if (canvas.getContext){
                                var ctx = canvas.getContext('2d');

                                // Filled triangle
                                ctx.beginPath();
                                ctx.moveTo(25,25);
                                ctx.lineTo(105,25);
                                ctx.lineTo(25,105);
                                ctx.fill();

                                // Stroked triangle
                                ctx.beginPath();
                                ctx.moveTo(125,125);
                                ctx.lineTo(125,45);
                                ctx.lineTo(45,125);
                                ctx.closePath();
                                ctx.stroke();
                                ctx.fillStyle = '#' + self.getRandomInt(100000, 999999);
                                ctx.fill();
                            }
                        }
                    },
                    {
                        name:"bubble",
                        fn:function(){
                            var canvas = document.getElementById('canvas');
                            if (canvas.getContext) {
                                var ctx = canvas.getContext('2d');

                                var p1=75, p2=50,p3=100;
                                p1 =  self.getRandomInt(10, 500);
                                p2 =  self.getRandomInt(10, 500);
                                p3 =  self.getRandomInt(10, 500);

                                // Quadratric curves example
                                ctx.beginPath();
                                ctx.moveTo(p1,p2);
                                ctx.quadraticCurveTo(25,25,25,62.5);
                                ctx.quadraticCurveTo(25,100,50,100);
                                ctx.quadraticCurveTo(50,120,30,125);
                                ctx.quadraticCurveTo(60,120,65,100);
                                ctx.quadraticCurveTo(125,100,125,62.5);
                                ctx.quadraticCurveTo(125,25,75,25);
                                ctx.stroke();
                                ctx.fillStyle = '#' + self.getRandomInt(100000, 999999);
                                ctx.fill();
                            }
                        }
                    },
                    {
                        name: "heart",
                        fn: function(){
                            var canvas = document.getElementById('canvas');
                            if (canvas.getContext){
                                var ctx = canvas.getContext('2d');

                                var p1=75, p2=50,p3=100;
                                p1 =  self.getRandomInt(10, 500);
                                p2 =  self.getRandomInt(10, 500);
                                p3 =  self.getRandomInt(10, 500);

                                // Quadratric curves example
                                ctx.beginPath();
                                ctx.moveTo(p1,p2);

                                ctx.bezierCurveTo(75,37,70,25,50,25);
                                ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
                                ctx.bezierCurveTo(20,80,40,102,75,120);
                                ctx.bezierCurveTo(110,102,130,80,130,62.5);
                                ctx.bezierCurveTo(130,62.5,130,25,100,25);
                                ctx.bezierCurveTo(85,25,75,37,75,40);
                                ctx.fillStyle = '#' + self.getRandomInt(100000, 999999);
                                ctx.fill();
                            }
                        }
                    }

                ]
            },
            getRandomInt : function(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            pintCanvas: function(sample){
                var milliseconds = new Date().getTime(), end_milliseconds=0;
                console.log("Start at :: " + milliseconds );
                for(var i=0;i<this.NUMBER_OF_DRAW; i++){

                    idx = this.getRandomInt(0, 4);
                    idx = 0;
                    this.drawingTools[idx].fn('circle-' + i);
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

                this.pintCanvas(true);
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
