// 
!function (e) {

    var t = {};

    function i(n) {
        if (t[n]) return t[n].exports;
        var s = t[n] = {i: n, l: !1, exports: {}};
        return e[n].call(s.exports, s, s.exports, i), s.l = !0, s.exports
    }

    i.m = e, i.c = t, i.d = function (e, t, n) {
        i.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: n})
    }, i.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, i.t = function (e, t) {
        if (1 & t && (e = i(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var s in e) i.d(n, s, function (t) {
            return e[t]
        }.bind(null, s));
        return n
    }, i.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return i.d(t, "a", t), t
    }, i.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, i.p = "", i(i.s = 6)
}([function (e, t, i) {
    "use strict";
    i.r(t), i.d(t, "init", (function () {
        return r
    }));
    var n = i(2), s = i(3), o = i(4), a = i(1);
    // config.js: Khởi tạo trò chơi
    const r = {
        blockSize: 25,
        maxBlockSize: 26,
        minBlockSize: 10,
        rows: 20,
        columns: 10,
          // Cài đặt độ chính xác của bộ đếm thời gian tính bằng mili giây
        timerCountPrecision: 10,
        timerDisplayPrecision: 1e3,
        // Các mức tốc độ của Game
        speedArray: [2360, 1460, 920, 590, 388, 259.8, 177.5, 123.6, 87.9, 63.61, 46.93, 35.256, 26.977, 21.017, 16.67],
        devMode: !1,
        deletionAnimationSpeed: 500,// Tốc độ của hoạt ảnh xóa
        previewSize: 4, // Kích thước của cửa sổ xem trước các khối sắp tới
        detectDevice: () => navigator.maxTouchPoints ? "mobile" : "computer", // Hàm để phát hiện loại thiết bị (di động hoặc máy tính)
        gameMode: {
            endless: {
                increaseSpeedValue: 1, linesToIncreaseSpeed: 10, initSpeed: 3, display() { // Cập nhật hiển thị dựa trên chế độ trò chơi
                    document.getElementById("timerBox").classList.add("hide"), document.getElementById("timerTitle").classList.add("hide"), document.getElementById("scoreBox").classList.remove("hide"), document.getElementById("scoreTitle").classList.remove("hide")
                }, init() {  // Khởi tạo chế độ trò chơi, cài đặt tốc độ, bộ đếm thời gian và các cài đặt ban đầu khác
                    n.game.speed = this.initSpeed, this.display(), a.a.playingTheme = a.a.theme1
                }, start() {
                }, pause: () => !1, lineCheck(e) { // Kiểm tra nếu các dòng cần xóa có kích hoạt tăng tốc độ
                     // tăng tốc mỗi khi được 10 dòng
                    e.some((e, t) => (n.game.lines + t + 1) % this.linesToIncreaseSpeed == 0 && n.game.lines > 0) && n.game.increaseSpeed(this.increaseSpeedValue)
                }, end: () => !1, displayScore() {
                    o.display.endGame(!0, "GAME END", n.game.gameScore)
                }
            },
            rush: {
                initSpeed: 6,
                initTimer: 60,// 60s
                increaseSpeedValue: 1,
                linesToIncreaseSpeed: 5,
                display() {
                    document.getElementById("timerBox").classList.remove("hide"), document.getElementById("timerTitle").classList.remove("hide"), document.getElementById("scoreBox").classList.remove("hide"), document.getElementById("scoreTitle").classList.remove("hide")
                },
                init() {
                    n.game.speed = this.initSpeed, s.a.value = this.initTimer, s.a.pause(), this.display(), a.a.playingTheme = a.a.theme1
                },
                start() {
                    s.a.decrement(), s.a.display()
                },
                pause() {
                    s.a.pause()
                },
                lineCheck(e) {
                    e.some((e, t) => (n.game.lines + t + 1) % this.linesToIncreaseSpeed == 0 && n.game.lines > 0) && n.game.increaseSpeed(this.increaseSpeedValue)
                },
                end: () => s.a.value <= 0 && (s.a.pause(), n.game.stop(), n.game.gameStatut = "end", !0),
                displayScore() {
                    o.display.endGame(!0, "TIME OUT!", n.game.gameScore, "points")
                }
            },
            sprint: {
                initSpeed: 6,
                increaseSpeedValue: 1,
                linesToIncreaseSpeed: 5,
                initTimer: 0,
                linesToWin: 20,
                display() {
                    document.getElementById("timerBox").classList.remove("hide"), document.getElementById("timerTitle").classList.remove("hide"), document.getElementById("scoreBox").classList.add("hide"), document.getElementById("scoreTitle").classList.add("hide")
                },
                init() {
                    n.game.speed = this.initSpeed, s.a.value = this.initTimer, s.a.pause(), this.display(), a.a.playingTheme = a.a.theme1
                },
                start() {
                    s.a.increment(), s.a.display()
                },
                pause() {
                    s.a.pause()
                },
                lineCheck(e) {
                    e.some((e, t) => (n.game.lines + t + 1) % this.linesToIncreaseSpeed == 0 && n.game.lines > 0) && n.game.increaseSpeed(this.increaseSpeedValue)
                },
                end() {
                    return n.game.lines >= this.linesToWin && (s.a.pause(), n.game.stop(), n.game.gameStatut = "end", !0)
                },
                displayScore() {
                    o.display.endGame(!0, this.linesToWin + " LINES DONE!", s.a.value, "seconds")
                }
            }
        }
    }
    // config.js: end
}, function (e, t, i) {
    "use strict";
    i.d(t, "a", (function () {
        return n
    }));
    // audio.js: Khởi tạo âm thanh cho trò chơi
    let n = {
        theme1: new Audio("./sound/origTheme.mp3"),
        land: new Audio("./sound/samples/land.mp3"),
        level: new Audio("./sound/samples/level.mp3"),
        move: new Audio("./sound/samples/move.mp3"),
        rotate: new Audio("./sound/samples/rotate.mp3"),
        smack: new Audio("./sound/samples/shift.mp3"),
        pauseSound: new Audio("./sound/samples/pause.mp3"),
        line: new Audio("./sound/samples/line.mp3"),
        tetris: new Audio("./sound/samples/tetris.mp3"),
        gameover: new Audio("./sound/samples/gameover.mp3"),
        speedup: new Audio("./sound/samples/speedup.mp3"),
        save: new Audio("./sound/samples/save.mp3"),
        justDropped: !1,
        playingTheme: 0,
        musicEnabled: !0,
        toggleDrop() {
            this.justDropped = !this.justDropped
        },
        playSong(e) {
            this.musicEnabled && (e.play(), e.loop = !0, e.volume = .5)
        },
        play(e) {
            this.stop(e), e.play()
        },
        stop(e) {
            e.pause(), e.currentTime = 0
        },
        pause(e) {
            e.pause()
        },
        enableMusic(e) {
            this.musicEnabled = !!e
        }
    }
    // audio.js: end
}, function (e, t, i) {
    "use strict";
    i.r(t), i.d(t, "game", (function () {
        return S
    }));
    var n = i(0), s = i(3), o = i(1);
    // playground.js: quản lý và tạo ra các lưới trò chơi, bao gồm lưới chơi chính, lưới xem trước và lưới lưu trữ
    const a = {
        blocks: [], preview: [], deletingAnimation: "init", setBlockWidth() {
            const e = document.documentElement.clientWidth || document.body.clientWidth,
                t = Math.floor(e / (2.6 * n.init.columns));
            t > n.init.maxBlockSize ? n.init.blockSize = n.init.maxBlockSize : t < n.init.minBlockSize ? n.init.blockSize = n.init.minBlockSize : n.init.blockSize = t
        }, generatePlaygroundGrid() {
            this.setBlockWidth();
            const e = document.getElementById("playground"), t = document.querySelector("html");
            t.style.setProperty("--columns", n.init.columns), t.style.setProperty("--rows", n.init.rows), t.style.setProperty("--block-width", n.init.blockSize + "px");
            const i = n.init.rows * n.init.columns;
            for (let t = 0; t < i; t++) {
                let i = document.createElement("div");
                i.className = "playgroundBlock", n.init.devMode && (i.innerHTML = t), e.appendChild(i)
            }
            for (let t = 0; t < n.init.columns; t++) {
                let t = document.createElement("div");
                t.className = "playgroundBottom taken", e.appendChild(t)
            }
            this.blocks = Array.from(document.querySelectorAll(".grid div"))
        }, generatePreviewGrid() {
            const e = document.getElementById("nextTetrominoBox"), t = Math.pow(n.init.previewSize, 2);
            for (let i = 0; i < t; i++) {
                let t = document.createElement("div");
                t.className = "playgroundBlock", n.init.devMode && (t.innerHTML = i), e.appendChild(t)
            }
            this.preview = Array.from(document.querySelectorAll("#nextTetrominoBox div"))
        }, generateSavedGrid() {
            const e = document.getElementById("savedTetrominoBox"), t = Math.pow(n.init.previewSize, 2);
            for (let i = 0; i < t; i++) {
                let t = document.createElement("div");
                t.className = "playgroundBlock", n.init.devMode && (t.innerHTML = i), e.appendChild(t)
            }
            this.saved = Array.from(document.querySelectorAll("#savedTetrominoBox div"))
        }, generateAllGrid() {
            this.generatePlaygroundGrid(), this.generatePreviewGrid(), this.generateSavedGrid()
        }, cleanPreviewGrid() {
            this.preview.forEach(e => e.className = "playgroundBlock")
        }, cleanSavedGrid() {
            this.saved.forEach(e => e.className = "playgroundBlock")
        }, removeGrid(e) {
            const t = document.getElementById(e);
            for (; t.firstChild;) t.removeChild(t.firstChild)
        }, removeAllGrid() {
            this.removeGrid("nextTetrominoBox"), this.removeGrid("savedTetrominoBox"), this.removeGrid("playground")
        }, cleanAllGrid() {
            this.removeGrid("playground"), this.cleanPreviewGrid(), this.cleanSavedGrid()
        }, lineIsMade() {
            let e = [], t = [];
            for (let t = 0; t < n.init.columns; t++) e.push(t);
            for (let i = 0; i < n.init.rows; i++) {
                e.every(e => this.blocks[i * n.init.columns + e].classList.contains("taken") || this.blocks[i * n.init.columns + e].classList.contains("tetromino")) && t.push(i)
            }
            return t.length, t
        }, animateDeleteLine(e) {
            if (4 === e.length) {
                o.a.play(o.a.tetris);
                for (let t = 0; t < n.init.columns; t++) e.forEach(e => this.blocks[n.init.columns * e + t].className = "playgroundBlock taken specialErasing")
            } else {
                o.a.play(o.a.line);
                for (let t = 0; t < n.init.columns; t++) e.forEach(e => this.blocks[n.init.columns * e + t].className = "playgroundBlock taken erasing")
            }
        }, deleteLine(e) {
            for (let t = 0; t < e.length; t++) {
                let i = [];
                for (let s = 0; s < e[t] * n.init.columns; s++) i.push(this.blocks[s].className), this.blocks[s].className = "playgroundBlock";
                for (let s = 0; s < e[t] * n.init.columns; s++) {
                    !this.blocks[s + n.init.columns].className.includes("playgroundBottom") && (this.blocks[s + n.init.columns].className = i[s])
                }
            }
        }
        // playground.js: end
        // tetrominoes.js: tất cả các thuộc tính và phương thức cần thiết để quản lý các tetromino
    }, r = {
        number: 0,
        position: 0, // Vị trí hiện tại của tetromino trên lưới
        rotation: 0, // Trạng thái xoay hiện tại
        current: [],
        canBeSaved: !0,
        canMoveDown: !0,
        saved: {},
        next: {}, // Lưu trữ thông tin tetromino tiếp theo
        theTetrominoes: [], // Mảng chứa tất cả các hình dạng tetromino và các trạng thái xoay của chúng
        theTetrominoesPreview: [], // Mảng chứa các hình dạng tetromino và các trạng thái xoay để xem trước
       
        initPreview() { // Khởi tạo tetromino tiếp theo để xem trước
            const e = Math.floor(Math.random() * this.theTetrominoes.length),
                t = Math.floor(Math.random() * this.theTetrominoes[this.number].length),
                i = this.theTetrominoesPreview[e][t];
            this.next = {number: e, rotation: t, tetromino: i}
        },
        initSaved() { // Khởi tạo tetromino đã lưu với các giá trị mặc định
            this.saved = {number: 0, rotation: 0, tetromino: []}
        },
        initTetromino() { // Khởi tạo một tetromino mới nếu trạng thái trò chơi là 'notStarted'
            "notStarted" === S.gameStatut && (this.theTetrominoes = this.createTetrominoes(n.init.columns), this.theTetrominoesPreview = this.createTetrominoes(n.init.previewSize), this.initPreview()), this.number = this.next.number, this.rotation = this.next.rotation, this.position = Math.floor(n.init.columns / 2 - 1), this.canBeSaved = !0, this.canMoveDown = !0, this.initPreview(), this.current = this.theTetrominoes[this.number][this.rotation]
        },
        saveTetromino() {
            this.saved = {
                number: this.number,
                rotation: this.rotation,
                tetromino: this.theTetrominoesPreview[this.number][this.rotation]
            }
        },
        switchSaved() { // Chuyển đổi tetromino hiện tại với tetromino đã lưu.
            const e = this.saved;
            this.saveTetromino(), this.number = e.number, this.rotation = e.rotation, this.current = this.theTetrominoes[this.number][this.rotation], this.position = Math.floor(n.init.columns / 2 - 1), this.canBeSaved = !1, this.canMoveDown = !0
        },
        rotateTetromino(e) { // Xoay tetromino sang trái hoặc phải dựa trên hướng
            let t = this.rotation;
            "right" === e ? t++ : t--, t >= this.theTetrominoes[this.number].length && (t = 0), t < 0 && (t = this.theTetrominoes[this.number].length - 1);
            const i = this.theTetrominoes[this.number][t],
                s = i.some(e => a.blocks[this.position + e + n.init.columns].classList.contains("taken")),
                r = i.some(e => (e + this.position) % n.init.columns == 0),
                d = i.some(e => (e + this.position + 1) % n.init.columns == 0);
            s || r && d || (o.a.play(o.a.rotate), this.undraw(), this.current = i, this.rotation = t, this.draw())
        },
        drawPreview() { 
            a.cleanPreviewGrid(), this.next.tetromino.forEach(e => {
                a.preview[e].classList.add("tetromino"), a.preview[e].classList.add("colorT" + this.next.number.toString())
            })
        },
        drawSaved() { // Vẽ tetromino đã lưu trong lưới lưu trữ
            a.cleanSavedGrid(), this.saved.tetromino.forEach(e => {
                a.saved[e].classList.add("tetromino"), a.saved[e].classList.add("colorT" + this.saved.number.toString())
            })
        },
        draw() { // Vẽ tetromino hiện tại trên lưới playground
            this.current.forEach(e => {
                a.blocks[this.position + e].classList.add("tetromino"), a.blocks[this.position + e].classList.add("colorT" + this.number.toString())
            })
        },
        drawNew() { // Vẽ tetromino tiếp theo trong lưới xem trước
            this.initTetromino(), this.draw(), this.drawPreview()
        },
        undraw() { // Xóa tetromino hiện tại khỏi lưới playground
            this.current.forEach(e => {
                a.blocks[this.position + e].className = "playgroundBlock"
            })
        },
        moveDown() { // Di chuyển tetromino xuống một bước
            this.undraw(), this.position += n.init.columns, this.draw()
        },
        dropDown() { // Đưa tetromino xuống đáy của lưới ngay lập tức
            if (this.canMoveDown) {
                for (this.undraw(); !this.freeze();) this.position += n.init.columns;
                o.a.play(o.a.smack), o.a.justDropped = !0, this.draw()
            }
        },
        moveLeft() { // Di chuyển tetromino sang trái một bước nếu không gặp phải ranh giới hoặc khối khác
            this.current.some(e => (e + this.position) % n.init.columns == 0) || this.lateralBlock("left") || (o.a.play(o.a.move), this.undraw(), this.position--, this.draw())
        },
        pushDown() { // Di chuyển tetromino xuống một bước, xem xét các ranh giới
            "init" === a.deletingAnimation && (!this.freeze() && this.canMoveDown ? (o.a.play(o.a.move), this.undraw(), this.position += n.init.columns, this.draw()) : (this.canMoveDown && o.a.play(o.a.land), this.canMoveDown = !1))
        },
        moveRight() { // Di chuyển tetromino sang phải một bước nếu không gặp phải ranh giới hoặc khối khác
            this.current.some(e => (e + this.position + 1) % n.init.columns == 0) || this.lateralBlock("right") || (o.a.play(o.a.move), this.undraw(), this.position++, this.draw())
        },
        freeze() { // Cố định tetromino tại chỗ khi nó chạm đến đáy hoặc khối khác
            return !!this.current.some(e => a.blocks[this.position + e + n.init.columns].classList.contains("taken")) && (this.canMoveDown = !1, this.current.forEach(e => {
                a.blocks[e + this.position].classList.add("taken")
            }), !0)
        },
        lateralBlock(e) { // Kiểm tra xem có khối nào ở bên trái hoặc phải của tetromino hiện tại không
            let t;
            return t = "right" === e ? 1 : -1, this.current.some(e => a.blocks[this.position + e + t].classList.contains("taken"))
        }
    };
    // tetrominoes.js: end
    // input.js: Xử lí sự kiện đầu vào
    var d = i(4);
    // Mũi tên trái, Mũi tên phải, Mũi tên xuống, Mũi tên lên (để thả khối nhanh xuống), Phím 'A' để xoay trái, Phím 'Z' để xoay phải, Phím 'E' để lưu khối
    let l = 37, m = 39, c = 40, u = 38, h = 65, p = 90, g = 69;
    const y = {
        handleKeyPress(e) {
            "play" === S.gameStatut && (e.keyCode === l && r.moveLeft(), e.keyCode === m && r.moveRight(), e.keyCode === c && r.pushDown(), e.keyCode === u && r.smackDown(), e.keyCode === h && r.rotateTetromino("left"), e.keyCode === p && r.rotateTetromino("right"), e.keyCode === g && S.saveTetromino())
        }, handleTouchPress(e) {
            "play" === S.gameStatut && ("controlRight" === e.target.id && r.moveRight(), "controlLeft" === e.target.id && r.moveLeft(), "controlDown" === e.target.id && r.pushDown(), "controlUp" === e.target.id && r.smackDown(), "controlRotRight" === e.target.id && r.rotateTetromino("right"), "controlRotLeft" === e.target.id && r.rotateTetromino("left"), "controlSave" === e.target.id && S.saveTetromino())
        }, handleStart() {
            S.start()
        }, handleReset() {
            S.reset()
        }, handleBackMenu() {
            S.backMenu()
        }, setListener(e) {
            e ? (document.getElementById("touchControlContainer").addEventListener("click", this.handleTouchPress), document.getElementById("resetButton").addEventListener("click", this.handleReset), document.getElementById("startButton").addEventListener("click", this.handleStart), document.getElementById("backMenu").addEventListener("click", this.handleBackMenu), document.addEventListener("keydown", this.handleKeyPress)) : (document.getElementById("touchControlContainer").removeEventListener("click", this.handleTouchPress), document.getElementById("resetButton").removeEventListener("click", this.handleReset), document.getElementById("startButton").removeEventListener("click", this.handleReset), document.getElementById("backMenu").removeEventListener("click", this.handleReset), document.removeEventListener("keydown", this.handleKeyPress))
        }
    };
    // inputs.js: end
    var v = i(5);
    // game.js: Start
    const S = {
        gameScore: 0, lines: 8, timerId: 0, gameStatut: "notStarted", gameMode: "", speed: 0, init() { // Khởi tạo trò chơi bằng cách tạo lưới, thiết lập bộ lắng nghe sự kiện và khôi phục trạng thái ban đầu
            a.generateAllGrid(), y.setListener(!0), this.restore()
        }, quit() {
            this.restore(), a.removeAllGrid(), document.getElementById("startButton").innerHTML = "Start", document.getElementById("startButton").classList.add("buttonPulse"), y.setListener(!1), o.a.stop(o.a.theme1)
        }, restore() { // Khôi phục trạng thái ban đầu của trò chơi, bao gồm điểm số, số dòng và trạng thái trò chơi
            this.gameScore = 0, this.lines = 0, n.init.gameMode[this.gameMode].init(), this.updateScore(0), this.gameStatut = "notStarted", d.display.endGame(!1), d.display.pause(!1), d.display.sidePanelInfo(), r.initSaved(), a.deletingAnimation = "init", clearInterval(this.timerId)
        }, start() {
            "lost" !== this.gameStatut && "end" !== this.gameStatut || this.reset(), "notStarted" === this.gameStatut && (o.a.playSong(o.a.playingTheme), r.drawNew(), document.getElementById("startButton").classList.remove("buttonPulse")), "pause" === this.gameStatut || "notStarted" === this.gameStatut ? (o.a.playSong(o.a.playingTheme), this.timerId = setInterval(this.run.bind(this), n.init.speedArray[this.speed - 1]), n.init.gameMode[this.gameMode].start(), document.getElementById("startButton").innerHTML = "Pause", document.getElementById("startButton").classList.remove("buttonPulse"), d.display.pause(!1), this.gameStatut = "play") : this.pause()
        }, pause() { // Tạm dừng trò chơi và hiển thị trạng thái tạm dừng
            o.a.pause(o.a.playingTheme), o.a.play(o.a.pauseSound), this.gameStatut = "pause", d.display.pause(!0), n.init.gameMode[this.gameMode].pause(), document.getElementById("startButton").innerHTML = "Resume", document.getElementById("startButton").classList.add("buttonPulse"), clearInterval(this.timerId)
        }, reset() {
            o.a.stop(o.a.playingTheme), a.cleanAllGrid(), a.generatePlaygroundGrid(), this.restore(), r.initSaved(), this.gameStatut = "notStarted", document.getElementById("startButton").innerHTML = "Start", document.getElementById("startButton").classList.add("buttonPulse")
        }, backMenu() {
            this.quit(), v.a.showMenu(!0)
        }, saveTetromino() { // Lưu lại tetromino hiện tại nếu có thể và vẽ tetromino đã lưu 
            r.canBeSaved && (r.saved.tetromino.length > 0 ? (r.undraw(), r.switchSaved(), r.drawSaved(), r.undraw(), r.draw()) : (r.saveTetromino(), r.drawSaved(), r.undraw(), r.drawNew()), o.a.play(o.a.save))
        }, updateScore() { // Cập nhật điểm số và hiển thị số dòng đã xóa
            const e = this.lines * this.lines * 10;
            this.gameScore += e, document.getElementById("score").innerHTML = this.gameScore, document.getElementById("lines").innerHTML = this.lines
        }, increaseSpeed(e) { // Tăng tốc độ trò chơi và cập nhật hiển thị
            document.getElementById("speedBox").classList.add("flash"), setTimeout(() => {
                document.getElementById("speedBox").classList.remove("flash")
            }, 700), clearInterval(this.timerId), this.speed += e, this.timerId = setInterval(this.run.bind(this), n.init.speedArray[this.speed - 1]), document.getElementById("speed").innerHTML = this.speed, o.a.play(o.a.speedup)
        }, run() { // Chạy vòng lặp chính của trò chơi, kiểm tra các điều kiện kết thúc trò chơi và quản lý các hành động của tetromino
            if ("onGoing" === a.deletingAnimation) return;
            if (n.init.gameMode[this.gameMode].end()) return o.a.stop(o.a.playingTheme), void n.init.gameMode[this.gameMode].displayScore();
            const e = a.lineIsMade(), t = r.freeze();
            if (t && e.length && "done" !== a.deletingAnimation) return n.init.gameMode[this.gameMode].lineCheck(e), this.lines += e.length, this.updateScore(), a.animateDeleteLine(e), a.deletingAnimation = "onGoing", setTimeout(() => {
                a.deletingAnimation = "done"
            }, n.init.deletionAnimationSpeed), void setTimeout(() => {
                o.a.play(o.a.land)
            }, 1.5 * n.init.deletionAnimationSpeed);
            if (t) {
                o.a.justDropped ? o.a.toggleDrop() : o.a.play(o.a.land), a.deleteLine(e), a.deletingAnimation = "init", r.drawNew();
                this.loseCondition() && (o.a.stop(o.a.playingTheme), o.a.play(o.a.gameover), this.stop(), this.gameStatut = "lost", "endless" === this.gameMode ? d.display.endGame(!0, "GAME END", this.gameScore, "points") : (d.display.endGame(!0, "GAME OVER", " ", " "), s.a.pause()))
            } else r.moveDown()
        }, stop() { // Dừng trò chơi và cập nhật hiển thị nút bắt đầu
            clearInterval(this.timerId), document.getElementById("startButton").innerHTML = "Restart"
        }, loseCondition: () => r.current.some(e => a.blocks[r.position + e].classList.contains("taken"))// Kiểm tra điều kiện thua cuộc của trò chơi
    }
}, function (e, t, i) {
    "use strict";
    i.d(t, "a", (function () {
        return s
    }));
    var n = i(0);
    // timer.js: quản lý thời gian trong ứng dụng
    const s = {
        value: 0, // Giá trị hiện tại của bộ đếm thời gian
        timerCount: 0, // Biến lưu trữ định danh (ID) của setInterval để tăng hoặc giảm thời gian
        timerDisplay: 0, //  Biến lưu trữ định danh (ID) của setInterval để cập nhật hiển thị thời gian
        display() { // Cập nhật giá trị hiển thị của bộ đếm thời gian trên trang web
            this.timerDisplay = setInterval(() => {
                let e;
                e = this.value <= 0 ? 0 : Math.round(this.value), document.getElementById("timer").innerHTML = e
            }, n.init.timerDisplayPrecision)
        }, increment() { // Tăng giá trị của bộ đếm thời gian
            this.timerCount = setInterval(() => {
                this.value += n.init.timerCountPrecision / 1e3, this.value = Math.round(1e3 * this.value) / 1e3
            }, n.init.timerCountPrecision)
        }, decrement() { // Giảm giá trị của bộ đếm thời gian
            this.timerCount = setInterval(() => {
                this.value -= n.init.timerCountPrecision / 1e3, this.value = Math.round(1e3 * this.value) / 1e3
            }, n.init.timerCountPrecision)
        }, pause() { // Tạm dừng bộ đếm thời gian
            clearInterval(this.timerCount), clearInterval(this.timerDisplay)
        }
    }
}, function (e, t, i) {
    "use strict";
    i.r(t), i.d(t, "display", (function () {
        return o
    }));
    var n = i(2), s = i(3);
    // display.js: quản lí hiển thị giao diện
    const o = {
        tactil: !1, playgroundPanel(e) { // Hiển thị or ẩn các sidePane
            e ? (document.getElementById("sidePanelRight").classList.remove("hide"), document.getElementById("sidePanelLeft").classList.remove("hide"), document.getElementById("playgroundContainer").classList.remove("hide")) : (document.getElementById("sidePanelRight").classList.add("hide"), document.getElementById("sidePanelLeft").classList.add("hide"), document.getElementById("playgroundContainer").classList.add("hide"))
        }, mainMenu(e) { // Hiển thị or ẩn Menu chính 
            e ? (document.getElementById("mainMenu").classList.remove("hide"), this.touchControl(!1)) : (document.getElementById("mainMenu").classList.add("hide"), this.touchControl(this.tactil))
        }, sidePanelInfo() { // Cập nhật thông tin hiển thị trên bảng điều khiển bên cạnh (side panel)
            document.getElementById("speed").innerHTML = n.game.speed.toString(), document.getElementById("timer").innerHTML = Math.floor(s.a.value)
        }, endGame(e, t = "GAME OVER", i, n) { // hiển thị hoặc ẩn màn hình kết thúc trò chơi
            const s = e ? "flex" : "none";
            document.getElementById("endGame").style.display = s, e && (document.getElementById("endGameTitle").innerHTML = t, i >= 0 && (document.getElementById("finalScore").innerHTML = i), n && (document.getElementById("scoreUnit").innerHTML = n))
        }, pause(e) { // hiển thị hoặc ẩn màn hình tạm dừng trò chơi
            const t = e ? "block" : "none";
            document.getElementById("gamePaused").style.display = t
        }, touchControl(e) { // hiển thị hoặc ẩn điều khiển cảm ứng
            document.getElementById("touchControlContainer").style.display = e ? "flex" : "none"
        }
    }
    // display.js: end
}, function (e, t, i) {
    "use strict";
    i.d(t, "a", (function () {
        return a
    }));
    i(3);
    // menu.js: Hiển thị các giao diện menu trò chơi
    const {display: n} = i(4), {game: s} = i(2), {init: o} = i(0), a = {
        showMenu(e) { // hiển thị hoặc ẩn menu chính dựa trên giá trị của tham số bool
            n.mainMenu(e), n.playgroundPanel(!e)
        }, endlessMode() {
            this.showMenu(!1), s.gameMode = "endless", s.init()
        }, rushMode() {
            this.showMenu(!1), n.mainMenu(!1), n.playgroundPanel(!0), s.gameMode = "rush", s.init()
        }, sprintMode() {
            this.showMenu(!1), n.mainMenu(!1), n.playgroundPanel(!0), s.gameMode = "sprint", s.init()
        }
    }
    // menu.js: end
}, function (e, t, i) {
    "use strict";
    i.r(t);
    // index.js: Start
    var n = i(5), s = i(0), o = i(4), a = i(1), r = i(2);
    document.getElementById("endlessMode").addEventListener("click", () => n.a.endlessMode()), document.getElementById("rushMode").addEventListener("click", () => n.a.rushMode()), document.getElementById("sprintMode").addEventListener("click", () => n.a.sprintMode()), document.getElementById("musicSwitch").addEventListener("change", (function () {
        this.checked ? (a.a.enableMusic(!0), "play" === r.game.gameStatut && a.a.playSong(a.a.theme1)) : (a.a.enableMusic(!1), a.a.stop(a.a.theme1))
    })), "mobile" === s.init.detectDevice() ? o.display.tactil = !0 : o.display.tactil = !1
}]);
