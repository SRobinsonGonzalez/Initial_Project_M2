var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  // const rootNode = document.querySelector("html");
  // function matchFunc(){}
  // if (matchFunc(startEl)) resultSet.push(startEl);
  let element = startEl.children; // [<div></div>, <h2></h2>]
  if (matchFunc(startEl)) {
    resultSet.push(startEl);
  }
  for (let i = 0; i < element.length; i++) {
    let result = traverseDomAndCollectElements(matchFunc, element[i]);
    resultSet = [...resultSet, ...result];
  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag
/*
('#id) => 'id'
('.class') => 'class'
('tag.class') => <div class></div> => 'tag.class'
('tag') => <div></div> => 'tag'
*/

//                                 '#button'
var selectorTypeMatcher = function (selector) {
  // tu código aquí
  if (selector[0] === "#") return "id";
  if (selector[0] === ".") return "class";
  if (selector.includes(".")) return "tag.class";
  // if (selector.split('.')) return 'tag.class'
  return "tag";
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

//                                '#button'
var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector); // 'id'
  var matchFunction = function (element) {
    //! ⬅
    if (selectorType === "id") {
      return `#${element.id}` === selector;
    } else if (selectorType === "class") {
      for (let i = 0; i < element.classList.length; i++) {
        if (`.${element.classList[i]}` === selector) {
          return true;
        }
      }
    } else if (selectorType === "tag.class") {
      let [tag, className] = selector.split(".");
      return (
        matchFunctionMaker(tag)(element) &&
        matchFunctionMaker(`.${className}`)(element)
      );
    } else if (selectorType === "tag") {
      return (
        element.tagName &&
        element.tagName.toLowerCase() === selector.toLowerCase()
      );
    }
    return false;
  };
  //!_________________________________________________________________________________
  //   if (selectorType === "id") {
  //     matchFunction = (element) => `#${element.id}` === selector;
  //   } else if (selectorType === "class") {
  //     matchFunction = (element) => {
  //       for (const clase of element.classList) {
  //         if (`.${clase}` === selector){
  //           return true;
  //         }
  //       };
  //       return false
  //     }
  //   } else if (selectorType === "tag.class") {
  //   var [a, , b] = [1,2,3]
  //     matchFunction = (element) => {
  //       const [tag, className] = selector.split('.');
  //       return matchFunctionMaker(tag)(element) &&
  //       matchFunctionMaker(`.${className}`)(element);
  //     }
  // } else if (selectorType === "tag") {
  //   matchFunction = (element) => element.tagName === selector.toUpperCase(); //! document.body.tagName ➡ 'BODY'
  // }                                                                          //! Hay que pasar a mayusculas el selector
  return matchFunction; //! ⬅
};

// $('#button')
var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);

  return elements;
};