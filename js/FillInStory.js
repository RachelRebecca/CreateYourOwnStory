function compare(a, b) {
    const pathA = a.nodePath.split(" ");
    const pathB = b.nodePath.split(" ");

    let comparison = 0;
    if (pathA.length > pathB.length) {
        comparison = 1;
    } else if (pathA.length < pathB.length) {
        comparison = -1;
    }
    return comparison;
}


function insertNewTreeElement(pageBeforeHeadline, headline, text) {
    console.log("Page before headline: " + pageBeforeHeadline + " headline: " + headline + " text: " + text);

    if (pageBeforeHeadline === "") {
        tree.insert("Root", headline, text);
    } else {
        let path = tree.getPathFromHeadline(pageBeforeHeadline);

        let splitPath = path.split(" ");

        path = path + " " + splitPath[splitPath.length - 1];

        if (tree.containsPath(path + "Left")) {
            tree.insert(path + "Right", headline, text);
        } else {
            tree.insert(path + "Left", headline, text);
        }
    }
}

function doOnSubmit() {
    let element = document.getElementById("thisPageHeadline");
    let index = element.selectedIndex;
    let selectedOption = element.options[index];
    let thisPageHeadline = selectedOption.label;

    if (document.getElementById("doesThisContinue").checked) {
        let headline1 = prompt("Enter the headline for the first of the next two pages: ");
        let headline2 = prompt("Enter the headline for the second of the next two pages: ");

        console.log(headline1 + " " + headline2);

        let headlines = JSON.parse(sessionStorage.getItem("headlines"));

        if (headlines === null) {
            headlines = [headline1, headline2];
        } else {

            headlines.push(headline1);
            headlines.push(headline2);

            const index = headlines.indexOf(thisPageHeadline);
            if (index > -1) { // only splice array when item is found
                headlines.splice(index, 1); // 2nd parameter means remove one item only
            }
        }

        sessionStorage.setItem("headlines", JSON.stringify(headlines));

        insertNewTreeElement(previousHeadline, thisPageHeadline, document.getElementById("text").value);

        sessionStorage.setItem("previousHeadline", thisPageHeadline);
    } else {
        insertNewTreeElement(previousHeadline, thisPageHeadline, document.getElementById("text").value);
        insertNewTreeElement(thisPageHeadline, tree.END, "");

        sessionStorage.setItem("previousHeadline", thisPageHeadline);
    }

    let nodes = tree.getAllNodes();

    nodes = nodes.sort(compare);

    console.log(nodes);

    sessionStorage.setItem("nodes", JSON.stringify(nodes));

    showStory();
}