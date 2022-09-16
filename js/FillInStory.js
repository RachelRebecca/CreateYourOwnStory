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