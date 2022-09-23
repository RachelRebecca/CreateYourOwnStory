function compare(a, b)
{
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


function insertNewTreeElement(pageBeforeHeadline, headline, text)
{
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

function getPreviousHeadline(headlines, thisPageHeadline)
{
    let previousHeadline;
    for (let i = 0; i < headlines.length; i++) {
        if (headlines[i].split("|")[1] === thisPageHeadline) {
            previousHeadline = headlines[i].split("|")[0];
            break;
        }
    }
    if (previousHeadline === null || previousHeadline === undefined) {
        return "";// i.e. not found because page is root
    }
    return previousHeadline;
}

function doOnSubmit()
{
    let element = document.getElementById("thisPageHeadline");
    let index = element.selectedIndex;
    let selectedOption = element.options[index];
    let thisPageHeadline = selectedOption.label;
    let storyText = document.getElementById("text").value;

    if (document.getElementById("doesThisContinue").checked) {
        let headline1 = prompt("Enter the headline for the first of the next two pages: ");
        let headline2 = prompt("Enter the headline for the second of the next two pages: ");

        console.log(headline1 + " " + headline2);

        let dropdownValues = JSON.parse(sessionStorage.getItem("dropdownValues"));
        let headlines = JSON.parse(sessionStorage.getItem("headlines"))

        if (dropdownValues === null || headlines === null) { // meaning this is the root page
            dropdownValues = [headline1, headline2];
            headlines = [thisPageHeadline + "|" + headline1, thisPageHeadline + "|" + headline2]; // store as pageBeforeHeadline|thisPageHeadline
        } else { // there already exists at least two headlines (the root's two subsequent pages)
            dropdownValues.push(headline1);
            dropdownValues.push(headline2);
            headlines.push(thisPageHeadline + "|" + headline1);
            headlines.push(thisPageHeadline + "|" + headline2);

            const index = dropdownValues.indexOf(thisPageHeadline);
            if (index > -1) { // only splice array when item is found
                dropdownValues.splice(index, 1); // 2nd parameter means remove one item only
            }
        }

        sessionStorage.setItem("dropdownValues", JSON.stringify(dropdownValues));
        sessionStorage.setItem("headlines", JSON.stringify(headlines));

        let previousHeadline = getPreviousHeadline(headlines, thisPageHeadline);
        insertNewTreeElement(previousHeadline, thisPageHeadline, storyText);
    } else {
        // don't add any new headlines

        let headlines = JSON.parse(sessionStorage.getItem("headlines"))
        let previousHeadline = "";
        if (headlines !== null) { // if there are no headlines, this is the root, so there are no pages yet.
            previousHeadline = getPreviousHeadline(headlines, thisPageHeadline);
        }
        let dropdownValues = JSON.parse(sessionStorage.getItem("dropdownValues"));
        // remove this page from dropdowns
        if (dropdownValues !== null) {
            const index = dropdownValues.indexOf(thisPageHeadline);
            if (index > -1) { // only splice array when item is found
                dropdownValues.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
        sessionStorage.setItem("dropdownValues", JSON.stringify(dropdownValues));
        sessionStorage.setItem("headlines", JSON.stringify(headlines));

        insertNewTreeElement(previousHeadline, thisPageHeadline, storyText + "\n" + tree.END);
    }

    let nodes = tree.getAllNodes();

    nodes = nodes.sort(compare);

    console.log(nodes);

    sessionStorage.setItem("nodes", JSON.stringify(nodes));

    showStory();
}