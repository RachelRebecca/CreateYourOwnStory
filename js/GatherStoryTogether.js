function gatherStoryTogether()
{
    let story = "";

    let leaves = tree.getAllLeaves();

    for (let i = 0; i < leaves.length; i++) {
        let currPath = "";
        let splitLeafBySpace = leaves[i].element.split(" ");

        for (let j = 0; j < splitLeafBySpace.length; j++) {
            currPath += (j === 0 ? splitLeafBySpace[j] : (" " + splitLeafBySpace[j]));
            story += (tree.getStorylineFromKeyword(currPath) + "\n");
            if (j === splitLeafBySpace.length - 1) {
                story += ("------------------\n");
            }
        }
        //story += leaves[i].headline + "\n" + leaves[i].text + "\n\n";
    }

    return (story);
}
