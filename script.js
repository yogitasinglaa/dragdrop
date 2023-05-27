document.addEventListener("DOMContentLoaded", function () {
    let dragSrcElement = null;
    // let isdragHappened = false;
    // let source = {};
    // let dest = {};

    let isdragHappened = false;
    let source = [];
    let dest = [];
    let history = [];

    function handleDragStart(e) {
        dragSrcElement = this;
        // console.log("handleDragStart", this.innerHTML, "KL", this + " e ", e);
        this.style.opacity = "0.3";
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", this.innerHTML);
    }

    function handleDragOver(e) {
        // console.log("handleDragOver", " e ", e);
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = "move";
        return false;
    }


    function handleDrop(e) {
        // console.log("handleDrop");
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (dragSrcElement !== this) {
            // console.log("dragSrcElement", dragSrcElement);
            // console.log("this", this);
            source["innerHTML"] = dragSrcElement.innerHTML;
            source["id"] = dragSrcElement.id;
            source["color"] = dragSrcElement.style.backgroundColor;

            isdragHappened = true;
            dragSrcElement.innerHTML = this.innerHTML;
            dest["innerHTML"] = this.innerHTML;
            dest["id"] = this.id;
            dest["color"] = this.style.backgroundColor;
            
            this.innerHTML = e.dataTransfer.getData("text/html");
            let color1 = dragSrcElement.style.backgroundColor;

            dragSrcElement.style.backgroundColor = this.style.backgroundColor;

            this.style.backgroundColor = color1;

            let action = {
                source: { ...source },
                dest: { ...dest }
            };

            history.push(action);
        }
        return false;
    }

    function handleDragEnd(e) {

        // console.log("handleDragEnd");
        this.style.opacity = "1.5";

    }

    let boxes = document.getElementsByClassName("box");

    let colors = ["orange", "#874e4e", "hsl(203, 40%, 23%)", "#00BABA", "#FAC286", "#11EB11", "pale",
        "pink", "purple", "cyan", "hsl(66, 72%, 58%)", "olive", "grey", "#29676f"];
    for (let i = 0; i < boxes.length; i++) {

        let random_color = colors[Math.floor(Math.random() * colors.length)];

        boxes[i].addEventListener("dragstart", handleDragStart, false);
        boxes[i].addEventListener("dragover", handleDragOver, false);
        boxes[i].addEventListener("drop", handleDrop, false);
        boxes[i].addEventListener("dragend", handleDragEnd, false);
        boxes[i].style.backgroundColor = colors[i];
    }
    let undoButton = document.getElementById("undoButton");

    const undoLastAction = () => {

        if (history.length > 0) {
            const lastAction = history.pop();
            let el1 = document.getElementById(lastAction.source.id);
            el1.innerHTML = lastAction.source.innerHTML;
            el1.style.backgroundColor = lastAction.source.color;
            let el2 = document.getElementById(lastAction.dest.id);
            el2.innerHTML = lastAction.dest.innerHTML;
            el2.style.backgroundColor = lastAction.dest.color;
            isdragHappened = false;
        }

    };

    undoButton.addEventListener("click", undoLastAction);

});





