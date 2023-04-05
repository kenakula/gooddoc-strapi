const pluginsConfig = () => ({
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
    },
  },
  'duplicate-button': true
});

export default pluginsConfig;
