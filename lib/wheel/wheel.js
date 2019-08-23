var gdnlWheel = {
    totalGift : 0,
    giftData : 0,
    theWheel : null,
    background : null,
    backgroundImg : null,
    audio: null,
    audioSrc : null,
    wheelPower : 0,
    wheelSpinning : false,

    _init : function () {
        var $this = this;
        // Create new wheel object specifying the parameters at creation time.
        this.theWheel = new Winwheel({
            'numSegments'       : $this.totalGift,         // Specify number of segments.
            'outerRadius'       : 180,       // Set outer radius so wheel fits inside the background.
            'drawText'          : true,      // Need to set this true if want code-drawn text on image wheels.
            'textFontSize'      : 0,        // Set text options as desired.
            'textOrientation'   : 'curved',
            'textDirection'     : 'reversed',
            'textAlignment'     : 'outer',
            'textMargin'        : 5,
            'textFontFamily'    : 'monospace',
            'textStrokeStyle'   : 'black',
            'textLineWidth'     : 2,
            'textFillStyle'     : 'white',
            'responsive'   : true,  // This wheel is responsive!
            'drawMode'          : 'image',   // drawMode must be set to image.
            'segments'          : $this.giftData,
            'animation'         :                   // Specify the animation to use.
                {
                    'type'     : 'spinToStop',
                    'duration' : 20,     // Duration in seconds.
                    'spins'    : 15,     // Number of complete spins.
                    'callbackFinished' : this.winAnimation,
                    'callbackSound'    : this.playSound,   // Function to call when the tick sound is to be triggered.
                    'soundTrigger'     : 'pin'        // Specify pins are to trigger the sound, the other option is 'segment'.
                },
            'pins' :				// Turn pins on.
                {
                    'number'     : $this.totalGift,
                    'fillStyle'  : 'silver',
                    'outerRadius': 4,
                    'responsive' : true,
                }
        });

        // Create new image object in memory.
        this.background = new Image();

        // Create callback to execute once the image has finished loading.
        this.background.onload = function()
        {
            $this.theWheel.wheelImage = $this.background;    // Make wheelImage equal the loaded image object.
            $this.theWheel.draw();                    // Also call draw function to render the wheel.
        }

        // Set the image source, once complete this will trigger the onLoad callback (above).
        this.background.src = this.backgroundImg;

        // -----------------------------------------------------------------
        // This function is called when the segment under the prize pointer changes
        // we can play a small tick sound here like you would expect on real prizewheels.
        // -----------------------------------------------------------------

    },

    _initHome : function () {
        var $this = this;
        // Create new wheel object specifying the parameters at creation time.
        this.theWheel = new Winwheel({
            'numSegments'       : 10,         // Specify number of segments.
            'outerRadius'       : 200,       // Set outer radius so wheel fits inside the background.
            'drawText'          : true,      // Need to set this true if want code-drawn text on image wheels.
            'textFontSize'      : 20,        // Set text options as desired.
            'textOrientation'   : 'curved',
            'textDirection'     : 'reversed',
            'textAlignment'     : 'outer',
            'textMargin'        : 5,
            'textFontFamily'    : 'monospace',
            'textStrokeStyle'   : 'black',
            'textLineWidth'     : 2,
            'textFillStyle'     : 'white',
            'responsive'   : true,  // This wheel is responsive!
            'drawMode'          : 'image',   // drawMode must be set to image.
            'segments'     :        // Define segments including colour and text.
                [
                    {'fillStyle' : '#eae56f'},
                    {'fillStyle' : '#89f26e'},
                    {'fillStyle' : '#7de6ef'},
                    {'fillStyle' : '#e7706f'},
                    {'fillStyle' : '#eae56f'},
                    {'fillStyle' : '#89f26e'},
                    {'fillStyle' : '#7de6ef'},
                    {'fillStyle' : '#e7706f'},
                    {'fillStyle' : '#e7706f'},
                    {'fillStyle' : '#e7706f'},
                ],
            'animation'         :                   // Specify the animation to use.
                {
                    'type'     : 'spinToStop',
                    'duration' : 20,     // Duration in seconds.
                    'spins'    : 10,     // Number of complete spins.
                    'callbackFinished' : this.winAnimationHome,
                    'callbackSound'    : this.playSound,   // Function to call when the tick sound is to be triggered.
                    'soundTrigger'     : 'pin'        // Specify pins are to trigger the sound, the other option is 'segment'.
                },
            'pins' :				// Turn pins on.
                {
                    'number'     : 10,
                    'fillStyle'  : '#e7706f',
                    'outerRadius': 4,
                    'responsive' : true,
                }
        });

        // Create new image object in memory.
        this.background = new Image();

        // Create callback to execute once the image has finished loading.
        this.background.onload = function()
        {
            $this.theWheel.wheelImage = $this.background;    // Make wheelImage equal the loaded image object.
            $this.theWheel.draw();                    // Also call draw function to render the wheel.
        }

        // Set the image source, once complete this will trigger the onLoad callback (above).
        this.background.src = this.backgroundImg;

        // -----------------------------------------------------------------
        // This function is called when the segment under the prize pointer changes
        // we can play a small tick sound here like you would expect on real prizewheels.
        // -----------------------------------------------------------------

    },

    playSound : function ()
    {
        audio.pause();
        audio.currentTime = 0;

        // Play the sound.
        audio.play();
    },

    winAnimation : function (indicatedSegment)
    {
        var $this = this;
        $.post(laroute.route('wheel.play-finish'), {gift : indicatedSegment.text}, function(res){
            if(!res.error)
            {
                $('#my-popup').html(res.data);
                $('#my-popup').find('#popup-error').modal();

                setTimeout(function () {
                    gdnlWheel.resetWheel();
                }, 13000);
            }

        });
    },

    winAnimationHome : function (indicatedSegment)
    {
        $('#note').modal();

        gdnlWheel.resetWheel();
        //
        // // Get the audio with the sound it in, then play.
        // // let winsound = document.getElementById('winsound');
        // // winsound.play();
        //
        // // Get the number of the winning segment.
        // let winningSegmentNumber = gdnlWheel.theWheel.getIndicatedSegmentNumber();
        //
        //
        //
        // // Loop and set fillStyle of all segments to gray.
        // for (let x = 1; x < gdnlWheel.theWheel.segments.length; x ++) {
        //     gdnlWheel.theWheel.segments[x].fillStyle = 'gray';
        // }
        //
        // // Make the winning one yellow.
        // gdnlWheel.theWheel.segments[winningSegmentNumber].fillStyle = 'yellow';
        //
        // // Call draw function to render changes.
        // gdnlWheel.theWheel.draw();
        //
        // // Also re-draw the pointer, otherwise it disappears.
        // // gdnlWheel.drawColourTriangle();
    },

    // Draw pointer on canvas, this time on the right.
    drawColourTriangle : function()
    {
        // Get context used by the wheel.
        let ctx = gdnlWheel.theWheel.ctx;

        ctx.strokeStyle = 'navy';  // Set line colour.
        ctx.fillStyle   = 'aqua';  // Set fill colour.
        ctx.lineWidth   = 2;
        ctx.beginPath();           // Begin path.

        ctx.moveTo(390, 174);      // Move to initial position.
        ctx.lineTo(390, 226);      // Draw lines to make the shape.
        ctx.lineTo(360, 200);
        ctx.lineTo(390, 175);
        ctx.stroke();              // Complete the path by stroking (draw lines).
        ctx.fill();
    },

    startSpin : function ()
    {
        if (this.wheelSpinning == false) {
            // document.getElementById('spin_button').src       = "statics/front/images/wheel/spin_off.png";
            // document.getElementById('spin_button').className = "";

            this.theWheel.startAnimation();

            this.wheelSpinning = true;
        }
    },
    resetWheel : function ()
    {
        this.theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
        this.theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.

        this.theWheel.draw();                // Call draw to render changes to the wheel.

        this.wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
    },
    
    playGame : function () {
        var $this = this;
        if (this.wheelSpinning == false) {
            $.post(laroute.route('wheel.play'), {}, function (res) {
                if (!res.error) {
                    $this.startSpin();
                    setTimeout(function () {
                        var stopAt = $this.theWheel.getRandomForSegment(res.data);
                        $this.theWheel.animation.stopAngle = stopAt;
                        $this.theWheel.startAnimation();
                    }, 13000);
                }
                else {
                    $('#my-popup').html(res.data);
                    $('#my-popup').find('#popup-error-mess').modal();
                }
            });
        }
    }
}