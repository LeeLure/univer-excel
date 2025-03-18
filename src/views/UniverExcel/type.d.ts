
/**
 * A collection of plugins and their default configs.
 */
interface IPreset {
  plugins: Array<PluginCtor<Plugin> | [PluginCtor<Plugin>, ConstructorParameters<PluginCtor<Plugin>>[0]]>;
}
interface IPresetOptions {
  lazy?: boolean;
}
export type CreateUniverOptions = Partial<IUniverConfig> & {
  presets: Array<IPreset | [IPreset, IPresetOptions]>;
  plugins?: Array<PluginCtor<Plugin> | [PluginCtor<Plugin>, ConstructorParameters<PluginCtor<Plugin>>[0]]>;
  /**
   * Overrides the dependencies defined in the plugin. Only dependencies that are identified by `IdentifierDecorator` can be overridden.
   * If you override a dependency with `null`, the original dependency will be removed.
   */
  override?: DependencyOverride;
  collaboration?: true;
};

export interface FormState {
  /** 数据源 */
  dataSource: string
  /** 导入文件后解析的数据 */
  fileData?: string
  /** 请求地址 */
  url: string
  /** 请求方法 */
  method: string
  /** 请求参数 */
  payload: string
  /** 数据填充的行号 */
  startRow: string
  /** 数据填充的列号 */
  startCol: string
}