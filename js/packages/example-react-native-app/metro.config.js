/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const exclusionList = require('metro-config/src/defaults/exclusionList');
const getWorkspaces = require('get-yarn-workspaces');
const path = require('path');

function getConfig(appDir) {
  const workspaces = getWorkspaces(appDir);

  // Add additional Yarn workspace package roots to the module map
  // https://bit.ly/2LHHTP0
  const watchFolders = [
    path.resolve(appDir, '../../node_modules'),
    ...workspaces.filter(workspaceDir => !(workspaceDir === appDir)),
  ];

  return {
    watchFolders,
    resolver: {
      blocklist: exclusionList(
        workspaces.map(
          workspacePath =>
            `/${workspacePath.replace(
              /\//g,
              '[/\\\\]',
            )}[/\\\\]node_modules[/\\\\]react-native[/\\\\].*/`,
        ),
      ),
      extraNodeModules: {
        // Resolve all react-native module imports to the locally-installed version
        'react-native': path.resolve(appDir, 'node_modules', 'react-native'),
      },
    },
  };
}

module.exports = getConfig(__dirname);
