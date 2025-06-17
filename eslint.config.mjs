import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import { config } from '@lesnoypudge/eslint-config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});
const _ = config.createConfig(
    config.configs.base,
    config.configs.node,
    config.configs.disableTypeChecked,
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        rules: {
            'tailwindcss/no-unnecessary-arbitrary-value': 'off',
            '@lesnoypudge/eslint-plugin-margin-top/margin-top': 'off',
        },
    },
);

export default _;
