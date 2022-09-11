/*tree.insert("Root", "Begin reading...", "You enter a secret closet. You see a band of elves on one side and a band of giants on the other.");

tree.insert("Root RootRight", "Go with the elves?", "You go with the elves and they tell you they need you to battle the evil witch who stole their worm.");

tree.insert("Root RootRight RootRightLeft", "Go for a swim?", "You decide to go for a swim. There you meet a troll trying to grab your leg!");

tree.insert("Root RootRight RootRightLeft RootRightLeftLeft", "Tell the troll a story?", "You tell the troll the story of the Three Pigs.");

tree.insert("Root RootLeft", "Go with the giants?", "You go with the giants. They tell you that you have to help them fight a dragon.");

tree.insert("Root RootLeft RootLeftLeft", "Trick the dragon?", "You decide to trick the dragon, telling him there is a class full of children outside the castle.");

tree.insert("Root RootLeft RootLeftRight", "Lure the dragon?", "You decide to lure the dragon out of the castle, showing yourself off and then jumping into the lake so it will go after you.");*/


function addTwoNewHeadlines(thisPageHeadline, headline1, headline2)
{
    return {"thisPage": thisPageHeadline, "headline1": headline1, "headline2": headline2};
}


function insertNewTreeElement(pageBeforeHeadline, headline, text)
{
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