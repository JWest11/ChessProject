function createBoard() {
    for (let i=0; i < 64; i++) {
        if (Math.floor(i/8) % 2 == 0) {
            if (i % 2 == 0) {
                $('#board').append(`<div data-square class="lightSquare" id="${i}"></div>`);
            } else {
                $('#board').append(`<div data-square class="darkSquare" id="${i}"></div>`);
            };
            
        } else {
            if (i % 2 == 1) {
                $('#board').append(`<div data-square class="lightSquare" id="${i}"></div>`);
            } else {
                $('#board').append(`<div data-square class="darkSquare" id="${i}"></div>`);
            };
        };
    };
    for (let i=0; i < 8; i++) {
        // coordinates
        $(`#${i*8}`).append(`<p class="numberCoord">${8-i}</p>`);
        $(`#${63-i}`).append(`<p class="letterCoord">${String.fromCharCode(72-i)}</p>`);
        // pawns
        $(`#${i+8}`).append('<img data-piece="black" class="piece" src="pieces/Chess_pdt45.svg.png">');
        $(`#${i+48}`).append('<img data-piece="white" class="piece" src="pieces/Chess_plt45.svg.png">');
    };
    // Black pieces
    $('#0').append('<img data-piece="black" class="piece" src="pieces/Chess_rdt45.svg.png">')
    $('#1').append('<img data-piece="black" class="piece" src="pieces/Chess_ndt45.svg.png">')
    $('#2').append('<img data-piece="black" class="piece" src="pieces/Chess_bdt45.svg.png">')
    $('#3').append('<img data-piece="black" class="piece" src="pieces/Chess_qdt45.svg.png">')
    $('#4').append('<img data-piece="black" class="piece" src="pieces/Chess_kdt45.svg.png">')
    $('#5').append('<img data-piece="black" class="piece" src="pieces/Chess_bdt45.svg.png">')
    $('#6').append('<img data-piece="black" class="piece" src="pieces/Chess_ndt45.svg.png">')
    $('#7').append('<img data-piece="black" class="piece" src="pieces/Chess_rdt45.svg.png">')
    // White pieces
    $('#56').append('<img data-piece="white" class="piece" src="pieces/Chess_rlt45.svg.png">')
    $('#57').append('<img data-piece="white" class="piece" src="pieces/Chess_nlt45.svg.png">')
    $('#58').append('<img data-piece="white" class="piece" src="pieces/Chess_blt45.svg.png">')
    $('#59').append('<img data-piece="white" class="piece" src="pieces/Chess_qlt45.svg.png">')
    $('#60').append('<img data-piece="white" class="piece" src="pieces/Chess_klt45.svg.png">')
    $('#61').append('<img data-piece="white" class="piece" src="pieces/Chess_blt45.svg.png">')
    $('#62').append('<img data-piece="white" class="piece" src="pieces/Chess_nlt45.svg.png">')
    $('#63').append('<img data-piece="white" class="piece" src="pieces/Chess_rlt45.svg.png">')
};

