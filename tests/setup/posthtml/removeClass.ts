// @ts-nocheck
export default (classNames) => {
  return (tree) => {
    tree.walk((node) => {
      const classes = (node.attrs && node.attrs.class && node.attrs.class.split(' ')) || [];

      if (!classes.length) {
        return node;
      }

      const filteredClasses = classes.filter((classEntry) => {
        if (Array.isArray(classNames)) {
          return !classNames.some(classEntry.includes);
        }
        return !classEntry.includes(classNames);
      });

      return {
        ...node,
        attrs: {
          class: filteredClasses.join(' '),
        },
      };
    });
  };
};
