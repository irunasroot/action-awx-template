const WORKFLOW_JOB_NODES = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: 16,
      type: 'workflow_job_node',
      url: '/api/v2/workflow_job_nodes/16/',
      related: {
        labels: '/api/v2/workflow_job_nodes/16/labels/',
        credentials: '/api/v2/workflow_job_nodes/16/credentials/',
        instance_groups: '/api/v2/workflow_job_nodes/16/instance_groups/',
        success_nodes: '/api/v2/workflow_job_nodes/16/success_nodes/',
        failure_nodes: '/api/v2/workflow_job_nodes/16/failure_nodes/',
        always_nodes: '/api/v2/workflow_job_nodes/16/always_nodes/',
        unified_job_template: '/api/v2/job_templates/7/',
        job: '/api/v2/jobs/50/',
        workflow_job: '/api/v2/workflow_jobs/49/'
      },
      summary_fields: {
        job: {
          id: 50,
          name: 'Demo Job Template',
          description: '',
          status: 'successful',
          failed: false,
          elapsed: 3.547,
          type: 'job'
        },
        workflow_job: {
          id: 49,
          name: 'Demo Workflow Template',
          description: ''
        },
        unified_job_template: {
          id: 7,
          name: 'Demo Job Template',
          description: '',
          unified_job_type: 'job'
        }
      },
      created: '2024-10-06T18:58:43.409325Z',
      modified: '2024-10-06T18:58:43.607688Z',
      extra_data: {},
      inventory: null,
      scm_branch: null,
      job_type: null,
      job_tags: null,
      skip_tags: null,
      limit: null,
      diff_mode: null,
      verbosity: null,
      execution_environment: null,
      forks: null,
      job_slice_count: null,
      timeout: null,
      job: 50,
      workflow_job: 49,
      unified_job_template: 7,
      success_nodes: [17],
      failure_nodes: [],
      always_nodes: [],
      all_parents_must_converge: false,
      do_not_run: false,
      identifier: '411c8144-0375-4fb5-9f9c-60a82d5e77a3'
    },
    {
      id: 17,
      type: 'workflow_job_node',
      url: '/api/v2/workflow_job_nodes/17/',
      related: {
        labels: '/api/v2/workflow_job_nodes/17/labels/',
        credentials: '/api/v2/workflow_job_nodes/17/credentials/',
        instance_groups: '/api/v2/workflow_job_nodes/17/instance_groups/',
        success_nodes: '/api/v2/workflow_job_nodes/17/success_nodes/',
        failure_nodes: '/api/v2/workflow_job_nodes/17/failure_nodes/',
        always_nodes: '/api/v2/workflow_job_nodes/17/always_nodes/',
        unified_job_template: '/api/v2/job_templates/7/',
        job: '/api/v2/jobs/52/',
        workflow_job: '/api/v2/workflow_jobs/49/'
      },
      summary_fields: {
        job: {
          id: 52,
          name: 'Demo Job Template',
          description: '',
          status: 'successful',
          failed: false,
          elapsed: 3.219,
          type: 'job'
        },
        workflow_job: {
          id: 49,
          name: 'Demo Workflow Template',
          description: ''
        },
        unified_job_template: {
          id: 7,
          name: 'Demo Job Template',
          description: '',
          unified_job_type: 'job'
        }
      },
      created: '2024-10-06T18:58:43.416370Z',
      modified: '2024-10-06T18:58:47.541282Z',
      extra_data: {},
      inventory: null,
      scm_branch: null,
      job_type: null,
      job_tags: null,
      skip_tags: null,
      limit: null,
      diff_mode: null,
      verbosity: null,
      execution_environment: null,
      forks: null,
      job_slice_count: null,
      timeout: null,
      job: 52,
      workflow_job: 49,
      unified_job_template: 7,
      success_nodes: [],
      failure_nodes: [],
      always_nodes: [],
      all_parents_must_converge: false,
      do_not_run: false,
      identifier: '4bab995b-d6e8-4f86-8062-b331213a7edc'
    },
    {
      id: 18,
      type: 'workflow_job_node',
      url: '/api/v2/workflow_job_nodes/18/',
      related: {
        labels: '/api/v2/workflow_job_nodes/18/labels/',
        credentials: '/api/v2/workflow_job_nodes/18/credentials/',
        instance_groups: '/api/v2/workflow_job_nodes/18/instance_groups/',
        success_nodes: '/api/v2/workflow_job_nodes/18/success_nodes/',
        failure_nodes: '/api/v2/workflow_job_nodes/18/failure_nodes/',
        always_nodes: '/api/v2/workflow_job_nodes/18/always_nodes/',
        unified_job_template: '/api/v2/job_templates/7/',
        job: '/api/v2/jobs/51/',
        workflow_job: '/api/v2/workflow_jobs/49/'
      },
      summary_fields: {
        job: {
          id: 51,
          name: 'Demo Job Template',
          description: '',
          status: 'successful',
          failed: false,
          elapsed: 3.36,
          type: 'job'
        },
        workflow_job: {
          id: 49,
          name: 'Demo Workflow Template',
          description: ''
        },
        unified_job_template: {
          id: 7,
          name: 'Demo Job Template',
          description: '',
          unified_job_type: 'job'
        }
      },
      created: '2024-10-06T18:58:43.422102Z',
      modified: '2024-10-06T18:58:43.668629Z',
      extra_data: {},
      inventory: null,
      scm_branch: null,
      job_type: null,
      job_tags: null,
      skip_tags: null,
      limit: null,
      diff_mode: null,
      verbosity: null,
      execution_environment: null,
      forks: null,
      job_slice_count: null,
      timeout: null,
      job: 51,
      workflow_job: 49,
      unified_job_template: 7,
      success_nodes: [],
      failure_nodes: [],
      always_nodes: [],
      all_parents_must_converge: false,
      do_not_run: false,
      identifier: 'be852e75-e4b6-4381-b0b7-15ce8b1542e8'
    }
  ]
}

export { WORKFLOW_JOB_NODES }
