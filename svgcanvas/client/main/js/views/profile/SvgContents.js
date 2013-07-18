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
            CANVAS_HEIGHT = 600,
            JUMP = 20;
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
                "click #decrease-speed-canvas":"minusSpeed"  ,
                "keyup #number-of-ball": "ballNumberDidChange"

            },
            run: function(){
                var self = this;
                setTimeout(function(){
                    for( var i=0; i<self.NUMBER_OF_MOVE; i++){
                        self.movearoundElement('circle-' + (self.NUMBER_OF_DRAW-(1 +i)), JUMP);
                    }
                    self.run();
                },self.speed);
                this.$("#increase-speed-canvas").val('Increase Speed ( ' + this.speed + ' ms )' );
                this.$("#decrease-speed-canvas").val('Decrease Speed ( ' + this.speed + ' ms )' );

            },
            paulse: function(){
                this.speed = 10000000000;
            },
            plusSpeed: function(){

                this.speed -= 20;
                if(this.speed<0) this.speed = 0;
                this.$("#increase-speed-canvas").val('Increase Speed ( ' + this.speed + ' ms )' );
                this.$("#decrease-speed-canvas").val('Decrease Speed ( ' + this.speed + ' ms )' );

            },
            minusSpeed: function(){
                this.speed += 20;

                this.$("#increase-speed-canvas").val('Increase Speed ( ' + this.speed + ' ms )');
                this.$("#decrease-speed-canvas").val('Decrease Speed ( ' + this.speed + ' ms )');
            },
            ballNumberDidChange: function(){

                this.NUMBER_OF_MOVE = parseInt(this.$('#number-of-ball').val(), 10);
                for( var i=0; i<this.NUMBER_OF_MOVE; i++){
                    this.currentDirections[ 'circle-' + (this.NUMBER_OF_DRAW-(1 +i)) ] =  'e';
                }
            },

            initialize: function(options){
                var self = this;
                this.NUMBER_OF_DRAW = 1000;
                this.NUMBER_OF_MOVE = 5;
                this.currentDirections = {};
                for( var i=0; i<this.NUMBER_OF_MOVE; i++){
                    this.currentDirections[ 'circle-' + (this.NUMBER_OF_DRAW-(1 +i)) ] =  'e';
                }
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

            movearoundElement:function(id, distance){
                var el = document.getElementById(id),
                    dir=this.currentDirections[id],
                    self = this,
                    x = parseInt(el.getAttribute('cx'), 10),
                    y = parseInt(el.getAttribute('cy'), 10);

                dir = self.currentDirections[id] = this.getDirection(dir, x, y);
                self.moveElement(el, dir, distance);


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

            moveElement: function(el, direction, distance){
                distance = parseInt(distance,10);

                el.setAttribute('fill','#fff');
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
                var canvas = document.getElementById('svg-panel');
                $("#svg-panel").empty();

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
