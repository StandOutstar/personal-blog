module.exports = {
  docs: {
    '概述': ['index'],
    '自动化测试报告生成': [
      'test_report/intro',
      {
        vue_and_element: ['test_report/vue_element/demo', {'探索过程': ['test_report/vue_element/single']}],
        alpine_and_bootstrap: ['test_report/alpine_bootstrap/demo', {'探索过程': ['test_report/alpine_bootstrap/alpine', 'test_report/alpine_bootstrap/bootstrap']}],
        brython: ['test_report/brython/demo']
      }
    ],
    '自动化': [
      'automation/index',
      'automation/deploy',
      'automation/auto-ui-test-road'
    ],
    '软件开发': [
      'software_develop/index',
      {
        'Web': [
          {
            '前端': [
              {
                'Html': [
                  'software_develop/Web/Frontend/Html/index'
                ],
                'CSS': [
                  'software_develop/Web/Frontend/CSS/index'
                ],
                'JS': [
                  'software_develop/Web/Frontend/JS/index',
                  {
                    'React': [
                      'software_develop/Web/Frontend/JS/React/component'
                    ],
                  },
                ],
                'UI': [
                  'software_develop/Web/WebUI/design-introduction',
                  'software_develop/Web/WebUI/develop-base'
                ]
              }
            ]
          },
        ],
        'Console': [
          'software_develop/Console/index',
        ]
      }
    ],
    '数据展示': ['display/elastic'],
  }
};
