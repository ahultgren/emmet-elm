'use babel';

import Process from './process';

export default {

  activate(state) {
    if (atom.packages.isPackageLoaded('emmet')) {
      const pkgDir  = path.resolve(atom.packages.resolvePackagePath('emmet'), 'node_modules', 'emmet', 'lib')
      const emmet   = require(path.join(pkgDir, 'emmet'))
      const filters = require(path.join(pkgDir, 'filter', 'main'))

      const abbrUtils = require(path.join(pkgDir, 'utils', 'abbreviation'));
      const process = Process(abbrUtils);

      filters.add('elm', process);

      emmet.loadSnippets({
        "elm": {
          "filters": "elm",
          "extends": "html",
          "profile": "xml",
        },
      });
    }
  }
}
