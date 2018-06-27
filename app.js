document.addEventListener("DOMContentLoaded", function () {


    var GameOfLife = function (boardWidth, boardHeight) {

        this.width = boardWidth;
        this.height = boardHeight;
        this.board = document.getElementById("board");
        this.cells = [];
        this.cellNextStateArray = [];
        this.interval = 0;
        var self = this;
        var play = document.getElementById("play");
        var pause = document.getElementById("pause");

        this.createBoard = function () {

            this.board.style.width = this.width * 10 + "px";
            this.board.style.height = this.height * 10 + "px";
            var numberOfCells = this.width * this.height;

            for (var i = 0; i < numberOfCells; i++) {
                var newCell = document.createElement("div");
                this.board.appendChild(newCell);
            }

            this.cells = this.board.querySelectorAll("div");

            for (var i = 0; i < this.cells.length; i++) {
                this.cells[i].addEventListener("mouseover", function () {
                    this.classList.toggle("live");
                });
            }
        };

        this.arrayIndex = function (x, y) {

            var index = x + y * this.width;

            return this.cells[index];

        };

        this.setCellState = function (x, y, state) {

            if (state === "live") {
                this.arrayIndex(x, y).classList.add("live");
            } else if (state === "dead") {
                this.arrayIndex(x, y).classList.remove("live");
            }
        };

        this.arrayIndex = function(x, y) {
            var index = x + y * this.width;
            return this.cells[index];
        };

        this.setCellState = function(x, y, state) {
            if (state === "live") {
                this.arrayIndex(x,y).classList.add("live");
            } else if (state === "dead"){
                this.arrayIndex(x,y).classList.remove("live");
            }
        };

        this.firstGlider = function () {
            this.setCellState(3,3,"live");
            this.setCellState(3,4,"live");
            this.setCellState(3,5,"live");
            this.setCellState(2,5,"live");
            this.setCellState(1,4,"live");

        };

        this.computeCellNextState = function (x, y) {
            var livingNeighbours = 0;
            for (var i = y-1; i < y+2; i++) {
                for (var j = x-1; j < x+2; j++) {
                    if (i!==y || j!==x) {
                        if (i >= 0 && i < this.height  && j >= 0 && j < this.width){
                            if (this.arrayIndex(j,i).className === "live") {
                                livingNeighbours++;
                            }
                        }
                    }
                }
            }


            if (this.arrayIndex(x,y).className === "live"){
                if (livingNeighbours === 2 || livingNeighbours === 3) {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                if (livingNeighbours === 3) {
                    return 1;
                } else {
                    return 0;
                }
            }
        };

        this.computeNextGeneration = function() {
            this.cellNextStateArray = [];
            for (var i = 0; i < this.height; i++) {
                for (var j = 0; j < this.width; j++) {
                    this.cellNextStateArray.push(this.computeCellNextState(j,i));
                }
            }
        };


        this.printNextGeneration = function() {
            self.computeNextGeneration();
            for (var i = 0; i < self.cells.length; i++) {
                self.cells[i].classList.remove("live");
                if (self.cellNextStateArray[i] === 1) {
                    self.cells[i].classList.add("live");
                }
            }
        };

        this.start = function() {
            this.createBoard();
            this.firstGlider();
            this.printNextGeneration();
        };

        this.play = function() {
            self.pause();
            self.interval = setInterval(self.printNextGeneration, 100);
        };

        this.pause = function() {
            clearInterval(self.interval);
        };

        play.addEventListener("click", this.play);
        pause.addEventListener("click", this.pause);
    };


    var boardWidth = prompt("Enter board width", "Enter a number between 20-80");
    var boardHeight = prompt("Enter board height", "Enter a number between 20-80");

    var game = new GameOfLife(boardWidth,boardHeight);

    game.start();

});
