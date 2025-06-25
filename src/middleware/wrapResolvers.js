
function wrapResolvers(resolvers) {
  const wrapped = {};
  for (const [key, resolverFn] of Object.entries(resolvers)) {
    wrapped[key] = async function (...args) {
      console.log(`Resolving ${key}...`);
      const start = Date.now();
      const result = await resolverFn.apply(this, args);
      const end = Date.now();
      console.log(`Resolved ${key} in ${end - start}ms`);
      return result;
    };
  }
  return wrapped;
}

module.exports = wrapResolvers;
