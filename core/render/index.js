export function mountElement(vNode, container) {
  const { tag, props, children } = vNode;
  const element = vNode.el = document.createElement(tag);

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

export function diff(preNode, currNode) {
  if (preNode.tag !== currNode.tag) {
    preNode.el.replaceWith(currNode.tag); // tag 不同的話調整 tag 類型
  } else {
    const element = currNode.el = preNode.el;
    const { props: preProps , children: preChildren } = preNode;
    const { props: currProps , children: currChildren } = currNode;

    if (preProps && currProps) {
      Object.keys(currProps).forEach(key => {
        const oldName = preProps[key]; // id or class name
        const newName = currProps[key]; // id or class name

        if (oldName !== newName) {
          element.setAttribute(key, newName);
        }
      })
    }

    if (preProps) {
      Object.keys(preProps).forEach(key => {
        !currProps[key] && element.removeAttribute(key) // 新 DOM 沒有舊 DOM 的 id or class 的話刪掉
      })
    }

    if (Array.isArray(currChildren)) {
      if (Array.isArray(preChildren)) {
        const length = Math.min(preChildren.length, currChildren.length);

        for (let index = 0; index < length; index++) {
          const oldChildren = preChildren[index];
          const newChildren = currChildren[index];

          diff(oldChildren, newChildren); // DFS 繼續比對
        }

        if (currChildren.length > length) {
          for (let index = length; index < currChildren.length; index++) {
            mountElement(currChildren[index], element); // 建立比舊 DOM 多的部分
          }
        }

        if (preChildren.length > length) {
          for (let index = length; index < preChildren.length; index++) {
            element.parent.removeChild(preChildren[index].el); // 刪除新 DOM 沒有的部分
          }
        }
      } else {
        element.innerHTML = ""; // 舊 DOM 不是 Array 類型，所以清掉內容
        mountElement(currChildren, element);
      }
    } else {
      const content = `${currChildren}`;
  
      if (Array.isArray(preChildren)) {
        element.textContent = content; // 新 DOM 不是 Array 類型，所以直接修改
      } else if (content !== preChildren) {
        element.textContent = content; // 新舊 DOM 內容不同
      }
    }
  }
}

