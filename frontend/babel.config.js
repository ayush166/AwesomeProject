module.exports = function(api) {
    api.cache(true);
    return {
      presets: [
        'module:metro-react-native-babel-preset',
      ],
      plugins: [
        'module:react-native-dotenv',
        [
          'module-resolver',
          {
            root: ['./src'],
            alias: {
              "@navigation": "./src/navigation",
              "@hooks": "./src/hooks",
              "@screens": "./src/screens",
            },
          },
        ],
      ],
    };
  };
  