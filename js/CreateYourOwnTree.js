class BinaryNode
{
    nodePath;
    headline;
    text;
    left;
    right;

    constructor(nodePath, headline, text)
    {
        this.nodePath = nodePath;
        this.headline = headline;
        this.text = text;
        this.left = null;
        this.right = null;
    }
}

class CreateYourOwnTree
{
    root;

    allLeaves;

    allNodes;

    totalNodes;

    currNode;

    END;

    constructor()
    {
        this.root = null;

        this.allLeaves = [];

        this.allNodes = [];

        this.totalNodes = 0;

        this.currNode = this.root;

        this.END = "THE END";
    }

    resetStory()
    {
        this.currNode = this.root;
    }

    insert(nodePath, headline, text)
    {
        let rootWasNull = (this.root === null);

        this.root = this.insertRecursively(nodePath, headline, text, this.root);

        if (rootWasNull) {
            this.currNode = this.root;
        }
    }

    insertRecursively(nodePath, headline, text, node)
    {
        let retVal = new BinaryNode(nodePath, headline, text);

        if (node != null) {
            let newPath = this.compare(nodePath, node);

            if (newPath === node.nodePath) {
                if (node.left != null && !(nodePath.includes(node.left.nodePath))) {
                    node.right = this.insertRecursively(nodePath, headline, text, node.right);
                } else {
                    node.left = this.insertRecursively(nodePath, headline, text, node.left);
                }
            } else {
                node.right = this.insertRecursively(nodePath, headline, text, node.right);
            }
            retVal = node;
        }

        return retVal;
    }

    compare(nodePath, node)
    {
        let splitPath = nodePath.split(" ");
        let path = node.nodePath.split(" ");

        let newPath = "";
        for (let i = 0; i < path.length; i++) {
            newPath += splitPath[i];
            if (i !== path.length - 1) {
                newPath += " ";
            }
        }
        return newPath;
    }

    makeEmpty()
    {
        this.root = null;
    }

    isEmpty()
    {
        return this.root === null;
    }

    getAllNodes()
    {
        this.allNodes = [];

        if (!this.isEmpty())
        {
            this.getAllNodesRecursively(this.root);
        }

        return this.allNodes;
    }

    getAllNodesRecursively(node)
    {
        if (node != null)
        {
            this.getAllNodesRecursively(node.left);
            this.allNodes.push({"nodePath": node.nodePath, "headline": node.headline, "text": node.text});
            this.getAllNodesRecursively(node.right);
        }
    }

    getAllLeaves()
    {
        this.allLeaves = [];

        if (!this.isEmpty()) {
            this.getAllLeavesRecursively(this.root);
        }

        return this.allLeaves;
    }

    getAllLeavesRecursively(node)
    {
        if (node != null) {
            this.getAllLeavesRecursively(node.left);
            if (node.left === null && node.right === null) {
                this.allLeaves.push({"nodePath": node.nodePath, "headline": node.headline, "text": node.text});
            }
            this.getAllLeavesRecursively(node.right);
        }
    }

    getStorylineFromPath(nodePath)
    {
        if (this.isEmpty()) {
            return "There is no story yet. Write one?";
        } else {
            return this.getStorylineFromPathRecursively(nodePath, this.root);
        }
    }

    getStorylineFromPathRecursively(nodePath, node)
    {
        if (node != null) {
            if (node.nodePath === nodePath) {
                return node.text;
            } else {
                return this.getStorylineFromPathRecursively(nodePath, node.left) || this.getStorylineFromPathRecursively(nodePath, node.right);
            }
        }
    }

    getPathFromHeadline(headline)
    {
        if (this.isEmpty()) {
            return "There is no story yet. Write one?";
        } else {
            return this.getPathFromHeadlineRecursively(headline, this.root);
        }
    }

    getPathFromHeadlineRecursively(headline, node)
    {
        if (node != null) {
            if (node.headline === headline) {
                return node.nodePath;
            } else {
                return this.getPathFromHeadlineRecursively(headline, node.left) || this.getPathFromHeadlineRecursively(headline, node.right);
            }
        }
    }

    containsPath(path)
    {
        if (!this.isEmpty()) {
             return this.containsPathRecursiveCheck(path, this.root)
        }
        return false;
    }

    containsPathRecursiveCheck(nodePath, node)
    {
        if (node != null) {
            if (node.nodePath === nodePath) {
                return true;
            } else {
                return this.containsPathRecursiveCheck(nodePath, node.left) || this.containsPathRecursiveCheck(nodePath, node.right);
            }
        }
        return false;
    }
}

let tree = new CreateYourOwnTree();
