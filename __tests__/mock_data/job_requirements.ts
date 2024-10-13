const JOB_TEMPLATE_REQUIREMENTS = {
  can_start_without_user_input: true,
  passwords_needed_to_start: [],
  ask_scm_branch_on_launch: false,
  ask_variables_on_launch: false,
  ask_tags_on_launch: false,
  ask_diff_mode_on_launch: false,
  ask_skip_tags_on_launch: false,
  ask_job_type_on_launch: false,
  ask_limit_on_launch: false,
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
  variables_needed_to_start: [],
  credential_needed_to_start: false,
  inventory_needed_to_start: false,
  job_template_data: {
    name: 'Demo Job Template',
    id: 7,
    description: ''
  },
  defaults: {
    inventory: {
      name: 'Demo Inventory',
      id: 1
    },
    limit: '',
    scm_branch: '',
    labels: [
      {
        id: 3,
        name: 'asdf'
      }
    ],
    job_tags: '',
    skip_tags: '',
    extra_vars: '---',
    diff_mode: false,
    job_type: 'run',
    verbosity: 0,
    execution_environment: {},
    forks: 0,
    job_slice_count: 1,
    timeout: 0,
    instance_groups: []
  }
}

const WORKFLOW_JOB_TEMPLATE_REQUIREMENTS = {
  ask_inventory_on_launch: false,
  ask_limit_on_launch: false,
  ask_scm_branch_on_launch: false,
  can_start_without_user_input: true,
  defaults: {
    inventory: {
      name: null,
      id: null
    },
    limit: null,
    scm_branch: null,
    job_tags: null,
    skip_tags: null,
    extra_vars: '---'
  },
  survey_enabled: false,
  variables_needed_to_start: [],
  node_templates_missing: [],
  node_prompts_rejected: [],
  workflow_job_template_data: {
    name: 'Demo Workflow Template',
    id: 8,
    description: ''
  },
  ask_variables_on_launch: false,
  ask_labels_on_launch: false,
  ask_skip_tags_on_launch: false,
  ask_tags_on_launch: false
}

export { JOB_TEMPLATE_REQUIREMENTS, WORKFLOW_JOB_TEMPLATE_REQUIREMENTS }
