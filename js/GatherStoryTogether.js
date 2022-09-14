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

function showStory()
{
    alert(gatherStoryTogether());
}