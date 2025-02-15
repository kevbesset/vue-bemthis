import { useCssModule } from "vue";

function autoDetectBlock(styles) {
  let block = Object.keys(styles).find(
    (className) => !className.includes("--") && !className.includes("__")
  );

  if (!block) {
    const firstProperty = Object.keys(styles)[0];
    if (firstProperty) {
      block = firstProperty.split("__")[0].split("--")[0];
    }
  }

  if (!block)
    console.warn(
      "No block found, are you using BEM?\n This may also be caused if your style file is empty"
    );

  return block;
}

export function useBem(forceBlock = undefined) {
  const styles = useCssModule();
  const block = forceBlock || autoDetectBlock(styles);

  const response = {
    block(modifiers) {
      const classKeyList = bemify(block, undefined, modifiers);

      return classKeyList.map((classKey) => styles[classKey]);
    },
    element(element, modifiers) {
      const classKeyList = bemify(block, element, modifiers);

      return classKeyList.map((classKey) => styles[classKey]);
    },
  };

  return {
    ...response,
    b: response.block,
    e: response.element,
  };
}

function bemify(block, element, modifiers) {
  const classList = [];

  if (!block) return [];

  let classElement = block;

  if (element) {
    classElement = `${block}__${element}`;
  }

  classList.push(classElement);

  applyModifiers(classElement, modifiers, classList);

  return classList;
}

function applyModifiers(element, modifiers, classList) {
  if (modifiers) {
    if (typeof modifiers === "string") {
      modifiers.split(" ").forEach((mod) => {
        classList.push(`${element}--${mod}`);
      });
    } else if (Array.isArray(modifiers)) {
      modifiers.forEach((mod) => {
        applyModifiers(element, mod, classList);
      });
    } else if (typeof modifiers === "object") {
      Object.entries(modifiers).forEach(([key, value]) => {
        if (value) {
          key.split(" ").forEach((mod) => {
            classList.push(`${element}--${mod}`);
          });
        }
      });
    } else {
      throw "Invalid type for modifiers";
    }
  }
}
