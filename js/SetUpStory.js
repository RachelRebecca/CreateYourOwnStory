let nodes;


if (sessionStorage.getItem('nodes') != null) {
    nodes = JSON.parse(sessionStorage.getItem('nodes'));
    if (nodes !== null) {
        console.log(nodes);

        for (let i = 0; i < nodes.length; i++) {
            tree.insert(nodes[i].nodePath, nodes[i].headline, nodes[i].text);
        }
    }
}

let root;
if (sessionStorage.getItem('root') === null) {
    root = "Once Upon a Time";
    sessionStorage.setItem('root', root);
} else {
    root = sessionStorage.getItem('root');
}

let options = [];
if (tree.isEmpty()) {
    options.push(root);
} else {
    let dropdownValues = JSON.parse(sessionStorage.getItem('dropdownValues'));

    if (dropdownValues !== null) {
        for (let i = 0; i < dropdownValues.length; i++) {
            if (dropdownValues[i] !== tree.END) {
                options.push(dropdownValues[i]);
            }
        }
    }
}

if (options.length === 0) {
    alert("You have written finished writing all of your stories!!");
    document.getElementById("createStory").style.display = "none";
}

for (let i = 0; i < options.length; i++) {
    let option = document.createElement("option");
    option.value = i + "";
    option.label = options[i];
    document.getElementById("thisPageHeadline").append(option);
}