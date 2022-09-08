let story = "";


let leaves = tree.getAllLeaves();

let leavesFound = [];


let choice = 0;
/*while (leavesFound.length !== leaves.length)
{
    let node = tree.traverse(choice++);
    for (let i = 0; i < leaves.length; i++)
    {
        if (leaves[i].headline === node.headline)
        {
            document.write("<hr>");
            leavesFound.push(node);
            break;
        }
    }
    document.write(node.text);

    if (choice === 2)
    {
        choice = 0;
    }
}*/

for (let i = 0; i < leaves.length; i++) {
    let currPath = "";
    let splitLeafBySpace = leaves[i].element.split(" ");

    for (let j = 0; j < splitLeafBySpace.length; j++)
    {
        currPath += (j === 0 ? splitLeafBySpace[j] : (" " + splitLeafBySpace[j]));
        document.write(tree.getStorylineFromKeyword(currPath));
        document.write("<br>")
        if (j === splitLeafBySpace.length - 1)
        {
            document.write("<hr>");
        }
    }
    //story += leaves[i].headline + "\n" + leaves[i].text + "\n\n";
}