/* eslint-disable */
export default {
  background: {
    url: '', // 背景图URL，如 'background.jpg'
    opacity: 0.5, // 不透明度
  },
  title: '计算机学院新生杯辩论赛',
  subtitle: '季军争夺赛',
  footer: '© 2017 计算机学院学生会',
  zf: {
    name: '软件2班',
    thought: '出轨比出柜更难接受',
  },
  ff: {
    name: '计科7班',
    thought: '出柜比出轨更难接受',
  },
  steps: [
    {
      name: '正方立论',
      zf: 180,
      ff: 90,
    },
    {
      name: '反方立论',
      zf: 90,
      ff: 180,
    },
    {
      name: '对辩环节',
      zf: 90,
      ff: 90,
    },
    {
      name: '盘问环节',
      zf: 150,
      ff: 150,
    },
    {
      name: '攻辩小结',
      zf: 90,
      ff: 90,
    },
    {
      name: '暂停休整',
      zf: 90,
      ff: -1,
    },
    {
      name: '自由辩论',
      zf: 240,
      ff: 240,
    },
    {
      name: '总结陈词',
      zf: 240,
      ff: 240,
    },
  ],
}
