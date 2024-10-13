const JOB_STATUS_DATA = {
  id: 41,
  type: 'job',
  url: '/api/v2/jobs/41/',
  related: {
    created_by: '/api/v2/users/1/',
    labels: '/api/v2/jobs/41/labels/',
    inventory: '/api/v2/inventories/1/',
    project: '/api/v2/projects/6/',
    organization: '/api/v2/organizations/1/',
    credentials: '/api/v2/jobs/41/credentials/',
    unified_job_template: '/api/v2/job_templates/7/',
    stdout: '/api/v2/jobs/41/stdout/',
    execution_environment: '/api/v2/execution_environments/1/',
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
    execution_environment: {
      id: 1,
      name: 'AWX EE (latest)',
      description: '',
      image: 'quay.io/ansible/awx-ee:latest'
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
    instance_group: {
      id: 2,
      name: 'default',
      is_container_group: true
    },
    created_by: {
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
  modified: '2024-10-06T06:33:27.842258Z',
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
  status: 'successful',
  execution_environment: 1,
  failed: false,
  started: '2024-10-06T06:33:27.909531Z',
  finished: '2024-10-06T06:33:31.487897Z',
  canceled_on: null,
  elapsed: 3.578,
  job_args:
    '["ansible-playbook", "-u", "root", "-i", "/runner/inventory/hosts", "-e", "@/runner/env/extravars", "hello_world.yml"]',
  job_cwd: '/runner/project',
  job_env: {
    PWD: '/runner',
    HOME: '/runner',
    PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
    SHLVL: '0',
    JOB_ID: '41',
    AWX_HOST: 'https://towerhost',
    HOSTNAME: 'automation-job-41-8tt4l',
    LC_CTYPE: 'C.UTF-8',
    INVENTORY_ID: '1',
    MAX_EVENT_RES: '700000',
    KUBERNETES_PORT: 'tcp://10.96.0.1:443',
    PROJECT_REVISION: '347e44fea036c94d5f60e544de006453ee5c71ad',
    ANSIBLE_ROLES_PATH:
      '/runner/requirements_roles:~/.ansible/roles:/usr/share/ansible/roles:/etc/ansible/roles',
    RUNNER_OMIT_EVENTS: 'False',
    ANSIBLE_FORCE_COLOR: 'True',
    AWX_PRIVATE_DATA_DIR: '/tmp/awx_41_wvyqohly',
    AWX_DEMO_SERVICE_PORT: 'tcp://10.104.45.165:80',
    AWX_ISOLATED_DATA_DIR: '/runner/artifacts/41',
    ANSIBLE_STDOUT_CALLBACK: 'awx_display',
    KUBERNETES_PORT_443_TCP: 'tcp://10.96.0.1:443',
    KUBERNETES_SERVICE_HOST: '10.96.0.1',
    KUBERNETES_SERVICE_PORT: '443',
    ANSIBLE_CALLBACK_PLUGINS:
      '/usr/local/lib/python3.11/site-packages/ansible_runner/display_callback/callback',
    ANSIBLE_COLLECTIONS_PATH:
      '/runner/requirements_collections:~/.ansible/collections:/usr/share/ansible/collections',
    ANSIBLE_COLLECTIONS_PATHS:
      '/runner/requirements_collections:~/.ansible/collections:/usr/share/ansible/collections',
    ANSIBLE_HOST_KEY_CHECKING: 'False',
    PIP_BREAK_SYSTEM_PACKAGES: '1',
    RUNNER_ONLY_FAILED_EVENTS: 'False',
    ANSIBLE_RETRY_FILES_ENABLED: 'False',
    ANSIBLE_SSH_CONTROL_PATH_DIR: '/runner/cp',
    AWX_DEMO_SERVICE_PORT_80_TCP: 'tcp://10.104.45.165:80',
    KUBERNETES_PORT_443_TCP_ADDR: '10.96.0.1',
    KUBERNETES_PORT_443_TCP_PORT: '443',
    AWX_DEMO_SERVICE_SERVICE_HOST: '10.104.45.165',
    AWX_DEMO_SERVICE_SERVICE_PORT: '80',
    KUBERNETES_PORT_443_TCP_PROTO: 'tcp',
    KUBERNETES_SERVICE_PORT_HTTPS: '443',
    ANSIBLE_INVENTORY_UNPARSED_FAILED: 'True',
    ANSIBLE_PARAMIKO_RECORD_HOST_KEYS: 'False',
    AWX_DEMO_SERVICE_PORT_80_TCP_ADDR: '10.104.45.165',
    AWX_DEMO_SERVICE_PORT_80_TCP_PORT: '80',
    AWX_DEMO_SERVICE_PORT_80_TCP_PROTO: 'tcp',
    AWX_DEMO_SERVICE_SERVICE_PORT_HTTP: '80',
    AWX_OPERATOR_CONTROLLER_MANAGER_METRICS_SERVICE_PORT:
      'tcp://10.108.207.231:8443',
    AWX_OPERATOR_CONTROLLER_MANAGER_METRICS_SERVICE_SERVICE_HOST:
      '10.108.207.231',
    AWX_OPERATOR_CONTROLLER_MANAGER_METRICS_SERVICE_SERVICE_PORT: '8443',
    AWX_OPERATOR_CONTROLLER_MANAGER_METRICS_SERVICE_PORT_8443_TCP:
      'tcp://10.108.207.231:8443',
    AWX_OPERATOR_CONTROLLER_MANAGER_METRICS_SERVICE_PORT_8443_TCP_ADDR:
      '10.108.207.231',
    AWX_OPERATOR_CONTROLLER_MANAGER_METRICS_SERVICE_PORT_8443_TCP_PORT: '8443',
    AWX_OPERATOR_CONTROLLER_MANAGER_METRICS_SERVICE_SERVICE_PORT_HTTPS: '8443',
    AWX_OPERATOR_CONTROLLER_MANAGER_METRICS_SERVICE_PORT_8443_TCP_PROTO: 'tcp'
  },
  job_explanation: '',
  execution_node: '',
  controller_node: 'awx-demo-task-c768ddc44-6k8s2',
  result_traceback: '',
  event_processing_finished: true,
  launched_by: {
    id: 1,
    name: 'admin',
    type: 'user',
    url: '/api/v2/users/1/'
  },
  work_unit_id: 'ezBr4aMj',
  job_template: 7,
  passwords_needed_to_start: [],
  allow_simultaneous: false,
  artifacts: {},
  scm_revision: '347e44fea036c94d5f60e544de006453ee5c71ad',
  instance_group: 2,
  diff_mode: false,
  job_slice_number: 0,
  job_slice_count: 1,
  webhook_service: '',
  webhook_credential: null,
  webhook_guid: '',
  host_status_counts: {
    ok: 1
  },
  playbook_counts: {
    play_count: 1,
    task_count: 2
  },
  custom_virtualenv: null
}

const WORKFLOW_JOB_STATUS_DATA = {
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
  modified: '2024-10-06T17:05:07.410748Z',
  name: 'Demo Workflow Template',
  description: '',
  unified_job_template: 8,
  launch_type: 'manual',
  status: 'successful',
  failed: false,
  started: '2024-10-06T17:05:07.404595Z',
  finished: '2024-10-06T17:06:26.808250Z',
  canceled_on: null,
  elapsed: 79.404,
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

export { JOB_STATUS_DATA, WORKFLOW_JOB_STATUS_DATA }
