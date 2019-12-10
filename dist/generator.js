"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconlyGenerator = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _svgo = _interopRequireDefault(require("svgo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IconlyGenerator =
/*#__PURE__*/
function () {
  function IconlyGenerator(config) {
    _classCallCheck(this, IconlyGenerator);

    if (!process.argv[2] || !process.argv[3]) {
      logger('+------------------------------------------------------------------+', true);
      logger('| ERROR: Please supply input- -AND- output- directory as arguments |', true);
      logger('|                                                                  |', true);
      logger('|           --> iconly [inputDir] [outputDir] <--                  |', true);
      logger('+------------------------------------------------------------------+', true);
      process.exit(1);
    }

    this.counter = 0;
    this.config = config;

    if (this.config.createIconComponents) {
      logger('ERROR: Creation of Icon components is not supported yet', true);
      process.exit(1);
    }

    this.svgo = new _svgo["default"]({
      plugins: [{
        cleanupAttrs: true
      }, {
        removeDoctype: true
      }, {
        removeXMLProcInst: true
      }, {
        removeComments: true
      }, {
        removeMetadata: true
      }, {
        removeXMLNS: true
      }, {
        removeTitle: true
      }, {
        removeDesc: true
      }, {
        removeUselessDefs: true
      }, {
        removeEditorsNSData: true
      }, {
        removeEmptyAttrs: true
      }, {
        removeHiddenElems: true
      }, {
        removeEmptyText: true
      }, {
        removeEmptyContainers: true
      }, {
        removeViewBox: false
      }, {
        cleanupEnableBackground: true
      }, {
        convertStyleToAttrs: true
      }, {
        convertColors: true
      }, {
        convertPathData: true
      }, {
        convertTransform: true
      }, {
        removeUnknownsAndDefaults: true
      }, {
        removeNonInheritableGroupAttrs: true
      }, {
        removeUselessStrokeAndFill: true
      }, {
        removeUnusedNS: true
      }, {
        cleanupIDs: true
      }, {
        cleanupNumericValues: true
      }, {
        moveElemsAttrsToGroup: true
      }, {
        moveGroupAttrsToElems: true
      }, {
        collapseGroups: true
      }, {
        removeRasterImages: false
      }, {
        mergePaths: true
      }, {
        convertShapeToPath: true
      }, {
        sortAttrs: true
      }, {
        removeDimensions: true
      }, {
        removeAttrs: {
          attrs: '(stroke|fill)'
        }
      }]
    });
    this.run();
  }

  _createClass(IconlyGenerator, [{
    key: "run",
    value: function run() {
      var _this$config, sourceDir, destDir, outputFilename, beautifyJson;

      return regeneratorRuntime.async(function run$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$config = this.config, sourceDir = _this$config.sourceDir, destDir = _this$config.destDir, outputFilename = _this$config.outputFilename, beautifyJson = _this$config.beautifyJson;

              if (!_fs["default"].existsSync(destDir)) {
                _fs["default"].mkdirSync(destDir);
              }

              _context.t0 = _fs["default"];
              _context.t1 = _path["default"].join("".concat(destDir, "/").concat(outputFilename ? outputFilename : 'iconlyData', ".json"));
              _context.t2 = JSON;
              _context.next = 7;
              return regeneratorRuntime.awrap(this.scanDir(sourceDir));

            case 7:
              _context.t3 = _context.sent;
              _context.t4 = beautifyJson ? 4 : 0;
              _context.t5 = _context.t2.stringify.call(_context.t2, _context.t3, null, _context.t4);

              _context.t0.writeFileSync.call(_context.t0, _context.t1, _context.t5);

              logger("Iconly Generator exported ".concat(this.counter, " SVG's into [").concat(this.config.destDir, "/").concat(this.config.outputFilename ? this.config.outputFilename : 'iconlyData', ".json]"));

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "scanDir",
    value: function scanDir(dir) {
      var iconsData, dirContent, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry, entryPath, parsingArray, entryName, isDir, iconData, svgData, _iconData;

      return regeneratorRuntime.async(function scanDir$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              iconsData = {};
              dirContent = _fs["default"].readdirSync(_path["default"].resolve(dir));
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 5;
              _iterator = dirContent[Symbol.iterator]();

            case 7:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 46;
                break;
              }

              entry = _step.value;
              entryPath = "".concat(dir, "/").concat(entry);
              parsingArray = entry.split('_');
              entryName = this.clean(parsingArray[0].toLowerCase());
              isDir = _fs["default"].lstatSync(entryPath).isDirectory();

              if (!isDir) {
                _context2.next = 23;
                break;
              }

              _context2.next = 16;
              return regeneratorRuntime.awrap(this.scanDir(entryPath));

            case 16:
              iconData = _context2.sent;

              if (iconData) {
                _context2.next = 20;
                break;
              }

              logger("Couldn't get data for ".concat(entryPath));
              return _context2.abrupt("return", process.exit(1));

            case 20:
              iconsData["".concat(entryName, "Group")] = iconData;
              _context2.next = 43;
              break;

            case 23:
              if (!(_path["default"].extname(entry) === '.svg')) {
                _context2.next = 43;
                break;
              }

              _context2.next = 26;
              return regeneratorRuntime.awrap(this.optimizeSVG(_fs["default"].readFileSync(entryPath, 'utf8')));

            case 26:
              svgData = _context2.sent;

              if (iconsData[entryName]) {
                _context2.next = 32;
                break;
              }

              iconsData[entryName] = {
                name: entryName,
                svgs: [{
                  sourcePath: entryPath,
                  size: this.getViewboxSize(svgData),
                  fileData: svgData
                }]
              };
              this.counter++;
              _context2.next = 43;
              break;

            case 32:
              _context2.prev = 32;
              _iconData = iconsData[entryName];

              if (!(!_iconData || !_iconData.svgs)) {
                _context2.next = 36;
                break;
              }

              throw new Error('Unexpected empty data');

            case 36:
              _iconData.svgs.push({
                sourcePath: entryPath,
                size: this.getViewboxSize(svgData),
                fileData: svgData
              });

              this.counter++;
              _context2.next = 43;
              break;

            case 40:
              _context2.prev = 40;
              _context2.t0 = _context2["catch"](32);
              throw new Error(_context2.t0);

            case 43:
              _iteratorNormalCompletion = true;
              _context2.next = 7;
              break;

            case 46:
              _context2.next = 52;
              break;

            case 48:
              _context2.prev = 48;
              _context2.t1 = _context2["catch"](5);
              _didIteratorError = true;
              _iteratorError = _context2.t1;

            case 52:
              _context2.prev = 52;
              _context2.prev = 53;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 55:
              _context2.prev = 55;

              if (!_didIteratorError) {
                _context2.next = 58;
                break;
              }

              throw _iteratorError;

            case 58:
              return _context2.finish(55);

            case 59:
              return _context2.finish(52);

            case 60:
              return _context2.abrupt("return", iconsData);

            case 61:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[5, 48, 52, 60], [32, 40], [53,, 55, 59]]);
    }
  }, {
    key: "clean",
    value: function clean(path) {
      return path.replace(this.config.sourceDir, '').replace(new RegExp('/', 'g'), '').replace(new RegExp(' ', 'g'), '-').replace('.svg', '');
    }
  }, {
    key: "optimizeSVG",
    value: function optimizeSVG(svgData) {
      var optimized;
      return regeneratorRuntime.async(function optimizeSVG$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.svgo.optimize(svgData));

            case 2:
              optimized = _context3.sent;
              return _context3.abrupt("return", optimized.data);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getViewboxSize",
    value: function getViewboxSize(svgData) {
      var viewboxData = svgData.split('viewBox="')[1].split('"')[0].split(' ');
      var width = viewboxData[2];
      var height = viewboxData[3];
      return [parseInt(width, 10), parseInt(height, 10)];
    }
  }]);

  return IconlyGenerator;
}();

exports.IconlyGenerator = IconlyGenerator;

function logger(text, isError) {
  if (isError) {
    // eslint-disable-next-line no-console
    console.error(text);
    return;
  }

  if (process.argv[4] === '-v') {
    // eslint-disable-next-line no-console
    console.log(text);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9nZW5lcmF0b3IudHMiXSwibmFtZXMiOlsiSWNvbmx5R2VuZXJhdG9yIiwiY29uZmlnIiwicHJvY2VzcyIsImFyZ3YiLCJsb2dnZXIiLCJleGl0IiwiY291bnRlciIsImNyZWF0ZUljb25Db21wb25lbnRzIiwic3ZnbyIsIlNWR08iLCJwbHVnaW5zIiwiY2xlYW51cEF0dHJzIiwicmVtb3ZlRG9jdHlwZSIsInJlbW92ZVhNTFByb2NJbnN0IiwicmVtb3ZlQ29tbWVudHMiLCJyZW1vdmVNZXRhZGF0YSIsInJlbW92ZVhNTE5TIiwicmVtb3ZlVGl0bGUiLCJyZW1vdmVEZXNjIiwicmVtb3ZlVXNlbGVzc0RlZnMiLCJyZW1vdmVFZGl0b3JzTlNEYXRhIiwicmVtb3ZlRW1wdHlBdHRycyIsInJlbW92ZUhpZGRlbkVsZW1zIiwicmVtb3ZlRW1wdHlUZXh0IiwicmVtb3ZlRW1wdHlDb250YWluZXJzIiwicmVtb3ZlVmlld0JveCIsImNsZWFudXBFbmFibGVCYWNrZ3JvdW5kIiwiY29udmVydFN0eWxlVG9BdHRycyIsImNvbnZlcnRDb2xvcnMiLCJjb252ZXJ0UGF0aERhdGEiLCJjb252ZXJ0VHJhbnNmb3JtIiwicmVtb3ZlVW5rbm93bnNBbmREZWZhdWx0cyIsInJlbW92ZU5vbkluaGVyaXRhYmxlR3JvdXBBdHRycyIsInJlbW92ZVVzZWxlc3NTdHJva2VBbmRGaWxsIiwicmVtb3ZlVW51c2VkTlMiLCJjbGVhbnVwSURzIiwiY2xlYW51cE51bWVyaWNWYWx1ZXMiLCJtb3ZlRWxlbXNBdHRyc1RvR3JvdXAiLCJtb3ZlR3JvdXBBdHRyc1RvRWxlbXMiLCJjb2xsYXBzZUdyb3VwcyIsInJlbW92ZVJhc3RlckltYWdlcyIsIm1lcmdlUGF0aHMiLCJjb252ZXJ0U2hhcGVUb1BhdGgiLCJzb3J0QXR0cnMiLCJyZW1vdmVEaW1lbnNpb25zIiwicmVtb3ZlQXR0cnMiLCJhdHRycyIsInJ1biIsInNvdXJjZURpciIsImRlc3REaXIiLCJvdXRwdXRGaWxlbmFtZSIsImJlYXV0aWZ5SnNvbiIsImZzIiwiZXhpc3RzU3luYyIsIm1rZGlyU3luYyIsInBhdGgiLCJqb2luIiwiSlNPTiIsInNjYW5EaXIiLCJzdHJpbmdpZnkiLCJ3cml0ZUZpbGVTeW5jIiwiZGlyIiwiaWNvbnNEYXRhIiwiZGlyQ29udGVudCIsInJlYWRkaXJTeW5jIiwicmVzb2x2ZSIsImVudHJ5IiwiZW50cnlQYXRoIiwicGFyc2luZ0FycmF5Iiwic3BsaXQiLCJlbnRyeU5hbWUiLCJjbGVhbiIsInRvTG93ZXJDYXNlIiwiaXNEaXIiLCJsc3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsImljb25EYXRhIiwiZXh0bmFtZSIsIm9wdGltaXplU1ZHIiwicmVhZEZpbGVTeW5jIiwic3ZnRGF0YSIsIm5hbWUiLCJzdmdzIiwic291cmNlUGF0aCIsInNpemUiLCJnZXRWaWV3Ym94U2l6ZSIsImZpbGVEYXRhIiwiRXJyb3IiLCJwdXNoIiwicmVwbGFjZSIsIlJlZ0V4cCIsIm9wdGltaXplIiwib3B0aW1pemVkIiwiZGF0YSIsInZpZXdib3hEYXRhIiwid2lkdGgiLCJoZWlnaHQiLCJwYXJzZUludCIsInRleHQiLCJpc0Vycm9yIiwiY29uc29sZSIsImVycm9yIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFnQ2FBLGU7OztBQUtULDJCQUFtQkMsTUFBbkIsRUFBMEM7QUFBQTs7QUFDdEMsUUFBSSxDQUFDQyxPQUFPLENBQUNDLElBQVIsQ0FBYSxDQUFiLENBQUQsSUFBb0IsQ0FBQ0QsT0FBTyxDQUFDQyxJQUFSLENBQWEsQ0FBYixDQUF6QixFQUEwQztBQUN0Q0MsTUFBQUEsTUFBTSxDQUFDLHNFQUFELEVBQXlFLElBQXpFLENBQU47QUFDQUEsTUFBQUEsTUFBTSxDQUFDLHNFQUFELEVBQXlFLElBQXpFLENBQU47QUFDQUEsTUFBQUEsTUFBTSxDQUFDLHNFQUFELEVBQXlFLElBQXpFLENBQU47QUFDQUEsTUFBQUEsTUFBTSxDQUFDLHNFQUFELEVBQXlFLElBQXpF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QyxLQUFSLENBQWNILElBQWQ7QUFDQTtBQUNIOztBQUVELE1BQUloRyxPQUFPLENBQUNDLElBQVIsQ0FBYSxDQUFiLE1BQW9CLElBQXhCLEVBQThCO0FBQzFCO0FBQ0FpRyxJQUFBQSxPQUFPLENBQUNFLEdBQVIsQ0FBWUosSUFBWjtBQUNIO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IFNWR08gZnJvbSAnc3ZnbydcblxuaW50ZXJmYWNlIENvbmZpZ3VyYXRpb24ge1xuICAgIHNvdXJjZURpcjogc3RyaW5nXG4gICAgZGVzdERpcjogc3RyaW5nXG4gICAgb3V0cHV0RmlsZW5hbWU/OiBzdHJpbmdcbiAgICBiZWF1dGlmeUpzb24/OiBib29sZWFuXG4gICAgY3JlYXRlSWNvbkNvbXBvbmVudHM/OiBib29sZWFuXG59XG5cbmludGVyZmFjZSBJY29uU2l6ZSB7XG4gICAgd2lkdGg6IG51bWJlclxuICAgIGhlaWdodD86IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBJY29uU2l6ZVR5cGUgPSBudW1iZXIgfCBudW1iZXJbXSB8IEljb25TaXplXG5cbmV4cG9ydCBpbnRlcmZhY2UgSWNvbkRhdGEge1xuICAgIHNpemU6IG51bWJlcltdIC8vIE5PVEU6IFRoaXMgc2hvdWxkIGJlIFtudW1iZXIsIG51bWJlcl0gYnV0IFRTIGRvZXNuJ3QgdW5kZXJzdGFuZCB0aGlzIHdoZW4gcmUtaW1wb3J0aW5nIHRoZSBnZW5lcmF0ZWQgSlNPTlxuICAgIHNvdXJjZVBhdGg6IHN0cmluZ1xuICAgIGZpbGVEYXRhOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJY29uVHlwZSB7XG4gICAgbmFtZT86IHN0cmluZ1xuICAgIHN2Z3M/OiBJY29uRGF0YVtdXG59XG5cbmludGVyZmFjZSBJY29uc0RhdGEge1xuICAgIFtrZXk6IHN0cmluZ106IEljb25UeXBlXG59XG5cbmV4cG9ydCBjbGFzcyBJY29ubHlHZW5lcmF0b3Ige1xuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWd1cmF0aW9uXG4gICAgcHJpdmF0ZSBzdmdvOiBTVkdPXG4gICAgcHJpdmF0ZSBjb3VudGVyOiBudW1iZXJcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgaWYgKCFwcm9jZXNzLmFyZ3ZbMl0gfHwgIXByb2Nlc3MuYXJndlszXSkge1xuICAgICAgICAgICAgbG9nZ2VyKCcrLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKycsIHRydWUpXG4gICAgICAgICAgICBsb2dnZXIoJ3wgRVJST1I6IFBsZWFzZSBzdXBwbHkgaW5wdXQtIC1BTkQtIG91dHB1dC0gZGlyZWN0b3J5IGFzIGFyZ3VtZW50cyB8JywgdHJ1ZSlcbiAgICAgICAgICAgIGxvZ2dlcignfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwnLCB0cnVlKVxuICAgICAgICAgICAgbG9nZ2VyKCd8ICAgICAgICAgICAtLT4gaWNvbmx5IFtpbnB1dERpcl0gW291dHB1dERpcl0gPC0tICAgICAgICAgICAgICAgICAgfCcsIHRydWUpXG4gICAgICAgICAgICBsb2dnZXIoJystLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rJywgdHJ1ZSlcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb3VudGVyID0gMFxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZ1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5jcmVhdGVJY29uQ29tcG9uZW50cykge1xuICAgICAgICAgICAgbG9nZ2VyKCdFUlJPUjogQ3JlYXRpb24gb2YgSWNvbiBjb21wb25lbnRzIGlzIG5vdCBzdXBwb3J0ZWQgeWV0JywgdHJ1ZSlcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdmdvID0gbmV3IFNWR08oe1xuICAgICAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYW51cEF0dHJzOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVEb2N0eXBlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVYTUxQcm9jSW5zdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ29tbWVudHM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZU1ldGFkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVYTUxOUzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlVGl0bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZURlc2M6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVVzZWxlc3NEZWZzOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFZGl0b3JzTlNEYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFbXB0eUF0dHJzOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVIaWRkZW5FbGVtczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRW1wdHlUZXh0OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFbXB0eUNvbnRhaW5lcnM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVZpZXdCb3g6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjbGVhbnVwRW5hYmxlQmFja2dyb3VuZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29udmVydFN0eWxlVG9BdHRyczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29udmVydENvbG9yczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29udmVydFBhdGhEYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb252ZXJ0VHJhbnNmb3JtOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVVbmtub3duc0FuZERlZmF1bHRzOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVOb25Jbmhlcml0YWJsZUdyb3VwQXR0cnM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVVzZWxlc3NTdHJva2VBbmRGaWxsOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVVbnVzZWROUzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYW51cElEczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYW51cE51bWVyaWNWYWx1ZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG1vdmVFbGVtc0F0dHJzVG9Hcm91cDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbW92ZUdyb3VwQXR0cnNUb0VsZW1zOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb2xsYXBzZUdyb3VwczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlUmFzdGVySW1hZ2VzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VQYXRoczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29udmVydFNoYXBlVG9QYXRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzb3J0QXR0cnM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZURpbWVuc2lvbnM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUF0dHJzOiB7IGF0dHJzOiAnKHN0cm9rZXxmaWxsKScgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLnJ1bigpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBydW4oKSB7XG4gICAgICAgIGNvbnN0IHsgc291cmNlRGlyLCBkZXN0RGlyLCBvdXRwdXRGaWxlbmFtZSwgYmVhdXRpZnlKc29uIH0gPSB0aGlzLmNvbmZpZ1xuXG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhkZXN0RGlyKSkge1xuICAgICAgICAgICAgZnMubWtkaXJTeW5jKGRlc3REaXIpXG4gICAgICAgIH1cblxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKFxuICAgICAgICAgICAgcGF0aC5qb2luKGAke2Rlc3REaXJ9LyR7b3V0cHV0RmlsZW5hbWUgPyBvdXRwdXRGaWxlbmFtZSA6ICdpY29ubHlEYXRhJ30uanNvbmApLFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoYXdhaXQgdGhpcy5zY2FuRGlyKHNvdXJjZURpciksIG51bGwsIGJlYXV0aWZ5SnNvbiA/IDQgOiAwKVxuICAgICAgICApXG5cbiAgICAgICAgbG9nZ2VyKFxuICAgICAgICAgICAgYEljb25seSBHZW5lcmF0b3IgZXhwb3J0ZWQgJHt0aGlzLmNvdW50ZXJ9IFNWRydzIGludG8gWyR7dGhpcy5jb25maWcuZGVzdERpcn0vJHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5vdXRwdXRGaWxlbmFtZSA/IHRoaXMuY29uZmlnLm91dHB1dEZpbGVuYW1lIDogJ2ljb25seURhdGEnXG4gICAgICAgICAgICB9Lmpzb25dYFxuICAgICAgICApXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBzY2FuRGlyKGRpcjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGljb25zRGF0YTogSWNvbnNEYXRhID0ge31cbiAgICAgICAgY29uc3QgZGlyQ29udGVudCA9IGZzLnJlYWRkaXJTeW5jKHBhdGgucmVzb2x2ZShkaXIpKVxuXG4gICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZGlyQ29udGVudCkge1xuICAgICAgICAgICAgY29uc3QgZW50cnlQYXRoID0gYCR7ZGlyfS8ke2VudHJ5fWBcbiAgICAgICAgICAgIGNvbnN0IHBhcnNpbmdBcnJheSA9IGVudHJ5LnNwbGl0KCdfJylcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IHRoaXMuY2xlYW4ocGFyc2luZ0FycmF5WzBdLnRvTG93ZXJDYXNlKCkpXG4gICAgICAgICAgICBjb25zdCBpc0RpciA9IGZzLmxzdGF0U3luYyhlbnRyeVBhdGgpLmlzRGlyZWN0b3J5KClcblxuICAgICAgICAgICAgaWYgKGlzRGlyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWNvbkRhdGEgPSBhd2FpdCB0aGlzLnNjYW5EaXIoZW50cnlQYXRoKVxuXG4gICAgICAgICAgICAgICAgaWYgKCFpY29uRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBsb2dnZXIoYENvdWxkbid0IGdldCBkYXRhIGZvciAke2VudHJ5UGF0aH1gKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzcy5leGl0KDEpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWNvbnNEYXRhW2Ake2VudHJ5TmFtZX1Hcm91cGBdID0gaWNvbkRhdGFcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGF0aC5leHRuYW1lKGVudHJ5KSA9PT0gJy5zdmcnKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ZnRGF0YSA9IGF3YWl0IHRoaXMub3B0aW1pemVTVkcoZnMucmVhZEZpbGVTeW5jKGVudHJ5UGF0aCwgJ3V0ZjgnKSlcblxuICAgICAgICAgICAgICAgIGlmICghaWNvbnNEYXRhW2VudHJ5TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbnNEYXRhW2VudHJ5TmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBlbnRyeU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdmdzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VQYXRoOiBlbnRyeVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IHRoaXMuZ2V0Vmlld2JveFNpemUoc3ZnRGF0YSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVEYXRhOiBzdmdEYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnRlcisrXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGljb25EYXRhID0gaWNvbnNEYXRhW2VudHJ5TmFtZV1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpY29uRGF0YSB8fCAhaWNvbkRhdGEuc3Zncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBlbXB0eSBkYXRhJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbkRhdGEuc3Zncy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VQYXRoOiBlbnRyeVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogdGhpcy5nZXRWaWV3Ym94U2l6ZShzdmdEYXRhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlRGF0YTogc3ZnRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50ZXIrK1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGljb25zRGF0YVxuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYW4ocGF0aDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBwYXRoXG4gICAgICAgICAgICAucmVwbGFjZSh0aGlzLmNvbmZpZy5zb3VyY2VEaXIsICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnLycsICdnJyksICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnICcsICdnJyksICctJylcbiAgICAgICAgICAgIC5yZXBsYWNlKCcuc3ZnJywgJycpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBvcHRpbWl6ZVNWRyhzdmdEYXRhOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgb3B0aW1pemVkID0gYXdhaXQgdGhpcy5zdmdvLm9wdGltaXplKHN2Z0RhdGEpXG4gICAgICAgIHJldHVybiBvcHRpbWl6ZWQuZGF0YVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Vmlld2JveFNpemUoc3ZnRGF0YTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHZpZXdib3hEYXRhID0gc3ZnRGF0YVxuICAgICAgICAgICAgLnNwbGl0KCd2aWV3Qm94PVwiJylbMV1cbiAgICAgICAgICAgIC5zcGxpdCgnXCInKVswXVxuICAgICAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgY29uc3Qgd2lkdGggPSB2aWV3Ym94RGF0YVsyXVxuICAgICAgICBjb25zdCBoZWlnaHQgPSB2aWV3Ym94RGF0YVszXVxuXG4gICAgICAgIHJldHVybiBbcGFyc2VJbnQod2lkdGgsIDEwKSwgcGFyc2VJbnQoaGVpZ2h0LCAxMCldXG4gICAgfVxufVxuXG5mdW5jdGlvbiBsb2dnZXIodGV4dDogc3RyaW5nLCBpc0Vycm9yPzogYm9vbGVhbikge1xuICAgIGlmIChpc0Vycm9yKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IodGV4dClcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuYXJndls0XSA9PT0gJy12Jykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZyh0ZXh0KVxuICAgIH1cbn1cbiJdfQ==