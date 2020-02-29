let id = -1;

let DOMStrings = {
    DOMPrevKeyCodeID: null,
    DOMKeyCode: document.querySelector("#active"),
    DOMCurrentKeyCode: document.querySelector(".container-main"),
    DOMAllKeyCodes: document.querySelectorAll(".keycode"),

    setID: function(id) {
        this.DOMPrevKeyCodeID = document.querySelector("#keycode-" + id)
    },

    setStyle: function() {
        this.DOMPrevKeyCodeID.style.border = "2px solid #f7e4e8";
        this.DOMPrevKeyCodeID.style.WebkitAnimationName = "animate";
    },

    clear: function() {
        let arr = this.DOMAllKeyCodes;

        for (let i = 0; i < arr.length; i++) {
            setTimeout(function() {
                arr[i].textContent = "";
                arr[i].style.border = "none";
            }, 20 * i);
        }

        id = 0;
        data.elements = [];
    },
};

function KeyCode(kCode, kKey, code) {
    this.kCode = kCode;
    this.kKey = kKey;
    this.code = code;

    this.saveCodes = function() {
        data.keyCodes.push(this.kCode);
        data.keys.push(this.kKey);
        data.codes.push(this.code);
    }

    this.randomNumbers = function() {
        for (let i = 0; i < 15; i++) {
            let random = Math.floor(Math.random() * 32);
            if (data.elements.indexOf(random) > -1) {
                i--;
            } else {
                data.elements.push(random);
            }
        }
    }

    this.show = function() {
        if (this.kCode === 32) {
            return this.kCode + " " + this.code;
        } else {
            return this.kCode + " " + this.kKey;
        }
    }

    this.showPrevKeyCode = function() {
        prevKeyCode = data.keyCodes[data.keyCodes.length - 2];
        prevKeyKey = data.keys[data.keys.length - 2];
        prevCodeKey = data.codes[data.codes.length - 2];

        if (prevKeyCode === 32) {
            return prevKeyKey + " " + prevCodeKey;
        } else {
            return prevKeyCode + " " + prevKeyKey;
        }
    }
}

let data = {
    keyCodes: [],
    keys: [],
    codes: [],
    elements: [],
};

let setupEventlistener = function() {
    document.addEventListener("keydown", function(e) {
        id++;

        if (data.keyCodes.length < 1) {
            let keyCode = new KeyCode(e.keyCode, e.key, e.code);
            keyCode.saveCodes();
            keyCode.randomNumbers();
            DOMStrings.DOMKeyCode.textContent = keyCode.show();
        } else {
            let keyCode = new KeyCode(e.keyCode, e.key, e.code);
            keyCode.saveCodes();
            DOMStrings.setID(data.elements[id]);
            DOMStrings.DOMKeyCode.textContent = keyCode.show();
            DOMStrings.DOMPrevKeyCodeID.textContent = keyCode.showPrevKeyCode();
            DOMStrings.setStyle();

            if (id === data.elements.length - 1) {
                DOMStrings.clear();
                let keyCode = new KeyCode(e.keyCode, e.key, e.code);
                keyCode.saveCodes();
                keyCode.randomNumbers();
                DOMStrings.setID(data.elements[id]);
                DOMStrings.DOMKeyCode.textContent = keyCode.show();
            }
        }
    });
}

setupEventlistener();