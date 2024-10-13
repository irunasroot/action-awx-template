const JOB_TEMPLATE_DATA = {
  id: 7,
  type: 'job_template',
  url: '/api/v2/job_templates/7/',
  related: {
    named_url: '/api/v2/job_templates/Demo Job Template++Default/',
    created_by: '/api/v2/users/1/',
    modified_by: '/api/v2/users/1/',
    labels: '/api/v2/job_templates/7/labels/',
    inventory: '/api/v2/inventories/1/',
    project: '/api/v2/projects/6/',
    organization: '/api/v2/organizations/1/',
    credentials: '/api/v2/job_templates/7/credentials/',
    last_job: '/api/v2/jobs/41/',
    jobs: '/api/v2/job_templates/7/jobs/',
    schedules: '/api/v2/job_templates/7/schedules/',
    activity_stream: '/api/v2/job_templates/7/activity_stream/',
    launch: '/api/v2/job_templates/7/launch/',
    webhook_key: '/api/v2/job_templates/7/webhook_key/',
    webhook_receiver: '',
    notification_templates_started:
      '/api/v2/job_templates/7/notification_templates_started/',
    notification_templates_success:
      '/api/v2/job_templates/7/notification_templates_success/',
    notification_templates_error:
      '/api/v2/job_templates/7/notification_templates_error/',
    access_list: '/api/v2/job_templates/7/access_list/',
    survey_spec: '/api/v2/job_templates/7/survey_spec/',
    object_roles: '/api/v2/job_templates/7/object_roles/',
    instance_groups: '/api/v2/job_templates/7/instance_groups/',
    slice_workflow_jobs: '/api/v2/job_templates/7/slice_workflow_jobs/',
    copy: '/api/v2/job_templates/7/copy/'
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
    last_job: {
      id: 41,
      name: 'Demo Job Template',
      description: '',
      finished: '2024-10-06T06:33:31.487897Z',
      status: 'successful',
      failed: false
    },
    last_update: {
      id: 41,
      name: 'Demo Job Template',
      description: '',
      status: 'successful',
      failed: false
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
    object_roles: {
      admin_role: {
        description: 'Can manage all aspects of the job template',
        name: 'Admin',
        id: 31
      },
      execute_role: {
        description: 'May run the job template',
        name: 'Execute',
        id: 32
      },
      read_role: {
        description: 'May view settings for the job template',
        name: 'Read',
        id: 33
      }
    },
    user_capabilities: {
      edit: true,
      delete: true,
      start: true,
      schedule: true,
      copy: true
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
    resolved_environment: {
      id: 1,
      name: 'AWX EE (latest)',
      description: '',
      image: 'quay.io/ansible/awx-ee:latest'
    },
    survey: {
      title: '',
      description: ''
    },
    recent_jobs: [
      {
        id: 41,
        status: 'successful',
        finished: '2024-10-06T06:33:31.487897Z',
        canceled_on: null,
        type: 'job'
      },
      {
        id: 40,
        status: 'successful',
        finished: '2024-10-06T05:12:46.741009Z',
        canceled_on: null,
        type: 'job'
      },
      {
        id: 39,
        status: 'successful',
        finished: '2024-10-06T05:12:23.691821Z',
        canceled_on: null,
        type: 'job'
      },
      {
        id: 38,
        status: 'successful',
        finished: '2024-10-06T05:12:20.181342Z',
        canceled_on: null,
        type: 'job'
      },
      {
        id: 36,
        status: 'successful',
        finished: '2024-10-03T21:42:26.739424Z',
        canceled_on: null,
        type: 'job'
      },
      {
        id: 35,
        status: 'successful',
        finished: '2024-10-03T21:42:22.824485Z',
        canceled_on: null,
        type: 'job'
      },
      {
        id: 34,
        status: 'successful',
        finished: '2024-10-03T21:42:19.319788Z',
        canceled_on: null,
        type: 'job'
      },
      {
        id: 32,
        status: 'successful',
        finished: '2024-10-03T21:37:49.229622Z',
        canceled_on: null,
        type: 'job'
      },
      {
        id: 30,
        status: 'successful',
        finished: '2024-10-03T21:26:48.845404Z',
        canceled_on: null,
        type: 'job'
      },
      {
        id: 28,
        status: 'successful',
        finished: '2024-10-03T21:26:03.598731Z',
        canceled_on: null,
        type: 'job'
      }
    ],
    credentials: []
  },
  created: '2024-09-29T18:04:57.836946Z',
  modified: '2024-10-02T06:07:20.138793Z',
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
  extra_vars: '---',
  job_tags: '',
  force_handlers: false,
  skip_tags: '',
  start_at_task: '',
  timeout: 0,
  use_fact_cache: false,
  organization: 1,
  last_job_run: '2024-10-06T06:33:31.487897Z',
  last_job_failed: false,
  next_job_run: null,
  status: 'successful',
  execution_environment: null,
  host_config_key: '',
  ask_scm_branch_on_launch: false,
  ask_diff_mode_on_launch: false,
  ask_variables_on_launch: false,
  ask_limit_on_launch: false,
  ask_tags_on_launch: false,
  ask_skip_tags_on_launch: false,
  ask_job_type_on_launch: false,
  ask_verbosity_on_launch: false,
  ask_inventory_on_launch: false,
  ask_credential_on_launch: false,
  ask_execution_environment_on_launch: false,
  ask_labels_on_launch: false,
  ask_forks_on_launch: false,
  ask_job_slice_count_on_launch: false,
  ask_timeout_on_launch: false,
  ask_instance_groups_on_launch: false,
  survey_enabled: false,
  become_enabled: false,
  diff_mode: false,
  allow_simultaneous: false,
  custom_virtualenv: null,
  job_slice_count: 1,
  webhook_service: '',
  webhook_credential: null,
  prevent_instance_group_fallback: false
}

const WORKFLOW_JOB_TEMPLATE_DATA = {
  id: 8,
  type: 'workflow_job_template',
  url: '/api/v2/workflow_job_templates/8/',
  related: {
    named_url: '/api/v2/workflow_job_templates/Demo Workflow Template++/',
    created_by: '/api/v2/users/1/',
    modified_by: '/api/v2/users/1/',
    last_job: '/api/v2/workflow_jobs/37/',
    workflow_jobs: '/api/v2/workflow_job_templates/8/workflow_jobs/',
    schedules: '/api/v2/workflow_job_templates/8/schedules/',
    launch: '/api/v2/workflow_job_templates/8/launch/',
    webhook_key: '/api/v2/workflow_job_templates/8/webhook_key/',
    webhook_receiver: '',
    workflow_nodes: '/api/v2/workflow_job_templates/8/workflow_nodes/',
    labels: '/api/v2/workflow_job_templates/8/labels/',
    activity_stream: '/api/v2/workflow_job_templates/8/activity_stream/',
    notification_templates_started:
      '/api/v2/workflow_job_templates/8/notification_templates_started/',
    notification_templates_success:
      '/api/v2/workflow_job_templates/8/notification_templates_success/',
    notification_templates_error:
      '/api/v2/workflow_job_templates/8/notification_templates_error/',
    notification_templates_approvals:
      '/api/v2/workflow_job_templates/8/notification_templates_approvals/',
    access_list: '/api/v2/workflow_job_templates/8/access_list/',
    object_roles: '/api/v2/workflow_job_templates/8/object_roles/',
    survey_spec: '/api/v2/workflow_job_templates/8/survey_spec/',
    copy: '/api/v2/workflow_job_templates/8/copy/'
  },
  summary_fields: {
    last_job: {
      id: 37,
      name: 'Demo Workflow Template',
      description: '',
      finished: '2024-10-06T05:12:46.822196Z',
      status: 'successful',
      failed: false
    },
    last_update: {
      id: 37,
      name: 'Demo Workflow Template',
      description: '',
      status: 'successful',
      failed: false
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
    object_roles: {
      admin_role: {
        description: 'Can manage all aspects of the workflow job template',
        name: 'Admin',
        id: 40
      },
      execute_role: {
        description: 'May run the workflow job template',
        name: 'Execute',
        id: 41
      },
      read_role: {
        description: 'May view settings for the workflow job template',
        name: 'Read',
        id: 42
      },
      approval_role: {
        description: 'Can approve or deny a workflow approval node',
        name: 'Approve',
        id: 43
      }
    },
    user_capabilities: {
      edit: true,
      delete: true,
      start: true,
      schedule: true,
      copy: true
    },
    labels: {
      count: 0,
      results: []
    },
    recent_jobs: [
      {
        id: 37,
        status: 'successful',
        finished: '2024-10-06T05:12:46.822196Z',
        canceled_on: null,
        type: 'workflow_job'
      },
      {
        id: 33,
        status: 'successful',
        finished: '2024-10-03T21:42:26.833096Z',
        canceled_on: null,
        type: 'workflow_job'
      },
      {
        id: 31,
        status: 'successful',
        finished: '2024-10-03T21:37:49.306442Z',
        canceled_on: null,
        type: 'workflow_job'
      },
      {
        id: 29,
        status: 'successful',
        finished: '2024-10-03T21:26:48.915311Z',
        canceled_on: null,
        type: 'workflow_job'
      },
      {
        id: 27,
        status: 'successful',
        finished: '2024-10-03T21:26:03.670844Z',
        canceled_on: null,
        type: 'workflow_job'
      },
      {
        id: 7,
        status: 'successful',
        finished: '2024-09-30T03:22:13.808785Z',
        canceled_on: null,
        type: 'workflow_job'
      },
      {
        id: 5,
        status: 'successful',
        finished: '2024-09-30T03:20:40.994212Z',
        canceled_on: null,
        type: 'workflow_job'
      },
      {
        id: 1,
        status: 'successful',
        finished: '2024-09-29T18:50:51.599186Z',
        canceled_on: null,
        type: 'workflow_job'
      }
    ]
  },
  created: '2024-09-29T18:50:33.256648Z',
  modified: '2024-09-29T18:50:33.256657Z',
  name: 'Demo Workflow Template',
  description: '',
  last_job_run: '2024-10-06T05:12:46.822196Z',
  last_job_failed: false,
  next_job_run: null,
  status: 'successful',
  extra_vars: '---',
  organization: null,
  survey_enabled: false,
  allow_simultaneous: false,
  ask_variables_on_launch: false,
  inventory: null,
  limit: null,
  scm_branch: null,
  ask_inventory_on_launch: false,
  ask_scm_branch_on_launch: false,
  ask_limit_on_launch: false,
  webhook_service: '',
  webhook_credential: null,
  ask_labels_on_launch: false,
  ask_skip_tags_on_launch: false,
  ask_tags_on_launch: false,
  skip_tags: null,
  job_tags: null
}

export { JOB_TEMPLATE_DATA, WORKFLOW_JOB_TEMPLATE_DATA }
