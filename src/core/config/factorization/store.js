/**
 * @prettier
 */
import merge from "../merge"

const storeFactorization = (options) => {
  const state = merge(
    {
      layout: {
        layout: options.layout,
        filter: options.filter,
      },
      spec: {
        spec: "",
        url: options.url,
      },
      requestSnippets: options.requestSnippets,
    },
    options.initialState
  )

  if (options.initialState) {
    /**
     * If the user sets a key as `undefined`, that signals to us that we
     * should delete the key entirely.
     * known usage: Swagger-Editor validate plugin tests
     */
    for (const [key, value] of Object.entries(options.initialState)) {
      if (value === undefined) {
        delete state[key]
      }
    }
  }

  return {
    system: {
      configs: options.configs,
    },
    plugins: options.presets,
    pluginsOptions: options.pluginsOptions,
    state,
  }
}

export default storeFactorization
