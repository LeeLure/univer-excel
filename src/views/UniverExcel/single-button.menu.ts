import type { IMenuButtonItem } from '@univerjs/ui';
import { MenuItemType } from '@univerjs/ui';



import type { ICommand, IAccessor } from '@univerjs/core';
import { CommandType } from '@univerjs/core';

export const SingleButtonOperation: ICommand = {
  id: 'custom-menu.operation.single-button',
  type: CommandType.OPERATION,
  handler: async (accessor: IAccessor) => {
    console.log('Single button operation',accessor,window.univerAPI);
    const url = import.meta.env.VITE_APP_UNIVER_ENDPOINT + '/json/test.json';

    window.univerAPI.importXLSXToSnapshotAsync(url).then((data) => {
    console.log(data)
  })
    // alert('Single button operationssss');
    return true;
  },
};

export function CustomMenuItemSingleButtonFactory(): IMenuButtonItem<string> {
  return {
    // 绑定 Command id，单击该按钮将触发该命令
    id: SingleButtonOperation.id,
    // 菜单项的类型，在本例中，它是一个按钮
    type: MenuItemType.BUTTON,
    // 按钮的图标，需要在 ComponentManager 中注册
    icon: 'ButtonIcon',
    // 按钮的提示，优先匹配国际化，如果没有匹配到，将显示原始字符串
    tooltip: 'customMenu.singleButton',
    // 按钮的标题，优先匹配国际化，如果没有匹配到，将显示原始字符串
    title: 'customMenu.button',
  };
}
