document.addEventListener("DOMContentLoaded", function () {
    var dragSrcElement = null;
    var isdragHappened = false;
    var source = {};
    var dest = {};

    function handleDragStart(e) {
        dragSrcElement = this;
        // console.log("handleDragStart", this.innerHTML, "KL", this + " e ", e);
        this.style.opacity = "0.4";
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

        }

        return false;

    }




    function handleDragEnd(e) {

        // console.log("handleDragEnd");

        this.style.opacity = "1.0";

    }

    let boxes = document.getElementsByClassName("box");

    for (let i = 0; i < boxes.length; i++) {

        let colors = [

            "#ff0000",

            "#874e4e",

            "hsl(203, 58%, 51%)",

            "#00BABA",

            "#FAC286",

            "#11EB11",

            "pale",

            "pink",

            "purple",

            "cyan",

            "hsl(66, 72%, 58%)",

        ];

        let random_color = colors[Math.floor(Math.random() * colors.length)];

        boxes[i].addEventListener("dragstart", handleDragStart, false);
        boxes[i].addEventListener("dragover", handleDragOver, false);
        boxes[i].addEventListener("drop", handleDrop, false);
        boxes[i].addEventListener("dragend", handleDragEnd, false);
        boxes[i].style.backgroundColor = random_color;
    }
    let undoButton = document.getElementById("undoButton");

    const undoLastAction = () => {
        let el1 = document.getElementById(source.id);
        el1.innerHTML = source.innerHTML;
        el1.style.backgroundColor = source.color;
        let el2 = document.getElementById(dest.id);
        el2.innerHTML = dest.innerHTML;
        el2.style.backgroundColor = dest.color;
    };
    undoButton.addEventListener("click", undoLastAction);

});