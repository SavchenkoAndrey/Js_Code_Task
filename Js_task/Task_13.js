function initDiv(ParentChild) {
    let NewText = '(' + document.getElementById('input_2').value.toString() + ') ' +
        document.getElementById('input_1').value,
        ElemVal = document.getElementById('input_2').value,
        Element = document.getElementById(ElemVal);
    if (StateForCreateElement(Element) && ElemVal !== 'Please enter id element') {
        let Param = {};
        let attributeId = document.getElementById('input_2').value;
        Param.ParentChild = ParentChild;
        Param.AtributteParamsArr = [['style', 'id'], ['text-align: center', attributeId]];
        Param.TagName = 'div';
        Element = CreateNewElement(Param);
        AddTextInnerHtml.call(Element, NewText);
    } else if(!StateForCreateElement(Element)) {
        AddTextInnerHtml.call(Element, NewText);
    } else {
        if (debugState)
            console.log('Please select ID');
    }
}

function CreateNewCodeDeclaration(text) {
    let Element = document.getElementById(document.getElementById('input_2').value);
    if (!StateForCreateElement(Element)) {
        let ElementCode = Element.getElementsByClassName('js_answer')[0];
        if (ElementCode === undefined) {
            let Param = {};
            Param.ParentChild = Element;
            Param.AtributteParamsArr = [['class', 'style'],['js_answer', 'text-align: center']];
            Param.TagName = 'code';
            OnCreateElement('br', Element);
            let NewElement = CreateNewElement(Param);
            AddTextInnerHtml.call(NewElement, text);
        } else {
            AddTextInnerHtml.call(ElementCode, text);
        }
    } else {
        if (debugState)
            console.log('Please create div Element at first');
    }
}