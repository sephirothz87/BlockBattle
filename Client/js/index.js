(function() {
    console.log("build 0001");

    var socket;

    $(document).ready(function() {
        $("#join_game").click(function() {
            console.log("button be clicked");

            // this.socket = io.connect('192.168.21.154:3000');
            socket = io.connect('192.168.1.102:3000');


            // $(window).keydown(function(event) {
            //     console.log(event);
            //     socket.emit('keydown', event);
            // });


            $(window).keydown(function(event) {
                if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
                    // console.log(event);
                    // socket.emit('keydown', event);
                    socket.emit('keydown', event.keyCode);
                }

                socket.on('frame', function(o) {
                    console.log(o);
                });
            });
        });

        $("#button2").click(function() {
            console.log("button be clicked");

            socket.emit('keydown', {
                'a': 1,
                'b': 2
            });
        });


        // $(window).keydown(function(event) {
        //  if(event.keyCode == 37||event.keyCode == 38||event.keyCode == 39||event.keyCode == 40){
        //     console.log(event);
        //     // socket.emit('keydown', event);
        //  }
        // });
    });
})();
