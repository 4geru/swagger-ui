/**
 * @prettier
 */
import ApisPreset from "core/presets/apis"

const defaultOptions = Object.freeze({
  dom_id: null,
  domNode: null,
  spec: {},
  url: "",
  urls: null,
  layout: "BaseLayout",
  docExpansion: "list",
  maxDisplayedTags: null,
  filter: null,
  validatorUrl: "https://validator.swagger.io/validator",
  oauth2RedirectUrl: `${window.location.protocol}//${window.location.host}${window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/"))}/oauth2-redirect.html`,
  persistAuthorization: false,
  configs: {},
  custom: {},
  displayOperationId: false,
  displayRequestDuration: false,
  deepLinking: false,
  tryItOutEnabled: false,
  requestInterceptor: (a) => a,
  responseInterceptor: (a) => a,
  showMutatedRequest: true,
  defaultModelRendering: "example",
  defaultModelExpandDepth: 1,
  defaultModelsExpandDepth: 1,
  showExtensions: false,
  showCommonExtensions: false,
  withCredentials: undefined,
  requestSnippetsEnabled: false,
  requestSnippets: {
    generators: {
      curl_bash: {
        title: "cURL (bash)",
        syntax: "bash",
      },
      curl_powershell: {
        title: "cURL (PowerShell)",
        syntax: "powershell",
      },
      curl_cmd: {
        title: "cURL (CMD)",
        syntax: "bash",
      },
    },
    defaultExpanded: true,
    languages: null, // e.g. only show curl bash = ["curl_bash"]
  },
  supportedSubmitMethods: [
    "get",
    "put",
    "post",
    "delete",
    "options",
    "head",
    "patch",
    "trace",
  ],
  queryConfigEnabled: false,

  // Initial set of plugins ( TODO rename this, or refactor - we don't need presets _and_ plugins. Its just there for performance.
  // Instead, we can compile the first plugin ( it can be a collection of plugins ), then batch the rest.
  presets: [ApisPreset],

  // Plugins; ( loaded after presets )
  plugins: [],

  pluginsOptions: {
    // Behavior during plugin registration. Can be :
    // - legacy (default) : the current behavior for backward compatibility – last plugin takes precedence over the others
    // - chain : chain wrapComponents when targeting the same core component
    pluginLoadType: "legacy",
  },

  initialState: {},

  // Inline Plugin
  fn: {},
  components: {},

  syntaxHighlight: {
    activated: true,
    theme: "agate",
  },
})

export default defaultOptions
