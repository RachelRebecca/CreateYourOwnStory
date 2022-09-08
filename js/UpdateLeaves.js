function getAllCurrentNonEndingLeaveHeadlines()
{
    let returningLeaves = [];

    let leaves = tree.getAllLeaves();

    for (let i = 0; i < leaves.length; i++)
    {
        if (!leaves[i].element.endsWith("END"))
        {
            returningLeaves.add(leaves[i].headline);
        }
    }
    return returningLeaves;
}

function addNewLeavesHeadlinesForDropdownPurposes(leafHeadline1, leafHeadline2)
{
    let returningLeaves = getAllCurrentNonEndingLeaveHeadlines();

    returningLeaves.push(leafHeadline1);

    returningLeaves.push(leafHeadline2);

    return returningLeaves;
}