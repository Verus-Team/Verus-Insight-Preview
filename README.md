# Verus-Insight project website

Verus-Insight 的英文研究主页，使用原生 HTML / CSS / JavaScript，无构建依赖。

- 代码：[zhangzhuoran997997/Verus-Insight](https://github.com/zhangzhuoran997997/Verus-Insight)
- 模型：[Verus-Insight-8B](https://huggingface.co/Verus-Team/Verus-Insight-8B)
- 数据：[Verus-Bench](https://huggingface.co/datasets/Verus-Team/Verus-Bench)
- 网站目标：[Verus-Insight-Preview](https://github.com/Verus-Team/Verus-Insight-Preview)
- GitHub Pages 地址：<https://verus-team.github.io/Verus-Insight-Preview/>

## 内容依据

作者、机构、方法和成绩表以工作区 `6ad098eb0f455bafd64b6076/` 中的稿件为来源。
作者为 14 人，保留原始顺序、机构和贡献标记。成绩明确作为论文报告结果展示，
本次没有重新运行模型或评测。

数据统计以当前 Hugging Face 发布快照为准：192 个视频（96 real / 96 generated）、
320 条 finding、17 类。`data/benchmark-statistics.json` 保存从实际
`ground_truth.jsonl` 核对的分类计数和来源提交。媒体分发覆盖 166/192 个样本；
完整数据和已分发媒体子集保持区分。

Paper 按钮链接至 [arXiv:2610.30866](https://arxiv.org/abs/2610.30866)。已给出的 Code / Model / Dataset
链接可以打开发布页；链接可点击不代表已经匿名公开。可见性由资源托管平台控制。

## 本地预览

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

打开 <http://127.0.0.1:8765/>。不要直接以 `file://` 打开：页面使用 `fetch` 读取 JSON。

## 更新

| 文件 | 用途 |
| --- | --- |
| `index.html` | 研究叙事、章节和页面 metadata |
| `styles.css` | 暖白、深绿、铜色视觉；响应式页面和表格 |
| `app.js` | 作者、资源、分类统计、成绩标签页、图片查看器 |
| `data/site-content.json` | 作者、链接、成绩和当前 benchmark 统计 |
| `data/benchmark-statistics.json` | 发布标注计数及来源提交 |
| `assets/figures/verus_data_training.*` | 原论文方法图，科学内容未改绘 |
| `ASSET_SOURCES.md` | 来源与核验说明 |

修改数据统计时，同步 JSON、首页统计数字和数据卡。成绩从同一结果表转录，
不要将缺失值或未执行条件填成数值。新增视频只有在 JSON 中配置了真实 `src`
才会展示，不显示空视频槽位。

## GitHub Pages

将本目录内容放在网站仓库根目录，保留 `.nojekyll`，设置 Pages 从 `main` 的
`/(root)` 发布。页面全部使用相对路径，支持 GitHub Pages 项目子目录。

网站仓库与推理代码仓库分开管理。不要上传论文工作区、模型权重、私有数据、
本地虚拟环境或运行日志。已存在的远端历史应保留，不使用 force push。

发布前检查资源可见性、Paper URL、作者名单、全部成绩表、17 类统计、手机宽表、
键盘标签页、图片放大和原始图链接。发布成功与否以托管平台返回的 URL 为准。
