# setup-premake Action

> The Github Action to download and run the Premake build configuration tool.

<a href="https://github.com/eariassoto/setup-premake/actions?query=workflow%3Atests">
    <img src="https://github.com/eariassoto/setup-premake/workflows/tests/badge.svg" alt="">
</a>

This action downloads a specific version of Premake, and executes it with the specified action and additional options.

## Usage:

This simple example runs premake expecting a default `premake5.lua` file in the root directory:

```yaml
- name: Checkout the repository
  uses: actions/checkout@v3
- name: Run premake '5.0.0-beta1'
  uses: eariassoto/setup-premake@v1
  with:
    version: '5.0.0-beta1'
    action: 'gmake'
    options: '--cc=clang'
```

## Inputs

The input for this action correspond to `premake5` usage:

```
premake5 [options] action [arguments]
```

Inputs are only validated by the `premake5` call. You are responsible for providing the right values.

### `version`

**Optional** The Premake version to download. Default to latest release: `5.0.0-beta1`.

### `action`

**Required** Premake action to execute.

### `options`

**Optional** Additional Premake options. Default `""`.

### `args`

**Optional** Additional Premake arguments. Default `""`.
