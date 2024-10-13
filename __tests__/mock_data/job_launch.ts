const JOB_LAUNCH_DATA = {
  job: 41,
  ignored_fields: {},
  id: 41,
  type: 'job',
  url: '/api/v2/jobs/41/',
  related: {
    created_by: '/api/v2/users/1/',
    modified_by: '/api/v2/users/1/',
    labels: '/api/v2/jobs/41/labels/',
    inventory: '/api/v2/inventories/1/',
    project: '/api/v2/projects/6/',
    organization: '/api/v2/organizations/1/',
    credentials: '/api/v2/jobs/41/credentials/',
    unified_job_template: '/api/v2/job_templates/7/',
    stdout: '/api/v2/jobs/41/stdout/',
    job_events: '/api/v2/jobs/41/job_events/',
    job_host_summaries: '/api/v2/jobs/41/job_host_summaries/',
    activity_stream: '/api/v2/jobs/41/activity_stream/',
    notifications: '/api/v2/jobs/41/notifications/',
    create_schedule: '/api/v2/jobs/41/create_schedule/',
    job_template: '/api/v2/job_templates/7/',
    cancel: '/api/v2/jobs/41/cancel/',
    relaunch: '/api/v2/jobs/41/relaunch/'
  },
  summary_fields: {
    organization: {
      id: 1,
      name: 'Default',
      description: ''
    },
    inventory: {
      id: 1,
      name: 'Demo Inventory',
      description: '',
      has_active_failures: false,
      total_hosts: 1,
      hosts_with_active_failures: 0,
      total_groups: 0,
      has_inventory_sources: false,
      total_inventory_sources: 0,
      inventory_sources_with_failures: 0,
      organization_id: 1,
      kind: ''
    },
    project: {
      id: 6,
      name: 'Demo Project',
      description: '',
      status: 'successful',
      scm_type: 'git',
      allow_override: false
    },
    job_template: {
      id: 7,
      name: 'Demo Job Template',
      description: ''
    },
    unified_job_template: {
      id: 7,
      name: 'Demo Job Template',
      description: '',
      unified_job_type: 'job'
    },
    created_by: {
      id: 1,
      username: 'admin',
      first_name: '',
      last_name: ''
    },
    modified_by: {
      id: 1,
      username: 'admin',
      first_name: '',
      last_name: ''
    },
    user_capabilities: {
      delete: true,
      start: true
    },
    labels: {
      count: 1,
      results: [
        {
          id: 3,
          name: 'asdf'
        }
      ]
    },
    credentials: []
  },
  created: '2024-10-06T06:33:27.742581Z',
  modified: '2024-10-06T06:33:27.759095Z',
  name: 'Demo Job Template',
  description: '',
  job_type: 'run',
  inventory: 1,
  project: 6,
  playbook: 'hello_world.yml',
  scm_branch: '',
  forks: 0,
  limit: '',
  verbosity: 0,
  extra_vars: '{}',
  job_tags: '',
  force_handlers: false,
  skip_tags: '',
  start_at_task: '',
  timeout: 0,
  use_fact_cache: false,
  organization: 1,
  unified_job_template: 7,
  launch_type: 'manual',
  status: 'pending',
  execution_environment: null,
  failed: false,
  started: null,
  finished: null,
  canceled_on: null,
  elapsed: 0.0,
  job_args: '',
  job_cwd: '',
  job_env: {},
  job_explanation: '',
  execution_node: '',
  controller_node: '',
  result_traceback: '',
  event_processing_finished: false,
  launched_by: {
    id: 1,
    name: 'admin',
    type: 'user',
    url: '/api/v2/users/1/'
  },
  work_unit_id: null,
  job_template: 7,
  passwords_needed_to_start: [],
  allow_simultaneous: false,
  artifacts: {},
  scm_revision: '',
  instance_group: null,
  diff_mode: false,
  job_slice_number: 0,
  job_slice_count: 1,
  webhook_service: '',
  webhook_credential: null,
  webhook_guid: ''
}

const WORKFLOW_JOB_LAUNCH_DATA = {
  workflow_job: 42,
  ignored_fields: {},
  id: 42,
  type: 'workflow_job',
  url: '/api/v2/workflow_jobs/42/',
  related: {
    created_by: '/api/v2/users/1/',
    modified_by: '/api/v2/users/1/',
    unified_job_template: '/api/v2/workflow_job_templates/8/',
    workflow_job_template: '/api/v2/workflow_job_templates/8/',
    notifications: '/api/v2/workflow_jobs/42/notifications/',
    workflow_nodes: '/api/v2/workflow_jobs/42/workflow_nodes/',
    labels: '/api/v2/workflow_jobs/42/labels/',
    activity_stream: '/api/v2/workflow_jobs/42/activity_stream/',
    relaunch: '/api/v2/workflow_jobs/42/relaunch/',
    cancel: '/api/v2/workflow_jobs/42/cancel/'
  },
  summary_fields: {
    workflow_job_template: {
      id: 8,
      name: 'Demo Workflow Template',
      description: ''
    },
    unified_job_template: {
      id: 8,
      name: 'Demo Workflow Template',
      description: '',
      unified_job_type: 'workflow_job'
    },
    created_by: {
      id: 1,
      username: 'admin',
      first_name: '',
      last_name: ''
    },
    modified_by: {
      id: 1,
      username: 'admin',
      first_name: '',
      last_name: ''
    },
    user_capabilities: {
      delete: true,
      start: true
    },
    labels: {
      count: 0,
      results: []
    }
  },
  created: '2024-10-06T17:05:07.266332Z',
  modified: '2024-10-06T17:05:07.302655Z',
  name: 'Demo Workflow Template',
  description: '',
  unified_job_template: 8,
  launch_type: 'manual',
  status: 'pending',
  failed: false,
  started: null,
  finished: null,
  canceled_on: null,
  elapsed: 0.0,
  job_args: '',
  job_cwd: '',
  job_env: {},
  job_explanation: '',
  result_traceback: '',
  launched_by: {
    id: 1,
    name: 'admin',
    type: 'user',
    url: '/api/v2/users/1/'
  },
  work_unit_id: null,
  workflow_job_template: 8,
  extra_vars: '{}',
  allow_simultaneous: false,
  job_template: null,
  is_sliced_job: false,
  inventory: null,
  limit: null,
  scm_branch: null,
  webhook_service: '',
  webhook_credential: null,
  webhook_guid: '',
  skip_tags: null,
  job_tags: null
}

export { JOB_LAUNCH_DATA, WORKFLOW_JOB_LAUNCH_DATA }
