import { isDef, isUndef } from "./index";
/**
 * 将props默认数据从组件默认配置中 提取出来
 * 并合并传入的props值
 * @param data 传入给vnode的配置
 * @param ctor 组件默认配置
 * @param tag
 */
export const extractPropsFromVNodeData = function(data, ctor) {
  const propOptions = ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  const result = {};
  const { props } = data;
  if (isDef(attrs)) {
    for (key of propOptions) {
      if (props[key]) {
        result[key] = props[key];
      }
    }
  }
  return result;
};
