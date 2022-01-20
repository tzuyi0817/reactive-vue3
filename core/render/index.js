export function mountElement(vNode, container) {
  const { tag, props, children } = vNode;
  const element = document.createElement(tag);

  if (props) {
    for (const key in props) {
      const name = props[key]; // id or class name

      element.setAttribute(key, name);
    }
  }

  if (Array.isArray(children)) {
    children.forEach(h => mountElement(h, element))
  } else {
    const textNode = document.createTextNode(`${children}`);

    element.append(textNode);
  }
  
  container.append(element);
}