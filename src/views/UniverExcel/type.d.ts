

import type { DependencyOverride, IUniverConfig, Plugin, PluginCtor } from '@univerjs/core';

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