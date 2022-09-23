function gatherStoryTogether()
{
    let story = "";

    if (tree.isEmpty()) {
        story += "There is no story yet. Write one?";
    } else {
        let leaves = tree.getAllLeaves();

        for (let i = 0; i < leaves.length; i++) {
            let currPath = "";
            let splitLeafBySpace = leaves[i].nodePath.split(" ");

            for (let j = 0; j < splitLeafBySpace.length; j++) {
                currPath += (j === 0 ? splitLeafBySpace[j] : (" " + splitLeafBySpace[j]));
                story += (tree.getStorylineFromPath(currPath) + "\n");
                if (j === splitLeafBySpace.length - 1) {
                    story += ("------------------\n");
                }
            }
        }
    }

    return (story);
}

function organizeStoryIntoArray()
{
    let story = "";
    if (tree.isEmpty()) {
        story += "There is no story yet. Write one?";
    } else {
        let nodes = tree.getAllNodes();
        let root = tree.root;
        nodes = nodes.sort(() => Math.random() - 0.5);
        let sortedText = [root.text];
        let sortedHeadlines = [root.headline];

        for (let i = 0; i < nodes.length; i++)
        {
            if (nodes[i].text === root.text && nodes[i].headline === root.headline)
            {
                continue;
            }
            sortedText.push(nodes[i].text);
            sortedHeadlines.push(nodes[i].headline);
        }
        console.log(sortedText);
        console.log(sortedHeadlines);

        for (let i = 0; i < sortedText.length; i++)
        {
            story += "\nPage " + (i + 1) + "\n------------------\n" + sortedText[i] + "\n";
            let nextTwo = tree.getNextTwoHeadlines(sortedHeadlines[i]);
            console.log(nextTwo);
            if (nextTwo[0] !== "" && nextTwo[1] !== "") {
                let firstIndex = sortedHeadlines.indexOf(nextTwo[0]);
                let secondIndex = sortedHeadlines.indexOf(nextTwo[1]);
                story += sortedHeadlines[firstIndex] + ": Turn to page " + (firstIndex + 1)
                    + "\n" + sortedHeadlines[secondIndex] + ": Turn to page " + (secondIndex + 1)
                    + "\n";
            }
        }
    }
    return story;
}

// download code came from
// https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
function download(filename, text)
{
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function showStories()
{
    alert(gatherStoryTogether());
}

function showStory()
{
    alert(organizeStoryIntoArray());
}