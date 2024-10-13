const NODE_ONE_JOB_STATUS_DATA = {
  id: 50,
  type: 'job',
  url: '/api/v2/jobs/50/',
  related: {
    created_by: '/api/v2/users/1/',
    labels: '/api/v2/jobs/50/labels/',
    inventory: '/api/v2/inventories/1/',
    project: '/api/v2/projects/6/',
    organization: '/api/v2/organizations/1/',
    credentials: '/api/v2/jobs/50/credentials/',
    unified_job_template: '/api/v2/job_templates/7/',
    stdout: '/api/v2/jobs/50/stdout/',
    source_workflow_job: '/api/v2/workflow_jobs/49/',
    execution_environment: '/api/v2/execution_environments/1/',
    job_events: '/api/v2/jobs/50/job_events/',
    job_host_summaries: '/api/v2/jobs/50/job_host_summaries/',
    activity_stream: '/api/v2/jobs/50/activity_stream/',
    notifications: '/api/v2/jobs/50/notifications/',
    create_schedule: '/api/v2/jobs/50/create_schedule/',
    job_template: '/api/v2/job_templates/7/',
    cancel: '/api/v2/jobs/50/cancel/',
    relaunch: '/api/v2/jobs/50/relaunch/'
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
    source_workflow_job: {
      id: 49,
      name: 'Demo Workflow Template',
      description: '',
      status: 'successful',
      failed: false,
      elapsed: 23.272
    },
    ancestor_job: {
      id: 49,
      name: 'Demo Workflow Template',
      type: 'workflow_job',
      url: '/api/v2/workflow_jobs/49/'
    },
    credentials: []
  },
  created: '2024-10-06T18:58:43.588937Z',
  modified: '2024-10-06T18:58:43.760532Z',
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
  launch_type: 'workflow',
  status: 'successful',
  execution_environment: 1,
  failed: false,
  started: '2024-10-06T18:58:43.820130Z',
  finished: '2024-10-06T18:58:47.367299Z',
  canceled_on: null,
  elapsed: 3.547,
  job_args:
    '["ansible-playbook", "-u", "root", "-i", "/runner/inventory/hosts", "-e", "@/runner/env/extravars", "hello_world.yml"]',
  job_cwd: '/runner/project',
  job_env: {
    PWD: '/runner',
    HOME: '/runner',
    PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
    SHLVL: '0',
    JOB_ID: '50',
    AWX_HOST: 'https://towerhost',
    HOSTNAME: 'automation-job-50-z9zq9',
    LC_CTYPE: 'C.UTF-8',
    INVENTORY_ID: '1',
    MAX_EVENT_RES: '700000',
    KUBERNETES_PORT: 'tcp://10.96.0.1:443',
    PROJECT_REVISION: '347e44fea036c94d5f60e544de006453ee5c71ad',
    ANSIBLE_ROLES_PATH:
      '/runner/requirements_roles:~/.ansible/roles:/usr/share/ansible/roles:/etc/ansible/roles',
    RUNNER_OMIT_EVENTS: 'False',
    ANSIBLE_FORCE_COLOR: 'True',
    AWX_PRIVATE_DATA_DIR: '/tmp/awx_50_g2u9mure',
    AWX_DEMO_SERVICE_PORT: 'tcp://10.104.45.165:80',
    AWX_ISOLATED_DATA_DIR: '/runner/artifacts/50',
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
  work_unit_id: 'SS5zWwow',
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

const NODE_TWO_JOB_STATUS_DATA = {
  id: 52,
  type: 'job',
  url: '/api/v2/jobs/52/',
  related: {
    created_by: '/api/v2/users/1/',
    labels: '/api/v2/jobs/52/labels/',
    inventory: '/api/v2/inventories/1/',
    project: '/api/v2/projects/6/',
    organization: '/api/v2/organizations/1/',
    credentials: '/api/v2/jobs/52/credentials/',
    unified_job_template: '/api/v2/job_templates/7/',
    stdout: '/api/v2/jobs/52/stdout/',
    source_workflow_job: '/api/v2/workflow_jobs/49/',
    execution_environment: '/api/v2/execution_environments/1/',
    job_events: '/api/v2/jobs/52/job_events/',
    job_host_summaries: '/api/v2/jobs/52/job_host_summaries/',
    activity_stream: '/api/v2/jobs/52/activity_stream/',
    notifications: '/api/v2/jobs/52/notifications/',
    create_schedule: '/api/v2/jobs/52/create_schedule/',
    job_template: '/api/v2/job_templates/7/',
    cancel: '/api/v2/jobs/52/cancel/',
    relaunch: '/api/v2/jobs/52/relaunch/'
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
    source_workflow_job: {
      id: 49,
      name: 'Demo Workflow Template',
      description: '',
      status: 'successful',
      failed: false,
      elapsed: 23.272
    },
    ancestor_job: {
      id: 49,
      name: 'Demo Workflow Template',
      type: 'workflow_job',
      url: '/api/v2/workflow_jobs/49/'
    },
    credentials: []
  },
  created: '2024-10-06T18:58:47.527214Z',
  modified: '2024-10-06T18:59:03.416946Z',
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
  launch_type: 'workflow',
  status: 'successful',
  execution_environment: 1,
  failed: false,
  started: '2024-10-06T18:59:03.476748Z',
  finished: '2024-10-06T18:59:06.696073Z',
  canceled_on: null,
  elapsed: 3.219,
  job_args:
    '["ansible-playbook", "-u", "root", "-i", "/runner/inventory/hosts", "-e", "@/runner/env/extravars", "hello_world.yml"]',
  job_cwd: '/runner/project',
  job_env: {
    PWD: '/runner',
    HOME: '/runner',
    PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
    SHLVL: '0',
    JOB_ID: '52',
    AWX_HOST: 'https://towerhost',
    HOSTNAME: 'automation-job-52-m9xr6',
    LC_CTYPE: 'C.UTF-8',
    INVENTORY_ID: '1',
    MAX_EVENT_RES: '700000',
    KUBERNETES_PORT: 'tcp://10.96.0.1:443',
    PROJECT_REVISION: '347e44fea036c94d5f60e544de006453ee5c71ad',
    ANSIBLE_ROLES_PATH:
      '/runner/requirements_roles:~/.ansible/roles:/usr/share/ansible/roles:/etc/ansible/roles',
    RUNNER_OMIT_EVENTS: 'False',
    ANSIBLE_FORCE_COLOR: 'True',
    AWX_PRIVATE_DATA_DIR: '/tmp/awx_52_mww98dcs',
    AWX_DEMO_SERVICE_PORT: 'tcp://10.104.45.165:80',
    AWX_ISOLATED_DATA_DIR: '/runner/artifacts/52',
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
  work_unit_id: 'bgmu0gsA',
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

const NODE_THREE_JOB_STATUS_DATA = {
  id: 51,
  type: 'job',
  url: '/api/v2/jobs/51/',
  related: {
    created_by: '/api/v2/users/1/',
    labels: '/api/v2/jobs/51/labels/',
    inventory: '/api/v2/inventories/1/',
    project: '/api/v2/projects/6/',
    organization: '/api/v2/organizations/1/',
    credentials: '/api/v2/jobs/51/credentials/',
    unified_job_template: '/api/v2/job_templates/7/',
    stdout: '/api/v2/jobs/51/stdout/',
    source_workflow_job: '/api/v2/workflow_jobs/49/',
    execution_environment: '/api/v2/execution_environments/1/',
    job_events: '/api/v2/jobs/51/job_events/',
    job_host_summaries: '/api/v2/jobs/51/job_host_summaries/',
    activity_stream: '/api/v2/jobs/51/activity_stream/',
    notifications: '/api/v2/jobs/51/notifications/',
    create_schedule: '/api/v2/jobs/51/create_schedule/',
    job_template: '/api/v2/job_templates/7/',
    cancel: '/api/v2/jobs/51/cancel/',
    relaunch: '/api/v2/jobs/51/relaunch/'
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
    source_workflow_job: {
      id: 49,
      name: 'Demo Workflow Template',
      description: '',
      status: 'successful',
      failed: false,
      elapsed: 23.272
    },
    ancestor_job: {
      id: 49,
      name: 'Demo Workflow Template',
      type: 'workflow_job',
      url: '/api/v2/workflow_jobs/49/'
    },
    credentials: []
  },
  created: '2024-10-06T18:58:43.655232Z',
  modified: '2024-10-06T18:58:47.620830Z',
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
  launch_type: 'workflow',
  status: 'successful',
  execution_environment: 1,
  failed: false,
  started: '2024-10-06T18:58:47.674597Z',
  finished: '2024-10-06T18:58:51.034562Z',
  canceled_on: null,
  elapsed: 3.36,
  job_args:
    '["ansible-playbook", "-u", "root", "-i", "/runner/inventory/hosts", "-e", "@/runner/env/extravars", "hello_world.yml"]',
  job_cwd: '/runner/project',
  job_env: {
    PWD: '/runner',
    HOME: '/runner',
    PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
    SHLVL: '0',
    JOB_ID: '51',
    AWX_HOST: 'https://towerhost',
    HOSTNAME: 'automation-job-51-ncdkr',
    LC_CTYPE: 'C.UTF-8',
    INVENTORY_ID: '1',
    MAX_EVENT_RES: '700000',
    KUBERNETES_PORT: 'tcp://10.96.0.1:443',
    PROJECT_REVISION: '347e44fea036c94d5f60e544de006453ee5c71ad',
    ANSIBLE_ROLES_PATH:
      '/runner/requirements_roles:~/.ansible/roles:/usr/share/ansible/roles:/etc/ansible/roles',
    RUNNER_OMIT_EVENTS: 'False',
    ANSIBLE_FORCE_COLOR: 'True',
    AWX_PRIVATE_DATA_DIR: '/tmp/awx_51_h4_makht',
    AWX_DEMO_SERVICE_PORT: 'tcp://10.104.45.165:80',
    AWX_ISOLATED_DATA_DIR: '/runner/artifacts/51',
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
  work_unit_id: '4zBQFuZX',
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

export {
  NODE_ONE_JOB_STATUS_DATA,
  NODE_TWO_JOB_STATUS_DATA,
  NODE_THREE_JOB_STATUS_DATA
}
