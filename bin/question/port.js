export default () => {
  return {
    type: 'input',
    name: 'port',
    default() {
      return 8066;
    },
    message: 'set prot number'
  };
};
