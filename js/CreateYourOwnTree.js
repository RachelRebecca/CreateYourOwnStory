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

    totalNodes;

    currNode;

    END;

    constructor()
    {
        this.root = null;

        this.allLeaves = [];

        this.totalNodes = 0;

        this.currNode = this.root;

        this.END = "THE END";
    }

    traverse(choice)
    {
        let retVal = "";
        if (choice === 0) {
            this.currNode = this.currNode.right;
            if (this.currNode.right === null) {
                retVal = this.END;
            } else {
                retVal = {"text": this.currNode.right.text, "headline": this.currNode.right.headline};
            }
        } else if (choice === 1) {
            this.currNode = this.currNode.left;

            if (this.currNode.left === null) {
                retVal = this.END;
            } else {
                retVal = {"text": this.currNode.left.text, "headline": this.currNode.left.headline};
            }
        }

        return retVal;
    }

    getCurrStory()
    {
        let retVal = this.END;

        if (this.currNode !== null) {
            let line = this.currNode.element.split(" ");
            retVal = line[line.length - 1];
        }
        return retVal;
    }

    getNextChoices()
    {
        let retVal = [];

        if (this.currNode.right === null && this.currNode.left == null) {
            retVal.push(this.END);
            retVal.push(this.END);
        } else if (this.currNode.right == null) {
            let lineLeft = this.currNode.left.element.split(" ");
            let line = lineLeft[lineLeft.length - 1];
            retVal.push(this.END);
            retVal.push(line);
        }
        return retVal;
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

    getTotalNodes()
    {
        this.totalNodes = 0;
        if (!this.isEmpty()) {
            this.getTotalRecursively(this.root);
        }
    }

    getTotalRecursively(node)
    {
        if (node !== null) {
            this.getTotalRecursively(node.left);
            this.totalNodes++;
            this.getTotalRecursively(node.right);
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
            if (node.element === element)
            {
                return node.text;
            }
            else {
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
            if (node.element === headline)
            {
                return node.path;
            }
            else {
                return this.getPathFromHeadlineRecursively(headline, node.left) || this.getPathFromHeadlineRecursively(headline, node.right);
            }
        }
    }


    containsPath(path)
    {
        let retVal = false;
        if (!this.isEmpty())
        {
            retVal = this.containsPathRecursiveCheck(path, this.root)
        }
        return retVal;
    }

    containsPathRecursiveCheck(path, node)
    {
        if (node != null) {
            if (node.element === path)
            {
                return true;
            }
            else {
                return this.containsPathRecursiveCheck(path, node.left) || this.containsPathRecursiveCheck(path, node.right);
            }
        }
        return false;
    }

    printTree()
    {
        if (this.isEmpty()) {
            console.log("N/A");
        } else {
            this.printTreeRecursively(this.root);
        }
    }

    printTreeRecursively(node)
    {
        if (node != null) {
            this.printTreeRecursively(node.left);
            console.log(node.element);
            this.printTreeRecursively(node.right);
        }
    }
}