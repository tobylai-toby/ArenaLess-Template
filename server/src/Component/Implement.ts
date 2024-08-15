
import Component, { componentObjByUuid } from "./Definition";

/** 监听世界的每一帧更新 */
world.onTick(({ elapsedTimeMS }) => {
    componentObjByUuid.forEach(component => {
        component.update(elapsedTimeMS);
    });
});

/** 移除组件的更新 */
export function removeComponentTick(component: Component): void {
    componentObjByUuid.delete(component.uuid);
}

/** 添加组件的更新 */
export function addComponentTick(component: Component): void {
    componentObjByUuid.set(component.uuid, component);
}

/** 根据组件权重进行排序，这样做是为了确保组件按照其权重的降序进行处理，权重较高的组件将首先被访问 */
export function sortComponentsByWeight() {
    const sortedValues: Component[] = Array.from(componentObjByUuid.values());
    sortedValues.sort((a: Component, b: Component) => b.weight - a.weight);
    componentObjByUuid.clear();
    for (const component of sortedValues) {
        componentObjByUuid.set(component.uuid, component);
    }
}

/** 生成一个UUID版本4的唯一标识符 */
export function generateUuidV4(): string {
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return uuid;
}