function chessGame() {

    class Piece {
        constructor(tileIndex, white) {
            this.tileIndex = tileIndex;
            this.white = white;
        };
    };

    class Pawn extends Piece{
        constructor(...args) {
            super(...args);
            this.pieceType = 'pawn';
            this.hasMoved = false;
        };
        availableMoves(board) {
            let output = [];
            if (this.white) {
                if (this.tileIndex - 8 >= 0 && board[this.tileIndex-8] == 0) {
                    output.push(this.tileIndex - 8);
                    if (!this.hasMoved && this.tileIndex - 16 >= 0 && board[this.tileIndex-16] == 0) {
                        output.push(this.tileIndex - 16);
                    };
                };
                let column = this.tileIndex % 8 - 1;
                let currentIndex = this.tileIndex - 9;
                if (column >= 0 && currentIndex >= 0 && board[currentIndex] !== 0 && this.white != board[currentIndex].white) {
                    output.push(currentIndex);
                };
                column = this.tileIndex % 8 + 1;
                currentIndex = this.tileIndex - 7;
                if (column < 8 && currentIndex >= 0 && board[currentIndex] != 0 && this.white != board[currentIndex].white) {
                    output.push(currentIndex);
                };
            } else {
                if (this.tileIndex + 8 < 64 && board[this.tileIndex+8] == 0) {
                    output.push(this.tileIndex + 8);
                    if (!this.hasMoved && this.tileIndex + 16 < 64 && board[this.tileIndex+16] == 0) {
                        output.push(this.tileIndex + 16);
                    };
                };
                let column = this.tileIndex % 8 - 1;
                let currentIndex = this.tileIndex + 7;
                if (column >= 0 && currentIndex < 64 && board[currentIndex] != 0 && this.white != board[currentIndex].white) {
                    output.push(currentIndex);
                };
                column = this.tileIndex % 8 + 1;
                currentIndex = this.tileIndex + 9;
                if (column < 8 && currentIndex < 64 && board[currentIndex] != 0 && this.white != board[currentIndex].white) {
                    output.push(currentIndex);
                };
            };
            return output;
        };
        controlledSquares() {
            let output = [];
            let column = this.tileIndex % 8 - 1;
            let currentIndex = this.tileIndex - 9;
            if (this.white) {
                if (column >= 0 && currentIndex >= 0) {output.push(currentIndex)};
                column = this.tileIndex % 8 + 1;
                currentIndex = this.tileIndex -7;
                if (column < 8 && currentIndex >= 0) {output.push(currentIndex)};
            } else {
                column = this.tileIndex % 8 - 1;
                currentIndex = this.tileIndex + 7;
                if (column >= 0 && currentIndex < 64) {output.push(currentIndex)};
                column = this.tileIndex % 8 + 1;
                currentIndex = this.tileIndex + 9;
                if (column < 8 && currentIndex < 64) {output.push(currentIndex)};
            };
            return output;
        };
    };
    class Night extends Piece{
        constructor(...args) {
            super(...args);
            this.pieceType = 'night';
        };
        availableMoves(board) {
            let output = [];
            let relativeIndexes = [-17,-15,-10,-6,6,10,15,17]
            for (let num of relativeIndexes) {
                let currentIndex = this.tileIndex + num;
                if (currentIndex >= 0 && currentIndex <= 63 && Math.abs((this.tileIndex % 8) - ((currentIndex) % 8)) <= 2 && this.white !== board[currentIndex].white) {
                    output.push(currentIndex);
                };    
            };
            return output;
        };
        controlledSquares() {
            let output = [];
            let relativeIndexes = [-17,-15,-10,-6,6,10,15,17]
            for (let num of relativeIndexes) {
                let currentIndex = this.tileIndex + num;
                if (currentIndex >= 0 && currentIndex <= 63 && Math.abs((this.tileIndex % 8) - ((currentIndex) % 8)) <= 2) {
                    output.push(currentIndex);
                };    
            };
            return output;
        };
    };
    class Bishop extends Piece{
        constructor(...args) {
            super(...args);
            this.pieceType = 'bishop';
        };
        availableMoves(board) {
            let output = [];
            let column = this.tileIndex % 8 + 1;
            let currentIndex = this.tileIndex - 7;
            while (column < 8 && currentIndex >= 0) {
                if (this.white === board[currentIndex].white) {break};
                output.push(currentIndex);
                if (board[currentIndex] != 0) {break};
                currentIndex -= 7;
                column += 1;
            };
            column = this.tileIndex % 8 - 1;
            currentIndex = this.tileIndex - 9;
            while (column >= 0 && currentIndex >= 0) {
                if (this.white === board[currentIndex].white) {break};
                output.push(currentIndex);
                if (board[currentIndex] != 0) {break};
                currentIndex -= 9;
                column -= 1;
            };
            column = this.tileIndex % 8 - 1;
            currentIndex = this.tileIndex + 7;
            while (column >= 0 && currentIndex < 64) {
                if (this.white === board[currentIndex].white) {break};
                output.push(currentIndex);
                if (board[currentIndex] != 0) {break};
                currentIndex += 7;
                column -= 1;
            };
            column = this.tileIndex % 8 + 1;
            currentIndex = this.tileIndex + 9;
            while (column < 8 && currentIndex < 64) {
                if (this.white === board[currentIndex].white) {break};
                output.push(currentIndex);
                if (board[currentIndex] != 0) {break};
                currentIndex += 9;
                column += 1;
            };
            return output;
        };
        controlledSquares() {
            return this.availableMoves(gameBoard);
        };
    };
    class Rook extends Piece{
        constructor(...args) {
            super(...args);
            this.pieceType = 'rook';
            this.hasMoved = false;
        };
        availableMoves(board) {
            let output = [];
            let currentIndex = this.tileIndex - 8;
            while (currentIndex >= 0) {
                if (this.white === board[currentIndex].white) {break};
                output.push(currentIndex);
                if (board[currentIndex] != 0) {break};
                currentIndex -= 8;
            };
            currentIndex = this.tileIndex + 8;
            while (currentIndex < 64) {
                if (this.white === board[currentIndex].white) {break};
                output.push(currentIndex);
                if (board[currentIndex] != 0) {break};
                currentIndex += 8;
            };
            let column = this.tileIndex % 8 + 1;
            currentIndex = this.tileIndex + 1;
            while (column < 8) {
                if (this.white === board[currentIndex].white) {break};
                output.push(currentIndex);
                if (board[currentIndex] != 0) {break};
                column += 1;
                currentIndex += 1;
            };
            column = this.tileIndex % 8 - 1;
            currentIndex = this.tileIndex - 1;
            while (column >= 0) {
                if (this.white === board[currentIndex].white) {break};
                output.push(currentIndex);
                if (board[currentIndex] != 0) {break};
                column -= 1;
                currentIndex -= 1;
            };
            return output;
        };
        controlledSquares() {
            return this.availableMoves(gameBoard);
        };
    };
    class Queen extends Piece{
        constructor(...args) {
            super(...args);
            this.pieceType = 'queen';
        };
        availableMoves(board) {
            let output = [];
            let column = this.tileIndex % 8 + 1;
            let currentIndex = this.tileIndex - 7;
            while (column < 8 && currentIndex >= 0) {
                if (this.white === board[currentIndex].white) {break};
                output.push(currentIndex);
                if (board[currentIndex] != 0) {break};
                currentIndex -= 7;
                column += 1;
            };
            column = this.tileIndex % 8 - 1;
            currentIndex = this.tileIndex - 9;
            while (column >= 0 && currentIndex >= 0) {
                if (this.white === board[currentIndex].white) {break};
                output.push(currentIndex);
                if (board[currentIndex] != 0) {break};
                currentIndex -= 9;
                column -= 1;
            };
            column = this.tileIndex % 8 - 1;
            currentIndex = this.tileIndex + 7;
            while (column >= 0 && currentIndex < 64) {
                if (this.white === board[currentIndex].white) {break};
                output.push(currentIndex);
                if (board[currentIndex] != 0) {break};
                currentIndex += 7;
                column -= 1;
            };
            column = this.tileIndex % 8 + 1;
            currentIndex = this.tileIndex + 9;
            while (column < 8 && currentIndex < 64) {
                if (this.white === board[currentIndex].white) {break};
                output.push(currentIndex);
                if (board[currentIndex] != 0) {break};
                currentIndex += 9;
                column += 1;
            };
            currentIndex = this.tileIndex - 8;
            while (currentIndex >= 0) {
                if (this.white === board[currentIndex].white) {break};
                output.push(currentIndex);
                if (board[currentIndex] != 0) {break};
                currentIndex -= 8;
            };
            currentIndex = this.tileIndex + 8;
            while (currentIndex < 64) {
                if (this.white === board[currentIndex].white) {break};
                output.push(currentIndex);
                if (board[currentIndex] != 0) {break};
                currentIndex += 8;
            };
            column = this.tileIndex % 8 + 1;
            currentIndex = this.tileIndex + 1;
            while (column < 8) {
                if (this.white === board[currentIndex].white) {break};
                output.push(currentIndex);
                if (board[currentIndex] != 0) {break};
                column += 1;
                currentIndex += 1;
            };
            column = this.tileIndex % 8 - 1;
            currentIndex = this.tileIndex - 1;
            while (column >= 0) {
                if (this.white === board[currentIndex].white) {break};
                output.push(currentIndex);
                if (board[currentIndex] != 0) {break};
                column -= 1;
                currentIndex -= 1;
            };
            return output;
        };
        controlledSquares() {
            return this.availableMoves(gameBoard);
        };
    };
    class King extends Piece{
        constructor(...args) {
            super(...args);
            this.pieceType = 'king';
            this.hasMoved = false;
        };
        availableMoves(board) {
            let output = [];
            if (this.tileIndex < 56) {
                if (this.white !== board[this.tileIndex + 8].white) {
                    output.push(this.tileIndex + 8);
                };
                if (this.tileIndex % 8 + 1 < 8 && this.white !== board[this.tileIndex + 9].white) {
                    output.push(this.tileIndex + 9);
                };
                if (this.tileIndex % 8 - 1 >= 0 && this.white !== board[this.tileIndex + 7].white) {
                    output.push(this.tileIndex + 7);
                };
            };
            if (this.tileIndex > 7) {
                if (this.white !== board[this.tileIndex - 8].white) {
                    output.push(this.tileIndex - 8);
                };
                if (this.tileIndex % 8 + 1 < 8 && this.white !== board[this.tileIndex - 7].white) {
                    output.push(this.tileIndex - 7);
                };
                if (this.tileIndex % 8 - 1 >= 0 && this.white !== board[this.tileIndex - 9].white) {
                    output.push(this.tileIndex - 9);
                };
            };
            if (this.tileIndex % 8 + 1 < 8 && this.white !== board[this.tileIndex + 1].white) {
                output.push(this.tileIndex + 1);
            };
            if (this.tileIndex % 8 - 1 >= 0 && this.white !== board[this.tileIndex - 1].white) {
                output.push(this.tileIndex - 1);
            };
            return output;
        };
        controlledSquares() {
            let output = [];
            if (this.tileIndex < 56) {
                output.push(this.tileIndex + 8);
                if (this.tileIndex % 8 + 1 < 8) {
                    output.push(this.tileIndex + 9);
                };
                if (this.tileIndex % 8 - 1 >= 0) {
                    output.push(this.tileIndex + 7);
                };
            };
            if (this.tileIndex > 7) {
                output.push(this.tileIndex - 8);
                if (this.tileIndex % 8 + 1 < 8) {
                    output.push(this.tileIndex - 7);
                };
                if (this.tileIndex % 8 - 1 >= 0) {
                    output.push(this.tileIndex - 9);
                };
            };
            if (this.tileIndex % 8 + 1 < 8) {
                output.push(this.tileIndex + 1);
            };
            if (this.tileIndex % 8 - 1 >= 0) {
                output.push(this.tileIndex - 1);
            }; 
            return output;
        };
    };

    let rook1b = new Rook(0, false);
    let night1b = new Night(1, false);
    let bishop1b = new Bishop(2, false);
    let queenb = new Queen(3, false);
    let kingb = new King(4, false);
    let bishop2b = new Bishop(5, false);
    let night2b = new Night(6, false);
    let rook2b = new Rook(7, false);

    let pawn1b = new Pawn(8, false);
    let pawn2b = new Pawn(9, false);
    let pawn3b = new Pawn(10, false);
    let pawn4b = new Pawn(11, false);
    let pawn5b = new Pawn(12, false);
    let pawn6b = new Pawn(13, false);
    let pawn7b = new Pawn(14, false);
    let pawn8b = new Pawn(15, false);

    let pawn1w = new Pawn(48, true);
    let pawn2w = new Pawn(49, true);
    let pawn3w = new Pawn(50, true);
    let pawn4w = new Pawn(51, true);
    let pawn5w = new Pawn(52, true);
    let pawn6w = new Pawn(53, true);
    let pawn7w = new Pawn(54, true);
    let pawn8w = new Pawn(55, true);

    let rook1w = new Rook(56, true);
    let night1w = new Night(57, true);
    let bishop1w = new Bishop(58, true);
    let queenw = new Queen(59, true);
    let kingw = new King(60, true);
    let bishop2w = new Bishop(61, true);
    let night2w = new Night(62, true);
    let rook2w = new Rook(63, true);

    let pieceList = [[rook1w, night1w, bishop1w, queenw, kingw, bishop2w, night2w, rook2w, pawn1w, pawn2w, pawn3w, pawn4w, pawn5w, pawn6w, pawn7w, pawn8w],[rook1b, night1b, bishop1b, queenb, kingb, bishop2b, night2b, rook2b, pawn1b, pawn2b, pawn3b, pawn4b, pawn5b, pawn6b, pawn7b, pawn8b]];

    let gameBoard = [
        rook1b, night1b, bishop1b, queenb, kingb, bishop2b, night2b, rook2b,
        pawn1b, pawn2b, pawn3b, pawn4b, pawn5b, pawn6b, pawn7b, pawn8b,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        pawn1w, pawn2w, pawn3w, pawn4w, pawn5w, pawn6w, pawn7w, pawn8w,
        rook1w, night1w, bishop1w, queenw, kingw, bishop2w, night2w, rook2w
    ];

    let enPassant = false;

    let curriedFunctions1 = {};
    let curriedFunctions2 = {};
    let curriedFunctions3 = {};

    function getControlledSquares(white) {
        let output = new Set();
        let i = white ? 0 : 1;
        for (let piece of pieceList[i]) {
            for (let square of piece.controlledSquares()) {
                output.add(square);
            };
        };
        return output;
    };

    function checkCheck(white) {
        let king = white ? kingw : kingb;
        if (getControlledSquares(!white).has(king.tileIndex)) {
            return true;
        };
        return false;
    };

    function pawnNightCheckCheck(white, board) {
        let kingIndex = white ? board.indexOf(kingw) : board.indexOf(kingb); 


        // night check
        let relativeIndexes = [-17,-15,-10,-6,6,10,15,17]
            for (let num of relativeIndexes) {
                let currentIndex = kingIndex + num;
                if (currentIndex >= 0 && currentIndex <= 63 && Math.abs((kingIndex % 8) - ((currentIndex) % 8)) <= 2 && board[currentIndex].pieceType == 'night' && board[currentIndex].white != white) {
                    return true;
                };    
            };
        // pawn check
        if (white) {
            let currentIndex = kingIndex - 9;
            let column = kingIndex % 8 - 1;
            if (currentIndex >= 0 && column >= 0 && board[currentIndex].pieceType == 'pawn' && board[currentIndex].white != white) {return true};
            currentIndex = kingIndex - 7;
            column = kingIndex % 8 + 1;
            if (currentIndex >= 0 && column < 8 && board[currentIndex].pieceType == 'pawn' && board[currentIndex].white != white) {return true};
        } else {
            let currentIndex = kingIndex + 9;
            let column = kingIndex % 8 + 1;
            if (currentIndex < 64 && column < 8 && board[currentIndex].pieceType == 'pawn' && board[currentIndex].white != white) {return true};
            currentIndex = kingIndex + 7;
            column = kingIndex % 8 - 1;
            if (currentIndex < 64 && column >= 0 && board[currentIndex].pieceType == 'pawn' && board[currentIndex].white != white) {return true};
        };
        return false;
    };

    function bishopRookQueenCheckCheck(white, board) {
        let kingIndex = white ? board.indexOf(kingw) : board.indexOf(kingb);
        // diagonals
        let column = kingIndex % 8 + 1;
        let currentIndex = kingIndex - 7;
        while (column < 8 && currentIndex >= 0) {
            let boardPiece = board[currentIndex];
            if (boardPiece !== 0) {
                if (boardPiece.white != white && boardPiece.pieceType == 'bishop' || boardPiece.white != white && boardPiece.pieceType == 'queen') {return true}
                else {break};
            };
            currentIndex -= 7;
            column += 1;
        };
        column = kingIndex % 8 - 1;
        currentIndex = kingIndex - 9;
        while (column >= 0 && currentIndex >= 0) {
            let boardPiece = board[currentIndex];
            if (boardPiece !== 0) {
                if (boardPiece.white != white && boardPiece.pieceType == 'bishop' || boardPiece.white != white && boardPiece.pieceType == 'queen') {return true}
                else {break};
            };
            currentIndex -= 9;
            column -= 1;
        };
        column = kingIndex % 8 - 1;
        currentIndex = kingIndex + 7;
        while (column >= 0 && currentIndex < 64) {
            let boardPiece = board[currentIndex];
            if (boardPiece !== 0) {
                if (boardPiece.white != white && boardPiece.pieceType == 'bishop' || boardPiece.white != white && boardPiece.pieceType == 'queen') {return true}
                else {break};
            };
            currentIndex += 7;
            column -= 1;
        };
        column = kingIndex % 8 + 1;
        currentIndex = kingIndex + 9;
        while (column < 8 && currentIndex < 64) {
            let boardPiece = board[currentIndex];
            if (boardPiece !== 0) {
                if (boardPiece.white != white && boardPiece.pieceType == 'bishop' || boardPiece.white != white && boardPiece.pieceType == 'queen') {return true}
                else {break};
            };
            currentIndex += 9;
            column += 1;
        };
        // rows and files
        currentIndex = kingIndex - 8;
        while (currentIndex >= 0) {
            let boardPiece = board[currentIndex];
            if (boardPiece !== 0) {
                if (boardPiece.white == !white && boardPiece.pieceType == 'rook' || boardPiece.white == !white && boardPiece.pieceType == 'queen') {return true}
                else {break};
            };
            currentIndex -= 8;
        };
        currentIndex = kingIndex + 8;
        while (currentIndex < 64) {
            let boardPiece = board[currentIndex];
            if (boardPiece !== 0) {
                if (boardPiece.white == !white && boardPiece.pieceType == 'rook' || boardPiece.white == !white && boardPiece.pieceType == 'queen') {return true}
                else {break};
            };
            currentIndex += 8;
        };
        column = kingIndex % 8 + 1;
        currentIndex = kingIndex + 1;
        while (column < 8) {
            let boardPiece = board[currentIndex];
            if (boardPiece !== 0) {
                if (boardPiece.white == !white && boardPiece.pieceType == 'rook' || boardPiece.white == !white && boardPiece.pieceType == 'queen') {return true}
                else {break};
            };
            column += 1;
            currentIndex += 1;
        };
        column = kingIndex % 8 - 1;
        currentIndex = kingIndex - 1;
        while (column >= 0) {
            let boardPiece = board[currentIndex];
            if (boardPiece !== 0) {
                if (boardPiece.white == !white && boardPiece.pieceType == 'rook' || boardPiece.white == !white && boardPiece.pieceType == 'queen') {return true}
                else {break};
            };
            column -= 1;
            currentIndex -= 1;
        };
        return false;
    };

    function checkmateCheck(white) {
        let king = white ? kingw : kingb;
        let i = white ? 0 : 1;
        for (let piece of pieceList[i]) {
            for (let tileId of piece.availableMoves(gameBoard)) {
                let tempBoard = [...gameBoard];
                tempBoard[piece.tileIndex] = 0;
                tempBoard[tileId] = piece;
                if (pawnNightCheckCheck(white, tempBoard) === false && bishopRookQueenCheckCheck(white, tempBoard) === false) {return false};
            };
        };
        return true;
    };   

    function selectPiece(piece) {
        return curriedFunctions1[piece.tileIndex] = function curried_function1(event) {
            removeSelectionStyling();
            removeMovementListeners();
            $(`#${piece.tileIndex}`).append('<img class="selected" src="pieces/Shadow.png">');
            giveMovementListeners(piece);
        };
    };
    
    function moveToTile(piece, tileId) {
        return curriedFunctions2[tileId] = function curried_function2(event) {
            let selectedId = event.target.id ? event.target.id : event.target.parentElement.id;
            if (gameBoard[selectedId] !== 0) {
                for (let i1=0; i1<2; i1++) {
                    for (let i2=0; i2 < pieceList[i1].length; i2++) {
                        if (pieceList[i1][i2].tileIndex == selectedId) {
                            pieceList[i1].splice(i2, 1);
                        };
                    };
                };
                //remove image on tile moved to
                document.getElementById(`${selectedId}`).querySelector('.piece')?.remove();
                playCaptureSound();
            } else {playMovementSound()};
            // cycle images
            if (piece.hasOwnProperty('hasMoved')) {piece.hasMoved = true};
            $(`#${tileId}`).append(`<img data-piece="${piece.white ? "white" : "black"}" class="piece" src="pieces/Chess_${piece.pieceType[0]}${piece.white ? "l" : "d"}t45.svg.png">`);
            document.getElementById(`${piece.tileIndex}`).querySelector('.piece').remove();

            //enPassant
            enPassant = false;
            if (piece.pieceType == 'pawn') {
                if (Math.abs(selectedId-piece.tileIndex) == 16) {
                    enPassant = selectedId;
                };
            };
            
            //change board and piece data
            gameBoard[piece.tileIndex] = 0;
            gameBoard[selectedId] = piece;
            piece.tileIndex = Number(selectedId);
            
            // pawn queen check
            if (piece.pieceType == 'pawn' && piece.tileIndex < 8 || piece.pieceType == 'pawn' && piece.tileIndex > 55) {
                createQueeningOptions(piece);
            } else {
                newTurn(!piece.white, enPassant);
            };
            
        };
    };

    function transformPiece(piece, newType) {
        return curriedFunctions3[newType] = function curried_function3(event) {
            let tile = piece.tileIndex;
            let color = piece.white;
            let newPiece = null;
            if (newType == 'queen') {
                newPiece = new Queen(tile, color);
            } else if (newType == 'rook') {
                newPiece = new Rook(tile, color);
            } else if (newType == 'bishop') {
                newPiece = new Bishop(tile, color);
            } else {
                newPiece = new Night(tile, color);
            };
            $('#queeningOptions').remove();
            $(`#${tile}`).empty();
            $(`#${tile}`).append(`<img data-piece="${color ? "white" : "black"}}" class="piece" src="pieces/Chess_${newType[0]}${color ? "l" : "d"}t45.svg.png">`);
            gameBoard[tile] = newPiece;
            let i = color ? 0 : 1;
            for (let i2=0; i2 < pieceList[i].length; i2++) {
                if (pieceList[i][i2].tileIndex == tile) {
                    pieceList[i].splice(i2, 1);
                };
            };
            pieceList[i].push(newPiece);
            playMovementSound();

            newTurn(!piece.white, false);
        };
        

    };

    function createQueeningStyles(piece) {      
        let color = piece.white ? 'l' : 'd';
        $('div#board').append(
            '<div id="queeningOptions" class="winningMessage">' +
            `<img id="cQueen" class="queeningChoice" src="pieces/Chess_q${color}t45.svg.png">` +
            `<img id="cRook" class="queeningChoice" src="pieces/Chess_r${color}t45.svg.png">` +
            `<img id="cBishop" class="queeningChoice" src="pieces/Chess_b${color}t45.svg.png">` +
            `<img id="cNight" class="queeningChoice" src="pieces/Chess_n${color}t45.svg.png">` +
            '</div>'
        );
    };

    function createQueeningOptions(piece) {
        createQueeningStyles(piece);

        curriedFunctions3 = {};
        document.getElementById('cQueen').addEventListener("click", transformPiece(piece, 'queen'));
        document.getElementById('cRook').addEventListener("click", transformPiece(piece, 'rook'));
        document.getElementById('cBishop').addEventListener("click", transformPiece(piece, 'bishop'));
        document.getElementById('cNight').addEventListener("click", transformPiece(piece, 'night'));

    };

    function enPassantFunction(piece, newPawnLocation) {
        return curriedFunctions2[newPawnLocation] = function curried_function2(event) {
            document.getElementById(`${piece.tileIndex}`).querySelector('.piece').remove();
            gameBoard[piece.tileIndex] = 0;
            let i1 = piece.white ? 1 : 0;
            if (piece.white) {
                document.getElementById(`${newPawnLocation+8}`).querySelector('.piece').remove();
                gameBoard[newPawnLocation+8] = 0;
                for (let i2=0; i2 < pieceList[i1].length; i2++) {
                    if (pieceList[i1][i2].tileIndex == newPawnLocation+8) {
                        pieceList[i1].splice(i2, 1);
                    };
                };
            } else {
                document.getElementById(`${newPawnLocation-8}`).querySelector('.piece').remove();
                gameBoard[newPawnLocation-8] = 0;
                for (let i2=0; i2 < pieceList[i1].length; i2++) {
                    if (pieceList[i1][i2].tileIndex == newPawnLocation-8) {
                        pieceList[i1].splice(i2, 1);
                    };
                };
            };
            
            
            $(`#${newPawnLocation}`).append(`<img data-piece="${piece.white ? "white" : "black"}" class="piece" src="pieces/Chess_p${piece.white ? "l" : "d"}t45.svg.png">`);
            gameBoard[newPawnLocation] = piece;
            piece.tileIndex = Number(newPawnLocation);
            
            enPassant = false;
            playCaptureSound();
            newTurn(!piece.white);
        };
    };

    function castleLeft(piece) {
        return curriedFunctions2[piece.tileIndex-2] = function curried_function2(event) {
            document.getElementById(`${piece.tileIndex-4}`).querySelector('.piece').remove();
            document.getElementById(`${piece.tileIndex}`).querySelector('.piece').remove();
            $(`#${piece.tileIndex-2}`).append(`<img data-piece="${piece.white ? "white" : "black"}" class="piece" src="pieces/Chess_k${piece.white ? "l" : "d"}t45.svg.png">`);
            $(`#${piece.tileIndex-1}`).append(`<img data-piece="${piece.white ? "white" : "black"}" class="piece" src="pieces/Chess_r${piece.white ? "l" : "d"}t45.svg.png">`);
            let rook = gameBoard[piece.tileIndex-4];
            let king = piece;
            let kingIndex = king.tileIndex;
            rook.hasMoved = true;
            king.hasMoved = true;
            gameBoard[kingIndex] = 0;
            gameBoard[kingIndex-4] = 0;
            gameBoard[kingIndex-1] = rook;
            gameBoard[kingIndex-2] = king;
            king.tileIndex = kingIndex-2;
            rook.tileIndex = kingIndex-1;
            
            enPassant = false;
            playMovementSound();
            newTurn(!piece.white);
        };
    };

    function castleRight(piece) {
        return curriedFunctions2[piece.tileIndex+2] = function curried_function2(event) {
            document.getElementById(`${piece.tileIndex+3}`).querySelector('.piece').remove();
            document.getElementById(`${piece.tileIndex}`).querySelector('.piece').remove();
            $(`#${piece.tileIndex+2}`).append(`<img data-piece="${piece.white ? "white" : "black"}" class="piece" src="pieces/Chess_k${piece.white ? "l" : "d"}t45.svg.png">`);
            $(`#${piece.tileIndex+1}`).append(`<img data-piece="${piece.white ? "white" : "black"}" class="piece" src="pieces/Chess_r${piece.white ? "l" : "d"}t45.svg.png">`);
            let rook = gameBoard[piece.tileIndex+3];
            let king = piece;
            let kingIndex = king.tileIndex;
            rook.hasMoved = true;
            king.hasMoved = true;
            gameBoard[kingIndex] = 0;
            gameBoard[kingIndex+3] = 0;
            gameBoard[kingIndex+1] = rook;
            gameBoard[kingIndex+2] = king;
            king.tileIndex = kingIndex+2;
            rook.tileIndex = kingIndex+1;
            
            enPassant = false;
            playMovementSound();
            newTurn(!piece.white);
        };
    };

    function removeSelectionStyling() {
        let selected = document.querySelectorAll('.selected');
        selected.forEach(function(element) {
            element.remove();
        });
    };

    function addCheckStyling(white) {
        let king = white ? kingw : kingb;
        $(`#${king.tileIndex}`).append('<img class="check" src="pieces/RedShadow.png">');
    };

    function removeCheckStyling() {
        let selected = document.querySelectorAll('.check');
        selected.forEach(function(element) {
            element.remove();
    });
    };

    function giveSelectionListeners(pieceList, whiteTurn) {
        curriedFunctions1 = {};
        let i = whiteTurn ? 0 : 1;
        for (let piece of pieceList[i]) {
            document.getElementById(`${piece.tileIndex}`).addEventListener("click", selectPiece(piece));
        };
        console.log(curriedFunctions1);
    };

    function removeSelectionListeners() {
        for (let key in curriedFunctions1) {
            document.getElementById(`${key}`).removeEventListener("click", curriedFunctions1[key]);
        };
    };

    function giveMovementListeners(piece) {
        curriedFunctions2 = {};
        for (let tileId of piece.availableMoves(gameBoard)) {
            let tempBoard = [...gameBoard];
            tempBoard[piece.tileIndex] = 0;
            tempBoard[tileId] = piece;
            if (!bishopRookQueenCheckCheck(piece.white, tempBoard) && !pawnNightCheckCheck(piece.white, tempBoard)) {
                document.getElementById(`${tileId}`).addEventListener("click", moveToTile(piece, tileId));
                $(`#${tileId}`).append('<img class="selected" src="pieces/Dot.png">');
            };
        };
        if (piece.pieceType == 'king') {
            let castleOutput = castleCheck(piece)
            console.log(castleOutput);
            if (castleOutput[0] == true) {
                document.getElementById(`${piece.tileIndex-2}`).addEventListener("click", castleLeft(piece));
                $(`#${piece.tileIndex-2}`).append('<img class="selected" src="pieces/Dot.png">');
            };
            if (castleOutput[1] == true) {
                document.getElementById(`${piece.tileIndex+2}`).addEventListener("click", castleRight(piece));
                $(`#${piece.tileIndex+2}`).append('<img class="selected" src="pieces/Dot.png">');
            };
        };
        if (piece.pieceType == 'pawn' && enPassant) {
            if (piece.tileIndex + 1 == enPassant) {
                if (piece.white) {
                    document.getElementById(`${piece.tileIndex-7}`).addEventListener("click", enPassantFunction(piece, piece.tileIndex-7));
                    $(`#${piece.tileIndex-7}`).append('<img class="selected" src="pieces/Dot.png">');
                } else {
                    document.getElementById(`${piece.tileIndex+9}`).addEventListener("click", enPassantFunction(piece, piece.tileIndex+9));
                    $(`#${piece.tileIndex+9}`).append('<img class="selected" src="pieces/Dot.png">');
                };
            } else if (piece.tileIndex - 1 == enPassant) {
                if (piece.white) {
                    document.getElementById(`${piece.tileIndex-9}`).addEventListener("click", enPassantFunction(piece, piece.tileIndex-9));
                    $(`#${piece.tileIndex-9}`).append('<img class="selected" src="pieces/Dot.png">');
                } else {
                    document.getElementById(`${piece.tileIndex+7}`).addEventListener("click", enPassantFunction(piece, piece.tileIndex+7));
                    $(`#${piece.tileIndex+7}`).append('<img class="selected" src="pieces/Dot.png">');
                };
            };
        };
    };    

    function castleCheck(king) {
        // right side
        let location = king.tileIndex;
        let opponentSquares = getControlledSquares(!king.white);
        let output = [false,false]
        if (king.hasMoved == false && gameBoard[location+3].pieceType === 'rook' && gameBoard[location+3].white === king.white && gameBoard[location+2] === 0 && gameBoard[location+1] === 0) {
            output[1] = true;
            for (let i=0; i<4; i++) {
                if (opponentSquares.has(location+i)) {
                    output[1] = false;
                };
            };
        };
        //left side
        if (king.hasMoved == false && gameBoard[location-4].pieceType === 'rook' && gameBoard[location-4].white === king.white && gameBoard[location-3] === 0 && gameBoard[location-2] === 0 && gameBoard[location-1] === 0) {
            output[0] = true;
            for (let i=0; i<5; i++) {
                if (opponentSquares.has(location-i)) {
                    output[0] = false;
                };
            };
        };
        return output;
    };

    function removeMovementListeners() {
        for (let key in curriedFunctions2) {
            document.getElementById(`${key}`).removeEventListener("click", curriedFunctions2[key]);
        };
    };

    function newTurn(whiteTurn) {
        console.log(gameBoard);
        console.log('en', enPassant);
        clearDots();
        addDots(whiteTurn);
        removeCheckStyling();
        removeMovementListeners();
        removeSelectionStyling();
        removeSelectionListeners();
        console.log(checkCheck(whiteTurn));
        if (checkCheck(whiteTurn)) {
            addCheckStyling(whiteTurn);
            if (checkmateCheck(whiteTurn)) {
                winningMessage(whiteTurn);
                playVictorySound();
                return;
            };
        };
        giveSelectionListeners(pieceList, whiteTurn);
    };
   
    newTurn(true);
};

