import { mapValues } from 'lodash';
import igniter from 'module-igniter';

const plug = igniter({ prefix: 'rollup-plugin-' });
const environment = process.env.NODE_ENV || 'development';
const prod = environment === 'production';
const watch = process.env.ROLLUP_WATCH;

const globals = {
  'netlify-cms': 'CMS',
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  immutable: 'Immutable',
  'react-immutable-proptypes': 'ImmutablePropTypes',
  classnames: 'classNames',
  'create-react-class': 'createClass',
  '@pake/react-color': 'ReactColor',
};

const external = Object.keys(globals);
const WATCH_FORMAT = process.env.WATCH_FORMAT || 'umd';
const formats = ['iife', 'cjs', 'es'];
const extension = prod ? 'min.js' : 'js';
const isBrowser = format => format === 'umd' || format === 'iife';

const createOutput = (format = 'umd') => ({
  sourcemap: prod,
  name: 'NetlifyCMSWidgetColor',
  file: `dist/${format}/color.${extension}`,
  format,
  globals: format === 'iife' ? mapValues(globals, o => `window['${o}']`) : globals,
});

export default (watch ? [WATCH_FORMAT] : formats).map(format => ({
  input: 'src/index.js',
  output: createOutput(format),
  external,
  plugins: [
    ...plug({
      replace: { 'process.env.NODE_ENV': JSON.stringify(environment) },
      'node-resolve': true,
      commonjs: {
        include: ['**/node_modules/**'],
      },
      babel: {
        babelrc: false,
        exclude: ['**/node_modules/**'],
        presets: [
          ['@babel/preset-env', { modules: false }],
          ['@babel/preset-react', isBrowser(format) ? { pragma: 'h' } : {}],
        ],
        plugins: [
          isBrowser(format) && [
            'transform-react-remove-prop-types',
            {
              removeImport: true,
              additionalLibraries: ['react-immutable-proptypes'],
            },
          ],
        ].filter(Boolean),
      },
      postcss: {
        sourcemap: prod,
        minimize: prod,
      },
    }),
    ...plug({ strip: { debugger: true } }, 'terser::terser', prod),
    ...plug(
      {
        serve: {
          contentBase: [
            '../../node_modules',
            '../../widgets',
            '../../core',
            `dist/${WATCH_FORMAT}`,
            'public',
          ],
          historyApiFallback: true,
        },
        livereload: true,
      },
      watch,
    ),
  ],
}));
