function OnCreateElement(addElement, elementIn) {
    let NewElement = document.createElement(addElement);
    elementIn.appendChild(NewElement);
    return NewElement;
}

function AddNewAttribute(NameAttribute, AttributeVal) {
    if(NameAttribute !== undefined){
        let length = NameAttribute.length;
        for(let NumberOfElement = 0; NumberOfElement < length; NumberOfElement++) {
            this.setAttribute(NameAttribute[NumberOfElement], AttributeVal[NumberOfElement]);
        }
    }
}

function AddTextInnerHtml(text) {
    this.innerHTML = text.toString();
}

function CreateNewElement(Param) {
    if (Param.TagName !== undefined && Param.ParentChild !== undefined) {
        let elem = OnCreateElement(Param.TagName, Param.ParentChild);
        AddNewAttribute.apply(elem, Param.AtributteParamsArr);
        return elem;
    } else {
        if (debugState)
        console.log('Param {TagName or ParentChild} is undefined');
    }
}

/**
 * @return {boolean}
 */
function StateForCreateElement(Element) {
    return Element === null;
}