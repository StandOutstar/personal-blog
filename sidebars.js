module.exports = {
  docs: {
    '概述': ['index'],
    '软件开发': [
      {
        'theory': [
          'software/theory/index'
        ],
        'language': [
          {
            'python': [
              'software/language/python/index',
              'software/language/python/multithread',
              'software/language/python/retry',
            ]
          }
        ],
        'develop': [
          {
            'Web': [
              {
                '前端': [
                  {
                    'Html': [
                      'software/develop/Web/Frontend/Html/index'
                    ],
                    'CSS': [
                      'software/develop/Web/Frontend/CSS/index'
                    ],
                    'JS': [
                      'software/develop/Web/Frontend/JS/index',
                      {
                        'React': [
                          'software/develop/Web/Frontend/JS/React/component'
                        ],
                      },
                    ],
                    'UI': [
                      'software/develop/Web/WebUI/design-introduction',
                      'software/develop/Web/WebUI/develop-base'
                    ]
                  }
                ]
              },
            ],
            'Console': [
              'software/develop/Console/index',
            ]
          }
        ],
        'test': [
          {
            'automation': [
              {
                '自动化测试报告生成': [
                  'software/test/automation/report/intro',
                  {
                    vue_and_element: ['software/test/automation/report/vue_element/demo', {'探索过程': ['software/test/automation/report/vue_element/single']}],
                    alpine_and_bootstrap: ['software/test/automation/report/alpine_bootstrap/demo', {'探索过程': ['software/test/automation/report/alpine_bootstrap/alpine', 'software/test/automation/report/alpine_bootstrap/bootstrap']}],
                    brython: ['software/test/automation/report/brython/demo']
                  }
                ],
              },
              {
                '测试框架': [
                  {
                    'unittest': [
                      'software/test/automation/framework/unittest/entry',
                      'software/test/automation/framework/unittest/init',
                    ],
                  },
                  {
                    'pytest': []
                  }
                ]
              },
              {
                'deploy': [
                  'software/test/automation/deploy/deploy'
                ]
              }
            ]
          },
        ],
        'display': [
          'software/display/elastic'
        ],
      },

    ],
    
  }
};
