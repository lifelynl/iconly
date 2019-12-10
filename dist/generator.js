"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconlyGenerator = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _svgo = _interopRequireDefault(require("svgo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    value: function () {
      var _run = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this$config, sourceDir, destDir, outputFilename, beautifyJson;

        return regeneratorRuntime.wrap(function _callee$(_context) {
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
                return this.scanDir(sourceDir);

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
        }, _callee, this);
      }));

      function run() {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: "scanDir",
    value: function () {
      var _scanDir = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(dir) {
        var iconsData, dirContent, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry, entryPath, parsingArray, entryName, isDir, iconData, svgData, _iconData;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
                return this.scanDir(entryPath);

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
                return this.optimizeSVG(_fs["default"].readFileSync(entryPath, 'utf8'));

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
        }, _callee2, this, [[5, 48, 52, 60], [32, 40], [53,, 55, 59]]);
      }));

      function scanDir(_x) {
        return _scanDir.apply(this, arguments);
      }

      return scanDir;
    }()
  }, {
    key: "clean",
    value: function clean(path) {
      return path.replace(this.config.sourceDir, '').replace(new RegExp('/', 'g'), '').replace(new RegExp(' ', 'g'), '-').replace('.svg', '');
    }
  }, {
    key: "optimizeSVG",
    value: function () {
      var _optimizeSVG = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(svgData) {
        var optimized;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.svgo.optimize(svgData);

              case 2:
                optimized = _context3.sent;
                return _context3.abrupt("return", optimized.data);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function optimizeSVG(_x2) {
        return _optimizeSVG.apply(this, arguments);
      }

      return optimizeSVG;
    }()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9nZW5lcmF0b3IudHMiXSwibmFtZXMiOlsiSWNvbmx5R2VuZXJhdG9yIiwiY29uZmlnIiwicHJvY2VzcyIsImFyZ3YiLCJsb2dnZXIiLCJleGl0IiwiY291bnRlciIsImNyZWF0ZUljb25Db21wb25lbnRzIiwic3ZnbyIsIlNWR08iLCJwbHVnaW5zIiwiY2xlYW51cEF0dHJzIiwicmVtb3ZlRG9jdHlwZSIsInJlbW92ZVhNTFByb2NJbnN0IiwicmVtb3ZlQ29tbWVudHMiLCJyZW1vdmVNZXRhZGF0YSIsInJlbW92ZVhNTE5TIiwicmVtb3ZlVGl0bGUiLCJyZW1vdmVEZXNjIiwicmVtb3ZlVXNlbGVzc0RlZnMiLCJyZW1vdmVFZGl0b3JzTlNEYXRhIiwicmVtb3ZlRW1wdHlBdHRycyIsInJlbW92ZUhpZGRlbkVsZW1zIiwicmVtb3ZlRW1wdHlUZXh0IiwicmVtb3ZlRW1wdHlDb250YWluZXJzIiwicmVtb3ZlVmlld0JveCIsImNsZWFudXBFbmFibGVCYWNrZ3JvdW5kIiwiY29udmVydFN0eWxlVG9BdHRycyIsImNvbnZlcnRDb2xvcnMiLCJjb252ZXJ0UGF0aERhdGEiLCJjb252ZXJ0VHJhbnNmb3JtIiwicmVtb3ZlVW5rbm93bnNBbmREZWZhdWx0cyIsInJlbW92ZU5vbkluaGVyaXRhYmxlR3JvdXBBdHRycyIsInJlbW92ZVVzZWxlc3NTdHJva2VBbmRGaWxsIiwicmVtb3ZlVW51c2VkTlMiLCJjbGVhbnVwSURzIiwiY2xlYW51cE51bWVyaWNWYWx1ZXMiLCJtb3ZlRWxlbXNBdHRyc1RvR3JvdXAiLCJtb3ZlR3JvdXBBdHRyc1RvRWxlbXMiLCJjb2xsYXBzZUdyb3VwcyIsInJlbW92ZVJhc3RlckltYWdlcyIsIm1lcmdlUGF0aHMiLCJjb252ZXJ0U2hhcGVUb1BhdGgiLCJzb3J0QXR0cnMiLCJyZW1vdmVEaW1lbnNpb25zIiwicmVtb3ZlQXR0cnMiLCJhdHRycyIsInJ1biIsInNvdXJjZURpciIsImRlc3REaXIiLCJvdXRwdXRGaWxlbmFtZSIsImJlYXV0aWZ5SnNvbiIsImZzIiwiZXhpc3RzU3luYyIsIm1rZGlyU3luYyIsInBhdGgiLCJqb2luIiwiSlNPTiIsInNjYW5EaXIiLCJzdHJpbmdpZnkiLCJ3cml0ZUZpbGVTeW5jIiwiZGlyIiwiaWNvbnNEYXRhIiwiZGlyQ29udGVudCIsInJlYWRkaXJTeW5jIiwicmVzb2x2ZSIsImVudHJ5IiwiZW50cnlQYXRoIiwicGFyc2luZ0FycmF5Iiwic3BsaXQiLCJlbnRyeU5hbWUiLCJjbGVhbiIsInRvTG93ZXJDYXNlIiwiaXNEaXIiLCJsc3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsImljb25EYXRhIiwiZXh0bmFtZSIsIm9wdGltaXplU1ZHIiwicmVhZEZpbGVTeW5jIiwic3ZnRGF0YSIsIm5hbWUiLCJzdmdzIiwic291cmNlUGF0aCIsInNpemUiLCJnZXRWaWV3Ym94U2l6ZSIsImZpbGVEYXRhIiwiRXJyb3IiLCJwdXNoIiwicmVwbGFjZSIsIlJlZ0V4cCIsIm9wdGltaXplIiwib3B0aW1pemVkIiwiZGF0YSIsInZpZXdib3hEYXRhIiwid2lkdGgiLCJoZWlnaHQiLCJwYXJzZUludCIsInRleHQiLCJpc0Vycm9yIiwiY29uc29sZSIsImVycm9yIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBZ0NhQSxlOzs7QUFLVCwyQkFBbUJDLE1BQW5CLEVBQTBDO0FBQUE7O0FBQ3RDLFFBQUksQ0FBQ0MsT0FBTyxDQUFDQyxJQUFSLENBQWEsQ0FBYixDQUFELElBQW9CLENBQUNELE9BQU8sQ0FBQ0MsSUFBUixDQUFhLENBQWIsQ0FBekIsRUFBMEM7QUFDdENDLE1BQUFBLE1BQU0sQ0FBQyxzRUFBRCxFQUF5RSxJQUF6RSxDQUFOO0FBQ0FBLE1BQUFBLE1BQU0sQ0FBQyxzRUFBRCxFQUF5RSxJQUF6RSxDQUFOO0FBQ0FBLE1BQUFBLE1BQU0sQ0FBQyxzRUFBRCxFQUF5RSxJQUF6RSxDQUFOO0FBQ0FBLE1BQUFBLE1BQU0sQ0FBQyxzRUFBRCxFQUF5RSxJ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QWlEO0FBQzdDLE1BQUlBLE9BQUosRUFBYTtBQUNUO0FBQ0FDLElBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjSCxJQUFkO0FBQ0E7QUFDSDs7QUFFRCxNQUFJaEcsT0FBTyxDQUFDQyxJQUFSLENBQWEsQ0FBYixNQUFvQixJQUF4QixFQUE4QjtBQUMxQjtBQUNBaUcsSUFBQUEsT0FBTyxDQUFDRSxHQUFSLENBQVlKLElBQVo7QUFDSDtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBTVkdPIGZyb20gJ3N2Z28nXG5cbmludGVyZmFjZSBDb25maWd1cmF0aW9uIHtcbiAgICBzb3VyY2VEaXI6IHN0cmluZ1xuICAgIGRlc3REaXI6IHN0cmluZ1xuICAgIG91dHB1dEZpbGVuYW1lPzogc3RyaW5nXG4gICAgYmVhdXRpZnlKc29uPzogYm9vbGVhblxuICAgIGNyZWF0ZUljb25Db21wb25lbnRzPzogYm9vbGVhblxufVxuXG5pbnRlcmZhY2UgSWNvblNpemUge1xuICAgIHdpZHRoOiBudW1iZXJcbiAgICBoZWlnaHQ/OiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgSWNvblNpemVUeXBlID0gbnVtYmVyIHwgbnVtYmVyW10gfCBJY29uU2l6ZVxuXG5leHBvcnQgaW50ZXJmYWNlIEljb25EYXRhIHtcbiAgICBzaXplOiBudW1iZXJbXSAvLyBOT1RFOiBUaGlzIHNob3VsZCBiZSBbbnVtYmVyLCBudW1iZXJdIGJ1dCBUUyBkb2Vzbid0IHVuZGVyc3RhbmQgdGhpcyB3aGVuIHJlLWltcG9ydGluZyB0aGUgZ2VuZXJhdGVkIEpTT05cbiAgICBzb3VyY2VQYXRoOiBzdHJpbmdcbiAgICBmaWxlRGF0YTogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSWNvblR5cGUge1xuICAgIG5hbWU/OiBzdHJpbmdcbiAgICBzdmdzPzogSWNvbkRhdGFbXVxufVxuXG5pbnRlcmZhY2UgSWNvbnNEYXRhIHtcbiAgICBba2V5OiBzdHJpbmddOiBJY29uVHlwZVxufVxuXG5leHBvcnQgY2xhc3MgSWNvbmx5R2VuZXJhdG9yIHtcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlndXJhdGlvblxuICAgIHByaXZhdGUgc3ZnbzogU1ZHT1xuICAgIHByaXZhdGUgY291bnRlcjogbnVtYmVyXG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWd1cmF0aW9uKSB7XG4gICAgICAgIGlmICghcHJvY2Vzcy5hcmd2WzJdIHx8ICFwcm9jZXNzLmFyZ3ZbM10pIHtcbiAgICAgICAgICAgIGxvZ2dlcignKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSsnLCB0cnVlKVxuICAgICAgICAgICAgbG9nZ2VyKCd8IEVSUk9SOiBQbGVhc2Ugc3VwcGx5IGlucHV0LSAtQU5ELSBvdXRwdXQtIGRpcmVjdG9yeSBhcyBhcmd1bWVudHMgfCcsIHRydWUpXG4gICAgICAgICAgICBsb2dnZXIoJ3wgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8JywgdHJ1ZSlcbiAgICAgICAgICAgIGxvZ2dlcignfCAgICAgICAgICAgLS0+IGljb25seSBbaW5wdXREaXJdIFtvdXRwdXREaXJdIDwtLSAgICAgICAgICAgICAgICAgIHwnLCB0cnVlKVxuICAgICAgICAgICAgbG9nZ2VyKCcrLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKycsIHRydWUpXG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY291bnRlciA9IDBcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWdcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuY3JlYXRlSWNvbkNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIGxvZ2dlcignRVJST1I6IENyZWF0aW9uIG9mIEljb24gY29tcG9uZW50cyBpcyBub3Qgc3VwcG9ydGVkIHlldCcsIHRydWUpXG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3ZnbyA9IG5ldyBTVkdPKHtcbiAgICAgICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFudXBBdHRyczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRG9jdHlwZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlWE1MUHJvY0luc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNvbW1lbnRzOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVNZXRhZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlWE1MTlM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVRpdGxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVEZXNjOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVVc2VsZXNzRGVmczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRWRpdG9yc05TRGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRW1wdHlBdHRyczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlSGlkZGVuRWxlbXM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUVtcHR5VGV4dDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRW1wdHlDb250YWluZXJzOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVWaWV3Qm94OiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYW51cEVuYWJsZUJhY2tncm91bmQ6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnZlcnRTdHlsZVRvQXR0cnM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnZlcnRDb2xvcnM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnZlcnRQYXRoRGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29udmVydFRyYW5zZm9ybTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlVW5rbm93bnNBbmREZWZhdWx0czogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm9uSW5oZXJpdGFibGVHcm91cEF0dHJzOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVVc2VsZXNzU3Ryb2tlQW5kRmlsbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlVW51c2VkTlM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFudXBJRHM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFudXBOdW1lcmljVmFsdWVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtb3ZlRWxlbXNBdHRyc1RvR3JvdXA6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG1vdmVHcm91cEF0dHJzVG9FbGVtczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGFwc2VHcm91cHM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVJhc3RlckltYWdlczogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG1lcmdlUGF0aHM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnZlcnRTaGFwZVRvUGF0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc29ydEF0dHJzOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVEaW1lbnNpb25zOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVBdHRyczogeyBhdHRyczogJyhzdHJva2V8ZmlsbCknIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5ydW4oKVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgcnVuKCkge1xuICAgICAgICBjb25zdCB7IHNvdXJjZURpciwgZGVzdERpciwgb3V0cHV0RmlsZW5hbWUsIGJlYXV0aWZ5SnNvbiB9ID0gdGhpcy5jb25maWdcblxuICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGVzdERpcikpIHtcbiAgICAgICAgICAgIGZzLm1rZGlyU3luYyhkZXN0RGlyKVxuICAgICAgICB9XG5cbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhcbiAgICAgICAgICAgIHBhdGguam9pbihgJHtkZXN0RGlyfS8ke291dHB1dEZpbGVuYW1lID8gb3V0cHV0RmlsZW5hbWUgOiAnaWNvbmx5RGF0YSd9Lmpzb25gKSxcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGF3YWl0IHRoaXMuc2NhbkRpcihzb3VyY2VEaXIpLCBudWxsLCBiZWF1dGlmeUpzb24gPyA0IDogMClcbiAgICAgICAgKVxuXG4gICAgICAgIGxvZ2dlcihcbiAgICAgICAgICAgIGBJY29ubHkgR2VuZXJhdG9yIGV4cG9ydGVkICR7dGhpcy5jb3VudGVyfSBTVkcncyBpbnRvIFske3RoaXMuY29uZmlnLmRlc3REaXJ9LyR7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcub3V0cHV0RmlsZW5hbWUgPyB0aGlzLmNvbmZpZy5vdXRwdXRGaWxlbmFtZSA6ICdpY29ubHlEYXRhJ1xuICAgICAgICAgICAgfS5qc29uXWBcbiAgICAgICAgKVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgc2NhbkRpcihkaXI6IHN0cmluZykge1xuICAgICAgICBjb25zdCBpY29uc0RhdGE6IEljb25zRGF0YSA9IHt9XG4gICAgICAgIGNvbnN0IGRpckNvbnRlbnQgPSBmcy5yZWFkZGlyU3luYyhwYXRoLnJlc29sdmUoZGlyKSlcblxuICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGRpckNvbnRlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5UGF0aCA9IGAke2Rpcn0vJHtlbnRyeX1gXG4gICAgICAgICAgICBjb25zdCBwYXJzaW5nQXJyYXkgPSBlbnRyeS5zcGxpdCgnXycpXG4gICAgICAgICAgICBjb25zdCBlbnRyeU5hbWUgPSB0aGlzLmNsZWFuKHBhcnNpbmdBcnJheVswXS50b0xvd2VyQ2FzZSgpKVxuICAgICAgICAgICAgY29uc3QgaXNEaXIgPSBmcy5sc3RhdFN5bmMoZW50cnlQYXRoKS5pc0RpcmVjdG9yeSgpXG5cbiAgICAgICAgICAgIGlmIChpc0Rpcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGljb25EYXRhID0gYXdhaXQgdGhpcy5zY2FuRGlyKGVudHJ5UGF0aClcblxuICAgICAgICAgICAgICAgIGlmICghaWNvbkRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyKGBDb3VsZG4ndCBnZXQgZGF0YSBmb3IgJHtlbnRyeVBhdGh9YClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3MuZXhpdCgxKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGljb25zRGF0YVtgJHtlbnRyeU5hbWV9R3JvdXBgXSA9IGljb25EYXRhXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhdGguZXh0bmFtZShlbnRyeSkgPT09ICcuc3ZnJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN2Z0RhdGEgPSBhd2FpdCB0aGlzLm9wdGltaXplU1ZHKGZzLnJlYWRGaWxlU3luYyhlbnRyeVBhdGgsICd1dGY4JykpXG5cbiAgICAgICAgICAgICAgICBpZiAoIWljb25zRGF0YVtlbnRyeU5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGljb25zRGF0YVtlbnRyeU5hbWVdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZW50cnlOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3ZnczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlUGF0aDogZW50cnlQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplOiB0aGlzLmdldFZpZXdib3hTaXplKHN2Z0RhdGEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlRGF0YTogc3ZnRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50ZXIrK1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpY29uRGF0YSA9IGljb25zRGF0YVtlbnRyeU5hbWVdXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaWNvbkRhdGEgfHwgIWljb25EYXRhLnN2Z3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgZW1wdHkgZGF0YScpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25EYXRhLnN2Z3MucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlUGF0aDogZW50cnlQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IHRoaXMuZ2V0Vmlld2JveFNpemUoc3ZnRGF0YSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZURhdGE6IHN2Z0RhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3VudGVyKytcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpY29uc0RhdGFcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFuKHBhdGg6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gcGF0aFxuICAgICAgICAgICAgLnJlcGxhY2UodGhpcy5jb25maWcuc291cmNlRGlyLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoJy8nLCAnZycpLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoJyAnLCAnZycpLCAnLScpXG4gICAgICAgICAgICAucmVwbGFjZSgnLnN2ZycsICcnKVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgb3B0aW1pemVTVkcoc3ZnRGF0YTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IG9wdGltaXplZCA9IGF3YWl0IHRoaXMuc3Znby5vcHRpbWl6ZShzdmdEYXRhKVxuICAgICAgICByZXR1cm4gb3B0aW1pemVkLmRhdGFcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFZpZXdib3hTaXplKHN2Z0RhdGE6IHN0cmluZykge1xuICAgICAgICBjb25zdCB2aWV3Ym94RGF0YSA9IHN2Z0RhdGFcbiAgICAgICAgICAgIC5zcGxpdCgndmlld0JveD1cIicpWzFdXG4gICAgICAgICAgICAuc3BsaXQoJ1wiJylbMF1cbiAgICAgICAgICAgIC5zcGxpdCgnICcpXG4gICAgICAgIGNvbnN0IHdpZHRoID0gdmlld2JveERhdGFbMl1cbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdmlld2JveERhdGFbM11cblxuICAgICAgICByZXR1cm4gW3BhcnNlSW50KHdpZHRoLCAxMCksIHBhcnNlSW50KGhlaWdodCwgMTApXVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbG9nZ2VyKHRleHQ6IHN0cmluZywgaXNFcnJvcj86IGJvb2xlYW4pIHtcbiAgICBpZiAoaXNFcnJvcikge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKHRleHQpXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmFyZ3ZbNF0gPT09ICctdicpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5sb2codGV4dClcbiAgICB9XG59XG4iXX0=