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

    end;

    constructor()
    {
        this.root = null;

        this.allLeaves = [];

        this.totalNodes = 0;

        this.currNode = this.root;

        this.end = "THE END";
    }

    traverse(choice)
    {
        let retVal = "";
        if (choice === 0) {
            this.currNode = this.currNode.right;
            if (this.currNode.right === null) {
                retVal = this.end;
            } else {
                retVal = {"text": this.currNode.right.text, "headline": this.currNode.right.headline};
            }
        } else if (choice === 1) {
            this.currNode = this.currNode.left;

            if (this.currNode.left === null) {
                retVal = this.end;
            } else {
                retVal = {"text": this.currNode.left.text, "headline": this.currNode.left.headline};
            }
        }

        return retVal;
    }

    getCurrStory()
    {
        let retVal = this.end;

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
            retVal.push(this.end);
            retVal.push(this.end);
        } else if (this.currNode.right == null) {
            let lineLeft = this.currNode.left.element.split(" ");
            let line = lineLeft[lineLeft.length - 1];
            retVal.push(this.end);
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

    getStorylineFromKeyword(element)
    {
        let retVal = "";
        if (this.isEmpty()) {
            retVal = "There is no story yet. Write one?";
        } else {
            retVal = this.getStorylineFromKeywordRecursively(element, this.root);
        }
        return retVal;
    }

    getStorylineFromKeywordRecursively(element, node)
    {
        if (node != null) {
            if (node.element === element)
            {
                return node.text;
            }
            else {
                this.getStorylineFromKeywordRecursively(element, node.left);
                if (node.element === element) {
                    return node.text;
                }
                else
                {
                    this.getStorylineFromKeywordRecursively(element, node.right);
                    if (node.element === element) {
                        return node.text;
                    }
                }
            }
        }
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