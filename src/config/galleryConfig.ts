import type { GalleryConfig } from "@/types/galleryConfig";

// 相册配置
export const galleryConfig: GalleryConfig = {
	// 相册列表
	// 启用相册功能时，在 public/gallery/ 目录下创建对应子目录并放入图片
	// 当前为视觉壳模式，不配置具体相册数据
	albums: [],

	// 瀑布流最小列宽(px)，浏览器根据容器宽度自动计算列数，默认 240
	columnWidth: 240,
};
