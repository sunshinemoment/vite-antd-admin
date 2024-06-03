import * as ConstantRouteName from '@/constants/route-name';
import * as ConstantRouteLabel from '@/constants/route-label';

import { TableOutlined } from '@ant-design/icons-vue';
import { treeToMap } from '@/utils/tools';

const menu = [
  {
    title: ConstantRouteLabel.LIST,
    key: ConstantRouteName.LIST,
    icon: TableOutlined,
    children: [
      {
        title: ConstantRouteLabel.TABLE_LIST,
        key: ConstantRouteName.TABLE_LIST,
      },
      {
        title: ConstantRouteLabel.TARGET_LIST,
        key: ConstantRouteName.TARGET_LIST,
        hideChildrenInMenu: true,
        children: [
          { title: ConstantRouteLabel.TARGET_LIST_LIST, key: ConstantRouteName.TARGET_LIST_LIST },
          { title: ConstantRouteLabel.TARGET_LIST_ADD, key: ConstantRouteName.TARGET_LIST_ADD },
          {
            title: ConstantRouteLabel.TARGET_LIST_UPDATE,
            key: ConstantRouteName.TARGET_LIST_UPDATE,
          },
          {
            title: ConstantRouteLabel.TARGET_LIST_DETAIL,
            key: ConstantRouteName.TARGET_LIST_DETAIL,
          },
        ],
      },
    ],
  },
  {
    title: ConstantRouteLabel.LIST_V2,
    key: ConstantRouteName.LIST_V2,
    icon: TableOutlined,
    children: [
      {
        title: ConstantRouteLabel.TABLE_LIST_V2,
        key: ConstantRouteName.TABLE_LIST_V2,
      },
      {
        title: ConstantRouteLabel.TARGET_LIST_V2,
        key: ConstantRouteName.TARGET_LIST_V2,
        hideChildrenInMenu: true,
        children: [
          {
            title: ConstantRouteLabel.TARGET_LIST_LIST_V2,
            key: ConstantRouteName.TARGET_LIST_LIST_V2,
          },
          {
            title: ConstantRouteLabel.TARGET_LIST_ADD_V2,
            key: ConstantRouteName.TARGET_LIST_ADD_V2,
          },
          {
            title: ConstantRouteLabel.TARGET_LIST_UPDATE_V2,
            key: ConstantRouteName.TARGET_LIST_UPDATE_V2,
          },
          {
            title: ConstantRouteLabel.TARGET_LIST_DETAIL_V2,
            key: ConstantRouteName.TARGET_LIST_DETAIL_V2,
          },
        ],
      },
    ],
  },
  {
    title: ConstantRouteLabel.LOGIC_FLOW,
    key: ConstantRouteName.LOGIC_FLOW,
    icon: TableOutlined,
  },
  {
    title: ConstantRouteLabel.SETTING,
    key: ConstantRouteName.SETTING,
    icon: TableOutlined,
  },
];

export const menuMap = treeToMap(menu);

export default menu;
