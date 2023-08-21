export interface PluginDTO {
    title: string,
    description: string,
}

export interface IPlugin {
    title: string,
    description: string,
    id: string
}

export interface UpdatePluginPayload {
    pluginId: string,
    isActive: boolean
}