function winningMessage(white) {
    let message = white ? 'Checkmate! Black wins' : 'Checkmate! White wins';
    $('div#board').append(`<div class="winningMessage"><h3 class="text-light">${message}</h3></div>`);
};

function clearBoard() {
    $('div#board').empty();
};

function clearDots() {
    $('.blackDot').empty();
    $('.whiteDot').empty();
};

function addDots(whiteTurn) {
    if (whiteTurn) {
        $('.whiteDot').append('<img class="dots" src="pieces/greendot.png" alt="dot">');
        $('.blackDot').append('<img class="dots" src="pieces/greydot.png" alt="dot">');
    } else {
        $('.blackDot').append('<img class="dots" src="pieces/greendot.png" alt="dot">');
        $('.whiteDot').append('<img class="dots" src="pieces/greydot.png" alt="dot">');
    };
};

function playMovementSound() {
    let audio = document.getElementById("moveAudio");
    audio.volume = 0.5;
    audio.play();
};

function playCaptureSound() {
    let audio = document.getElementById("captureAudio");
    audio.volume = 0.5;
    audio.play();
};

function playVictorySound() {
    let audio = document.getElementById("victoryAudio");
    audio.volume = 0.5;
    audio.play();
};

function newGame() {
    clearBoard();
    createBoard();
    chessGame();
};


$(function() {
    newGame();
});
