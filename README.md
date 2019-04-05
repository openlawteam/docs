# OpenLaw Docs

## Editing

### File structure

All docs are found in the [`/docs`](/docs) directory.

### Format

Uses standard [CommonMark] markdown spec formatting, with default VuePress
[Markdown Extensions].

[commonmark]: https://spec.commonmark.org/current/
[markdown extensions]: https://vuepress.vuejs.org/guide/markdown.html

### Local Development

If you wish to be able to see changes reflected live, you can run a local dev
server. Requires a NodeJS environment on your machine.

> Run `npm ci` to quickly install all necessary dependencies. You can then run
> `npm run docs:dev` to launch a local live-reload instance of the docs. Changes
> will be reflected as soon as you save the source file.

You can also run `npm run docs:build` if you ever want to manually build the
static output. This is normally handled on the CI server automatically. For
consistent code formatting we use [Prettier], if you wish you can format all
files prior to a commit via `npm run format`.

[prettier]: https://prettier.io

### vscode Workspace Settings

VSCode workspace settings are included in this repository, when opening for the
first time you should be prompted to install some recommended extensions. Once
installed, you should automatically get:

- Spell checker auto-lint in Markdown files
- Automatic code formatting via `prettier` on file save

## Deployment

### Hosting

Deployment is handled automatically via Netlify CI. :tada:

### Full-text Search Indexing

Search is handled via Algolia DocSearch, configuration changes must be made via
PR to the [config file] (format [documentation]). Index is updated once every
24 hrs.

[config file]: https://github.com/algolia/docsearch-configs/blob/master/configs/openlaw.json
[documentation]: https://community.algolia.com/docsearch/config-file.html

## Contributing

See information about contributing [here](CONTRIBUTING.md).

## License

The written documentation and source code examples are licensed under the
[Creative Commons Attribution 4.0 International][license] license.

[license]: https://creativecommons.org/licenses/by/4.0/
