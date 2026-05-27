import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

const UnifiedCharSchema = z.object({
  // 公共字段
  名字: z.string().prefault(''),
  穿着: z.string().prefault(''),
  内心独白: z.string().prefault(''),
  
  // 性奴模式字段
  身份定位: z.string().prefault(''),
  肉体开发度: z.string().prefault(''),
  佩戴道具: z.string().prefault(''),
  发情程度: z.coerce.number().prefault(50).transform(v => _.clamp(v, 0, 100)),
  服从度: z.coerce.number().prefault(50).transform(v => _.clamp(v, 0, 100)),
  
  // 纯爱模式字段
  心情: z.string().prefault(''),
  外貌特征: z.string().prefault(''),
  好感度: z.coerce.number().prefault(50).transform(v => _.clamp(v, 0, 100)),
  信任度: z.coerce.number().prefault(50).transform(v => _.clamp(v, 0, 100)),
  
  // 模式标记
  模式: z.enum(['性奴', '纯爱', '混合']).prefault('混合'),
}).prefault({});

export const Schema = z.object({
  模式: z.enum(['性奴', '纯爱', '混合']).prefault('混合'),
  
  场景: z.object({
    地点: z.string().prefault('白帝大学'),
    时间: z.string().prefault('午后'),
    天气: z.string().prefault('晴'),
    在场人物: z.string().prefault('刘杰'),
  }).prefault({}),
  
  在场角色: z.record(z.string(), UnifiedCharSchema).prefault({}),
  
  俱乐部: z.object({
    下次活动: z.string().prefault('待定'),
    在场人物: z.string().prefault(''),
  }).prefault({}),
});

$(() => {
  registerMvuSchema(Schema);
});
