class BinaryNode
{
    element;
    headline;
    text;
    left;
    right;

    constructor(element, headline, text)
    {
        this.element = element;
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

    insert(element, headline, text)
    {
        let rootWasNull = (this.root === null);

        this.root = this.insertRecursively(element, headline, text, this.root);

        if (rootWasNull) {
            this.currNode = this.root;
        }
    }

    insertRecursively(element, headline, text, node)
    {
        let retVal = new BinaryNode(element, headline, text);

        if (node != null) {
            let newElement = this.compare(element, node);

            if (newElement === node.element) {
                if (node.left != null && !(element.includes(node.left.element))) {
                    node.right = this.insertRecursively(element, headline, text, node.right);
                } else {
                    node.left = this.insertRecursively(element, headline, text, node.left);
                }
            } else {
                node.right = this.insertRecursively(element, headline, text, node.right);
            }
            retVal = node;
        }

        return retVal;
    }

    compare(element, node)
    {
        let splitElement = element.split(" ");
        let nodeElement = node.element.split(" ");

        let newElement = "";
        for (let i = 0; i < nodeElement.length; i++) {
            newElement += splitElement[i];
            if (i !== nodeElement.length - 1) {
                newElement += " ";
            }
        }
        return newElement;
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
            this.allNodes.push({"nodePath": node.element, "headline": node.headline, "text": node.text});
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
                this.allLeaves.push({"element": node.element, "headline": node.headline, "text": node.text});
            }
            this.getAllLeavesRecursively(node.right);
        }
    }

    getStorylineFromPath(element)
    {
        let retVal = "";
        if (this.isEmpty()) {
            retVal = "There is no story yet. Write one?";
        } else {
            retVal = this.getStorylineFromPathRecursively(element, this.root);
        }
        return retVal;
    }

    getStorylineFromPathRecursively(element, node)
    {
        if (node != null) {
            if (node.element === element) {
                return node.text;
            } else {
                return this.getStorylineFromPathRecursively(element, node.left) || this.getStorylineFromPathRecursively(element, node.right);
            }
        }
    }

    getPathFromHeadline(headline)
    {
        let retVal = "";
        if (this.isEmpty()) {
            retVal = "There is no story yet. Write one?";
        } else {
            retVal = this.getPathFromHeadlineRecursively(headline, this.root);
        }
        return retVal;
    }

    getPathFromHeadlineRecursively(headline, node)
    {
        if (node != null) {
            if (node.element === headline) {
                return node.path;
            } else {
                return this.getPathFromHeadlineRecursively(headline, node.left) || this.getPathFromHeadlineRecursively(headline, node.right);
            }
        }
    }

    containsPath(path)
    {
        let retVal = false;
        if (!this.isEmpty()) {
            retVal = this.containsPathRecursiveCheck(path, this.root)
        }
        return retVal;
    }

    containsPathRecursiveCheck(path, node)
    {
        if (node != null) {
            if (node.element === path) {
                return true;
            } else {
                return this.containsPathRecursiveCheck(path, node.left) || this.containsPathRecursiveCheck(path, node.right);
            }
        }
        return false;
    }
}

let tree = new CreateYourOwnTree();
